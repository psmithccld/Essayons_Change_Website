import { Router, Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import express from 'express';
import { storage } from '../storage';
import { pool } from '../db';

const router = Router();

// Use raw body parsing on this router so we can verify HMAC before JSON.parse
router.use(express.raw({ type: 'application/json' }));

// ---------------------------------------------------------------------------
// HMAC-SHA256 signature validation
// Header: x-super-admin-signature (hex digest of raw body)
// ---------------------------------------------------------------------------
function validateSignature(req: Request, res: Response, next: NextFunction) {
  const secret = process.env.SUPER_ADMIN_WEBHOOK_SECRET;

  if (!secret) {
    console.error('[WEBHOOK] SUPER_ADMIN_WEBHOOK_SECRET is not configured');
    return res.status(500).json({ error: 'Webhook secret not configured on server' });
  }

  const provided = req.headers['x-super-admin-signature'] as string | undefined;
  if (!provided) {
    return res.status(401).json({ error: 'Missing x-super-admin-signature header' });
  }

  const rawBody = req.body as Buffer;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  // Constant-time comparison to prevent timing attacks
  let valid = false;
  try {
    valid = crypto.timingSafeEqual(
      Buffer.from(provided, 'utf8'),
      Buffer.from(expected, 'utf8'),
    );
  } catch {
    valid = false;
  }

  if (!valid) {
    console.warn('[WEBHOOK] Invalid signature on incoming request');
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Re-parse body as JSON for downstream handlers
  try {
    req.body = JSON.parse(rawBody.toString('utf8'));
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  next();
}

// ---------------------------------------------------------------------------
// GET /webhook/health  — no auth required
// ---------------------------------------------------------------------------
router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'essayons-change-website',
    timestamp: new Date(),
  });
});

// ---------------------------------------------------------------------------
// POST /webhook/content
// Payload: { action: 'create'|'update'|'delete', entity: 'blog_post'|'video'|'website_card', data: {...} }
// ---------------------------------------------------------------------------
router.post('/content', validateSignature, async (req, res) => {
  const { action, entity, data } = req.body as {
    action: 'create' | 'update' | 'delete';
    entity: 'blog_post' | 'video' | 'website_card';
    data: Record<string, any>;
  };

  if (!action || !entity || !data) {
    return res.status(400).json({ error: 'Missing required fields: action, entity, data' });
  }

  try {
    // --- blog_post and video go through the content table via storage ---
    if (entity === 'blog_post' || entity === 'video') {
      const contentType = entity === 'blog_post' ? 'blog' : 'video';

      if (action === 'create') {
        const created = await storage.createContent({ ...data, type: contentType });
        console.log(`[WEBHOOK] Created ${entity}: ${created.id}`);
        return res.json({ success: true, id: created.id });
      }

      if (action === 'update') {
        const identifier = data.id || data.slug;
        if (!identifier) {
          return res.status(400).json({ error: 'data.id or data.slug required for update' });
        }
        const existing = typeof identifier === 'number'
          ? await storage.getContentById(identifier)
          : await storage.getContentBySlug(identifier);

        if (!existing) {
          return res.status(404).json({ error: `${entity} not found` });
        }

        const { id: _id, slug: _slug, ...updates } = data;
        const updated = await storage.updateContent(existing.id, updates);
        console.log(`[WEBHOOK] Updated ${entity}: ${existing.id}`);
        return res.json({ success: true, id: existing.id, updated });
      }

      if (action === 'delete') {
        const identifier = data.id || data.slug;
        if (!identifier) {
          return res.status(400).json({ error: 'data.id or data.slug required for delete' });
        }
        const existing = typeof identifier === 'number'
          ? await storage.getContentById(identifier)
          : await storage.getContentBySlug(identifier);

        if (!existing) {
          return res.status(404).json({ error: `${entity} not found` });
        }

        await storage.deleteAttachmentsByContentId(existing.id);
        await storage.deleteContent(existing.id);
        console.log(`[WEBHOOK] Deleted ${entity}: ${existing.id}`);
        return res.json({ success: true });
      }
    }

    // --- website_card goes directly to website_cards table ---
    if (entity === 'website_card') {
      if (!pool) {
        return res.status(503).json({ error: 'Database not available' });
      }

      if (action === 'create') {
        const result = await pool.query(
          `INSERT INTO website_cards
             (slug, section, title, subtitle, body, image_url, cta_text, cta_url, display_order, is_active)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
           RETURNING id`,
          [
            data.slug,
            data.section,
            data.title,
            data.subtitle ?? null,
            data.body ?? null,
            data.image_url ?? null,
            data.cta_text ?? null,
            data.cta_url ?? null,
            data.display_order ?? 0,
            data.is_active ?? true,
          ],
        );
        const id = result.rows[0]?.id;
        console.log(`[WEBHOOK] Created website_card: ${id}`);
        return res.json({ success: true, id });
      }

      if (action === 'update') {
        const identifier = data.id || data.slug;
        if (!identifier) {
          return res.status(400).json({ error: 'data.id or data.slug required for update' });
        }
        const col = typeof identifier === 'number' ? 'id' : 'slug';
        const result = await pool.query(
          `UPDATE website_cards
           SET section=$1, title=$2, subtitle=$3, body=$4, image_url=$5,
               cta_text=$6, cta_url=$7, display_order=$8, is_active=$9, updated_at=NOW()
           WHERE ${col}=$10
           RETURNING id`,
          [
            data.section,
            data.title,
            data.subtitle ?? null,
            data.body ?? null,
            data.image_url ?? null,
            data.cta_text ?? null,
            data.cta_url ?? null,
            data.display_order ?? 0,
            data.is_active ?? true,
            identifier,
          ],
        );
        if (result.rowCount === 0) {
          return res.status(404).json({ error: 'website_card not found' });
        }
        console.log(`[WEBHOOK] Updated website_card: ${identifier}`);
        return res.json({ success: true });
      }

      if (action === 'delete') {
        const identifier = data.id || data.slug;
        if (!identifier) {
          return res.status(400).json({ error: 'data.id or data.slug required for delete' });
        }
        const col = typeof identifier === 'number' ? 'id' : 'slug';
        const result = await pool.query(
          `DELETE FROM website_cards WHERE ${col}=$1`,
          [identifier],
        );
        if (result.rowCount === 0) {
          return res.status(404).json({ error: 'website_card not found' });
        }
        console.log(`[WEBHOOK] Deleted website_card: ${identifier}`);
        return res.json({ success: true });
      }
    }

    return res.status(400).json({ error: `Unknown entity: ${entity}` });
  } catch (err) {
    console.error('[WEBHOOK] /content error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// ---------------------------------------------------------------------------
// POST /webhook/product-sync
// Payload: { product_name: string, product_data: object }
// Upserts by product_name
// ---------------------------------------------------------------------------
router.post('/product-sync', validateSignature, async (req, res) => {
  const { product_name, product_data } = req.body as {
    product_name: string;
    product_data: Record<string, any>;
  };

  if (!product_name || product_data === undefined) {
    return res.status(400).json({ error: 'Missing required fields: product_name, product_data' });
  }

  if (!pool) {
    return res.status(503).json({ error: 'Database not available' });
  }

  try {
    await pool.query(
      `INSERT INTO products_cache (product_name, product_data, last_synced_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (product_name)
       DO UPDATE SET product_data = EXCLUDED.product_data, last_synced_at = NOW()`,
      [product_name, JSON.stringify(product_data)],
    );

    console.log(`[WEBHOOK] Product synced: ${product_name}`);
    return res.json({ success: true });
  } catch (err) {
    console.error('[WEBHOOK] /product-sync error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

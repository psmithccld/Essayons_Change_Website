/**
 * Investor Data Room
 *
 * Serves investor documents from a PRIVATE Cloudflare R2 bucket.
 * The bucket is never exposed publicly. Visitors unlock the room with an
 * access code, their name and email are recorded in the session, and each
 * file is delivered through a short-lived signed URL.
 *
 * Folder layout in R2 (managed from the Cloudflare dashboard):
 *   <bucket>/<DATAROOM_PREFIX>/<Category>/<file>
 *   e.g. investor/Investor Documents/Legal/Bylaws.pdf
 *
 * Environment variables:
 *   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY  (already set)
 *   DATAROOM_BUCKET_NAME   default "investor"
 *   DATAROOM_PREFIX        default "Investor Documents/"
 *   DATAROOM_ACCESS_CODE   required; the code you give investors
 *   DATAROOM_NOTIFY_EMAIL  optional; where access alerts go (defaults to SENDGRID_FROM_EMAIL)
 */
import { Router, Request, Response, NextFunction } from 'express';
import { timingSafeEqual, createHash } from 'crypto';
import { z } from 'zod';
import { getUncachableSendGridClient } from '../sendgrid';

declare module 'express-session' {
  interface SessionData {
    dataroom?: {
      name: string;
      email: string;
      firm?: string;
      grantedAt: string;
    };
  }
}

const BUCKET = process.env.DATAROOM_BUCKET_NAME || 'investor';
const RAW_PREFIX = process.env.DATAROOM_PREFIX ?? 'Investor Documents/';
const PREFIX = RAW_PREFIX && !RAW_PREFIX.endsWith('/') ? `${RAW_PREFIX}/` : RAW_PREFIX;
const SIGNED_URL_TTL_SEC = 300;

// Display order for known categories. Anything else sorts alphabetically after these.
const CATEGORY_ORDER = [
  'Executive Summary',
  'Pitch Deck',
  'Business Plan',
  'Financials',
  'Due Diligence',
  'Legal',
  'Team',
  'Marketing Documents',
  'General',
];

const accessSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('Valid email is required').max(200),
  firm: z.string().trim().max(200).optional().or(z.literal('')),
  code: z.string().trim().min(1, 'Access code is required').max(200),
  acknowledged: z.boolean().refine((v) => v === true, {
    message: 'Please acknowledge the confidentiality terms.',
  }),
});

// ---------- helpers ----------

async function getR2Client() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error('R2 credentials are not configured');
  }
  const { S3Client } = await import('@aws-sdk/client-s3');
  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

function codesMatch(submitted: string, expected: string): boolean {
  // Hash both so lengths match, then compare in constant time.
  const a = createHash('sha256').update(submitted).digest();
  const b = createHash('sha256').update(expected).digest();
  return timingSafeEqual(a, b);
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

// Simple in-memory limiter for code attempts: 10 tries per 15 minutes per IP.
const attempts = new Map<string, { count: number; resetAt: number }>();
function tooManyAttempts(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 10;
}

function requireDataroomAccess(req: Request, res: Response, next: NextFunction) {
  if (!req.session.dataroom) {
    return res.status(401).json({ error: 'Data room access required' });
  }
  next();
}

async function notify(subject: string, lines: string[]) {
  try {
    const { client, fromEmail } = await getUncachableSendGridClient();
    const to = process.env.DATAROOM_NOTIFY_EMAIL || fromEmail;
    await client.send({
      to,
      from: fromEmail,
      subject,
      text: lines.join('\n'),
      html: lines.map((l) => `<p>${escapeHtml(l)}</p>`).join(''),
    });
  } catch (err) {
    console.error('[DATAROOM] Notification email failed:', err);
  }
}

// ---------- routes ----------

const router = Router();

// Is this browser already unlocked?
router.get('/session', (req, res) => {
  const d = req.session.dataroom;
  res.set('Cache-Control', 'no-store');
  return res.json({ granted: !!d, name: d?.name ?? null });
});

// Unlock with an access code
router.post('/access', async (req, res) => {
  const expected = process.env.DATAROOM_ACCESS_CODE;
  if (!expected) {
    console.error('[DATAROOM] DATAROOM_ACCESS_CODE is not set');
    return res.status(503).json({ error: 'The data room is not available right now.' });
  }

  const ip = req.ip || 'unknown';
  if (tooManyAttempts(ip)) {
    return res.status(429).json({ error: 'Too many attempts. Please try again in 15 minutes.' });
  }

  const parsed = accessSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message || 'Invalid request' });
  }
  const { name, email, firm, code } = parsed.data;

  if (!codesMatch(code, expected)) {
    console.warn(`[DATAROOM] Invalid code attempt: ${email} (${ip})`);
    return res.status(403).json({ error: 'That access code is not valid.' });
  }

  req.session.dataroom = {
    name,
    email,
    firm: firm || undefined,
    grantedAt: new Date().toISOString(),
  };

  req.session.save((err) => {
    if (err) {
      console.error('[DATAROOM] Session save error:', err);
      return res.status(500).json({ error: 'Could not start your session. Please try again.' });
    }
    console.log(`[DATAROOM] Access granted: ${name} <${email}>${firm ? ` (${firm})` : ''}`);
    // Fire and forget so the visitor is not kept waiting on email delivery.
    void notify(`Data room opened: ${name}${firm ? `, ${firm}` : ''}`, [
      `${name} opened the investor data room.`,
      `Email: ${email}`,
      `Firm: ${firm || 'not provided'}`,
      `Time: ${new Date().toISOString()}`,
    ]);
    return res.json({ granted: true, name });
  });
});

// Leave the data room (clears only data room access, not admin login)
router.post('/logout', (req, res) => {
  delete req.session.dataroom;
  req.session.save(() => res.json({ granted: false }));
});

// List documents grouped by category folder
router.get('/files', requireDataroomAccess, async (_req, res) => {
  try {
    const { ListObjectsV2Command } = await import('@aws-sdk/client-s3');
    const r2 = await getR2Client();

    const objects: { Key?: string; Size?: number; LastModified?: Date }[] = [];
    let token: string | undefined;
    do {
      const out = await r2.send(
        new ListObjectsV2Command({ Bucket: BUCKET, Prefix: PREFIX || undefined, ContinuationToken: token })
      );
      objects.push(...(out.Contents || []));
      token = out.IsTruncated ? out.NextContinuationToken : undefined;
    } while (token);

    const groups = new Map<string, { key: string; name: string; size: number; lastModified: string | null }[]>();
    for (const obj of objects) {
      if (!obj.Key || obj.Key.endsWith('/')) continue; // skip folder markers
      const rel = obj.Key.slice(PREFIX.length);
      const parts = rel.split('/');
      const fileName = parts[parts.length - 1];
      if (!fileName || fileName.startsWith('.')) continue; // skip hidden files
      const category = parts.length > 1 ? parts[0] : 'General';
      if (!groups.has(category)) groups.set(category, []);
      groups.get(category)!.push({
        key: obj.Key,
        name: fileName,
        size: obj.Size ?? 0,
        lastModified: obj.LastModified ? obj.LastModified.toISOString() : null,
      });
    }

    const rank = (c: string) => {
      const i = CATEGORY_ORDER.findIndex((o) => o.toLowerCase() === c.toLowerCase());
      return i === -1 ? CATEGORY_ORDER.length : i;
    };
    const categories = [...groups.entries()]
      .sort(([a], [b]) => rank(a) - rank(b) || a.localeCompare(b))
      .map(([name, files]) => ({
        name,
        files: files.sort((x, y) => x.name.localeCompare(y.name)),
      }));

    res.set('Cache-Control', 'no-store');
    return res.json({ categories });
  } catch (error) {
    console.error('[DATAROOM] List error:', error);
    return res.status(500).json({ error: 'Could not load documents.' });
  }
});

// Open or download one document via a short-lived signed URL
router.get('/file', requireDataroomAccess, async (req, res) => {
  try {
    const key = typeof req.query.key === 'string' ? req.query.key : '';
    const download = req.query.download === '1';
    if (!key || !key.startsWith(PREFIX) || key.includes('..') || key.endsWith('/')) {
      return res.status(400).json({ error: 'Invalid document' });
    }

    const { GetObjectCommand, HeadObjectCommand } = await import('@aws-sdk/client-s3');
    const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner');
    const r2 = await getR2Client();

    // Confirm the object exists so a bad key returns 404 instead of an R2 error page.
    try {
      await r2.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    } catch {
      return res.status(404).json({ error: 'Document not found' });
    }

    const fileName = key.split('/').pop() || 'document';
    const isPdf = fileName.toLowerCase().endsWith('.pdf');
    const disposition = isPdf && !download ? 'inline' : 'attachment';
    const safeName = fileName.replace(/"/g, '');

    const url = await getSignedUrl(
      r2,
      new GetObjectCommand({
        Bucket: BUCKET,
        Key: key,
        ResponseContentDisposition: `${disposition}; filename="${safeName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
        ...(isPdf ? { ResponseContentType: 'application/pdf' } : {}),
      }),
      { expiresIn: SIGNED_URL_TTL_SEC }
    );

    const who = req.session.dataroom!;
    console.log(`[DATAROOM] ${download ? 'Download' : 'View'}: ${who.email} -> ${fileName}`);

    res.set('Cache-Control', 'no-store');
    return res.redirect(302, url);
  } catch (error) {
    console.error('[DATAROOM] File error:', error);
    return res.status(500).json({ error: 'Could not open document.' });
  }
});

export default router;

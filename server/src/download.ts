/**
 * Public download route for the 11-Row Plan desktop installer.
 *
 * Streams the Windows installer from a Cloudflare R2 bucket through the
 * server, under the website's own domain. The Microsoft Store Package URL
 * field requires a direct download with NO redirect, so this route pipes
 * the file bytes itself rather than 302-redirecting to a signed R2 URL.
 *
 * Resulting URL: https://www.essayonschange.com/download/11-row-plan
 *
 * Environment variables (R2 credentials are already set on Render):
 *   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY
 *   INSTALLER_BUCKET_NAME   default "11-rowplan"
 *   INSTALLER_KEY           the exact object key in the bucket
 *                           (set on Render to: 11-row-plan-0.1.0-x64-setup.exe)
 */
import { Router } from 'express';
import type { Readable } from 'stream';

const BUCKET = process.env.INSTALLER_BUCKET_NAME || '11-rowplan';
const INSTALLER_KEY = process.env.INSTALLER_KEY || '11-row-plan-0.1.0-x64-setup.exe';

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

const router = Router();

// Public download: streams the installer bytes directly (no redirect),
// so the Microsoft Store Package URL check passes.
router.get('/11-row-plan', async (_req, res) => {
  try {
    const { GetObjectCommand } = await import('@aws-sdk/client-s3');
    const r2 = await getR2Client();

    const obj = await r2.send(
      new GetObjectCommand({ Bucket: BUCKET, Key: INSTALLER_KEY })
    );

    if (!obj.Body) {
      console.error(`[DOWNLOAD] Empty body: ${BUCKET}/${INSTALLER_KEY}`);
      return res.status(404).send('Installer not found.');
    }

    res.setHeader('Content-Type', 'application/vnd.microsoft.portable-executable');
    res.setHeader('Content-Disposition', 'attachment; filename="11-row-plan-setup.exe"');
    if (obj.ContentLength != null) {
      res.setHeader('Content-Length', String(obj.ContentLength));
    }
    res.setHeader('Cache-Control', 'no-store');

    console.log(`[DOWNLOAD] Streaming installer: ${BUCKET}/${INSTALLER_KEY}`);
    (obj.Body as Readable).pipe(res);
  } catch (error: any) {
    if (error?.name === 'NoSuchKey' || error?.$metadata?.httpStatusCode === 404) {
      console.error(`[DOWNLOAD] Installer not found: ${BUCKET}/${INSTALLER_KEY}`);
      return res.status(404).send('Installer not found.');
    }
    console.error('[DOWNLOAD] Error:', error);
    return res.status(500).send('Could not serve the installer.');
  }
});

export default router;

/**
 * Public download route for the 11-Row Plan desktop installer.
 *
 * Serves the Windows installer from a Cloudflare R2 bucket through a
 * short-lived signed URL, under the website's own domain. Unlike the
 * investor data room, this route is PUBLIC (no access code): anyone with
 * the link can download, which is what the Microsoft Store Package URL
 * field needs.
 *
 * Resulting URL: https://www.essayonschange.com/download/11-row-plan
 *
 * Environment variables (R2 credentials are already set on Render):
 *   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY
 *   INSTALLER_BUCKET_NAME   default "11-rowplan"
 *   INSTALLER_KEY           default "11-Row Plan_0.1.0_x64-setup.exe"
 *                           (the exact object key in the bucket; set this
 *                            if you rename or version-bump the installer)
 */
import { Router } from 'express';

const BUCKET = process.env.INSTALLER_BUCKET_NAME || '11-rowplan';
const INSTALLER_KEY = process.env.INSTALLER_KEY || '11-Row Plan_0.1.0_x64-setup.exe';
const SIGNED_URL_TTL_SEC = 300;

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

// Public download: signs a URL for the installer and 302-redirects to it.
// Microsoft Store (and anyone else) can point straight at this path.
router.get('/11-row-plan', async (_req, res) => {
  try {
    const { GetObjectCommand, HeadObjectCommand } = await import('@aws-sdk/client-s3');
    const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner');
    const r2 = await getR2Client();

    // Confirm the object exists so a bad key returns 404, not an R2 error page.
    try {
      await r2.send(new HeadObjectCommand({ Bucket: BUCKET, Key: INSTALLER_KEY }));
    } catch {
      console.error(`[DOWNLOAD] Installer not found: ${BUCKET}/${INSTALLER_KEY}`);
      return res.status(404).send('Installer not found.');
    }

    // Always download (attachment), with a clean, URL-safe filename.
    const downloadName = '11-row-plan-setup.exe';

    const url = await getSignedUrl(
      r2,
      new GetObjectCommand({
        Bucket: BUCKET,
        Key: INSTALLER_KEY,
        ResponseContentDisposition: `attachment; filename="${downloadName}"`,
        ResponseContentType: 'application/vnd.microsoft.portable-executable',
      }),
      { expiresIn: SIGNED_URL_TTL_SEC }
    );

    console.log(`[DOWNLOAD] Installer served: ${BUCKET}/${INSTALLER_KEY}`);
    res.set('Cache-Control', 'no-store');
    return res.redirect(302, url);
  } catch (error) {
    console.error('[DOWNLOAD] Error:', error);
    return res.status(500).send('Could not serve the installer.');
  }
});

export default router;

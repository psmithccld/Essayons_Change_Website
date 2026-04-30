import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import { loginHandler, logoutHandler, getCurrentUserHandler, requireAuth } from '../auth';
import superAdminWebhookRouter from './super-admin-webhook';
import {
  listContentHandler,
  getContentHandler,
  createContentHandler,
  updateContentHandler,
  deleteContentHandler,
  createAttachmentHandler,
  deleteAttachmentHandler,
} from '../admin-routes';
import { storage } from '../storage';
import { seedAdminUser } from '../seed';
import { ObjectStorageService, ObjectNotFoundError } from '../objectStorage';
import { ObjectPermission } from '../objectAcl';
import { getUncachableSendGridClient } from '../sendgrid';
import { z } from 'zod';

// Inline validation schema to avoid importing from shared/schema which requires Drizzle packages
const insertContactMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

dotenv.config();

const PORT = Number(process.env.SERVER_PORT || 3000);
const APP_URL = process.env.APP_URL || '';
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-secret-change-in-production';

const app = express();

// Trust proxy for secure cookies behind Render's reverse proxy
app.set('trust proxy', 1);

// Security middleware - configure CSP to allow R2 uploads
const r2AccountId = process.env.R2_ACCOUNT_ID;
const r2PublicDomain = process.env.R2_PUBLIC_DOMAIN;

// Build connect-src directives for R2 uploads
const connectSrcDirectives: string[] = ["'self'"];
if (r2AccountId) {
  connectSrcDirectives.push(`https://*.${r2AccountId}.r2.cloudflarestorage.com`);
}
if (r2PublicDomain) {
  connectSrcDirectives.push(`https://${r2PublicDomain}`);
}
// Also allow R2 public dev URLs for uploads
connectSrcDirectives.push("https://*.r2.dev");

// Build img-src directives for displaying R2 images
const imgSrcDirectives: string[] = ["'self'", "data:", "blob:"];
if (r2AccountId) {
  imgSrcDirectives.push(`https://*.${r2AccountId}.r2.cloudflarestorage.com`);
}
if (r2PublicDomain) {
  imgSrcDirectives.push(`https://${r2PublicDomain}`);
}
// Also allow R2 public dev URLs (pub-*.r2.dev pattern)
imgSrcDirectives.push("https://*.r2.dev");

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: [...imgSrcDirectives, "https://www.googletagmanager.com", "https://www.google-analytics.com"],
      connectSrc: [...connectSrcDirectives, "https://www.google-analytics.com", "https://analytics.google.com", "https://stats.g.doubleclick.net", "https://www.googletagmanager.com"],
      frameSrc: ["'self'", "https://www.youtube.com", "https://youtube.com", "https://www.youtube-nocookie.com", "https://youtube-nocookie.com"],
    },
  },
}));
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Configure session store - use PostgreSQL in production, memory in development
async function configureSession() {
  const isProduction = process.env.NODE_ENV === 'production';
  const databaseUrl = process.env.DATABASE_URL;
  
  let sessionStore;
  
  if (isProduction && databaseUrl) {
    try {
      const pgSession = (await import('connect-pg-simple')).default;
      const PgStore = pgSession(session);
      
      sessionStore = new PgStore({
        conString: databaseUrl,
        tableName: 'session',
        createTableIfMissing: true,
      });
      
      console.log('[SESSION] Using PostgreSQL session store');
    } catch (err) {
      console.error('[SESSION] Failed to initialize PostgreSQL session store:', err);
      console.log('[SESSION] Falling back to memory session store');
    }
  } else {
    console.log('[SESSION] Using memory session store (development mode)');
  }
  
  return session({
    store: sessionStore,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  });
}

// Apply session middleware asynchronously
const sessionMiddleware = await configureSession();
app.use(sessionMiddleware);

// Super-admin webhook routes (HMAC-authenticated, raw body parsing handled inside router)
app.use('/api/super-admin/webhook', superAdminWebhookRouter);

// Basic API endpoint
app.get('/api/status', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Auth endpoints
app.post('/api/auth/login', loginHandler);
app.post('/api/auth/logout', logoutHandler);
app.get('/api/auth/me', getCurrentUserHandler);

// Admin content management routes (protected)
app.get('/api/admin/content', requireAuth, listContentHandler);
app.get('/api/admin/content/:id', requireAuth, getContentHandler);
app.post('/api/admin/content', requireAuth, createContentHandler);
app.patch('/api/admin/content/:id', requireAuth, updateContentHandler);
app.delete('/api/admin/content/:id', requireAuth, deleteContentHandler);

// Attachment routes (protected)
app.post('/api/admin/attachments', requireAuth, createAttachmentHandler);
app.delete('/api/admin/attachments/:id', requireAuth, deleteAttachmentHandler);

// Cloudflare R2 upload endpoint (protected)
app.post('/api/admin/upload/presigned-url', requireAuth, async (req, res) => {
  try {
    const { filename, contentType, fileSize } = req.body;

    // Validate inputs
    if (!filename || !contentType) {
      return res.status(400).json({ error: 'Filename and contentType are required' });
    }

    // Validate content type is an image
    if (!contentType.startsWith('image/')) {
      return res.status(400).json({ error: 'Only image files are allowed' });
    }

    // Validate file size (max 10MB)
    if (fileSize && fileSize > 10 * 1024 * 1024) {
      return res.status(400).json({ error: 'File size must be less than 10MB' });
    }

    // Check for R2 configuration
    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    const bucketName = process.env.R2_BUCKET_NAME;

    if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
      console.error('[R2] Missing configuration:', {
        accountId: !!accountId,
        accessKeyId: !!accessKeyId,
        secretAccessKey: !!secretAccessKey,
        bucketName: !!bucketName,
      });
      return res.status(500).json({ error: 'R2 storage is not configured' });
    }

    // Dynamic import of AWS SDK to avoid issues in environments without it
    const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');
    const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner');

    const r2Client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    // Generate unique key with timestamp and random suffix
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const extension = filename.split('.').pop() || 'jpg';
    const key = `images/${timestamp}-${randomSuffix}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: contentType,
    });

    const presignedUrl = await getSignedUrl(r2Client, command, { expiresIn: 600 });

    // Construct the public URL (assuming public bucket with r2.dev subdomain or custom domain)
    const publicDomain = process.env.R2_PUBLIC_DOMAIN;
    const publicUrl = publicDomain 
      ? `https://${publicDomain}/${key}`
      : `https://${bucketName}.${accountId}.r2.cloudflarestorage.com/${key}`;

    return res.json({ 
      presignedUrl, 
      key,
      publicUrl,
    });
  } catch (error) {
    console.error('[R2] Error generating presigned URL:', error);
    return res.status(500).json({ error: 'Failed to generate upload URL' });
  }
});

// Helper function to check if scheduled content should be published
function isContentPublishable(item: any): boolean {
  if (item.status === 'published') return true;
  if (item.status === 'scheduled' && item.scheduledPublishAt) {
    const scheduledDate = new Date(item.scheduledPublishAt);
    return scheduledDate <= new Date();
  }
  return false;
}

// Public content endpoints (no auth required)
app.get('/api/content', async (req, res) => {
  try {
    const { type } = req.query;
    const items = await storage.listContent(type as string | undefined, undefined);
    
    // Filter to only show published or past-scheduled content
    const publishedItems = items.filter(isContentPublishable);
    
    return res.json(publishedItems);
  } catch (error) {
    console.error('List content error:', error);
    return res.status(500).json({ error: 'Failed to list content' });
  }
});

app.get('/api/content/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const item = await storage.getContentBySlug(slug);
    
    if (!item || !isContentPublishable(item)) {
      return res.status(404).json({ error: 'Content not found' });
    }

    const attachments = await storage.getAttachmentsByContentId(item.id);
    return res.json({ ...item, attachments });
  } catch (error) {
    console.error('Get content by slug error:', error);
    return res.status(500).json({ error: 'Failed to get content' });
  }
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    // Validate request body
    const validationResult = insertContactMessageSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: 'Invalid request data',
        details: validationResult.error.errors 
      });
    }

    const messageData = validationResult.data;

    // Save to database first
    const savedMessage = await storage.createContactMessage(messageData);

    // Send email via SendGrid - this must succeed for dual persistence
    try {
      const { client, fromEmail } = await getUncachableSendGridClient();
      
      await client.send({
        to: fromEmail, // Send to the configured admin email
        from: fromEmail,
        replyTo: messageData.email,
        subject: `Contact Form: ${messageData.subject}`,
        text: `
New contact form submission:

From: ${messageData.name}
Email: ${messageData.email}
Subject: ${messageData.subject}

Message:
${messageData.message}

---
Submitted: ${new Date().toISOString()}
Message ID: ${savedMessage.id}
        `.trim(),
        html: `
<h2>New Contact Form Submission</h2>
<p><strong>From:</strong> ${messageData.name}</p>
<p><strong>Email:</strong> <a href="mailto:${messageData.email}">${messageData.email}</a></p>
<p><strong>Subject:</strong> ${messageData.subject}</p>
<h3>Message:</h3>
<p>${messageData.message.replace(/\n/g, '<br>')}</p>
<hr>
<p><small>Submitted: ${new Date().toISOString()}</small></p>
<p><small>Message ID: ${savedMessage.id}</small></p>
        `.trim(),
      });
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Database saved but email failed - return error with saved message ID
      return res.status(502).json({ 
        error: 'Message saved but email notification failed. Our team has been notified.',
        messageId: savedMessage.id,
        details: 'Your message was saved successfully, but we encountered an issue sending the email notification. We will review your message soon.'
      });
    }

    return res.status(201).json({ 
      success: true,
      message: 'Message sent successfully',
      id: savedMessage.id 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Failed to process contact form submission' });
  }
});

// Object storage endpoints (admin only - protected file uploading)
// Get upload URL for file upload
app.post('/api/objects/upload', requireAuth, async (req, res) => {
  try {
    const objectStorageService = new ObjectStorageService();
    const uploadURL = await objectStorageService.getObjectEntityUploadURL();
    res.json({ uploadURL });
  } catch (error) {
    console.error('Error getting upload URL:', error);
    return res.status(500).json({ error: 'Failed to get upload URL' });
  }
});

// Update file metadata after upload (set ACL policy)
app.put('/api/objects/confirm', requireAuth, async (req, res) => {
  try {
    const { fileURL } = req.body;
    if (!fileURL) {
      return res.status(400).json({ error: 'fileURL is required' });
    }

    const userId = (req.session as any).userId?.toString() || 'admin';
    
    const objectStorageService = new ObjectStorageService();
    const objectPath = await objectStorageService.trySetObjectEntityAclPolicy(
      fileURL,
      {
        owner: userId,
        visibility: "public",
      },
    );

    res.status(200).json({ objectPath });
  } catch (error) {
    console.error('Error confirming file upload:', error);
    res.status(500).json({ error: 'Failed to confirm upload' });
  }
});

// Serve objects with ACL enforcement
app.get('/objects/:objectPath(*)', async (req, res) => {
  try {
    const objectStorageService = new ObjectStorageService();
    const objectFile = await objectStorageService.getObjectEntityFile(req.path);
    
    // Get user ID from session if authenticated
    const userId = (req.session as any).userId?.toString();
    
    // Check if user can access this object
    const canAccess = await objectStorageService.canAccessObjectEntity({
      objectFile,
      userId,
      requestedPermission: ObjectPermission.READ,
    });
    
    if (!canAccess) {
      return res.sendStatus(403);
    }
    
    objectStorageService.downloadObject(objectFile, res);
  } catch (error) {
    console.error('Error serving object:', error);
    if (error instanceof ObjectNotFoundError) {
      return res.sendStatus(404);
    }
    return res.sendStatus(500);
  }
});

// Serve public assets from object storage
app.get('/public-objects/:filePath(*)', async (req, res) => {
  try {
    const filePath = req.params.filePath;
    const objectStorageService = new ObjectStorageService();
    const file = await objectStorageService.searchPublicObject(filePath);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    objectStorageService.downloadObject(file, res);
  } catch (error) {
    console.error('Error serving public object:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Redirect /app to the live CMIS APP_URL (set in .env)
app.get('/app', (_req, res) => {
  if (APP_URL) {
    // 302 redirect to the externally hosted app (Render). This keeps the public website free of sensitive sessions.
    return res.redirect(APP_URL);
  }
  return res.status(404).send('App URL not configured. Set APP_URL in environment.');
});

// Serve static client build when present (production)
const clientDist = path.join(process.cwd(), '..', 'client', 'dist');
app.use(express.static(clientDist));
app.get('*', (req, res) => {
  // In case the client dev server is used, we only serve index.html when dist exists.
  res.sendFile(path.join(clientDist, 'index.html'), (err) => {
    if (err) {
      res.status(404).send('Not found');
    }
  });
});

// Background job to publish scheduled content
async function publishScheduledContent() {
  try {
    const scheduledItems = await storage.getScheduledContentToPublish();
    
    for (const item of scheduledItems) {
      const published = await storage.publishScheduledContent(item.id);
      if (published) {
        console.log(`[SCHEDULER] Published scheduled content: "${published.title}" (ID: ${published.id})`);
      }
    }
    
    if (scheduledItems.length > 0) {
      console.log(`[SCHEDULER] Published ${scheduledItems.length} scheduled item(s)`);
    }
  } catch (error) {
    console.error('[SCHEDULER] Error publishing scheduled content:', error);
  }
}

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  console.log('[STARTUP] Storage implementation:', storage.constructor.name);
  console.log('[STARTUP] DATABASE_URL configured:', !!process.env.DATABASE_URL);
  console.log('[STARTUP] NODE_ENV:', process.env.NODE_ENV);
  
  // Seed initial admin user for development
  await seedAdminUser();
  
  // Run scheduled publishing check every minute
  setInterval(publishScheduledContent, 60 * 1000);
  
  // Also run immediately on startup to publish any pending content
  await publishScheduledContent();
  
  console.log('[SCHEDULER] Scheduled publishing job started (runs every 60 seconds)');
});
import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import { loginHandler, logoutHandler, getCurrentUserHandler, requireAuth } from '../auth';
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

// Security middleware
app.use(helmet());
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Changed from 'strict' to allow session cookies on navigation
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

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

// Public content endpoints (no auth required)
app.get('/api/content', (req, res) => listContentHandler(req, res));
app.get('/api/content/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const item = await storage.getContentBySlug(slug);
    
    if (!item) {
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

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  console.log('[STARTUP] Storage implementation:', storage.constructor.name);
  console.log('[STARTUP] DATABASE_URL configured:', !!process.env.DATABASE_URL);
  console.log('[STARTUP] NODE_ENV:', process.env.NODE_ENV);
  
  // Seed initial admin user for development
  await seedAdminUser();
});
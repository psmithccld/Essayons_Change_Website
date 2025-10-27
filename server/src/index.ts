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
import { storage } from '../mem-storage';
import { seedAdminUser } from '../seed';

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
  
  // Seed initial admin user for development
  await seedAdminUser();
});
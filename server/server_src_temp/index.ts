import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT || 3000);
const APP_URL = process.env.APP_URL || '';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Basic API endpoint
app.get('/api/status', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
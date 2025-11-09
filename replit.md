# Essayons Public Website - Replit Guide

## Overview

Essayons Change Management is a monorepo-based public marketing website for a Change Management Information System (CMIS). It provides marketing pages, educational content, interactive games/quizzes, and acts as a gateway to the main CMIS application via a `/app` route. The project aims to be the public face for the CMIS, offering various content types and engaging features to attract and inform users.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Monorepo Structure
The project uses a workspace-based monorepo to separate client (Vite + React + Tailwind CSS), server (Express), and shared TypeScript types. This allows for code sharing and clear separation of concerns.

### Frontend Architecture
Built with React 18 and TypeScript, it uses Wouter for routing, TanStack Query for server state, Tailwind CSS with shadcn/ui for styling, and Framer Motion for animations. The design is inspired by Notion, Linear, and Stripe, utilizing Inter and JetBrains Mono fonts. The client is bundled by Vite into `/dist/public`.

### Backend Architecture
An Express.js server provides a minimal API for contact forms, status endpoints, and static file serving. It uses `tsx` for development and `esbuild` for production bundling. Key routes include `/api/status`, `/app` (redirect to CMIS), and `*` (serves client SPA). Security middleware like Helmet and CORS are included. An admin CMS with session-based authentication is implemented for content management, including protected routes for CRUD operations on content and attachments.

### Database Architecture
**Production**: Uses PostgreSQL with Drizzle ORM for persistent storage of admin users, content, and contact form submissions. The database packages (`drizzle-orm`, `drizzle-zod`, `@neondatabase/serverless`) are installed as npm dependencies in `server/package.json`, making them available in all environments including Render deployments.

**Development**: The Replit development environment can use either PostgreSQL (when `DATABASE_URL` is configured via the `javascript_database` integration) or in-memory storage (`MemStorage`) as a fallback. Production deployments on Render use PostgreSQL when `DATABASE_URL` is configured.

**Storage Selection**: The application automatically detects the environment:
- When `DATABASE_URL` is available AND database packages are installed → uses `DatabaseStorage` (PostgreSQL)
- When database packages are missing → falls back to `MemStorage` (in-memory)

Schema is defined in `/shared/schema.ts`. The storage abstraction layer in `server/storage.ts` handles the automatic switching between implementations.

### Deployment Architecture
Designed for deployment on platforms like Render, supporting Node.js 20.x. The recommended deployment strategy for MVP involves building the client during CI, copying it to `server/public`, and deploying the server as a single service.

**Build Configuration (November 2025)**:
The server build uses esbuild with ES Module format (`--format=esm`) to support top-level await for database connections. Database packages (`drizzle-orm`, `drizzle-zod`, `@neondatabase/serverless`) are marked as external dependencies and not bundled, allowing them to be resolved at runtime where they're installed as npm dependencies in `server/package.json`.

**Production Database Setup (October 2025)**:
The production deployment on Render is now configured to use PostgreSQL for persistent admin user and content storage. When deployed:

1. **Automatic Database Connection**: The application detects `DATABASE_URL` environment variable and automatically uses `DatabaseStorage` (PostgreSQL) instead of in-memory storage
2. **Startup Logging**: Production logs will show `[STORAGE] Using DatabaseStorage (PostgreSQL)` when the database connection is active
3. **Login Authentication**: Admin users are authenticated against the PostgreSQL database, resolving the previous 401 login errors
4. **Data Persistence**: All admin users, content, and attachments persist across server restarts

**Database Package Installation (November 2025)**:
The database packages (`drizzle-orm`, `drizzle-zod`, `@neondatabase/serverless`) are now installed as npm dependencies in `server/package.json`. This means:
- The code can run in both Replit dev and production environments
- Replit dev will use `MemStorage` (in-memory) by default unless `DATABASE_URL` is configured via the `javascript_database` integration
- Production on Render will automatically use `DatabaseStorage` (PostgreSQL) when `DATABASE_URL` is configured

**Development vs Production**:
- **Replit Development**: Database packages are installed. Uses `MemStorage` (in-memory) by default, or `DatabaseStorage` (PostgreSQL) if `DATABASE_URL` is configured via `javascript_database` integration.
- **Production (Render)**: Database packages are installed via npm. Uses `DatabaseStorage` (PostgreSQL) automatically when `DATABASE_URL` environment variable is configured.

**Previous 401 Login Issue (RESOLVED)**:
The production 401 "Invalid credentials" error was caused by the application using in-memory storage instead of PostgreSQL. Production logs showed:
```
[LOGIN] Storage type: MemStorage
[LOGIN] User not found: Essayon6
```

This is now fixed. With the current codebase deployed to production, the logs will show:
```
[STORAGE] Using DatabaseStorage (PostgreSQL)
```

And the "Essayon6" admin user created in the PostgreSQL database will be found and authenticated successfully.

### Authentication & Authorization
The public site requires no authentication. The `/app` route redirects to an external CMIS for authentication. An Admin CMS uses session-based authentication with `bcryptjs` and `express-session` for content management, with default dev credentials `admin`/`admin123`. Content APIs are protected with authentication middleware.

### Contact Form System
Contact form submissions are stored in an in-memory database (MemStorage) and sent via SendGrid email. It features Zod validation, toast feedback, and specific status codes for full success (DB save + email send), partial success (DB save, email fail), and errors.

### Games & Interactive Features
The website includes:
- **Leadership Toolbox Board Game**: An interactive 30-tile board game with human and AI players, card draws, skill building, and a win condition based on points. It features state-driven modal rendering, card queue management, and detailed card history tracking.
- **Leadership Readiness Quiz**: A 10-question self-assessment based on the "5 Ws of Leadership," providing personalized feedback and actionable tips.
- **Leadership Style Quiz**: A 14-question assessment to identify dominant leadership styles from 7 models, providing detailed results and descriptions.

### YouTube Video Embedding
The website supports two methods for embedding YouTube videos in blog posts and tutorials:

**Inline Embedding**: Use `[video:URL]` syntax directly in content body text. The URL can be in any standard YouTube format (youtube.com/watch, youtu.be, embed URLs). The ContentRenderer component automatically parses this syntax and renders responsive video embeds.

**Attachment System**: Content editors can add videos through the admin UI's "YouTube Videos" section. Videos are stored as attachments with optional titles and descriptions, then displayed in a dedicated "Videos" section on the content detail page.

Both methods use the YouTubeEmbed component, which extracts video IDs from various URL formats and renders them in responsive 16:9 aspect ratio containers using iframe embeds. Video parsing is handled by `client/src/lib/youtube.ts`.

## External Dependencies

### Third-Party Services
- **Font Hosting**: Google Fonts CDN (Inter, JetBrains Mono)
- **External Application**: CMIS App (integrated via `APP_URL` environment variable for redirect)
- **Email Service**: SendGrid (for contact form notifications, managed via Replit connector)

### Package Dependencies
- **UI Components**: shadcn/ui ecosystem (`@radix-ui`, `class-variance-authority`, `tailwind-merge`)
- **Client**: `wouter`, `@tanstack/react-query`, `framer-motion`, `lucide-react`, `react-hook-form`
- **Server**: `express`, `helmet`, `cors`, `cookie-parser`, `tsx`, `esbuild`
- **Development Tools**: TypeScript 5.6, Vite 5.4, Tailwind CSS 3.4, `concurrently`

### Environment Configuration
Required variables include `APP_URL`, `SERVER_PORT`, `DATABASE_URL` (future), and `SESSION_SECRET` (future), managed securely via environment variables and not committed to the repository.
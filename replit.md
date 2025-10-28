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
Configured for future PostgreSQL integration using Drizzle ORM, with schema defined in `/shared/schema.ts` and Drizzle Kit for migrations. Currently, no active database connection is required for the public-facing features.

### Deployment Architecture
Designed for deployment on platforms like Render, supporting Node.js 20.x. The recommended deployment strategy for MVP involves building the client during CI, copying it to `server/public`, and deploying the server as a single service.

### Authentication & Authorization
The public site requires no authentication. The `/app` route redirects to an external CMIS for authentication. An Admin CMS uses session-based authentication with `bcryptjs` and `express-session` for content management, with default dev credentials `admin`/`admin123`. Content APIs are protected with authentication middleware.

### Contact Form System
Contact form submissions are stored in an in-memory database (MemStorage) and sent via SendGrid email. It features Zod validation, toast feedback, and specific status codes for full success (DB save + email send), partial success (DB save, email fail), and errors.

### Games & Interactive Features
The website includes:
- **Leadership Toolbox Board Game**: An interactive 30-tile board game with human and AI players, card draws, skill building, and a win condition based on points. It features state-driven modal rendering, card queue management, and detailed card history tracking.
- **Leadership Readiness Quiz**: A 10-question self-assessment based on the "5 Ws of Leadership," providing personalized feedback and actionable tips.
- **Leadership Style Quiz**: A 14-question assessment to identify dominant leadership styles from 7 models, providing detailed results and descriptions.

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
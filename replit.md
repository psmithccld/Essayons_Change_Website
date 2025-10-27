# Essayons Public Website - Replit Guide

## Overview

Essayons Change Management is a monorepo-based public marketing website that combines content presentation with SaaS application integration. The project serves as the public face for a Change Management Information System (CMIS), offering marketing pages, educational content, and a gateway to the main application.

**Purpose**: Public marketing site featuring home, about, pricing, tutorials, blog, and interactive games/quizzes, with a same-domain `/app` route that redirects to the main CMIS application.

**Technology Stack**: TypeScript monorepo using Vite + React + Tailwind CSS (client), Express (server), with future database integration via Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Monorepo Structure

**Design Decision**: Workspace-based monorepo with three primary packages
- **Rationale**: Enables code sharing between client/server while maintaining clear separation of concerns
- **Structure**:
  - `/client` - Vite-powered React SPA with Tailwind CSS
  - `/server` - Express API server (Node 20)
  - `/shared` - Shared TypeScript types and schemas

**Pros**: Type safety across boundaries, single dependency management, simplified development workflow
**Cons**: Requires coordinated builds, larger repository size

### Frontend Architecture

**Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **State Management**: TanStack Query (React Query) for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animation**: Framer Motion for interactive elements

**Design System Approach**: Reference-based design inspired by Notion (content clarity), Linear (typography/spacing), and Stripe (trust/professionalism)
- **Typography**: Inter font family for display/UI, JetBrains Mono for code
- **Component Library**: shadcn/ui "New York" style with custom theme tokens
- **Spacing System**: Tailwind's standard spacing scale (2, 4, 6, 8, 12, 16, 20, 24, 32)

**Build Strategy**: Vite bundles client into `/dist/public`, which Express serves in production

### Backend Architecture

**Framework**: Express.js with TypeScript
- **Purpose**: Minimal API layer for contact forms, status endpoints, and static file serving
- **Development**: tsx for hot-reload during development
- **Production**: esbuild bundles to CommonJS for Node execution

**Key Routes**:
- `/api/status` - Health check endpoint
- `/app` - 302 redirect to external CMIS application (configured via `APP_URL` env var)
- `*` - Serves client SPA build in production

**Security Middleware**:
- Helmet for security headers
- CORS enabled
- Cookie parser for future session handling

### Database Architecture (Future)

**ORM**: Drizzle configured for PostgreSQL
- **Schema Location**: `/shared/schema.ts` for type sharing
- **Migration Strategy**: Drizzle Kit with `/migrations` directory
- **Current State**: Configuration present but no active database connection required

**Design Decision**: Drizzle-ready posture without immediate database dependency
- **Rationale**: Supports rapid prototyping while maintaining migration path for data-driven features
- **Alternative Considered**: Prisma (rejected due to preference for lighter-weight SQL-first approach)

### Deployment Architecture

**Target Platform**: Render (or similar PaaS)
- **Node Version**: 20.x (specified in engines)
- **Environment Variables**: Managed via Render dashboard, not committed to repository

**Deployment Options**:
1. **Single Service** (Recommended for MVP): Build client during CI, copy to `server/public`, deploy server
2. **Separate Services**: Client on static host (Cloudflare Pages/Netlify), server on Render

**Build Process**:
```bash
npm run build  # Builds both workspaces
npm --workspace server run start  # Production server
```

### Authentication & Authorization

**Admin CMS System** (October 2025): Session-based authentication for content management
- **Implementation**: bcryptjs for password hashing, express-session with secure cookies
- **Security**: Same-site strict cookies for CSRF protection, HTTP-only cookies
- **Admin Routes**: `/admin/login`, `/admin/dashboard`, `/admin/content/:id`
- **API Endpoints**: 
  - Authentication: `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`
  - Content CRUD: `/api/admin/content` (protected with requireAuth middleware)
  - Attachments: `/api/admin/attachments` (protected)
  - Public content: `/api/content`, `/api/content/:slug` (no auth required)
- **Default Credentials** (development): username=admin, password=admin123
- **Storage**: In-memory storage (MemStorage) pending drizzle-orm dependency resolution

**Public Site**: No authentication required
- **App Access**: `/app` route redirects to external CMIS application for authentication

## External Dependencies

### Third-Party Services

**Font Hosting**: Google Fonts CDN
- Inter (400, 500, 600, 700, 800 weights)
- JetBrains Mono (400 weight)

**External Application**: CMIS App
- **Integration Point**: `APP_URL` environment variable
- **Purpose**: Main change management application hosted separately
- **Connection**: Client-side redirect via `/app` route

### Package Dependencies

**UI Components**: shadcn/ui ecosystem
- @radix-ui primitives for accessible components
- class-variance-authority for variant management
- tailwind-merge for className composition

**Client Dependencies**:
- react-router-dom, wouter (routing)
- @tanstack/react-query (data fetching)
- framer-motion (animations)
- lucide-react (icons)
- react-hook-form (forms)

**Server Dependencies**:
- express (web framework)
- helmet (security)
- cors (cross-origin)
- cookie-parser (session handling)
- tsx (dev server)
- esbuild (production bundler)

**Development Tools**:
- TypeScript 5.6
- Vite 5.4
- Tailwind CSS 3.4
- concurrently (parallel dev servers)

### Build & Development Tools

**Development Workflow**: `npm run dev` runs client (port 5173) and server (port 3000) concurrently
- Client proxies `/api` and `/app` routes to server during development

**Type Checking**: Shared tsconfig.json with path aliases
- `@/*` → client/src
- `@shared/*` → shared/src
- `@assets/*` → attached_assets

**Production Build**: Client outputs to `dist/public`, server bundles to `dist/index.cjs`

### Environment Configuration

**Required Variables** (see `.env.example`):
- `APP_URL` - URL of main CMIS application (Render deployment)
- `SERVER_PORT` - Express server port (default: 3000)
- `DATABASE_URL` - PostgreSQL connection string (for future use)
- `SESSION_SECRET` - Session encryption key (for future use)

**Security**: No secrets in repository, .env excluded from git, Render dashboard manages production secrets
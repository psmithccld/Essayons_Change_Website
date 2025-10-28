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

## Games & Interactive Features

### Leadership Toolbox Board Game (October 2025)

**Implementation**: Interactive 30-tile board game with human and AI players
- **Technology**: React component with Framer Motion animations
- **Game Rules**:
  - 2-6 players (mix of human and AI)
  - Roll dice to move along 30-tile board
  - Draw cards from 4 categories (Leadership, Communication, Problem-Solving, Well-being)
  - Build 5 skills (Self Awareness, Emotional Intelligence, Communication, Delegation, Strategic Thinking)
  - Win condition: Reach FINISH tile with 15+ points
  - If player reaches FINISH with <15 points, they continue playing

**Recent Updates** (October 2025):
- **State-Driven Modal Rendering**: Refactored from modal-as-React-node pattern to state-driven rendering to eliminate closure stale-state issues
- **Multi-Card Draw Fix**: Cards that draw multiple cards (e.g., "Draw 2 Cards") now show all cards sequentially to the current player
- **Card Queue Management**: New cards drawn by queued cards append to queue instead of replacing it, preventing card loss
- **Win Condition Enforcement**: Game now properly stops when a player wins (≥15 points at FINISH), preventing further turns
- **Game State Reset**: Starting a new game after someone wins now properly resets all state (winner, cardQueue, rolled, etc.)
- **Modal Opacity Enhancement**: Changed modal background to use inline styles with dark overlay (rgba(0, 0, 0, 0.6)) and Tailwind bg-card for content, ensuring optimal readability
- **Board Layout Redesign**: Changed from grid layout to box-shaped perimeter path with 30 tiles flowing sequentially around rectangular border (top: 0-9, right: 10-14, bottom: 15-24, left: 25-29) with card deck information displayed in center area

**Technical Architecture**:
- **State Management**: useState for game state, useEffect for AI auto-play and card queue processing
- **Card Queue**: Sequential card processing via `currentCard` state and `cardQueue` array
- **AI Behavior**: Automated turn-taking with 1.5-second think delay, auto-closes most cards except win modal
- **Modal System**: State-driven rendering prevents closure stale-state bugs

**File Location**: `client/src/components/LeadershipToolboxGame.tsx`

### Leadership Readiness Quiz (October 2025)

**Implementation**: 10-question self-assessment based on the 5 Ws of Leadership
- **Technology**: React component with shadcn/ui (Button, Card, Progress)
- **Assessment Structure**:
  - 10 questions across 5 categories: WHO, WHAT, WHEN, WHERE, WHY
  - 2 questions per category
  - Rating scale: 1 (Strongly Disagree) to 5 (Strongly Agree)
  - Real-time progress tracking with visual progress bar
  - Results calculation and personalized feedback

**Features**:
- **Progress Tracking**: Visual progress bar showing completion percentage
- **Interactive Rating**: Clear selection feedback with filled background and ring effect
- **Results Dashboard**: 
  - Overall readiness score (average of all categories)
  - Individual category scores with progress bars
  - Tiered feedback (High ≥4.2, Medium ≥3.2, Low <3.2)
  - Actionable tips for each dimension
- **Reset Functionality**: Option to retake the quiz
- **Responsive Design**: Works on mobile and desktop

**The 5 Ws Framework**:
1. **WHO** - People & Stakeholders: Understanding team members and stakeholders
2. **WHAT** - Outcomes & Intent: Defining clear success criteria
3. **WHEN** - Cadence & Timing: Managing milestones and decision gates
4. **WHERE** - Channels & Environment: Creating effective communication channels
5. **WHY** - Purpose & Meaning: Expressing purpose and commander's intent

**File Location**: `client/src/components/LeadershipReadinessQuiz.tsx`
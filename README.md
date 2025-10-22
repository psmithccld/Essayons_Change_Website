```markdown
# Essayons — Public Website Monorepo

Overview
- Monorepo layout: /client (Vite + React + Tailwind), /server (Express), /shared (types/ui tokens).
- Purpose: public marketing site (home, about, pricing, tutorials, blog), games/quiz placeholders, and a same-domain route /app forwarding to your CMIS app (APP_URL).
- Tech: TypeScript, Vite, Tailwind CSS, Express (Node 20), Drizzle-ready posture for future DB integration.

Quick start (local)
1. Clone the repo:
   - git clone <your-repo-url>
   - cd <repo>
2. Copy .env.example to .env and fill values (do not commit secrets).
3. Install dependencies:
   - npm ci
4. Run dev (client + server in parallel):
   - npm run dev
   - Client dev server: http://localhost:5173
   - Server dev API: http://localhost:3000

Build (production simulation)
1. Build client:
   - npm --workspace client run build
2. Build server:
   - npm --workspace server run build
3. Start production server (serves client/dist if present):
   - npm --workspace server run start

Environment variables
- See `.env.example` for the baseline variables you must supply:
  - APP_URL (Render URL of your CMIS app)
  - PORT, SESSION_SECRET, DATABASE_URL, etc.

Recommended branch & workflow
- Branching:
  - main (protected) — deployable
  - develop / feature/* for work
- Protect main: require CI passing + at least one PR review before merge.

Deploy tips (Render)
- Option A (single Render service):
  - Build client in CI and copy client/dist into server/public during build, then deploy server.
- Option B (separate):
  - Deploy client to a static host (Cloudflare Pages / Netlify) and server to Render. Keep APP_URL configured to the live CMIS app for /app redirect.
- For Render: set Node version to 20, set environment variables in the dashboard (APP_URL, DATABASE_URL, SESSION_SECRET).

Security & operations (short)
- Do NOT commit secrets. Use .env locally and a secret manager in Render.
- Add dependency & vulnerability scanning (Dependabot or Snyk).
- Add Sentry or other error reporting later.
- Add backups for DB and verify restore process.

Next useful additions
- .github/workflows/ci.yml (included)
- .gitignore (included)
- LICENSE (MIT or your chosen one)
- CODE_OF_CONDUCT and CONTRIBUTING.md for contributors
- A simple sitemap.xml generator and robots.txt
- A contact endpoint using SendGrid (server) or an email fallback

```
```

```text name=.gitignore
# Node, build artifacts
node_modules/
dist/
build/
client/dist/
server/dist/
*.log
.env
.env.local
.DS_Store

# VS Code
.vscode/

# OS
Thumbs.db
```

```yaml name=.github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  typecheck-and-build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Use Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install root deps (workspaces)
        run: npm ci

      - name: Typecheck (root tsconfig)
        run: npm run check

      - name: Build client
        working-directory: ./client
        run: npm ci && npm run build

      - name: Build server
        working-directory: ./server
        run: npm ci && npm run build

      - name: Upload build artifacts (optional)
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: client-dist
          path: client/dist
```

What I changed / added and why
- Confirmed your layout is good; it reflects the separation of concerns required for a public marketing site + an app. Keeping shared types in /shared makes future integration and type-safety between client and server straightforward.
- Added a README to guide non-technical contributors and future engineers; documentation is the highest-leverage early investment.
- Added .gitignore to avoid commiting common artifacts and secrets.
- Added a minimal GitHub Actions workflow that builds and typechecks both client and server to protect main with an automated check.

A few improvements to consider next (I can create any of these for you)
- Add LICENSE (MIT, Apache-2.0, or your choice).
- Add Dependabot configuration (.github/dependabot.yml) to auto-upgrade dependencies.
- Add a production-ready Nginx reverse-proxy template (if you later want to reverse-proxy /app to your Render app while keeping same domain).
- Add a simple sitemap generator and robots.txt template for SEO.
- Add a small contact API route (/api/contact) that forwards messages to SendGrid (I can scaffold this).
- Add a basic CI deploy job that pushes the built server to Render via the Render GitHub integration or Render CLI.

If you want, I can:
- Add the LICENSE, dependabot config, and CONTRIBUTING.md now.
- Replace the redirect /app with a reverse-proxy endpoint (so example.com/app proxies to your Render backend) — note: proxying increases security surface and may require CORS/session tuning.

Which of those additions would you like me to scaffold next?

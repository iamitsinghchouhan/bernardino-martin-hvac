# BERNARDINO MARTIN — Heating • Air Conditioning • Solar

## Overview

This is a full-stack business website for **BERNARDINO MARTIN — Heating • Air Conditioning • Solar** — a local HVAC, solar, and plumbing services company in Los Angeles. The application provides service booking, contact forms, invoice management, online payment lookup, a customer dashboard, and an interactive service area map. It's a React + Express monorepo with PostgreSQL for data persistence.

## Brand Guidelines
- **Official Name:** BERNARDINO MARTIN (all caps)
- **Tagline:** Heating • Air Conditioning • Solar (with bullet separators)
- **Full Format:** BERNARDINO MARTIN / Heating • Air Conditioning • Solar
- **Colors:** Blue (primary) and Green (secondary/accents)
- **Hero Section:** Video background with 3 rotating AI-generated clips (HVAC, solar, plumbing)
- **Video Files:** `/public/videos/hvac_repair_outdoor.mp4`, `solar_panel_install.mp4`, `plumbing_copper_pipes.mp4`

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Monorepo Structure
The project follows a three-directory monorepo pattern:
- **`client/`** — React frontend (SPA)
- **`server/`** — Express.js backend (API server, enterprise-grade modular architecture)
- **`shared/`** — Shared TypeScript types and database schema (used by both client and server)

### Backend Module Architecture (`server/`)
```
server/
├── index.ts              # App entry point, middleware chain, server startup
├── db.ts                 # PostgreSQL pool + Drizzle ORM connection
├── logger.ts             # Pino structured logger
├── storage.ts            # IStorage interface + DatabaseStorage class
├── static.ts             # Production static file serving with cache headers
├── vite.ts               # Dev server Vite integration
├── backup.ts             # Database backup system (daily scheduled + manual)
├── reminder-engine.ts    # Automated booking reminder scheduling
├── routes.ts             # Route registration (thin — delegates to controllers)
├── middleware/
│   ├── auth.ts           # requireAdmin session middleware
│   ├── error-handler.ts  # Centralized error handler with structured responses
│   ├── rate-limit.ts     # Rate limiters (global, login, form, payment)
│   └── sanitize.ts       # XSS/injection input sanitization
├── controllers/
│   ├── admin.ts          # Admin login, stats, CRUD operations
│   ├── bookings.ts       # Booking create/list
│   ├── contacts.ts       # Contact form submission
│   ├── health.ts         # /health endpoint
│   ├── invoices.ts       # Invoice lookup/payment
│   ├── quotes.ts         # Quote request submission
│   └── reminders.ts      # Reminder queries
└── utils/
    └── errors.ts         # AppError class + error codes
```

### Frontend (`client/src/`)
- **Framework:** React with TypeScript
- **Routing:** Wouter (lightweight client-side router)
- **State/Data Fetching:** TanStack React Query for server state management
- **UI Components:** shadcn/ui component library (New York style) built on Radix UI primitives
- **Styling:** Tailwind CSS v4 with CSS variables for theming, custom fonts (Inter + Outfit via Google Fonts)
- **Map:** Leaflet + react-leaflet for the interactive service areas map
- **Build Tool:** Vite with manual chunk splitting (vendor-react, vendor-ui, vendor-maps, vendor-charts, vendor-forms)
- **Code Splitting:** React.lazy() for all pages except Home; ProjectGallery lazy-loaded within Home
- **Image Optimization:** WebP format, lazy loading with `decoding="async"`, hero video preloaded

**Pages:**
- Home (hero, promos, services overview, project gallery)
- About
- Services (full service listing)
- Service Areas (interactive Leaflet map with LA-area cities)
- Contact (form submits to `/api/contact`)
- Booking (appointment scheduling form submits to `/api/bookings`)
- Payment (invoice lookup and payment flow)
- Dashboard (customer portal — lookup by email to see invoices/bookings)
- Admin Login (`/admin/login` — password-based admin authentication)
- Admin Dashboard (`/admin` — tabbed panel: overview stats, appointments management, invoices CRUD, contact messages, reminders)

### Security Stack
- **Helmet:** CSP, XSS protection, frameguard, referrer policy, hides X-Powered-By
- **Rate Limiting:** express-rate-limit on all API routes (global: 100/15min), stricter for login (5/15min), forms (10/15min), payments (10/15min)
- **Input Sanitization:** Global middleware strips HTML tags from all request bodies and query params
- **Request Validation:** Zod schemas with `.trim()`, `.email()`, min/max length constraints on all form fields
- **Session Cookies:** httpOnly, secure (production), sameSite=strict, 24h expiry
- **HTTPS Redirect:** Production traffic redirected to HTTPS
- **Admin Protection:** Session-based auth with `requireAdmin` middleware on all admin routes
- **Structured Errors:** All API errors return `{ success: false, message, errorCode }` format

### API Routes
- `GET /health` — Server health check (uptime, database status)
- `POST /api/bookings` — Create a service booking (rate limited)
- `GET /api/bookings` — List bookings (optionally filtered by email)
- `POST /api/contact` — Submit a contact message (rate limited)
- `POST /api/quotes` — Submit a quote request (rate limited)
- `GET /api/invoices/lookup` — Look up invoices by email or invoice number
- `POST /api/invoices/:invoiceNumber/pay` — Mark invoice as paid (rate limited)
- `GET /api/reminders` — Get reminders by email
- `GET /api/reminders/pending` — Get all pending reminders
- **Admin Routes** (all require session auth):
  - `POST /api/admin/login` — Admin login (strict rate limit: 5/15min)
  - `POST /api/admin/logout` — Admin logout
  - `GET /api/admin/me` — Check admin auth status
  - `GET /api/admin/stats` — Dashboard statistics
  - `GET /api/admin/bookings` — All bookings
  - `PATCH /api/admin/bookings/:id/status` — Update booking status
  - `GET /api/admin/invoices` — All invoices
  - `POST /api/admin/invoices` — Create new invoice
  - `GET /api/admin/contacts` — All contact messages
  - `GET /api/admin/reminders` — All reminders
  - `GET /api/admin/quotes` — All quote requests
  - `POST /api/admin/backup` — Manual database backup trigger

### Database
- **Database:** PostgreSQL (required — `DATABASE_URL` environment variable must be set)
- **ORM:** Drizzle ORM with `drizzle-orm/node-postgres` driver
- **Schema Location:** `shared/schema.ts`
- **Migrations:** Managed via `drizzle-kit push` (schema-push approach)
- **Connection:** `pg.Pool` in `server/db.ts` with SSL (`rejectUnauthorized: false`, auto-appends `sslmode=no-verify` if missing)
- **Tables:** bookings, contact_messages, invoices, reminders, quotes, session

### Database Backup System
- **Location:** `server/backup.ts`
- **Schedule:** Automatic daily backups via setInterval
- **Manual:** `POST /api/admin/backup` (admin-only)
- **Format:** Compressed SQL dumps (`backup-YYYY-MM-DD-HHmmss.sql.gz`) in `backups/` directory
- **Retention:** Keeps last 7 backups, auto-deletes older ones
- **Logging:** Success/failure events logged via Pino

### Reminder Engine
- `server/reminder-engine.ts` handles automated appointment reminders
- When a booking is created, 24-hour (email) and 1-hour (SMS) reminders are auto-scheduled
- Background engine checks for pending reminders every 60 seconds
- Currently logs reminders (ready for SendGrid/Twilio integration)

### Logging
- **Logger:** Pino structured logger (`server/logger.ts`)
- **Dev mode:** Pretty-printed with colors via pino-pretty
- **Production mode:** JSON-structured logs for deployment analysis
- All API routes, reminders, backups, and errors use structured logging with context fields

### Performance Optimizations
- **Compression:** gzip/brotli via `compression` middleware
- **Static Caching:** Hashed assets cached for 1 year (immutable), HTML never cached
- **Code Splitting:** Vite manualChunks for vendor libraries (React, UI, maps, charts, forms)
- **Lazy Loading:** React.lazy() for all routes except Home; images use `loading="lazy"` + `decoding="async"`
- **Font Optimization:** Google Fonts preloaded with `font-display: swap`, non-render-blocking
- **Video Preloading:** Hero video preloaded in HTML head
- **Image Formats:** WebP across all images

### Build Pipeline
- **Dev:** `tsx server/index.ts` runs Express with Vite middleware for HMR
- **Build:** Custom `script/build.ts` runs Vite build (client) then esbuild (server)
- **Production:** `node dist/index.cjs` serves built static files + API
- **Allowlisted deps:** compression, helmet, express-rate-limit, pino, and others bundled for faster cold starts

## Environment Variables

### Required
- `DATABASE_URL` — PostgreSQL connection string (server won't start without it)

### Recommended
- `SESSION_SECRET` — Session signing key (random in dev; production logs warning if missing)
- `ADMIN_PASSWORD` — Password for admin panel login

### Optional
- `STRIPE_SECRET_KEY` — Stripe payment integration
- `PORT` — Server port (default: 5000)
- `NODE_ENV` — `development` or `production`

## External Dependencies

### Frontend Libraries
- **Leaflet** — Interactive maps for service area visualization
- **Google Fonts** — Inter and Outfit font families
- **Radix UI** — Headless UI primitives
- **Embla Carousel** — Carousel/slider component
- **Recharts** — Chart components
- **Framer Motion** — Animations

### Communication Integrations
- **WhatsApp** — Deep links with business phone `18184000227`
- **Phone** — Click-to-call links `(818) 400-0227`

### Build/Dev Tooling
- **Vite** — Frontend build tool with HMR
- **esbuild** — Server bundler for production
- **Drizzle Kit** — Database schema management
- **tsx** — TypeScript execution for development

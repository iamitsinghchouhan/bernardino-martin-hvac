# Bernardino Martin HVAC - Business Website

## Overview

This is a full-stack business website for **BERNARDINO MARTIN'S Heating Air Conditioning, Solar** — a local HVAC, solar, and plumbing services company in Los Angeles. The application provides service booking, contact forms, invoice management, online payment lookup, a customer dashboard, and an interactive service area map. It's a React + Express monorepo with PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Monorepo Structure
The project follows a three-directory monorepo pattern:
- **`client/`** — React frontend (SPA)
- **`server/`** — Express.js backend (API server)
- **`shared/`** — Shared TypeScript types and database schema (used by both client and server)

### Frontend (`client/src/`)
- **Framework:** React with TypeScript
- **Routing:** Wouter (lightweight client-side router)
- **State/Data Fetching:** TanStack React Query for server state management
- **UI Components:** shadcn/ui component library (New York style) built on Radix UI primitives
- **Styling:** Tailwind CSS v4 with CSS variables for theming, custom fonts (Inter + Outfit via Google Fonts)
- **Map:** Leaflet + react-leaflet for the interactive service areas map
- **Build Tool:** Vite

**Pages:**
- Home (hero, promos, services overview, project gallery)
- About
- Services (full service listing)
- Service Areas (interactive Leaflet map with LA-area cities)
- Contact (form submits to `/api/contact`)
- Booking (appointment scheduling form submits to `/api/bookings`)
- Payment (invoice lookup and payment flow)
- Dashboard (customer portal — lookup by email to see invoices/bookings)

**Key Client Patterns:**
- `apiRequest()` utility in `lib/queryClient.ts` handles all API calls with JSON content type and credentials
- `SEO` component dynamically updates document title, meta tags, and canonical URLs
- `Layout` component provides consistent header (with emergency banner, trust bar, navigation) and footer
- `ChatWidget` provides a bot-style quick-action chat overlay

### Backend (`server/`)
- **Framework:** Express.js on Node.js
- **Language:** TypeScript, compiled with tsx (dev) and esbuild (production)
- **API Pattern:** RESTful JSON API under `/api/` prefix
- **Dev Server:** Vite dev server middleware is integrated for HMR during development (`server/vite.ts`)
- **Production:** Static files served from `dist/public` (`server/static.ts`)

**API Routes (in `server/routes.ts`):**
- `POST /api/bookings` — Create a service booking
- `GET /api/bookings` — List bookings (optionally filtered by email query param)
- `POST /api/contact` — Submit a contact message
- `GET /api/invoices/lookup` — Look up invoices by email or invoice number
- Invoice creation and payment marking endpoints (in storage layer)

**Request Validation:** Zod schemas (generated via `drizzle-zod` from the DB schema) validate all incoming POST data.

### Database
- **Database:** PostgreSQL (required — `DATABASE_URL` environment variable must be set)
- **ORM:** Drizzle ORM with `drizzle-orm/node-postgres` driver
- **Schema Location:** `shared/schema.ts`
- **Migrations:** Managed via `drizzle-kit push` (schema-push approach, no migration files needed in dev)
- **Connection:** `pg.Pool` in `server/db.ts`

**Database Tables:**
1. **`bookings`** — Service appointment requests (service details, customer info, preferred date, status)
2. **`contact_messages`** — Contact form submissions (name, phone, email, message)
3. **`invoices`** — Customer invoices (invoice number, customer info, amount in cents, status, due date, paid timestamp)
4. **`reminders`** — Automated appointment reminders (booking reference, customer info, reminder type, channel, scheduled time, sent status)

### Reminder Engine
- `server/reminder-engine.ts` handles automated appointment reminders
- When a booking is created, 24-hour (email) and 1-hour (SMS) reminders are auto-scheduled
- Background engine checks for pending reminders every 60 seconds and processes them
- Currently logs reminders to console (ready for SendGrid/Twilio integration)
- API: `GET /api/reminders?email=xxx` returns reminders for a customer
- Dashboard shows reminder status cards with channel type and delivery status

### Storage Layer
- `server/storage.ts` implements `IStorage` interface with `DatabaseStorage` class
- All database operations go through this layer, making it easy to swap implementations
- Uses Drizzle query builder with proper ordering (descending by creation date)

### Build Pipeline
- **Dev:** `tsx server/index.ts` runs the Express server which loads Vite middleware for the frontend
- **Build:** Custom `script/build.ts` runs Vite build for client, then esbuild for server bundling
- **Production:** `node dist/index.cjs` serves the built static files + API
- Server dependencies are selectively bundled (allowlist in build script) to reduce cold start times

### SEO & Meta
- Custom `SEO` component for per-page meta tags
- Custom Vite plugin (`vite-plugin-meta-images.ts`) updates OpenGraph/Twitter image meta tags at build time
- Canonical URL support

## External Dependencies

### Required Services
- **PostgreSQL Database** — Required. Set `DATABASE_URL` environment variable. Used for all persistent data (bookings, contacts, invoices).

### Frontend Libraries
- **Leaflet** — Interactive maps for service area visualization (loaded from CDN for marker icons)
- **Google Fonts** — Inter and Outfit font families
- **Radix UI** — Headless UI primitives (dialog, dropdown, tabs, etc.)
- **Embla Carousel** — Carousel/slider component
- **Recharts** — Chart components (available but may not be actively used on all pages)

### Communication Integrations
- **WhatsApp** — Deep links to WhatsApp for customer communication (configured with business phone number `18183563468`)
- **Phone** — Click-to-call links using company phone `(818) 356-3468`

### Build/Dev Tooling
- **Vite** — Frontend build tool with HMR
- **esbuild** — Server bundler for production builds
- **Drizzle Kit** — Database schema management
- **tsx** — TypeScript execution for development
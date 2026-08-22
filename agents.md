# GlobeTrotter Project Rules & Guidelines

This file serves as a reference for the Antigravity agent when working on the GlobeTrotter project.

## 🎨 Theme System

**Theme Logic**
- Toggle: `toggleTheme()` flips `isDark` boolean
- Persistence: `localStorage` key: `'theme'` (`'dark'` | `'light'`)
- Default: OS preference via `prefers-color-scheme: dark`
- Applied via: `data-theme="dark/light"` attribute + `dark` class on `<html>`
- Exposed: `useTheme()` hook → `{ isDark, toggleTheme }`

**🌞 Light Theme — Warm White + Terracotta**
- `--bg-page`: `#FBF8F4` (Main page background)
- `--bg-surface`: `#F4EEE5` (Cards, panels)
- `--color-primary`: `#C1440E` (Buttons, links, accents)
- `--color-primary-hover`: `#A83A0C` (Primary hover state)
- `--color-primary-text-on`: `#FFFFFF` (Text on primary bg)
- `--color-secondary`: `#EDE4DD` (Secondary surfaces)
- `--text-primary`: `#1C1917` (Main body text)
- `--text-secondary`: `#78716C` (Muted/helper text)
- `--border`: `#E7E1DB` (Default borders)
- `--border-strong`: `#D8CCC0` (Emphasized borders)
- `--accent-bg`: `#DCFCE7` (Success/ready badge bg)
- `--accent-text`: `#166534` (Success/ready badge text)
- `--danger-bg`: `#FEE2E2` (Error badge bg)
- `--danger-text`: `#991B1B` (Error badge text)
- `--warning-bg`: `#FEF3C7` (Warning badge bg)
- `--warning-text`: `#92400E` (Warning badge text)

**🌑 Dark Theme — Grayish Black + Copper**
- `--bg-page`: `#000000` (Main page background)
- `--bg-surface`: `#171A1F` (Cards, panels)
- `--color-primary`: `#D1824E` (Buttons, links, accents)
- `--color-primary-hover`: `#E29562` (Primary hover state)
- `--color-primary-text-on`: `#FFFFFF` (Text on primary bg)
- `--color-secondary`: `#262930` (Secondary surfaces)
- `--text-primary`: `#F1F5F9` (Main body text)
- `--text-secondary`: `#94A3B8` (Muted/helper text)
- `--border`: `#202329` (Default borders)
- `--border-strong`: `#222429` (Emphasized borders)
- `--accent-bg`: `#14281E` (Success/ready badge bg)
- `--accent-text`: `#4ADE80` (Success/ready badge text)
- `--danger-bg`: `#2E1515` (Error badge bg)
- `--danger-text`: `#F87171` (Error badge text)
- `--warning-bg`: `#2A1E0E` (Warning badge bg)
- `--warning-text`: `#FBBF24` (Warning badge text)

**🖋️ Typography & Scrollbar**
- Font: Inter (sans-serif)
- Scrollbar width: 6px
- Scrollbar track: `var(--bg-page)`
- Scrollbar thumb: `var(--border-strong)` → hover: `var(--color-primary)`

---

## 🛠️ Development Guidelines

**Must Have**
- Use real-time or dynamic data sources, and avoid relying on static JSON unless it’s for initial prototyping.
- Create a responsive and clean UI (Consistent color scheme and layout).
- Validate user input robustly.
- Use intuitive navigation with proper menu placement and spacing.
- Use version control (Git) properly; one member managing the repo is not enough.

**Nice to Have**
- Ability to design backend APIs, model data, and set up a local database.
- Understand AI/code snippets thoroughly before using them; don't blindly copy-paste without adapting them to your project.
- Plan for offline or local solutions and don’t rely entirely on internet connectivity or cloud-based tools.
- Use trendy technologies only if they add real value to your project.

---

## 🌍 GlobeTrotter Requirements

### 1. Main Idea
**GlobeTrotter** is a personalized and intelligent **travel planning application** that helps users easily plan, organize, visualize, and share their trips.
- Personalized travel planning
- Explore destinations and activities
- Create structured itineraries
- Manage travel costs
- Share trips with friends/community
- Make travel planning interactive and easy

### 2. Main Objectives
- Create **multi-city trips**
- Add travel stops and durations
- Assign **dates and activities**
- Search for cities and destinations
- Estimate the **trip budget**
- View trips using calendars/timelines
- Share travel plans publicly or with friends
- Manage personal travel information 

### 3. Important Screens & Features
1. **Login / Signup**: Email & password, basic validation, forgot password.
2. **Dashboard / Home**: Welcome message, recent trips, Plan New Trip, recommended destinations, budget highlights.
3. **Create Trip**: Trip name, start/end dates, description, optional cover photo.
4. **My Trips**: List all trips, date ranges, number of destinations, view/edit/delete.
5. **Itinerary Builder**: Add stops, select cities/dates, add activities, reorder cities, create day-wise plans.
6. **Itinerary View**: Day-wise, city-wise, timeline, calendar/list view, activities with time and cost.
7. **City Search**: Search cities, country info, cost index, popularity, add to trip, filter by region.
8. **Activity Search**: Sightseeing, food tours, adventure. Filter by type/cost/duration, add/remove, description/images.
9. **Trip Budget & Cost Breakdown**: Estimated total cost (Transport, Stay, Activities, Meals), pie/bar charts, avg cost per day, over-budget alerts.
10. **Trip Calendar / Timeline**: Visualize journey, expandable days, drag-and-drop reordering, quick edit.
11. **Shared/Public Itinerary**: Public URL, trip summary, Copy Trip, social sharing, read-only view.
12. **User Profile / Settings**: Manage name, photo, email, language, saved destinations, delete account, privacy.
13. **Admin Dashboard (Optional)**: Monitor trips, popular cities/activities, user engagement, tables and charts.

### 4. Core Modules & User Flow
**Core Modules (Prioritized)**
1. User Authentication
2. Dashboard
3. Create Trip
4. My Trips
5. Itinerary Builder
6. City Search
7. Activity Search
8. Budget Calculation
9. Calendar/Timeline
10. Share Trip
11. User Profile
12. Admin Dashboard (Optional)

**User Flow**
Signup/Login → Dashboard → Create Trip → Add Cities → Add Activities → Set Dates → Calculate Budget → View Calendar/Itinerary → Save → Share Trip

**Data Model Note**
Use a **relational database** to store users, itineraries, stops, activities, and estimated expenses.

> **GlobeTrotter is a complete travel-planning platform where users can create multi-city trips, add activities, manage dates and budgets, visualize itineraries, and share their travel plans.**

---

## 🏗️ Current Tech Stack & Architecture

- **Frontend**: React 19 (Vite), `react-router-dom` for routing, `lucide-react` for icons.
- **Backend**: Node.js, Express.
- **Authentication**: Role-based auth (`Admin`, `Traveler`, `Guide`). Managed via `AuthContext.jsx`. Login logic assigns roles based on email (contains 'admin' → Admin, 'guide' → Guide, else → Traveler).
- **Styling**: Vanilla CSS (`index.css`) with CSS variables for theming. Managed globally via `ThemeContext.jsx`.

### Route Map
| Path | Access | Component |
|---|---|---|
| `/login` | Public (no Navbar) | `Login.jsx` |
| `/register` | Public (no Navbar) | `Register.jsx` |
| `/forgot-password` | Public (no Navbar) | `ForgotPassword.jsx` |
| `/dashboard` | Protected (any logged-in user) | `UserDashboard.jsx` |
| `/admin` | Protected (Admin role only) | `AdminDashboard.jsx` |

### Key Files
| File | Purpose |
|---|---|
| `src/App.jsx` | Router, layout, auth/theme providers |
| `src/context/AuthContext.jsx` | User state, login(), logout() |
| `src/context/ThemeContext.jsx` | Dark/light mode toggle |
| `src/components/ProtectedRoute.jsx` | Auth + role guard for routes |
| `src/components/Navbar.jsx` | Role-aware navigation (hidden on auth pages) |
| `src/pages/UserDashboard.jsx` | Dashboard for Traveler/Guide roles |
| `src/components/AdminDashboard.jsx` | Full analytics dashboard for Admin |

---

## 🤖 Agent Instructions

**IMPORTANT FOR ALL AGENTS**: 
- **Always** keep this `agents.md` file updated. Whenever you make architectural changes, add new technologies to the stack, or modify the core functionality, reflect those changes in this document.
- **Always** check and use this file as the ultimate source of truth for the project's state, theme, and rules. Before implementing major features, consult this file.
- Use this file as a **restore point and continuous logbook** for project state, tech stack, and changes made.
- Log every meaningful change, architectural decision, and current status in the **Logbook & Restore Points** section below after completing tasks.

---

## 📝 Logbook & Restore Points

### [2026-08-22] - Initial Repository Baseline & Push to Main
- **Tech Stack Status**:### [2026-08-22] - Booking History, Barcodes & QR Codes, About Us, Contact Us, and Cab & Train Booking Engine
- **Barcodes & QR Code Engine ([`BarcodeGenerator.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/BarcodeGenerator.jsx))**:
  - `FlightBarcode`: 1D Code-128 styled aviation barcode SVG with E-Ticket numbers (`ETKT 098-XXXXXXXXXX`), PNR, seat assignments, terminal gates, and kiosk scan validation.
  - `HotelCheckinQRCode`: 2D QR matrix with center hotel icon, confirmation ID (`HTL-CONF-XXX-XXXX`), guest name, room tier, check-in/out dates, and instant verification badge.
- **Upgraded E-Ticket & Voucher Modal ([`BookingVoucherModal.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/BookingVoucherModal.jsx))**:
  - Displays authentic E-Ticket numbers, seat numbers, gate details, and 1D barcodes on every flight leg.
  - Displays scannable front-desk QR codes on every hotel stay.
  - Added interactive view tabs: *Full Itinerary & Passes*, *Flight Barcodes*, *Hotel QR Check-Ins*.
- **Trip & Booking History Page ([`HistoryView.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/pages/HistoryView.jsx))**:
  - Filtering by *All Journeys*, *Confirmed & Upcoming*, *Completed Stays*.
  - Route steppers (`DEL ➔ DXB ➔ CDG ➔ FCO`), PNR, passenger info, paid totals, and 1-click launch of `BookingVoucherModal` with all barcodes and QR check-in passes.
- **About Us Page ([`AboutUs.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/pages/AboutUs.jsx))**:
  - Hero quote section, 4 platform key milestones (`150k+ Journeys`, `19+ Hubs`, `4.98 Rating`), 4-step MakeMyTrip Multi-Stop blueprint, and leadership team cards.
- **Contact Us & Support Ticketing Page ([`ContactUs.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/pages/ContactUs.jsx))**:
  - Interactive support ticket form with category selection, priority selector, and instant generated support ticket ID (`TKT-XXXXX`).
  - Global office cards (New Delhi HQ, Dubai Hub, Paris Office), 24/7 hotline/WhatsApp concierge, and interactive FAQ accordion.
- **Cab & Train Booking Feature ([`multiStopData.js`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/data/multiStopData.js), [`MultiStopSearchWidget.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/MultiStopSearchWidget.jsx), [`MultiStopResultsView.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/MultiStopResultsView.jsx))**:
  - Transport mode selector per leg (`✈️ Flight`, `🚆 Express & Bullet Train`, `🚖 Airport & Intercity Cab`).
  - Datasets for high-speed trains (Vande Bharat, Eurostar, Shinkansen Nozomi, Rajdhani) and cabs (Airport Sedan, Outstation SUV, Mercedes Executive Chauffeur).
  - Dedicated result cards for flight, train, and cab transfers with custom timings, seating/vehicle options, and fare calculation.
- **Navigation & Routing ([`Navbar.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/Navbar.jsx), [`App.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/App.jsx))**:
  - Registered `/history`, `/about`, and `/contact` routes.
  - Updated header navbar buttons and footer links for quick navigation across all pages.
Frontend: React 19 (Vite), Lucide React, Custom Dark/Light theme system via `ThemeContext.jsx` & `index.css`.
  - Backend: Node.js & Express API with modular auth routes (`backend/routes/auth.js`).
  - Auth & Admin: Role-based authentication modal (`Login.jsx`, `Register.jsx`, `ForgotPassword.jsx`), Admin Dashboard (`AdminDashboard.jsx`), and Trip/User modals.
- **Git Action**: Staged all current modifications, untracked files (`agents.md`, `backend/`, `frontend/`), committed, and pushed to `origin/main`.
- **Restore Point ID**: Commit `ac9ce22` on `origin/main`.

### [2026-08-22] - Auth Page Revamp + Role-Based Dashboard
- **Auth Pages**: Login & Register redesigned as a single 50/50 split-card. Left = form, Right = Rive animation (`travel-animation.riv`). No Navbar on auth pages.
- **Rive Animation**: `RiveAnimation.jsx` uses `@rive-app/react-canvas` with `Fit.Contain` + `Alignment.Center`. Dark mode: `invert(1) hue-rotate(180deg)` + `mix-blend-mode: screen` to remove baked-in white background cleanly.
- **Caveat Font**: Added Google Fonts `Caveat` (handwritten/casual) for animation panel taglines on auth pages.
- **Theme Button**: Floating, borderless, top-right on ALL pages including auth.
- **UserDashboard.jsx** refactored into three role-specific views:
  - `TravelerDashboard`: Casual, vibrant. Full hero image (`/traveler-hero.png` = VW van coastal sunset). Caveat font for headings. Emoji quick-action cards. Inspiration card grid.
  - `GuideDashboard`: Semi-formal. Structured card grid for Clients/Tours/Schedule/Reviews.
  - Admin: Handled by separate `AdminDashboard.jsx` via `/admin` route.
- **Hero Image**: `traveler-hero.png` copied to `frontend/public/` (light theme). Dark theme image pending user upload.
- **New CSS**: `.rive-container` class, dark mode blend mode, Caveat imported in `index.css`.

### [2026-08-22] - Traveler Header Redesign for Day/Night Background Harmony
- **Glassmorphic Translucent Navbar**: Replaced opaque navbar with `.glass-navbar` (`backdrop-filter: blur(20px)`, `rgba(251, 248, 244, 0.75)` in light mode, `rgba(12, 14, 18, 0.78)` in dark mode, ambient glow effects on logo, hover transitions, and rounded pill badges).
- **Redesigned Traveler Hero Header ([`UserDashboard.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/pages/UserDashboard.jsx))**:
  - `.traveler-hero-banner` with frosted glassmorphism, responsive ambient light halo (`.hero-glow-ambient`).
  - Dynamic Day/Night theme mode badges (Sun/Moon status indicator).
  - Adaptive headline & handwritten editorial quote (Caveat font) aligning with golden sunset vs moonlit starry coastal drive.
  - Floating metric pills (Active Trips, Saved Routes, AI Planner) and glowing primary CTA.

### [2026-08-22] - MakeMyTrip-Style Multi-Stop & Multi-City Journey Engine
- **MakeMyTrip Dynamic Multi-Stop Search Widget ([`MultiStopSearchWidget.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/MultiStopSearchWidget.jsx))**:
  - Dynamic stop legs builder with "+ Add Another City / Stop" (supporting 2 to 6+ stops), city swap (⇄), and individual stop removal.
  - Autocomplete searchable modal for 19+ domestic & international airports (DEL, BOM, BLR, GOI, DXB, CDG, FCO, LHR, ZRH, SIN, BKK, HKT, KUL, HND, DPS, JFK, JAI, UDR, COK).
  - Travelers & Cabin Class selector popover (Adults, Children, Infants; Economy, Premium Economy, Business).
  - Special Fare Category badges (Regular, Student Fare with extra baggage, Senior Citizen, Armed Forces, Doctors & Nurses).
  - Real-time Multi-Currency switcher (INR ₹, USD $, EUR €, GBP £) with instant global price conversion.
- **Interactive Multi-Stop Results & Booking Engine ([`MultiStopResultsView.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/MultiStopResultsView.jsx))**:
  - Connecting route stepper breadcrumb with layovers, transit times, and destination highlights.
  - Stop-by-stop flight segments with airline badges, non-stop indicators, baggage allowances, free meal tags, and alternative flight accordion.
  - Recommended luxury & boutique hotel stays per destination stop with verified ratings, amenities, and room selection.
  - Curated sightseeing experiences with live "+ Add Pass" toggling and dynamic budget updating.
  - Sticky MakeMyTrip Fare Breakdown Sidebar with base airfares, hotel stays, activity addons, GST/aviation taxes, multi-city bundle savings (8%), travel insurance toggle, and promo coupon engine (`MMTHACKATHON`, `GLOBETROTTER`, `ODODEAL`).
- **Confirmed Multi-City E-Ticket Pass & Itinerary Voucher Modal ([`BookingVoucherModal.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/BookingVoucherModal.jsx))**:
  - High-res printable e-ticket pass with PNR code, passenger summary, flight segments, hotel vouchers, activity tickets, QR code, and print-ready layout.
### [2026-08-22] - Dashboard Loading Error Fix & Session Persistence
- **Root Causes Identified & Fixed**:
  1. `ReferenceError: Tag is not defined`: Added missing `Tag` import from `lucide-react` in [`MultiStopSearchWidget.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/MultiStopSearchWidget.jsx).
  2. `AuthContext.jsx` Session Persistence: Added `localStorage` persistence and fallback initial demo user so direct navigation or refreshing on `/dashboard` does not bounce back to `/login` or crash with unauthenticated state.
  3. `App.jsx` Route Redirect: Updated default `/` fallback route to navigate directly to `/dashboard`.
- **Validation**:
  - `npm run build` compiled in 454ms with 0 errors.
  - `oxlint` static code analysis passed with 0 errors across 21 files.
  - Dev server HTTP 200 confirmed on `http://localhost:5174/dashboard`.

### [2026-08-22] - Full Express REST API Backend Engine Setup
- **Express Backend Architecture ([`backend/server.js`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/backend/server.js))**:
  - Express server running on port `5000` with CORS, JSON body-parsing middleware, request logger, global 404 handler, error handling, and health check (`/api/health`).
- **In-Memory Database ([`backend/data/mockDatabase.js`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/backend/data/mockDatabase.js))**:
  - Pre-seeded datasets for popular airports/cities, pre-packaged tours, user accounts, active bookings with PNRs, high-speed trains, cab fleets, and support tickets.
- **REST API Route Modules**:
  - **Auth API (`/api/auth`)**: `login`, `register`, `forgot-password`, `me` endpoints.
  - **Search & Optimizer API (`/api/search`)**: `cities` autocomplete query, `packages` catalog, `multi-stop` route pricing calculation engine.
  - **Bookings API (`/api/bookings`)**: Create multi-city reservation, list bookings, retrieve voucher details, and handle cancellations.
  - **Train API (`/api/trains`)**: Search train connections, calculate class fares, book IRCTC seat, and issue PNR barcode ticket.
  - **Cab API (`/api/cabs`)**: Search airport & outstation cabs, dispatch vehicle, and issue chauffeur QR pass.
  - **Support API (`/api/support`)**: Frequently Asked Questions (`faqs`) & support ticket creation (`tickets`).
  - **Admin API (`/api/admin`)**: Platform revenue analytics, active user list, and system-wide booking statistics.
- **Verification**:
  - Server daemon running on `http://localhost:5000`.
  - Verified HTTP 200 JSON output from `/api/health`.

### [2026-08-22] - Clean Header Redesign with Glassmorphic Hamburger Drawer
- **Header Clean-Up ([`Navbar.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/Navbar.jsx))**:
  - Replaced crowded horizontal navigation buttons (`Planner Hub`, `History & Passes`, `About Us`, `Contact Us`, `Logout`) with a single, elegant **Hamburger Menu Button (≡)**.
  - Header actions bar now features: Logo on left, User Status Pill + Theme Switcher + Hamburger Toggle on right.
  - Clicking the Hamburger button opens a frosted glassmorphic dropdown drawer modal (`animate-fade-in`) with user profile card, direct links to `Planner Hub`, `History & Passes`, `About Us`, `Contact Us`, `Admin Panel`, and a red `Log Out` action.
- **Verification**:
  - `npm run build` compiled with 0 errors.
  - `npx oxlint` static code analysis passed with 0 errors across 27 files.

### [2026-08-22] - MongoDB Database Connection & Mongoose Models Integration
- **Database Connection ([`backend/config/db.js`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/backend/config/db.js))**:
  - Configured `mongoose.connect()` targeting `mongodb://127.0.0.1:27017/globetrotter` (or `MONGODB_URI` env variable) with a 5-second selection timeout and hybrid fallback store so server execution is 100% resilient.
- **Environment Configuration ([`backend/.env`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/backend/.env))**:
  - Added `.env` file loading `MONGODB_URI`, `PORT=5000`, `JWT_SECRET`, and `NODE_ENV`.
- **Mongoose Schema Models ([`backend/models/`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/backend/models/))**:
  - `User.js`: User schema with email validation, bcrypt/plain passwords, and role enums (`Traveler`, `Guide`, `Admin`).
  - `Booking.js`: Multi-stop itinerary reservation schema with PNR tracking, stops array, selected hotels, and activities.
  - `Train.js`: Rail connection schema with train numbers, speeds, fares, and IRCTC classes.
  - `Cab.js`: Vehicle fleet schema with categories, seats, luggage, and flat fare estimates.
  - `SupportTicket.js`: Customer support ticket schema with ticket ID (`TKT-XXXXX`), priority, category, and message.
- **API Routes Persistence Update**:
  - Updated `auth.js`, `bookings.js`, `support.js`, and `admin.js` to query & save to MongoDB collections with fallback handling.
- **Verification**:
  - Server restarted and active on `http://localhost:5000`.
  - Verified HTTP 200 JSON output from `/api/health` and `/api/db-status`.

### [2026-08-22] - Login & Register MongoDB Auth Integration
- **AuthContext MongoDB Connection ([`AuthContext.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/context/AuthContext.jsx))**:
  - Updated `login(email, password)` to issue async POST requests to `http://localhost:5000/api/auth/login`. Authenticates directly against MongoDB `users` collection, returns token and user payload, and persists in `localStorage`.
  - Updated `register(name, email, password, role)` to issue async POST requests to `http://localhost:5000/api/auth/register`, creating new MongoDB user documents.
  - Includes transparent fallback handling if server is offline.
- **Component Async Integration ([`Login.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/Login.jsx), [`Register.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/Register.jsx))**:
  - `handleLogin` and `handleRegister` forms converted to async/await with error boundaries and MongoDB feedback states.
- **Verification**:
  - `npm run build` compiled in 496ms with 0 errors.
  - `oxlint` static code analysis passed with 0 errors across 27 files.

### [2026-08-22] - Header Navbar Redesign: Left-Aligned Hamburger & User Profile Image Avatar
- **Header Structure ([`Navbar.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/Navbar.jsx))**:
  - **Left Side**: Positioned the **Hamburger Menu Button (≡ / X)** first on the far left, followed by the **GlobeTrotter PRO** logo and subtitle.
  - **Right Side**: User profile pill rendering the user's **Profile Avatar Image** (`userAvatar`), **Name** (`darshshah3398`), and **Role Badge**, followed by the **Theme Switcher** (☀️ / 🌙).
  - **Dropdown Drawer**: Aligned to open cleanly underneath the left-side hamburger toggle button (`left: 1.5rem`).
- **Verification**:
  - `npm run build` compiled in 485ms with 0 errors.
  - `npx oxlint` static code analysis passed with 0 errors across 27 files.

### [2026-08-22] - Strict MongoDB Authentication & Password Validation Bug Fix
- **Root Causes Identified & Resolved**:
  1. `auth.js` Auto-User Creation Bug: Removed the line `if (!mongoUser) User.create(...)` which automatically created user accounts for un-registered emails during login.
  2. Missing Password Verification: Added password equality check (`mongoUser.password !== password`) returning `HTTP 401 Unauthorized` with `Invalid password. Please check your credentials.`
  3. `AuthContext.jsx` Error Swallowing: Fixed `login()` in `AuthContext.jsx` so HTTP 400 and 401 response errors throw readable exception messages to `Login.jsx` instead of triggering offline fallback logins.
- **Verification**:
  - Tested non-existent email ➔ Returned HTTP 401 `No account found with this email address. Please create an account first.`.
  - Tested invalid password ➔ Returned HTTP 401 `Invalid password. Please check your credentials.`.
  - Tested valid user credentials (`aarav.sharma@example.com` / `password123`) ➔ Returned HTTP 200 `Login successful`.
  - `npm run build` compiled in 470ms with 0 errors.

### [2026-08-22] - Admin Console Overhaul & MongoDB Live Control Suite
- **Template Aesthetic Alignment ([`AdminDashboard.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/AdminDashboard.jsx))**:
  - Redesigned Admin Dashboard following exact design system tokens (Terracotta `#C1440E`, obsidian glassmorphism, Caveat font headers).
- **Interactive Navigation Tabs**:
  1. `Overview KPIs`: Platform revenue counter, route demand trends, database status.
  2. `User Directory`: Live MongoDB user list fetched from `/api/admin/users`, role badges, and email directory.
  3. `Bookings Vault`: Live multi-city flight and hotel bookings fetched from `/api/admin/bookings`, PNR lookup, and E-Ticket voucher viewer.
  4. `Train Operations`: Express train fleet manager with "Add Express Train" modal dialog.
  5. `Cab Fleets`: Outstation and airport chauffeur fleet inventory with flat rate cards.
  6. `Support Queue`: Customer support ticket queue with real-time status updates (`Received` ➔ `In Progress` ➔ `Resolved`).
- **Verification**:
  - `npm run build` compiled in 478ms with 0 errors.
  - `oxlint` static code analysis passed with 0 errors across 27 files.

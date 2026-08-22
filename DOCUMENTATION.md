# GlobeTrotter — Complete Technical & Functional Documentation

Welcome to the comprehensive documentation for **GlobeTrotter** — a MakeMyTrip-inspired multi-stop travel engine built with React, Vite, Lucide icons, handwritten typography, custom glassmorphism, and a Node.js/Express REST API backend.

---

## 📋 Table of Contents

1. [System Overview & Architecture](#1-system-overview--architecture)
2. [Design System & Theme Engine](#2-design-system--theme-engine)
3. [MakeMyTrip Multi-Stop Flight & Journey Engine](#3-makemytrip-multi-stop-flight--journey-engine)
4. [Barcode & QR Code Engine](#4-barcode--qr-code-engine)
5. [Standalone Train Booking Engine](#5-standalone-train-booking-engine)
6. [Standalone Cab & Taxi Booking Engine](#6-standalone-cab--taxi-booking-engine)
7. [Trip & Booking History Vault](#7-trip--booking-history-vault)
8. [About Us Page](#8-about-us-page)
9. [Contact Us & Priority Support System](#9-contact-us--priority-support-system)
10. [Role-Based Dashboards & User Experience](#10-role-based-dashboards--user-experience)
11. [Backend REST API Server](#11-backend-rest-api-server)
12. [Project File Map](#12-project-file-map)

---

## 1. System Overview & Architecture

GlobeTrotter is designed to serve travelers planning complex multi-city journeys across continents. Unlike standard single-leg booking sites, GlobeTrotter enables seamless multi-hop routes (e.g., *New Delhi ➔ Dubai ➔ Paris ➔ Rome*), linking layover nights, stopover hotels, curated sightseeing activities, trains, and cabs in a single booking.

### Core Tech Stack
- **Frontend**: React 19, Vite 8, Lucide React icons, `@rive-app/react-canvas`.
- **Styling**: Vanilla CSS tokens in `index.css`, glassmorphism, Google Fonts (`Inter` + `Caveat` handwritten accent font).
- **Theme System**: Custom light/dark context switcher with `localStorage` persistence.
- **Backend API**: Node.js & Express REST API server running on port `5000`.
- **Barcodes & QR**: Inline SVG 1D Code-128 flight ticket barcodes and 2D hotel check-in QR matrices.

---

## 2. Design System & Theme Engine

GlobeTrotter features a warm, editorial aesthetic with two curated color modes:

### 🌞 Light Mode — Warm White & Terracotta
- `--bg-page`: `#FBF8F4` (Warm Cream Background)
- `--bg-surface`: `#F4EEE5` (Cards & Glass Panels)
- `--color-primary`: `#C1440E` (Terracotta Red/Orange)
- `--text-primary`: `#1C1917` (Deep Obsidian Text)
- `--text-secondary`: `#78716C` (Muted Warm Slate)
- `--accent-bg`: `#DCFCE7` / `--accent-text`: `#166534` (Green Badges)

### 🌑 Dark Mode — Deep Obsidian & Copper
- `--bg-page`: `#000000` (Deep Black Background)
- `--bg-surface`: `#171A1F` (Dark Slate Panels)
- `--color-primary`: `#D1824E` (Copper Amber)
- `--text-primary`: `#F1F5F9` (Soft White Text)
- `--text-secondary`: `#94A3B8` (Muted Cool Gray)
- `--accent-bg`: `#14281E` / `--accent-text`: `#4ADE80` (Emerald Badges)

---

## 3. MakeMyTrip Multi-Stop Flight & Journey Engine

Located in [`MultiStopSearchWidget.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/MultiStopSearchWidget.jsx) and [`MultiStopResultsView.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/MultiStopResultsView.jsx):

### Key Features
1. **Dynamic Stop Builder**:
   - Add 2 to 6+ city stops dynamically.
   - City swap (⇄) per leg.
   - Individual leg deletion & layover night counters.
2. **Airport Autocomplete Database**:
   - 19+ domestic & international airports (`DEL`, `BOM`, `BLR`, `GOI`, `JAI`, `UDR`, `COK`, `DXB`, `CDG`, `FCO`, `LHR`, `ZRH`, `SIN`, `BKK`, `HKT`, `KUL`, `HND`, `DPS`, `JFK`).
3. **Travelers & Cabin Selector**:
   - Adults, Children, Infants counter popover.
   - Cabin options: *Economy*, *Premium Economy*, *Business Class*.
4. **Special Fare Categories**:
   - *Regular*, *Student Fare* (extra 10kg baggage allowance), *Senior Citizen*, *Armed Forces*, *Doctors & Nurses*.
5. **Real-time Multi-Currency Conversion**:
   - Dynamic price conversion across **INR (₹)**, **USD ($)**, **EUR (€)**, and **GBP (£)**.
6. **Connecting Route Stepper & Breakdown**:
   - Visual breadcrumb connecting all cities with flight durations and transit badges.
   - Stopover hotels with star ratings, guest reviews, and included breakfast.
   - Local sightseeing experiences with live "+ Add Pass" toggling.
   - Sticky Fare Breakdown Sidebar with GST/taxes (12%), multi-city route discount (8%), travel insurance toggle, and promo coupon codes (`MMTHACKATHON`, `GLOBETROTTER`, `ODODEAL`).

---

## 4. Barcode & QR Code Engine

Located in [`BarcodeGenerator.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/BarcodeGenerator.jsx) and [`BookingVoucherModal.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/BookingVoucherModal.jsx):

### Barcode & QR Components
1. **`FlightBarcode`**:
   - Renders 1D Code-128 styled SVG barcodes for flight ticket numbers (`ETKT 098-XXXXXXXXXX`), seat numbers, and kiosk boarding validation.
2. **`HotelCheckinQRCode`**:
   - Renders a 2D QR matrix SVG with a center hotel building icon, confirmation ID (`HTL-CONF-XXX-XXXX`), guest name, room tier, check-in dates, and front-desk verification badge.
3. **`BookingVoucherModal`**:
   - Print-ready multi-tab modal (*Full Itinerary & Passes*, *Flight Barcodes*, *Hotel QR Check-Ins*) allowing travelers to print or view scannable boarding passes.

---

## 5. Standalone Train Booking Engine

Located in [`TrainBookingView.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/TrainBookingView.jsx):

### Key Features
1. **Dedicated Rail Search Widget**:
   - From/To station selection (NDLS, JP, MMCT, SBC, UDZ, Gare de Lyon, Zurich HB).
   - Quota selection: *General Quota*, *Tatkal Priority*, *Senior Citizen Concession*, *Ladies Quota*.
2. **Live Express Train Connections**:
   - **Vande Bharat Express (20977)**: 160 km/h, AC Chair Car & Executive Class, free hot meals, seat status (`AVAILABLE-042`).
   - **Eurostar High-Speed (EST-9014)**: 300 km/h International Bullet Train, Standard & Business Premier.
   - **Rajdhani Express (12952)**: Superfast AC Sleeper (3A, 2A, 1A).
   - **Shatabdi Express (12005)**: 140 km/h, AC Chair Car & Executive Class.
3. **Instant Train Boarding Pass**:
   - Passenger berth preference selection (Window, Lower, Upper, Aisle).
   - Instant ticket issuance with IRCTC PNR (`PNR-2849018241`), Coach/Seat allocation, 1D Train Barcode, and print capability.

---

## 6. Standalone Cab & Taxi Booking Engine

Located in [`CabBookingView.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/CabBookingView.jsx):

### Key Features
1. **Cab Service Types**:
   - `✈️ Airport Transfers`: Pickup/Drop at airport terminals with flight delay tracking.
   - `🚗 Outstation Cabs`: One-way & round-trip intercity drives.
   - `⏱️ Hourly Local Rentals`: Flexible hourly chauffeur rentals.
2. **Vehicle Fleet**:
   - **Sedan (Dzire / Etios)**: 4 Seats, 2 Bags, AC, GPS tracking, sanitized.
   - **Outstation SUV (Innova Crysta)**: 6 Seats, 4 Bags, reclining seats, state tolls included.
   - **Executive Chauffeur (Mercedes / BMW)**: VIP uniformed driver, WiFi, refreshments.
3. **Instant Cab Pass & QR Voucher**:
   - Confirmed cab voucher showing assigned driver (*Rajesh Kumar ★ 4.95*), car number plate (`DL-01-AB-9821`), and a **2D QR Pick-Up Pass** for the chauffeur to scan upon pickup.

---

## 7. Trip & Booking History Vault

Located in [`HistoryView.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/pages/HistoryView.jsx):

### Key Features
- Central vault storing all multi-city, flight, hotel, train, and cab bookings.
- **Filter Tabs**: *All Journeys*, *Confirmed & Upcoming*, *Completed Stays*.
- Visual connecting route steppers (`DEL ➔ DXB ➔ CDG ➔ FCO`), PNR tracking, primary passenger details, and total paid amounts.
- **1-Click Modal Trigger**: Re-opens [`BookingVoucherModal.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/BookingVoucherModal.jsx) with all barcodes and QR codes ready for airport or hotel check-in.

---

## 8. About Us Page

Located in [`AboutUs.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/pages/AboutUs.jsx):

### Key Features
- Hero section with handwritten Caveat quote: *"From wanderlust dreams to seamless multi-stop journeys — travel without borders."*
- Platform Key Milestones (`150k+ Journeys`, `19+ Hubs`, `4.98 Rating`, `99.9% Verification`).
- 4-Step MakeMyTrip Multi-Stop Journey Blueprint (*Route Optimization*, *Hotel & Experience Integration*, *Single Checkout & Savings*, *Verified Barcode Pass*).
- Leadership team cards with role badges and biographies.

---

## 9. Contact Us & Priority Support System

Located in [`ContactUs.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/pages/ContactUs.jsx):

### Key Features
- Interactive support ticket form with category selection, priority level, PNR reference, and instant reference ticket ID generation (`TKT-XXXXX`).
- Global office cards (New Delhi HQ, Dubai Hub, Paris Office).
- 24/7 Helpline & WhatsApp concierge triggers.
- Interactive FAQ accordion for instant assistance.

---

## 10. Role-Based Dashboards & User Experience

Located in [`UserDashboard.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/pages/UserDashboard.jsx) and [`Navbar.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/Navbar.jsx):

### Features
1. **Traveler Dashboard**:
   - Hero banner with frosted glassmorphism and ambient light halo (`.hero-glow-ambient`).
   - Dynamic Day/Night theme mode badge (*Golden Hour Sunset* vs *Moonlit Night Engine*).
   - Floating metric pills (Active Trips, Saved Routes, AI Planner).
   - Service switcher tabs (`Flights`, `Trains`, `Cabs`, `Packages`, `Custom`).
2. **Certified Guide Dashboard**:
   - Overview grid for active tour groups, client feedback, earnings, and custom tour builder.
3. **Admin Command Center ([`AdminDashboard.jsx`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/frontend/src/components/AdminDashboard.jsx))**:
   - System analytics, user roles management, and global booking monitoring accessible via `/admin`.

---

## 11. Backend REST API Server

Located in [`backend/server.js`](file:///c:/Users/darsh/OneDrive/Desktop/hackhaton/globetrotter-main/backend/server.js):

### API Route Endpoints
- **Health Check**: `GET /api/health`
- **Auth Routes (`/api/auth`)**:
  - `POST /api/auth/login`
  - `POST /api/auth/register`
  - `POST /api/auth/forgot-password`
  - `GET /api/auth/me`
- **Search & Optimizer API (`/api/search`)**:
  - `GET /api/search/cities`
  - `GET /api/search/packages`
  - `POST /api/search/multi-stop`
- **Bookings API (`/api/bookings`)**:
  - `GET /api/bookings`
  - `GET /api/bookings/:id`
  - `POST /api/bookings`
  - `DELETE /api/bookings/:id`
- **Train API (`/api/trains`)**:
  - `POST /api/trains/search`
  - `POST /api/trains/book`
- **Cab API (`/api/cabs`)**:
  - `POST /api/cabs/search`
  - `POST /api/cabs/book`
- **Support & Admin API (`/api/support`, `/api/admin`)**:
  - `GET /api/support/faqs` | `POST /api/support/tickets`
  - `GET /api/admin/stats` | `GET /api/admin/users`

---

## 12. Project File Map

```
globetrotter-main/
├── DOCUMENTATION.md                  # Comprehensive Documentation
├── agents.md                         # Agent Restore Point Logbook & Guidelines
├── package.json                      # Root Package Configuration
├── backend/
│   ├── server.js                     # Express REST API Server Engine
│   ├── package.json                  # Backend Dependencies & Scripts
│   ├── data/
│   │   └── mockDatabase.js           # Seed Data & In-Memory Store
│   └── routes/
│       ├── admin.js                  # Admin Analytics Routes
│       ├── auth.js                   # Authentication Routes
│       ├── bookings.js               # Bookings & Voucher Routes
│       ├── cabs.js                   # Standalone Cab API Routes
│       ├── search.js                 # Multi-Stop Optimizer Routes
│       ├── support.js                # Support Tickets & FAQ Routes
│       └── trains.js                 # Standalone Train API Routes
└── frontend/
    ├── package.json                  # Frontend React & Vite Dependencies
    └── src/
        ├── App.jsx                   # Router & Navigation Engine
        ├── index.css                 # Global CSS Tokens & Glassmorphism
        ├── components/
        │   ├── AdminDashboard.jsx    # System Admin Command Center
        │   ├── BarcodeGenerator.jsx  # 1D Aviation Barcode & 2D Hotel QR Engine
        │   ├── BookingVoucherModal.jsx# Print-Ready Barcode E-Ticket Modal
        │   ├── CabBookingView.jsx    # Standalone Cab & Chauffeur View
        │   ├── MultiStopPackages.jsx # Curated Multi-City Tour Catalog
        │   ├── MultiStopResultsView.jsx# Interactive Search Results & Fare Breakdown
        │   ├── MultiStopSearchWidget.jsx# MakeMyTrip Multi-Stop Search & Tabs
        │   ├── Navbar.jsx            # Translucent Glassmorphic Header Navigation
        │   ├── RiveAnimation.jsx     # Rive Canvas Animation Integration
        │   └── TrainBookingView.jsx  # Standalone IRCTC Train & Bullet Train View
        ├── context/
        │   ├── AuthContext.jsx       # User Auth & Session Persistence
        │   └── ThemeContext.jsx      # Dark/Light Theme Context
        ├── data/
        │   └── multiStopData.js      # Airports, Hotels, Activities, Fares Data
        └── pages/
            ├── AboutUs.jsx           # About GlobeTrotter Story & Team Page
            ├── ContactUs.jsx         # Contact Support Ticket & FAQ Page
            ├── HistoryView.jsx       # Trip & Booking Vault Page
            ├── Login.jsx             # Auth Login Split-Card Page
            ├── Register.jsx          # Auth Register Split-Card Page
            └── UserDashboard.jsx     # Traveler & Guide Homepage Hero Dashboard
```

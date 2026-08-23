# Capetrust Funeral Services & Garden of Peace™ Memorial Park

> **Honouring Every Life with Dignity, Care & Excellence.**  
> Professional funeral planning, burial coordination, cemetery vaults, and eternal memorialization in Lagos, Nigeria.

[![TanStack Start](https://img.shields.io/badge/TanStack-Start-blue?style=flat-square)](https://tanstack.com/start)
[![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

---

## 🏛️ About the Project

**Capetrust Funeral Services** is a comprehensive, full-stack web application built for Capetrust Global Funeral Services Ltd and its private cemetery facility, **Garden of Peace™ Memorial Park** in Agbowa-Ikosi, Lagos State.

The platform provides families with transparent pricing, advance pre-planning tools, interactive cost estimation, and a sacred space for online remembrance through tributes, candle lighting, and condolence guestbooks.

---

## ✨ Key Features

* **Interactive Price Estimator (`/estimator`)**:
  * Real-time calculation in Nigerian Naira (₦) for Single, Double, and Triple concrete vaults.
  * Custom surface finishes: Standard, Polished Granite Top, Decorative Pebblestones, and Artificial Flower Beds.
  * Single and Companion headstone selections.
  * Statutory documentation, chamber reopening deposits, and memorial street naming add-ons.
  * One-click PDF print export and pre-filled WhatsApp enquiry dispatch.

* **Obituaries & Tribute System (`/obituaries`)**:
  * Searchable memorial registry with search-by-name and year filters.
  * Full biography pages with life stories, photo galleries, and order of service schedules.
  * Interactive **"Light a Candle"** tribute counter.
  * Public condolence guestbook with instant submission.
  * **"Publish a Memorial" (`/obituaries/create`)** self-service form for families.

* **Garden of Peace™ Memorial Park (`/garden-of-peace`)**:
  * Over 10 acres of serene memorial parkland in Odo-Ayandelu, Agbowa, Lagos.
  * On-site chapel, single/double/triple vault descriptions, and cemetery tour booking.

* **Family Estates & Pre-Planning (`/investment`, `/pre-planning`)**:
  * Inflation-hedged cemetery plot pre-planning.
  * Multi-chamber private family mausoleums and gated estate sanctuaries.
  * 4-step acquisition guide.

* **Streamlined Header & Navigation**:
  * Brand logo with Capetrust wordmark.
  * Compact nested dropdown menus for desktop.
  * Mobile-responsive collapsible navigation drawer.
  * 24/7 hotline callout and WhatsApp direct access.

* **Complete SEO & Social Unfurls**:
  * Custom OpenGraph (1200x630) and Twitter summary cards tailored for WhatsApp, iMessage, X, Facebook, and LinkedIn.
  * Multi-resolution custom favicons generated from the official brand logo.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [TanStack Start](https://tanstack.com/start) (Full-stack SSR with Vite & Nitro) |
| **Routing** | `@tanstack/react-router` (File-based routing under `src/routes/`) |
| **UI Library** | React 19, Radix UI Primitives, Lucide React Icons |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`), OKLCH Color Palette, `tw-animate-css` |
| **Forms & State** | React Hook Form, Zod validation, `@tanstack/react-query` v5 |
| **Runtime & Package Manager** | Bun / Node.js (v20+) |

---

## 📂 Project Structure

```
├── public/
│   ├── images/                # OpenGraph preview images, portraits & gallery assets
│   ├── logo.png               # High-res Capetrust brand logo
│   ├── favicon.ico            # Multi-resolution favicon
│   ├── favicon-32x32.png      # Modern browser tab icon
│   └── apple-touch-icon.png   # iOS home screen icon
├── src/
│   ├── assets/                # Optimized editorial photography
│   ├── components/
│   │   ├── site/              # Header, Footer, PriceEstimator, Sections, WhatsAppButton
│   │   └── ui/                # Accessible Radix UI components (buttons, dialogs, dropdowns, etc.)
│   ├── lib/
│   │   ├── obituaries-data.ts # Types, sample memorial data & local storage persistence
│   │   ├── site.ts            # Navigation items, contact details & site config
│   │   └── utils.ts           # Class merging utilities
│   ├── routes/
│   │   ├── __root.tsx         # Root HTML shell, global SEO, fonts, Header & Footer
│   │   ├── index.tsx          # Homepage
│   │   ├── about.tsx          # About Us
│   │   ├── estimator.tsx      # Interactive Price Estimator
│   │   ├── garden-of-peace.tsx# Memorial Park overview & vault choices
│   │   ├── investment.tsx     # Family Estates & Real Estate Pre-planning
│   │   ├── memorial-products.tsx # Caskets, urns & memorial products
│   │   ├── obituaries/
│   │   │   ├── index.tsx      # Obituaries directory & search
│   │   │   ├── $slug.tsx      # Individual memorial tribute & guestbook
│   │   │   └── create.tsx     # Memorial publishing flow
│   │   ├── pre-planning.tsx   # Advance planning guide
│   │   ├── services.tsx       # Funeral & burial services
│   │   ├── faq.tsx            # Frequently asked questions
│   │   └── contact.tsx        # Contact information & tour booking form
│   ├── router.tsx             # TanStack Router instance
│   ├── server.ts             # SSR error wrapper
│   └── styles.css             # OKLCH design tokens & Tailwind theme
├── package.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v20 or higher) or [Bun](https://bun.sh/) (v1.2+)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DavidAkerele/capetrust-memorial-site.git
   cd capetrust-memorial-site
   ```

2. **Install dependencies**:
   ```bash
   bun install
   # or
   npm install
   ```

3. **Start the development server**:
   ```bash
   bun run dev
   # or
   npm run dev
   ```
   Open [http://localhost:8080](http://localhost:8080) in your browser.

4. **Build for production**:
   ```bash
   bun run build
   # or
   npm run build
   ```

5. **Preview production build**:
   ```bash
   bun run preview
   # or
   npm run preview
   ```

---

## 🎨 Design System

* **Color Palette (OKLCH)**:
  * **Primary (Capetrust Royal Navy)**: `oklch(0.32 0.12 255)` (`#1E3D82`)
  * **Midnight Navy**: `oklch(0.20 0.07 265)` (`#0E0E44`)
  * **Accent Blue**: `oklch(0.54 0.18 245)` (`#0071BC`)
  * **Gold**: `oklch(0.68 0.10 78)` (`#D4AF37`)
  * **Ivory Cream**: `oklch(0.97 0.01 95)` (`#F9F7F2`)
* **Typography**:
  * **Headings**: *Cormorant Garamond* (Serif)
  * **Body & UI**: *Karla* (Sans-serif)

---

## 📞 Contact & Support

* **Head Office**: 194, Elepe Road, Ikorodu, Lagos, Nigeria
* **Memorial Park**: Garden of Peace™ Memorial Park, Odo-Ayandelu, Agbowa-Ikosi, Lagos
* **Phone / 24/7 Hotline**: +234 802 6666 655
* **Email**: info@capetrustfunerals.com
* **Website**: [https://capetrustfunerals.com](https://capetrustfunerals.com)

---

© 2026 Capetrust Funeral Services Ltd. All rights reserved.

# 1Fi SDE1 Assignment — Full-Stack Smartphone Store with Mutual Fund Backed EMIs

[![Node.js](https://img.shields.io/badge/Node.js-v22+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4-lightgrey.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-blue.svg)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5-teal.svg)](https://www.prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)

> An interview-ready, production-grade full-stack web application designed for the **1Fi SDE1 Assignment**. This application provides a product browsing and purchase experience for flagship smartphones powered by **smart EMI plans backed by mutual fund investments**, drawing inspiration from modern fintech and consumer credit platforms like Snapmint.

---

### 🌐 Live Deployment Links
- 🚀 **Live Storefront (Vercel):** [https://1fi-sde-assignment-seven.vercel.app/products](https://1fi-sde-assignment-seven.vercel.app/products)
- 📱 **iPhone 17 Pro Page:** [https://1fi-sde-assignment-seven.vercel.app/products/iphone-17-pro](https://1fi-sde-assignment-seven.vercel.app/products/iphone-17-pro)
- 📡 **Backend API (Render):** [https://onefi-sde-assignment.onrender.com/api/health](https://onefi-sde-assignment.onrender.com/api/health)
- 🗄 **Database:** Managed PostgreSQL (Neon)

---

## 📖 Table of Contents
1. [Overview & Core Value Proposition](#-overview--core-value-proposition)
2. [Key Features](#-key-features)
3. [System Architecture](#-system-architecture)
4. [Database Design & Prisma Schema](#-database-design--prisma-schema)
5. [REST API Documentation](#-rest-api-documentation)
6. [Tech Stack](#-tech-stack)
7. [Getting Started & Local Setup](#-getting-started--local-setup)
8. [Environment Variables](#-environment-variables)
9. [Available Scripts](#-available-scripts)
10. [Design & User Experience](#-design--user-experience)
11. [Git Commit History](#-git-commit-history)

---

## 🌟 Overview & Core Value Proposition

Traditional EMI and consumer loan models require high interest, strict credit card limits, or selling investments prematurely. **1Fi** enables consumers to acquire flagship smartphones (such as Apple iPhone 17 Pro, Samsung Galaxy S24 Ultra, and OnePlus 13) by leveraging their **mutual fund portfolios** as collateral.

- **Capital Stays Invested:** Users don't break their mutual fund folios; investments continue compounding and generating wealth.
- **Zero-Cost EMI & Cashbacks:** Exclusive 0% interest tenures with instant cashbacks up to ₹7,500 credited directly.
- **Paperless Instant Approval:** Clean, modern digital journey with pre-approved limits and transparent payment schedules.

---

## ✨ Key Features

- 📱 **Dynamic Product Catalog (`/products`):**
  - Displays smartphone models stored in PostgreSQL.
  - Shows selling price, MRP with strikethrough, discount percentages, ratings, color options, and lowest monthly EMI indicators.
- 🎨 **Dynamic Product Detail Page (`/products/:slug`):**
  - Breadcrumb navigation (`Home / Products / iPhone 17 Pro`).
  - High-resolution product gallery with variant thumbnails, responsive image preview, and authenticity badges.
  - Interactive variant selector supporting instant color and storage switching (updating renders and specs in real-time).
  - Clear price breakdown: Selling Price, MRP, instant savings amount, and tax transparency.
- 💳 **Interactive EMI Selection Grid:**
  - Distinct EMI cards showing monthly installment, tenure duration (3 to 60 months), interest rate (0% vs standard), and cashback tags.
  - Active visual selection state with radio indicators and "Most Popular" tags.
  - Guaranteed single-selection constraint.
- 🚀 **EMI Proceed Flow & Modal:**
  - Contextual CTA button: `Proceed with Selected Plan (₹22,483/mo)`.
  - Confirmation modal outlining the selected device, variant, installment schedule, interest rate, and mutual fund collateral benefits.
  - Pre-approved loan verification state with a unique application reference ID (`1FI-XXXXXX`).
- ⚡ **Production-Ready Polish:**
  - Skeleton loading states preventing layout shifts.
  - Error and 404 boundaries with retry triggers.
  - Responsive design with sticky bottom action bar on mobile viewports.

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client (Browser)                       │
│  React 19 + Vite + Tailwind CSS + Lucide Icons              │
│  Pages: ProductListPage (/products), ProductDetailPage      │
└──────────────────────────────┬──────────────────────────────┘
                               │
                        HTTP / JSON REST API
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                    Express.js Backend API                   │
│  Port: 5001 (Configurable via PORT env)                     │
│  Middleware: CORS, Morgan, ErrorHandler, Static File Server │
│  Routes: /api/health, /api/products, /api/products/:slug    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                          Prisma ORM
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                  PostgreSQL Database Engine                 │
│  Models: Product, Variant, EMIPlan                          │
│  Embedded PostgreSQL for 1-click zero-dependency local dev  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗄 Database Design & Prisma Schema

The relational schema is defined cleanly using Prisma ORM:

```prisma
model Product {
  id          String    @id @default(uuid())
  slug        String    @unique
  name        String
  brand       String
  description String    @db.Text
  price       Float
  mrp         Float
  rating      Float     @default(4.9)
  reviewCount Int       @default(1200)
  inStock     Boolean   @default(true)
  variants    Variant[]
  emiPlans    EMIPlan[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([slug])
}

model Variant {
  id        String   @id @default(uuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  color     String
  colorHex  String?
  storage   String
  finish    String?
  image     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([productId])
}

model EMIPlan {
  id             String   @id @default(uuid())
  productId      String
  product        Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  tenureMonths   Int
  monthlyPayment Float
  interestRate   Float    @default(0)
  cashback       Float    @default(0)
  isRecommended  Boolean  @default(false)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@index([productId])
}
```

---

## 📡 REST API Documentation

### 1. Health Check
- **Endpoint:** `GET /api/health`
- **Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-09-03T10:45:00.000Z",
  "service": "1Fi Assignment Backend API"
}
```

### 2. List Products
- **Endpoint:** `GET /api/products`
- **Response:** Array of product objects with their associated variants and EMI plans.

### 3. Get Product by Slug
- **Endpoint:** `GET /api/products/:slug`
- **Example:** `GET /api/products/iphone-17-pro`
- **Response:**
```json
{
  "id": "c1f7a29e-...",
  "slug": "iphone-17-pro",
  "name": "Apple iPhone 17 Pro",
  "brand": "Apple",
  "description": "The next-generation flagship smartphone...",
  "price": 127400,
  "mrp": 134900,
  "rating": 4.9,
  "reviewCount": 1248,
  "variants": [
    {
      "id": "...",
      "color": "Silver",
      "colorHex": "#E3E4E5",
      "storage": "256GB",
      "finish": "Titanium Silver",
      "image": "/images/products/iphone-17-pro-silver.jpg"
    },
    {
      "id": "...",
      "color": "Orange",
      "colorHex": "#E86D3B",
      "storage": "256GB",
      "finish": "Cosmic Orange",
      "image": "/images/products/iphone-17-pro-orange.jpg"
    },
    {
      "id": "...",
      "color": "Blue",
      "colorHex": "#2C4362",
      "storage": "512GB",
      "finish": "Deep Blue",
      "image": "/images/products/iphone-17-pro-blue.jpg"
    }
  ],
  "emiPlans": [
    {
      "id": "...",
      "tenureMonths": 6,
      "monthlyPayment": 22483,
      "interestRate": 0,
      "cashback": 7500,
      "isRecommended": true
    },
    {
      "id": "...",
      "tenureMonths": 12,
      "monthlyPayment": 11242,
      "interestRate": 0,
      "cashback": 7500,
      "isRecommended": false
    }
  ]
}
```

---

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, Lucide React, Axios, React Router 7 |
| **Backend** | Node.js (v22+), Express.js 4, Morgan, CORS, Dotenv |
| **Database** | PostgreSQL 18, Prisma ORM 5, Embedded-Postgres |
| **Styling** | Modern Fintech Palette (Indigo/Emerald/Slate), Custom Typography (Plus Jakarta Sans) |

---

## 🚀 Getting Started & Local Setup

### Prerequisites
- **Node.js**: v18+ (v22 recommended)
- **npm**: v9+

### 1. Clone the repository
```bash
git clone https://github.com/DEVIVARAPRASADM/1fi-sde-assignment.git
cd 1fi-sde-assignment
```

### 2. Install all dependencies (Root Monorepo)
```bash
npm install
```

### 3. Setup Database and Seed Data
The project includes an automated embedded PostgreSQL instance that boots automatically on `localhost:5432` without requiring Docker or manual Postgres installation:
```bash
# Push schema to the database
npm run db:push

# Populate database with products, variants, and EMI plans
npm run db:seed
```

### 4. Start the Application
You can run both client and backend concurrently with one command from the project root:
```bash
npm run dev
```

Or run them individually:
```bash
# In terminal 1: Start Backend (Port 5001)
npm run dev:server

# In terminal 2: Start Frontend (Port 5173)
npm run dev:client
```

Open your browser at:
👉 **`http://localhost:5173`**

---

## 🔐 Environment Variables

### Backend (`server/.env`)
```env
# Database connection string
DATABASE_URL="postgresql://postgres:password@localhost:5432/onefi_db?schema=public"

# Backend server port (5001 avoids macOS AirPlay Receiver port 5000 conflicts)
PORT=5001

# Allowed client origin for CORS
CLIENT_URL="http://localhost:5173"

# Node environment
NODE_ENV="development"
```

### Frontend (`client/.env`)
```env
# Target backend API base URL
VITE_API_URL=http://localhost:5001
```

---

## 📜 Available Scripts

| Script | Purpose |
| :--- | :--- |
| `npm run dev` | Runs backend and frontend concurrently |
| `npm run dev:client` | Starts Vite React client dev server |
| `npm run dev:server` | Starts Express backend server |
| `npm run build` | Builds both frontend and backend bundles for production |
| `npm run db:push` | Synchronizes Prisma schema with PostgreSQL database |
| `npm run db:seed` | Seeds database with initial products, variants, and plans |
| `npm run db:studio` | Launches Prisma Studio GUI for browsing database records |

---

## 🎨 Design & User Experience

Inspired by high-converting consumer electronics and financing platforms:
1. **Hero & Value Framing:** Mutual fund wealth preservation messaging clearly communicated across banners and cards.
2. **Interactive Color & Storage Swatches:** Instant updates to device rendering and active tags.
3. **Transparent Financing:** Zero hidden fees; explicit interest percentages and cashback badges.
4. **Mobile Optimization:** Sticky bottom bar for one-tap checkout flow on small screens.

---

## 📦 Git Commit History

The repository has been structured into clean, atomic commits:

1. `fb29f4d` `chore: initialize project structure`
2. `ae0c5a4` `feat: setup PostgreSQL and Prisma`
3. `403d923` `feat: add product database schema`
4. `4725838` `feat: add product and EMI seed data`
5. `4cc8a74` `feat: implement product APIs`
6. `db257a5` `feat: implement product listing page`
7. `371d6df` `feat: implement dynamic product page`
8. `0d69fa3` `feat: add product image gallery`
9. `7244cc2` `feat: add variant selection`
10. `3e40020` `feat: add EMI plan selection`
11. `c038caa` `feat: add EMI proceed flow`
12. `b89316a` `style: improve product page UI`
13. `3b13815` `style: improve responsive design`
14. `6944d03` `feat: add loading and error states`
15. `docs: comprehensive setup and architectural documentation`

---

## 👨‍💻 Author & Submission
- **Author:** Devivaraprasad Mullaguri
- **Assignment:** 1Fi SDE1 Full-Stack Technical Assignment
- **Repository:** [DEVIVARAPRASADM/1fi-sde-assignment](https://github.com/DEVIVARAPRASADM/1fi-sde-assignment)

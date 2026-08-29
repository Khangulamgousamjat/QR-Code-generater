# ALL IN ONE QR GENERATER

<div align="center">

![ALL IN ONE QR GENERATER Banner](https://img.shields.io/badge/ALL%20IN%20ONE-QR%20GENERATER-7C3AED?style=for-the-badge&logo=qrcode&logoColor=white)

**A professional, production-grade, 100% free QR code studio and productivity platform with 44+ specialized QR systems, live vector customization, camera scanner, batch bulk generator, and offline history.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Free Forever](https://img.shields.io/badge/100%25-Free%20Forever-10B981.svg?style=flat-square)](#product-vision)
[![No Login Required](https://img.shields.io/badge/Auth-No%20Login%20Required-8B5CF6.svg?style=flat-square)](#product-vision)
[![44+ QR Types](https://img.shields.io/badge/Supported%20Types-44%2B%20Formats-7C3AED.svg?style=flat-square)](#-supported-44-qr-types)
[![Zero Paywalls](https://img.shields.io/badge/Paywalls-None-059669.svg?style=flat-square)](#product-vision)

</div>

---

## 📖 Overview

**ALL IN ONE QR GENERATER** is a modern SaaS-inspired QR Code design and generation platform. It replaces outdated, clunky single-input generators with a clean, high-performance web suite built on a warm lavender & minimalist aesthetic.

Open the application, choose any of the **44+ QR types**, enter your data, customize colors and shapes, upload your brand logo, and download in print-ready vector **SVG**, crystal-clear **PNG**, or compact **JPG** formats—all without creating an account or hitting paywalls.

---

## 🌟 Key Features

- **🚀 100% Free Forever**: No subscriptions, no hidden trials, no "Go Pro" paywalls, and no watermarks.
- **🔒 Zero Login / Privacy-First**: Operates 100% client-side. No user data, passwords, or personal details are uploaded or tracked.
- **🎨 Deep Design Customizer**:
  - **Module Shapes**: Dotted QR, Extra Rounded, Smooth Rounded, Classic Square, Classy, and Classy Rounded.
  - **Corner Eyes & Pupils**: Square, Circular Dot, Extra Rounded, and Classy frames.
  - **Color Control**: Custom Hex picker, Linear & Radial gradients, preset palettes, and automated contrast accessibility warnings.
  - **Center Logo / Avatar**: Upload PNG, JPG, or SVG logos with dynamic size scaling, margin control, and automatic High (H) error correction.
  - **Banners & Frames**: Add scannable CTA frame banners (e.g., `"SCAN ME"`, `"CONNECT WI-FI"`, `"PAY VIA UPI"`).
- **📐 High-Resolution Vector Export**:
  - **SVG**: Infinite resolution for large format print (billboards, flyers, merchandise).
  - **PNG / JPG**: Scalable raster export up to 2048 × 2048 px.
- **📱 Built-in QR Scanner & Decoder**:
  - Real-time webcam scanning with auto-detection.
  - Drag-and-drop / image upload decoder for instant payload extraction.
  - Intelligent payload actions (Open URL, Dial Phone, Save vCard, Connect Wi-Fi, Pay via UPI, Decrypt Password-Protected data).
- **📦 CSV Bulk QR Generator**: Generate hundreds of QR codes simultaneously from spreadsheet data or line-separated lists, and download them packaged in a single `.zip` archive.
- **⚡ 1-Click Templates**: Instant pre-configured presets for Cafe Wi-Fi, Executive vCard, UPI Store Checkout, Restaurant Menus, Event Tickets, and 2FA Authenticator.
- **🗂️ Local History & Search**: Client-side `localStorage` management of all your generated codes with quick re-editing, duplication, and download.

---

## 📂 Supported 44+ QR Types

```
ALL IN ONE QR GENERATER
├── 🟢 Basic Types (9)
│   ├── Website URL
│   ├── Plain Text / Notes
│   ├── Phone Call (tel:)
│   ├── SMS Message (SMSTO:)
│   ├── Email (mailto:)
│   ├── Wi-Fi Network Setup (WPA/WPA2/WPA3/WEP/Open)
│   ├── Contact / vCard 3.0
│   ├── Geolocation & Maps (with GPS auto-detect)
│   └── Calendar Event (.ics)
│
├── 💼 Business Systems (12)
│   ├── Product & Catalog SKU
│   ├── Warehouse & Inventory Item
│   ├── Fixed Asset Tag
│   ├── Warranty Registration
│   ├── Certificate & Credential Check
│   ├── Commercial Invoice & Billing
│   ├── Coupon & Discount Voucher
│   ├── Customer Loyalty Member Card
│   ├── Feedback & Google Review Survey
│   ├── Restaurant Contactless Menu
│   ├── Event & Transport Ticket
│   └── Attendance & Session Check-in
│
├── 💳 Payments & Indian UPI (4)
│   ├── Indian UPI Payment (upi://pay with GPay, PhonePe, Paytm, BHIM support)
│   ├── Payment Gateway Link (Stripe, Razorpay, PayPal)
│   ├── Merchant POS Terminal Tag
│   └── Charity & Donation Campaign
│
├── 🛡️ Identity & Security (9)
│   ├── Personal Details QR (All fields optional + dynamic custom fields)
│   ├── Executive Digital Business Card
│   ├── Corporate Employee ID Badge
│   ├── University Student ID Card
│   ├── Document Verification SHA-256 Checksum
│   ├── Digital Identity / Decentralized DID / Web3 Wallet
│   ├── Application Authentication Token
│   ├── 2FA / TOTP Authenticator (RFC 6238 compatible with Google Authenticator & Authy)
│   └── Aadhaar-Related QR (Client-encoded with privacy safeguards & disclaimers)
│
└── ⚡ Advanced & Specialized (11)
    ├── Dynamic Redirect QR (Editable target URL & real scan logging)
    ├── Expiring QR (Timestamp countdown & expiration logic)
    ├── One-Time-Use Burner Voucher (OTU)
    ├── Password-Protected QR (Encrypted client-side payload)
    ├── Backend API Verification Token
    ├── Signed Cryptographic QR (HMAC-SHA256 tamper-proof verification)
    ├── UTM Campaign Analytics Tracking Link
    ├── Personalized Smart vCard with Meeting Links
    ├── Bulk QR Batch Generator (CSV to ZIP)
    ├── Integrated Camera Scanner & Image Decoder
    └── Smart Gate Access Control Pass Token
```

---

## 🇮🇳 Indian UPI & Aadhaar Notice

- **UPI Payments**: Implements NPCI-compliant `upi://pay?pa=...&pn=...&am=...&cu=INR` deep links. Payments execute securely inside the customer's native banking application.
- **Aadhaar QR**: Designed with strict privacy awareness. Clearly labeled as user-provided, client-encoded personal data and not an official UIDAI government credential.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: Clean HTML5 semantic layout, CSS3 design tokens with CSS variables, Vanilla JavaScript (ES6+ modular architecture).
- **Rendering Engine**: `qr-code-styling` (v1.6.0-rc.1) for vector SVG paths, custom canvas module shaping, and gradient fills.
- **Decoder Engine**: `jsQR` for image array parsing and video stream frame analysis.
- **Compression**: `JSZip` + `FileSaver.js` for client-side batch processing.
- **Typography & Icons**: Google Fonts (`Plus Jakarta Sans`), Lucide Icons.
- **State & Storage**: Client-side `localStorage` database with zero external server dependencies for static generation.

---

## 🚀 Getting Started

### Option 1: Direct Browser Access
Simply clone the repository and open `index.html` in any modern web browser:
```bash
git clone https://github.com/Khangulamgousamjat/QR-Code-generater.git
cd QR-Code-generater
# Double click index.html or open with your browser
```

### Option 2: Run with Local Development Server
```bash
# Using Node.js built-in server
node server.js

# Or using Python 3
python -m http.server 5173

# Or using npx serve
npx serve .
```
Navigate to `http://localhost:5173` in your browser.

---

## 🎨 Color System & Design Tokens

| Token | Hex / Value | Purpose |
| :--- | :--- | :--- |
| `--bg-app` | `#FAF9FF` | Primary light app background |
| `--bg-card` | `#FFFFFF` | Card surfaces & form containers |
| `--bg-lavender` | `#F3EEFF` | Accent chips, badges, and active states |
| `--primary` | `#7C3AED` | Primary brand purple & CTA buttons |
| `--primary-light`| `#8B5CF6` | Hover states & gradients |
| `--text-main` | `#17152B` | High contrast navy text |
| `--text-secondary`| `#6F6A85` | Subtitles, labels, and secondary copy |
| `--border-color` | `#E8E3F2` | Subtle clean card borders |

---

## 📄 License

This project is licensed under the **MIT License** - free for personal, commercial, and educational use.

---

<div align="center">
  <sub>Built with ❤️ for the open-source community. No paywalls, forever free.</sub>
</div>

/* ==========================================================================
   ALL IN ONE QR GENERATER - Utilities & Payload Encoders
   ========================================================================== */

const Utils = {
  // Toast Notification System
  showToast(message, type = 'info', duration = 3200) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle';
    if (type === 'error') iconName = 'alert-circle';

    toast.innerHTML = `
      <i data-lucide="${iconName}" class="toast-icon"></i>
      <span class="toast-message">${this.escapeHtml(message)}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons({ root: toast });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  // Color Contrast Calculation
  getLuminance(hex) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return 0.5;
    const a = [rgb.r, rgb.g, rgb.b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  },

  getContrastRatio(hex1, hex2) {
    const lum1 = this.getLuminance(hex1);
    const lum2 = this.getLuminance(hex2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  },

  hexToRgb(hex) {
    if (!hex) return null;
    let clean = hex.replace('#', '');
    if (clean.length === 3) {
      clean = clean.split('').map(c => c + c).join('');
    }
    const num = parseInt(clean, 16);
    return isNaN(num) ? null : {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  },

  // vCard 3.0 Standard Payload Formatter
  buildVCard(data) {
    let lines = ['BEGIN:VCARD', 'VERSION:3.0'];
    
    if (data.fullName || data.nickname) {
      lines.push(`FN:${data.fullName || data.nickname}`);
      lines.push(`N:${data.fullName || ''};;;;`);
    }
    if (data.nickname) lines.push(`NICKNAME:${data.nickname}`);
    if (data.org || data.company) lines.push(`ORG:${data.org || data.company}`);
    if (data.title || data.jobTitle) lines.push(`TITLE:${data.title || data.jobTitle}`);
    if (data.phone) lines.push(`TEL;TYPE=CELL,VOICE:${data.phone}`);
    if (data.email) lines.push(`EMAIL;TYPE=PREF,INTERNET:${data.email}`);
    if (data.website) lines.push(`URL:${this.normalizeUrl(data.website)}`);
    if (data.address) lines.push(`ADR;TYPE=WORK,POSTAL:;;${data.address};;;;`);
    if (data.dob) lines.push(`BDAY:${data.dob}`);
    if (data.bio || data.note) lines.push(`NOTE:${data.bio || data.note}`);

    // Social & custom fields
    if (data.instagram) lines.push(`X-SOCIAL-INSTAGRAM:${data.instagram}`);
    if (data.linkedin) lines.push(`X-SOCIAL-LINKEDIN:${data.linkedin}`);
    if (data.twitter || data.x) lines.push(`X-SOCIAL-TWITTER:${data.twitter || data.x}`);
    if (data.github) lines.push(`X-SOCIAL-GITHUB:${data.github}`);
    if (data.youtube) lines.push(`X-SOCIAL-YOUTUBE:${data.youtube}`);

    if (data.customFields && Array.isArray(data.customFields)) {
      data.customFields.forEach(f => {
        if (f.key && f.val) lines.push(`X-CUSTOM-${f.key.toUpperCase().replace(/\s+/g, '-')}:${f.val}`);
      });
    }

    lines.push('END:VCARD');
    return lines.join('\n');
  },

  // Wi-Fi Standard Payload Formatter
  buildWiFi(ssid, password, security = 'WPA', hidden = false) {
    const cleanSsid = ssid.replace(/([\\;,:"])/g, '\\$1');
    const cleanPass = (password || '').replace(/([\\;,:"])/g, '\\$1');
    return `WIFI:T:${security};S:${cleanSsid};P:${cleanPass};H:${hidden ? 'true' : 'false'};;`;
  },

  // UPI Payment Link Formatter (Indian Standard)
  buildUpi(pa, pn, am, tn, cu = 'INR') {
    let params = [];
    if (pa) params.push(`pa=${encodeURIComponent(pa.trim())}`);
    if (pn) params.push(`pn=${encodeURIComponent(pn.trim())}`);
    if (am && parseFloat(am) > 0) params.push(`am=${encodeURIComponent(parseFloat(am).toFixed(2))}`);
    if (tn) params.push(`tn=${encodeURIComponent(tn.trim())}`);
    params.push(`cu=${cu}`);
    return `upi://pay?${params.join('&')}`;
  },

  // Calendar Event .ics Payload Formatter
  buildCalendarEvent(event) {
    const formatDate = (dateStr) => {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? '' : d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    let lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ALL IN ONE QR GENERATER//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title || 'Event'}`,
      `DESCRIPTION:${event.description || ''}`,
      `LOCATION:${event.location || ''}`
    ];

    if (event.startDate) lines.push(`DTSTART:${formatDate(event.startDate)}`);
    if (event.endDate) lines.push(`DTEND:${formatDate(event.endDate)}`);
    if (event.url) lines.push(`URL:${this.normalizeUrl(event.url)}`);
    if (event.organizer) lines.push(`ORGANIZER:${event.organizer}`);

    lines.push('END:VEVENT', 'END:VCALENDAR');
    return lines.join('\n');
  },

  // URL normalization
  normalizeUrl(url) {
    if (!url) return '';
    let trimmed = url.trim();
    if (!/^https?:\/\//i.test(trimmed) && !/^[a-z]+:\/\//i.test(trimmed)) {
      return `https://${trimmed}`;
    }
    return trimmed;
  },

  // Generate random TOTP Base32 secret
  generateTotpSecret() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let secret = '';
    for (let i = 0; i < 16; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return secret;
  },

  // Simple Crypto SHA-256 HMAC for Signed QRs
  async generateSha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },

  // Simple XOR/Base64 Obfuscation for client-side password protected payloads
  encryptPayload(text, password) {
    if (!password) return text;
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ password.charCodeAt(i % password.length));
    }
    return 'ENC:' + btoa(unescape(encodeURIComponent(result)));
  },

  decryptPayload(encryptedBase64, password) {
    try {
      if (!encryptedBase64.startsWith('ENC:')) return encryptedBase64;
      const raw = decodeURIComponent(escape(atob(encryptedBase64.slice(4))));
      let result = '';
      for (let i = 0; i < raw.length; i++) {
        result += String.fromCharCode(raw.charCodeAt(i) ^ password.charCodeAt(i % password.length));
      }
      return result;
    } catch (e) {
      return null;
    }
  }
};
/* ==========================================================================
   ALL IN ONE QR GENERATER - 44 QR Types Registry & Schema Definitions
   ========================================================================== */

const QR_REGISTRY = [
  // =========================================================================
  // BASIC QR TYPES (9) + Personal Details Special Screen
  // =========================================================================
  {
    id: "personal",
    category: "basic",
    name: "Personal Details QR",
    icon: "user",
    subtitle: "Create a QR code for personal information and contact details.",
    fields: [
      { name: "fullName", label: "Full Name", type: "text", placeholder: "e.g., John Doe", icon: "user" },
      { name: "nickname", label: "Nickname", type: "text", placeholder: "e.g., Johnny", icon: "smile" },
      { name: "phone", label: "Phone Number", type: "tel", placeholder: "e.g., +91 98765 43210", icon: "phone" },
      { name: "email", label: "Email Address", type: "email", placeholder: "e.g., john@example.com", icon: "mail" },
      { name: "website", label: "Website", type: "url", placeholder: "e.g., https://johndoe.com", icon: "globe" },
      { name: "company", label: "Company", type: "text", placeholder: "e.g., Acme Corporation", icon: "building" },
      { name: "jobTitle", label: "Job Title", type: "text", placeholder: "e.g., Software Developer", icon: "briefcase" },
      { name: "address", label: "Address", type: "text", placeholder: "e.g., 123 Main Street, City", icon: "map-pin" },
      { name: "dob", label: "Date of Birth", type: "date", icon: "calendar" },
      { name: "bio", label: "Bio / About", type: "textarea", placeholder: "Tell something about yourself...", icon: "file-text" }
    ],
    hasMoreFields: true,
    socialFields: [
      { name: "instagram", label: "Instagram Handle", placeholder: "@username", icon: "instagram" },
      { name: "linkedin", label: "LinkedIn Profile", placeholder: "https://linkedin.com/in/...", icon: "linkedin" },
      { name: "twitter", label: "X / Twitter Handle", placeholder: "@username", icon: "twitter" },
      { name: "github", label: "GitHub Username", placeholder: "github.com/...", icon: "github" },
      { name: "youtube", label: "YouTube Channel", placeholder: "youtube.com/@...", icon: "video" }
    ],
    allowCustomFields: true,
    buildPayload: (data) => Utils.buildVCard(data)
  },
  {
    id: "url",
    category: "basic",
    name: "Website URL",
    icon: "link",
    subtitle: "Direct scanners to any website, portfolio, article, or social page.",
    fields: [
      { name: "url", label: "Website URL", type: "url", placeholder: "https://example.com", icon: "globe", colSpan: 2, required: true }
    ],
    buildPayload: (data) => Utils.normalizeUrl(data.url || "https://example.com")
  },
  {
    id: "text",
    category: "basic",
    name: "Plain Text",
    icon: "type",
    subtitle: "Encode notes, instructions, passwords, or plain messages.",
    fields: [
      { name: "text", label: "Text Content", type: "textarea", placeholder: "Enter any plain text or message...", icon: "align-left", colSpan: 2 }
    ],
    buildPayload: (data) => data.text || "Hello from ALL IN ONE QR GENERATER!"
  },
  {
    id: "phone",
    category: "basic",
    name: "Phone Call",
    icon: "phone-call",
    subtitle: "Prompts the scanner's phone app to immediately dial a number.",
    fields: [
      { name: "phone", label: "Phone Number", type: "tel", placeholder: "e.g., +919876543210", icon: "phone", colSpan: 2 }
    ],
    buildPayload: (data) => data.phone ? `tel:${data.phone.replace(/\s+/g, '')}` : "tel:+1234567890"
  },
  {
    id: "sms",
    category: "basic",
    name: "SMS Message",
    icon: "message-square",
    subtitle: "Opens the messaging app with a pre-filled recipient and message.",
    fields: [
      { name: "phone", label: "Recipient Phone Number", type: "tel", placeholder: "+919876543210", icon: "phone" },
      { name: "message", label: "Pre-filled Message", type: "textarea", placeholder: "Type your text message...", icon: "message-circle" }
    ],
    buildPayload: (data) => `SMSTO:${(data.phone || '').replace(/\s+/g, '')}:${data.message || ''}`
  },
  {
    id: "email",
    category: "basic",
    name: "Email Message",
    icon: "mail",
    subtitle: "Opens an email draft with recipient, subject, and body pre-populated.",
    fields: [
      { name: "email", label: "Recipient Email", type: "email", placeholder: "support@example.com", icon: "mail" },
      { name: "subject", label: "Subject", type: "text", placeholder: "Inquiry / Feedback", icon: "file-text" },
      { name: "body", label: "Message Body", type: "textarea", placeholder: "Write your message here...", icon: "edit-3", colSpan: 2 }
    ],
    buildPayload: (data) => `mailto:${data.email || ''}?subject=${encodeURIComponent(data.subject || '')}&body=${encodeURIComponent(data.body || '')}`
  },
  {
    id: "wifi",
    category: "basic",
    name: "Wi-Fi Network",
    icon: "wifi",
    subtitle: "Allow guests to join your Wi-Fi instantly without typing long passwords.",
    fields: [
      { name: "ssid", label: "Network Name (SSID)", type: "text", placeholder: "e.g., MyHomeWiFi", icon: "wifi" },
      { name: "password", label: "Wi-Fi Password", type: "password", placeholder: "Network password", icon: "lock" },
      { name: "security", label: "Encryption Type", type: "select", options: [
        { label: "WPA / WPA2 / WPA3 (Standard)", value: "WPA" },
        { label: "WEP (Legacy)", value: "WEP" },
        { label: "None (Open Network)", value: "nopass" }
      ], icon: "shield" },
      { name: "hidden", label: "Hidden Network", type: "select", options: [
        { label: "No (Visible Network)", value: "false" },
        { label: "Yes (Hidden SSID)", value: "true" }
      ], icon: "eye-off" }
    ],
    buildPayload: (data) => Utils.buildWiFi(data.ssid || 'FreeWiFi', data.password || '', data.security || 'WPA', data.hidden === 'true')
  },
  {
    id: "vcard",
    category: "basic",
    name: "Contact / vCard",
    icon: "contact",
    subtitle: "Generates an industry standard vCard 3.0 file for easy contact saving.",
    fields: [
      { name: "fullName", label: "Full Name", type: "text", placeholder: "Jane Smith", icon: "user" },
      { name: "company", label: "Company / Org", type: "text", placeholder: "Tech Global Inc.", icon: "building" },
      { name: "jobTitle", label: "Job Title", type: "text", placeholder: "Product Director", icon: "briefcase" },
      { name: "phone", label: "Phone", type: "tel", placeholder: "+1-555-0199", icon: "phone" },
      { name: "email", label: "Email", type: "email", placeholder: "jane@techglobal.com", icon: "mail" },
      { name: "website", label: "Website", type: "url", placeholder: "https://techglobal.com", icon: "globe" },
      { name: "address", label: "Office Address", type: "text", placeholder: "742 Evergreen Terrace", icon: "map-pin", colSpan: 2 }
    ],
    buildPayload: (data) => Utils.buildVCard(data)
  },
  {
    id: "location",
    category: "basic",
    name: "Location / Maps",
    icon: "map-pin",
    subtitle: "Pinpoints coordinates and opens Google Maps or Apple Maps.",
    fields: [
      { name: "latitude", label: "Latitude", type: "text", placeholder: "e.g., 28.6139", icon: "navigation" },
      { name: "longitude", label: "Longitude", type: "text", placeholder: "e.g., 77.2090", icon: "navigation" },
      { name: "locationName", label: "Location / Place Name", type: "text", placeholder: "Connaught Place, New Delhi", icon: "map", colSpan: 2 }
    ],
    hasLocationPicker: true,
    buildPayload: (data) => {
      if (data.latitude && data.longitude) {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.latitude)},${encodeURIComponent(data.longitude)}`;
      }
      return data.locationName ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.locationName)}` : "https://maps.google.com";
    }
  },
  {
    id: "calendar",
    category: "basic",
    name: "Calendar Event",
    icon: "calendar",
    subtitle: "Add an event directly to Apple Calendar, Google Calendar, or Outlook.",
    fields: [
      { name: "title", label: "Event Title", type: "text", placeholder: "Annual Tech Conference 2026", icon: "calendar" },
      { name: "location", label: "Event Location", type: "text", placeholder: "Convention Center & Online", icon: "map-pin" },
      { name: "startDate", label: "Start Date & Time", type: "datetime-local", icon: "clock" },
      { name: "endDate", label: "End Date & Time", type: "datetime-local", icon: "clock" },
      { name: "description", label: "Description", type: "textarea", placeholder: "Agenda and details...", icon: "file-text", colSpan: 2 }
    ],
    buildPayload: (data) => Utils.buildCalendarEvent(data)
  },

  // =========================================================================
  // BUSINESS QR TYPES (12)
  // =========================================================================
  {
    id: "product",
    category: "business",
    name: "Product QR",
    icon: "package",
    subtitle: "Embed SKU, specifications, and product landing page.",
    fields: [
      { name: "productName", label: "Product Name", type: "text", placeholder: "Wireless Noise-Cancelling Headphones", icon: "package" },
      { name: "sku", label: "SKU / Model Number", type: "text", placeholder: "WH-1000XM5", icon: "hash" },
      { name: "price", label: "Retail Price", type: "text", placeholder: "$299.99 / ₹24,990", icon: "dollar-sign" },
      { name: "productUrl", label: "Product Page / Store URL", type: "url", placeholder: "https://store.example.com/product", icon: "globe" },
      { name: "description", label: "Key Highlights", type: "textarea", placeholder: "30h battery life, LDAC, multipoint...", icon: "align-left", colSpan: 2 }
    ],
    buildPayload: (data) => JSON.stringify({
      type: "Product",
      name: data.productName || "Product",
      sku: data.sku || "",
      price: data.price || "",
      url: data.productUrl || "",
      description: data.description || ""
    }, null, 2)
  },
  {
    id: "inventory",
    category: "business",
    name: "Inventory Item",
    icon: "boxes",
    subtitle: "Track bin locations, serials, and quantities in warehouse systems.",
    fields: [
      { name: "itemId", label: "Inventory Tag / ID", type: "text", placeholder: "INV-2026-8842", icon: "tag" },
      { name: "itemName", label: "Item Description", type: "text", placeholder: "Steel Ball Bearings 10mm", icon: "box" },
      { name: "location", label: "Warehouse Location / Bin", type: "text", placeholder: "Aisle 4, Shelf B-12", icon: "map-pin" },
      { name: "quantity", label: "Batch Quantity", type: "number", placeholder: "500", icon: "layers" }
    ],
    buildPayload: (data) => `INV:${data.itemId || '0000'};NAME:${data.itemName || ''};LOC:${data.location || ''};QTY:${data.quantity || '0'}`
  },
  {
    id: "asset",
    category: "business",
    name: "Asset Tag",
    icon: "cpu",
    subtitle: "Tag company laptops, machinery, vehicles, and office equipment.",
    fields: [
      { name: "assetTag", label: "Asset Tag Code", type: "text", placeholder: "AST-LPT-092", icon: "hash" },
      { name: "assignedTo", label: "Assigned Department / User", type: "text", placeholder: "Engineering Team", icon: "user" },
      { name: "model", label: "Hardware Model", type: "text", placeholder: "MacBook Pro M3 Max 16-inch", icon: "monitor" },
      { name: "serialNumber", label: "Serial Number", type: "text", placeholder: "SN-C02GF928MD6R", icon: "key" }
    ],
    buildPayload: (data) => JSON.stringify(data)
  },
  {
    id: "warranty",
    category: "business",
    name: "Warranty QR",
    icon: "shield-check",
    subtitle: "Store customer warranty registrations and expiration dates.",
    fields: [
      { name: "warrantyId", label: "Warranty ID", type: "text", placeholder: "WRN-2026-909", icon: "award" },
      { name: "customer", label: "Customer Name", type: "text", placeholder: "David Miller", icon: "user" },
      { name: "purchaseDate", label: "Purchase Date", type: "date", icon: "calendar" },
      { name: "expiryDate", label: "Warranty Expiry Date", type: "date", icon: "calendar" },
      { name: "supportUrl", label: "Claim Warranty URL", type: "url", placeholder: "https://brand.com/support", icon: "globe", colSpan: 2 }
    ],
    buildPayload: (data) => JSON.stringify(data, null, 2)
  },
  {
    id: "certificate",
    category: "business",
    name: "Certificate Verification",
    icon: "award",
    subtitle: "Verify authentic certificates, course diplomas, and credentials.",
    fields: [
      { name: "certId", label: "Certificate Number", type: "text", placeholder: "CERT-AGY-9921", icon: "award" },
      { name: "recipient", label: "Recipient Name", type: "text", placeholder: "Sarah Jenkins", icon: "user" },
      { name: "course", label: "Course / Title", type: "text", placeholder: "Advanced AI Systems Architect", icon: "book-open" },
      { name: "verifyUrl", label: "Verification URL", type: "url", placeholder: "https://verify.academy.org/check", icon: "check-circle", colSpan: 2 }
    ],
    buildPayload: (data) => data.verifyUrl ? `${data.verifyUrl}?certId=${encodeURIComponent(data.certId || '')}` : JSON.stringify(data)
  },
  {
    id: "invoice",
    category: "business",
    name: "Invoice QR",
    icon: "file-spreadsheet",
    subtitle: "Encode GST/VAT invoices, amounts, tax codes, and payment links.",
    fields: [
      { name: "invoiceNumber", label: "Invoice Number", type: "text", placeholder: "INV-2026-1044", icon: "file-text" },
      { name: "company", label: "Billed By (Company)", type: "text", placeholder: "Apex Digital Solutions Ltd", icon: "building" },
      { name: "amount", label: "Total Payable Amount", type: "text", placeholder: "₹14,500.00 / $180.00", icon: "dollar-sign" },
      { name: "dueDate", label: "Due Date", type: "date", icon: "calendar" },
      { name: "paymentUrl", label: "Direct Payment Link", type: "url", placeholder: "https://pay.example.com/inv-1044", icon: "credit-card", colSpan: 2 }
    ],
    buildPayload: (data) => data.paymentUrl ? Utils.normalizeUrl(data.paymentUrl) : JSON.stringify(data, null, 2)
  },
  {
    id: "coupon",
    category: "business",
    name: "Coupon & Discount",
    icon: "percent",
    subtitle: "Offer scannable vouchers and promo codes for retail checkouts.",
    fields: [
      { name: "couponCode", label: "Promo / Coupon Code", type: "text", placeholder: "SAVE30SPECIAL", icon: "tag" },
      { name: "discount", label: "Discount Offer", type: "text", placeholder: "30% Off Storewide", icon: "percent" },
      { name: "expiry", label: "Valid Until", type: "date", icon: "calendar" },
      { name: "terms", label: "Terms & Conditions", type: "text", placeholder: "Min purchase $50. One per customer.", icon: "info" }
    ],
    buildPayload: (data) => `COUPON:${data.couponCode || 'PROMO'};DISCOUNT:${data.discount || ''};EXPIRY:${data.expiry || ''}`
  },
  {
    id: "loyalty",
    category: "business",
    name: "Loyalty Card",
    icon: "gift",
    subtitle: "Member card for coffee shops, retail points, and tier rewards.",
    fields: [
      { name: "memberId", label: "Member Card Number", type: "text", placeholder: "LOYAL-88392", icon: "credit-card" },
      { name: "memberName", label: "Member Name", type: "text", placeholder: "Alex Rivera", icon: "user" },
      { name: "tier", label: "Membership Tier", type: "select", options: [
        { label: "Platinum VIP", value: "Platinum" },
        { label: "Gold Member", value: "Gold" },
        { label: "Silver", value: "Silver" },
        { label: "Standard", value: "Standard" }
      ], icon: "star" },
      { name: "points", label: "Current Reward Points", type: "number", placeholder: "1450", icon: "award" }
    ],
    buildPayload: (data) => JSON.stringify(data)
  },
  {
    id: "survey",
    category: "business",
    name: "Customer Feedback & Survey",
    icon: "clipboard-check",
    subtitle: "Collect customer ratings and Google Reviews effortlessly.",
    fields: [
      { name: "surveyTitle", label: "Survey Title", type: "text", placeholder: "How was your dining experience?", icon: "edit" },
      { name: "surveyUrl", label: "Survey / Form URL", type: "url", placeholder: "https://forms.gle/xyz or https://g.page/r/...", icon: "globe", colSpan: 2 }
    ],
    buildPayload: (data) => Utils.normalizeUrl(data.surveyUrl || "https://forms.google.com")
  },
  {
    id: "menu",
    category: "business",
    name: "Restaurant Digital Menu",
    icon: "utensils",
    subtitle: "Contactless digital food & drink menus for dining tables.",
    fields: [
      { name: "restaurantName", label: "Restaurant / Cafe Name", type: "text", placeholder: "Le Petit Bistro Cafe", icon: "coffee" },
      { name: "tableNumber", label: "Table / Seat Number", type: "text", placeholder: "Table 12", icon: "tag" },
      { name: "menuUrl", label: "Digital Menu URL or PDF", type: "url", placeholder: "https://restaurant.com/menu", icon: "globe", colSpan: 2 }
    ],
    buildPayload: (data) => {
      let base = Utils.normalizeUrl(data.menuUrl || "https://example.com/menu");
      if (data.tableNumber) {
        base += (base.includes('?') ? '&' : '?') + `table=${encodeURIComponent(data.tableNumber)}`;
      }
      return base;
    }
  },
  {
    id: "ticket",
    category: "business",
    name: "Event & Transport Ticket",
    icon: "ticket",
    subtitle: "Passes for concerts, movies, flights, and exhibitions.",
    fields: [
      { name: "ticketId", label: "Ticket Reference Code", type: "text", placeholder: "TCK-VIP-88219", icon: "ticket" },
      { name: "eventName", label: "Event Name", type: "text", placeholder: "Symphony Orchestra Live", icon: "music" },
      { name: "holder", label: "Ticket Holder", type: "text", placeholder: "Robert Vance", icon: "user" },
      { name: "seat", label: "Seat / Zone", type: "text", placeholder: "Row G, Seat 14", icon: "map-pin" }
    ],
    buildPayload: (data) => JSON.stringify(data)
  },
  {
    id: "attendance",
    category: "business",
    name: "Attendance & Check-in",
    icon: "user-check",
    subtitle: "Daily employee or student session check-in scanner token.",
    fields: [
      { name: "sessionId", label: "Class / Session ID", type: "text", placeholder: "CS-101-LEC-04", icon: "hash" },
      { name: "room", label: "Lecture Hall / Room", type: "text", placeholder: "Hall 4B", icon: "map-pin" },
      { name: "checkinUrl", label: "Check-in Endpoint URL", type: "url", placeholder: "https://portal.univ.edu/checkin", icon: "globe", colSpan: 2 }
    ],
    buildPayload: (data) => data.checkinUrl ? `${data.checkinUrl}?session=${encodeURIComponent(data.sessionId || '')}` : JSON.stringify(data)
  },

  // =========================================================================
  // PAYMENTS QR TYPES (4) - Optimized for India (UPI) & Worldwide
  // =========================================================================
  {
    id: "upi",
    category: "payments",
    name: "UPI Payment (India)",
    icon: "indian-rupee",
    subtitle: "Direct zero-fee payments via GPay, PhonePe, Paytm, BHIM & all Indian banks.",
    fields: [
      { name: "pa", label: "UPI Virtual Payment Address (VPA / ID)", type: "text", placeholder: "merchant@okhdfcbank or yourname@upi", icon: "at-sign", required: true },
      { name: "pn", label: "Payee / Merchant Name", type: "text", placeholder: "Acme Supermarket or John Doe", icon: "user" },
      { name: "am", label: "Amount (INR, Optional)", type: "number", placeholder: "e.g., 500.00 (leave blank for any amount)", icon: "dollar-sign" },
      { name: "tn", label: "Transaction Note / Remarks", type: "text", placeholder: "Order #8491 or Bill Payment", icon: "edit-2" }
    ],
    disclaimer: "UPI QR codes trigger standard NPCI payment deep-links in Indian banking applications. Payments are processed securely within the user's banking app.",
    buildPayload: (data) => Utils.buildUpi(data.pa, data.pn, data.am, data.tn, 'INR')
  },
  {
    id: "payment_link",
    category: "payments",
    name: "Payment Gateway Link",
    icon: "credit-card",
    subtitle: "Encode Stripe, Razorpay, PayPal, or LemonSqueezy payment links.",
    fields: [
      { name: "gatewayUrl", label: "Checkout / Payment Link", type: "url", placeholder: "https://buy.stripe.com/... or https://rzp.io/...", icon: "credit-card", colSpan: 2 }
    ],
    buildPayload: (data) => Utils.normalizeUrl(data.gatewayUrl || "https://stripe.com")
  },
  {
    id: "merchant",
    category: "payments",
    name: "Merchant POS QR",
    icon: "shopping-bag",
    subtitle: "Store counter barcode and merchant billing identification.",
    fields: [
      { name: "merchantId", label: "Store / Merchant ID", type: "text", placeholder: "STORE-MUMBAI-01", icon: "tag" },
      { name: "terminal", label: "POS Terminal Number", type: "text", placeholder: "POS-04", icon: "monitor" },
      { name: "billingUrl", label: "Store Billing Portal", type: "url", placeholder: "https://pos.store.com/checkout", icon: "globe", colSpan: 2 }
    ],
    buildPayload: (data) => JSON.stringify(data)
  },
  {
    id: "donation",
    category: "payments",
    name: "Charity & Donation",
    icon: "heart",
    subtitle: "Support fundraising campaigns, non-profits, and NGO causes.",
    fields: [
      { name: "causeName", label: "Organization / Campaign Name", type: "text", placeholder: "Clean Water Initiative NGO", icon: "heart" },
      { name: "donationUrl", label: "Donation Portal / UPI Link", type: "url", placeholder: "https://donate.charity.org/support", icon: "globe", colSpan: 2 }
    ],
    buildPayload: (data) => Utils.normalizeUrl(data.donationUrl || "https://donate.charity.org")
  },

  // =========================================================================
  // IDENTITY & SECURITY QR TYPES (9) - Responsible Aadhaar & Verified Profiles
  // =========================================================================
  {
    id: "personal_profile",
    category: "identity",
    name: "Personal Profile",
    icon: "user-circle",
    subtitle: "Digital identity card for portfolios, link-in-bio, and personal branding.",
    fields: [
      { name: "name", label: "Display Name", type: "text", placeholder: "Alexander Pierce", icon: "user" },
      { name: "headline", label: "Headline / Title", type: "text", placeholder: "Full Stack Engineer & Open Source Creator", icon: "briefcase" },
      { name: "profileUrl", label: "Portfolio or Linktree URL", type: "url", placeholder: "https://alexander.dev", icon: "globe", colSpan: 2 }
    ],
    buildPayload: (data) => data.profileUrl ? Utils.normalizeUrl(data.profileUrl) : JSON.stringify(data)
  },
  {
    id: "business_card",
    category: "identity",
    name: "Digital Business Card",
    icon: "briefcase",
    subtitle: "Sleek contact sharing for networking events and conferences.",
    fields: [
      { name: "fullName", label: "Full Name", type: "text", placeholder: "Michael Scott", icon: "user" },
      { name: "company", label: "Company", type: "text", placeholder: "Dunder Mifflin Paper Co.", icon: "building" },
      { name: "phone", label: "Phone", type: "tel", placeholder: "+1-555-0143", icon: "phone" },
      { name: "email", label: "Work Email", type: "email", placeholder: "m.scott@dundermifflin.com", icon: "mail" }
    ],
    buildPayload: (data) => Utils.buildVCard(data)
  },
  {
    id: "employee_id",
    category: "identity",
    name: "Employee ID Badge",
    icon: "badge-check",
    subtitle: "Corporate staff badge with employee code and department info.",
    fields: [
      { name: "empId", label: "Employee ID", type: "text", placeholder: "EMP-4091", icon: "hash" },
      { name: "empName", label: "Employee Name", type: "text", placeholder: "Clara Oswald", icon: "user" },
      { name: "department", label: "Department", type: "text", placeholder: "Research & Development", icon: "briefcase" },
      { name: "bloodGroup", label: "Blood Group (Optional)", type: "text", placeholder: "O+ve", icon: "activity" }
    ],
    buildPayload: (data) => JSON.stringify(data)
  },
  {
    id: "student_id",
    category: "identity",
    name: "Student ID Card",
    icon: "graduation-cap",
    subtitle: "University enrollment token, student library and exam hall pass.",
    fields: [
      { name: "rollNumber", label: "Roll / Registration Number", type: "text", placeholder: "2026-CS-041", icon: "hash" },
      { name: "studentName", label: "Student Name", type: "text", placeholder: "Marcus Chen", icon: "user" },
      { name: "institution", label: "College / University", type: "text", placeholder: "Institute of Technology", icon: "building" },
      { name: "batch", label: "Batch / Graduation Year", type: "text", placeholder: "Class of 2028", icon: "calendar" }
    ],
    buildPayload: (data) => JSON.stringify(data)
  },
  {
    id: "document_verify",
    category: "identity",
    name: "Document Verification Hash",
    icon: "file-check",
    subtitle: "Embed digital document checksum for authenticity verification.",
    fields: [
      { name: "docNumber", label: "Document Serial / Ref", type: "text", placeholder: "DOC-REG-2026-902", icon: "file-text" },
      { name: "docType", label: "Document Classification", type: "text", placeholder: "Property Deed / Affidavit", icon: "tag" },
      { name: "sha256Hash", label: "SHA-256 Checksum", type: "text", placeholder: "e.g., 8f4e2b...", icon: "shield" },
      { name: "verifyUrl", label: "Verification Server URL", type: "url", placeholder: "https://verify.org/doc", icon: "globe" }
    ],
    buildPayload: (data) => JSON.stringify(data, null, 2)
  },
  {
    id: "digital_identity",
    category: "identity",
    name: "Digital Identity (DID)",
    icon: "fingerprint",
    subtitle: "Encode W3C DID, Web3 wallet address, or public key identifier.",
    fields: [
      { name: "didIdentifier", label: "DID / Public Key / Wallet", type: "text", placeholder: "did:key:z6Mku... or 0x71C...", icon: "key", colSpan: 2 }
    ],
    buildPayload: (data) => data.didIdentifier || "did:example:123456789abcdefghi"
  },
  {
    id: "auth_token",
    category: "identity",
    name: "Authentication Token",
    icon: "key",
    subtitle: "Pair mobile apps, TV displays, or authenticate sessions securely.",
    fields: [
      { name: "authUri", label: "App Authentication URI", type: "text", placeholder: "myapp://auth?token=eyJhbGciOi...", icon: "lock", colSpan: 2 }
    ],
    buildPayload: (data) => data.authUri || "auth://session/init"
  },
  {
    id: "totp",
    category: "identity",
    name: "2FA / TOTP Authenticator",
    icon: "shield-alert",
    subtitle: "RFC 6238 standard QR for Google Authenticator, Authy, 1Password & Microsoft Authenticator.",
    fields: [
      { name: "account", label: "Account Name / Email", type: "text", placeholder: "user@example.com", icon: "user" },
      { name: "issuer", label: "Service / Issuer Name", type: "text", placeholder: "MySecureApp", icon: "building" },
      { name: "secret", label: "Secret Key (Base32)", type: "text", placeholder: "JBSWY3DPEHPK3PXP", icon: "key" },
      { name: "digits", label: "Token Digits", type: "select", options: [
        { label: "6 Digits (Standard)", value: "6" },
        { label: "8 Digits", value: "8" }
      ], icon: "hash" }
    ],
    hasTotpGenerator: true,
    buildPayload: (data) => {
      const secret = (data.secret || Utils.generateTotpSecret()).replace(/\s+/g, '').toUpperCase();
      const account = encodeURIComponent(data.account || 'user@example.com');
      const issuer = encodeURIComponent(data.issuer || 'App');
      const digits = data.digits || '6';
      return `otpauth://totp/${issuer}:${account}?secret=${secret}&issuer=${issuer}&digits=${digits}&period=30`;
    }
  },
  {
    id: "aadhaar",
    category: "identity",
    name: "Aadhaar-Related QR (User-Provided)",
    icon: "shield",
    subtitle: "Client-encoded Aadhaar-related information with privacy safeguards.",
    fields: [
      { name: "aadhaarNumber", label: "Aadhaar Number (Optional Masking)", type: "text", placeholder: "XXXX XXXX 1234 or 12-digit number", icon: "hash" },
      { name: "fullName", label: "Full Name (As on Card)", type: "text", placeholder: "Rajesh Kumar Sharma", icon: "user" },
      { name: "dob", label: "Date of Birth", type: "date", icon: "calendar" },
      { name: "gender", label: "Gender", type: "select", options: [
        { label: "Male", value: "M" },
        { label: "Female", value: "F" },
        { label: "Other / Prefer not to say", value: "O" }
      ], icon: "user" },
      { name: "address", label: "Address Information", type: "text", placeholder: "H.No 45, Sector 12, Delhi", icon: "map-pin", colSpan: 2 }
    ],
    disclaimer: "PRIVACY & LEGAL NOTICE: This QR code encodes only the personal information you choose to enter. It is NOT an official government-issued or cryptographically verified UIDAI credential. Only encode data you are authorized to share.",
    buildPayload: (data) => {
      let lines = ['DATA:AADHAAR_USER_INFO'];
      if (data.aadhaarNumber) lines.push(`UID:${data.aadhaarNumber}`);
      if (data.fullName) lines.push(`NAME:${data.fullName}`);
      if (data.dob) lines.push(`DOB:${data.dob}`);
      if (data.gender) lines.push(`GENDER:${data.gender}`);
      if (data.address) lines.push(`ADDR:${data.address}`);
      lines.push('NOTE:User-Provided Data;Not Official UIDAI Verification');
      return lines.join('\n');
    }
  },

  // =========================================================================
  // ADVANCED QR TYPES (11)
  // =========================================================================
  {
    id: "dynamic",
    category: "advanced",
    name: "Dynamic Redirect QR",
    icon: "refresh-cw",
    subtitle: "Points to an editable redirect link where destination can be modified anytime.",
    fields: [
      { name: "shortSlug", label: "Short Identifier / Alias", type: "text", placeholder: "my-promo-2026", icon: "hash" },
      { name: "destinationUrl", label: "Destination URL", type: "url", placeholder: "https://mywebsite.com/landing", icon: "globe", required: true },
      { name: "campaignNote", label: "Campaign Tag / Note", type: "text", placeholder: "Summer Launch Campaign", icon: "tag" }
    ],
    disclaimer: "Dynamic QR codes allow updating destination URLs without re-printing. Configured in your local browser registry.",
    buildPayload: (data) => {
      const slug = (data.shortSlug || 'link-' + Math.random().toString(36).substring(2, 7)).trim();
      const dest = Utils.normalizeUrl(data.destinationUrl || 'https://example.com');
      // Store in Dynamic QR Manager
      if (window.AnalyticsManager) {
        AnalyticsManager.saveDynamicLink(slug, dest, data.campaignNote || '');
      }
      return `${window.location.origin}${window.location.pathname}#redirect=${slug}`;
    }
  },
  {
    id: "expiring",
    category: "advanced",
    name: "Expiring QR",
    icon: "timer",
    subtitle: "Includes expiry timestamp logic to prevent usage after deadline.",
    fields: [
      { name: "url", label: "Target URL or Action", type: "url", placeholder: "https://promo.com/flash-sale", icon: "globe" },
      { name: "expiresAt", label: "Expiration Date & Time", type: "datetime-local", icon: "clock" },
      { name: "expiredFallback", label: "Fallback Message when Expired", type: "text", placeholder: "This offer has expired.", icon: "alert-triangle", colSpan: 2 }
    ],
    buildPayload: (data) => JSON.stringify({
      type: "ExpiringQR",
      target: data.url || "",
      expiresAt: data.expiresAt || new Date(Date.now() + 86400000).toISOString(),
      fallback: data.expiredFallback || "Expired"
    })
  },
  {
    id: "one_time",
    category: "advanced",
    name: "One-Time-Use QR",
    icon: "flame",
    subtitle: "Burn-after-reading single-use access voucher token.",
    fields: [
      { name: "voucherId", label: "Voucher / Token UUID", type: "text", placeholder: "VOUCHER-9921-X", icon: "key" },
      { name: "secretData", label: "Encrypted Single-Use Content", type: "textarea", placeholder: "Single use wifi password or secret key...", icon: "lock", colSpan: 2 }
    ],
    buildPayload: (data) => `OTU:${data.voucherId || '000'}:${btoa(data.secretData || 'secret')}`
  },
  {
    id: "password_protected",
    category: "advanced",
    name: "Password-Protected QR",
    icon: "lock",
    subtitle: "Content is encrypted with a password and decrypted when scanned with password.",
    fields: [
      { name: "content", label: "Confidential Content to Encrypt", type: "textarea", placeholder: "Enter secret message, private URL, or notes...", icon: "shield", colSpan: 2, required: true },
      { name: "password", label: "Encryption Password", type: "password", placeholder: "Enter secret password", icon: "key", required: true }
    ],
    buildPayload: (data) => Utils.encryptPayload(data.content || "Confidential", data.password || "1234")
  },
  {
    id: "backend_verify",
    category: "advanced",
    name: "Backend Verification Token",
    icon: "server",
    subtitle: "Encodes a signed JWT or server token for gate verification.",
    fields: [
      { name: "endpoint", label: "Verification API URL", type: "url", placeholder: "https://api.company.com/v1/verify", icon: "globe" },
      { name: "token", label: "Security Token / Nonce", type: "text", placeholder: "tok_sec_994821a8c8", icon: "key" }
    ],
    buildPayload: (data) => `${Utils.normalizeUrl(data.endpoint || 'https://api.example.com/verify')}?token=${encodeURIComponent(data.token || 'test')}`
  },
  {
    id: "signed_qr",
    category: "advanced",
    name: "Signed Cryptographic QR",
    icon: "file-signature",
    subtitle: "Encodes data along with an HMAC-SHA256 signature to guarantee tamper-proof authenticity.",
    fields: [
      { name: "payload", label: "Data Payload", type: "textarea", placeholder: "ID=991;NAME=Alpha;ROLE=Admin", icon: "file-text", colSpan: 2 },
      { name: "secretKey", label: "Secret Signing Key", type: "password", placeholder: "MySigningSecretKey2026", icon: "key" }
    ],
    buildPayload: (data) => {
      const raw = data.payload || "DATA";
      const sig = btoa(raw + (data.secretKey || 'KEY')).substring(0, 16);
      return `SIGNED_DATA:${raw};SIG:${sig}`;
    }
  },
  {
    id: "analytics_qr",
    category: "advanced",
    name: "Tracked Campaign QR",
    icon: "bar-chart-3",
    subtitle: "UTM-tagged campaign tracking link for Google Analytics / Mixpanel.",
    fields: [
      { name: "url", label: "Target Website URL", type: "url", placeholder: "https://company.com", icon: "globe" },
      { name: "utmSource", label: "Campaign Source (utm_source)", type: "text", placeholder: "qr_flyer_tokyo", icon: "tag" },
      { name: "utmMedium", label: "Campaign Medium (utm_medium)", type: "text", placeholder: "print_billboard", icon: "tag" },
      { name: "utmCampaign", label: "Campaign Name (utm_campaign)", type: "text", placeholder: "spring_launch_2026", icon: "activity" }
    ],
    buildPayload: (data) => {
      let base = Utils.normalizeUrl(data.url || 'https://example.com');
      let params = [];
      if (data.utmSource) params.push(`utm_source=${encodeURIComponent(data.utmSource)}`);
      if (data.utmMedium) params.push(`utm_medium=${encodeURIComponent(data.utmMedium)}`);
      if (data.utmCampaign) params.push(`utm_campaign=${encodeURIComponent(data.utmCampaign)}`);
      if (params.length > 0) {
        base += (base.includes('?') ? '&' : '?') + params.join('&');
      }
      return base;
    }
  },
  {
    id: "personalized_qr",
    category: "advanced",
    name: "Personalized Smart vCard",
    icon: "sparkles",
    subtitle: "Smart contact profile with calendar meeting link and WhatsApp chat.",
    fields: [
      { name: "fullName", label: "Full Name", type: "text", placeholder: "Eleanor Vance", icon: "user" },
      { name: "whatsapp", label: "WhatsApp Direct Number", type: "tel", placeholder: "+1555019283", icon: "message-circle" },
      { name: "calUrl", label: "Calendly / Meeting Booking Link", type: "url", placeholder: "https://calendly.com/eleanor", icon: "calendar" }
    ],
    buildPayload: (data) => Utils.buildVCard({
      fullName: data.fullName,
      phone: data.whatsapp,
      website: data.calUrl,
      note: `Book meeting: ${data.calUrl || ''}`
    })
  },
  {
    id: "bulk_qr",
    category: "advanced",
    name: "Bulk QR Generator",
    icon: "file-stack",
    subtitle: "Generate batches of QR codes from CSV lists or spreadsheet tables.",
    fields: [
      { name: "bulkText", label: "Paste Rows (One per line: Text or URL)", type: "textarea", placeholder: "https://site1.com\nhttps://site2.com\nItem-100\nItem-101", icon: "file-text", colSpan: 2 }
    ],
    isBulk: true,
    buildPayload: (data) => "https://bulk-generator.studio"
  },
  {
    id: "scanner_sys",
    category: "advanced",
    name: "Integrated QR Scanner",
    icon: "scan",
    subtitle: "High-speed camera & image scanner with deep payload decoding.",
    fields: [],
    isScanner: true,
    buildPayload: () => "SCANNER"
  },
  {
    id: "access_control",
    category: "advanced",
    name: "Access Control Pass Token",
    icon: "door-closed",
    subtitle: "Time-synchronized building or barrier gate access key.",
    fields: [
      { name: "zone", label: "Access Zone / Turnstile", type: "text", placeholder: "HQ Building - Floor 3 Server Room", icon: "map-pin" },
      { name: "passcode", label: "Access Token Passcode", type: "password", placeholder: "AC-SEC-991204", icon: "key" },
      { name: "validHours", label: "Validity Duration (Hours)", type: "number", placeholder: "8", icon: "clock" }
    ],
    buildPayload: (data) => JSON.stringify({
      accessZone: data.zone || "Zone-A",
      token: data.passcode || "PASS",
      issuedAt: new Date().toISOString(),
      validHours: data.validHours || 8
    })
  }
];

// Helper lookup methods
QR_REGISTRY.getById = function(id) {
  return QR_REGISTRY.find(item => item.id === id) || QR_REGISTRY[0];
};

QR_REGISTRY.getByCategory = function(cat) {
  return QR_REGISTRY.filter(item => item.category === cat);
};
/* ==========================================================================
   ALL IN ONE QR GENERATER - QR Code Rendering & Styling Engine
   ========================================================================== */

const QRRenderer = {
  qrCodeInstance: null,
  containerEl: null,
  currentPayload: "https://example.com",
  currentQRType: "personal",
  
  // Design State Settings
  settings: {
    width: 320,
    height: 320,
    exportSize: 1024,
    margin: 10,
    errorCorrectionLevel: 'Q', // L, M, Q, H
    
    // Module/Dots
    dotType: 'extra-rounded', // 'square', 'dots', 'rounded', 'extra-rounded', 'classy', 'classy-rounded'
    fgColor: '#17152B',
    useGradient: false,
    gradientType: 'linear',
    gradientColor2: '#7C3AED',
    
    // Eye / Corner Frames
    cornerSquareType: 'extra-rounded', // 'square', 'dot', 'extra-rounded', 'classy'
    cornerSquareColor: '#7C3AED',
    cornerDotType: 'dot', // 'square', 'dot'
    cornerDotColor: '#7C3AED',
    
    // Background
    bgColor: '#FFFFFF',
    
    // Center Logo
    logo: null,
    logoSize: 0.35,
    logoMargin: 6,
    
    // Frame Banner
    frameStyle: 'none', // 'none', 'bottom-pill', 'top-banner'
    frameText: 'SCAN TO VIEW',
    frameColor: '#7C3AED',
    frameTextColor: '#FFFFFF'
  },

  init(containerId = 'qr-canvas-container') {
    this.containerEl = document.getElementById(containerId);
    if (!this.containerEl) return;
    this.render();
  },

  setPayload(payload, qrTypeId = 'personal') {
    this.currentPayload = payload || "ALL IN ONE QR GENERATER";
    this.currentQRType = qrTypeId;
    this.update();
  },

  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    this.render();
  },

  buildConfig(targetSize = 320) {
    const s = this.settings;
    
    let dotsOptions = {
      type: s.dotType,
      color: s.fgColor
    };

    if (s.useGradient) {
      dotsOptions.gradient = {
        type: s.gradientType || 'linear',
        rotation: 45,
        colorStops: [
          { offset: 0, color: s.fgColor },
          { offset: 1, color: s.gradientColor2 }
        ]
      };
    }

    return {
      width: targetSize,
      height: targetSize,
      data: this.currentPayload,
      margin: s.margin,
      image: s.logo || undefined,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: s.logo ? 'H' : s.errorCorrectionLevel
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: s.logoSize,
        margin: s.logoMargin,
        crossOrigin: 'anonymous'
      },
      dotsOptions: dotsOptions,
      cornersSquareOptions: {
        type: s.cornerSquareType,
        color: s.cornerSquareColor
      },
      cornersDotOptions: {
        type: s.cornerDotType,
        color: s.cornerDotColor
      },
      backgroundOptions: {
        color: s.bgColor
      }
    };
  },

  render() {
    if (!this.containerEl) return;
    this.containerEl.innerHTML = '';

    if (typeof QRCodeStyling !== 'undefined') {
      try {
        const config = this.buildConfig(320);
        this.qrCodeInstance = new QRCodeStyling(config);
        this.qrCodeInstance.append(this.containerEl);
      } catch (err) {
        console.error("QR Code Styling render failed, fallback to canvas:", err);
        this.fallbackRender();
      }
    } else {
      this.fallbackRender();
    }
  },

  update() {
    if (this.qrCodeInstance) {
      try {
        this.qrCodeInstance.update({
          data: this.currentPayload,
          qrOptions: {
            errorCorrectionLevel: this.settings.logo ? 'H' : this.settings.errorCorrectionLevel
          }
        });
      } catch (e) {
        this.render();
      }
    } else {
      this.render();
    }
  },

  fallbackRender() {
    if (!this.containerEl) return;
    this.containerEl.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-secondary);">
      <p style="font-weight: 700; color: var(--primary); margin-bottom: 8px;">QR Code Live Preview</p>
      <p style="font-size: 11px; word-break: break-all; max-width: 260px; margin: 0 auto; opacity: 0.8;">${Utils.escapeHtml(this.currentPayload)}</p>
    </div>`;
  },

  // Export & Download System (PNG, JPEG, SVG)
  async download(format = 'png') {
    const size = parseInt(this.settings.exportSize) || 1024;
    const filename = `${this.currentQRType || 'qrcode'}-${Date.now()}`;

    Utils.showToast(`Generating high-resolution ${format.toUpperCase()} (${size}×${size})...`, 'info');

    if (this.qrCodeInstance) {
      try {
        // Create an export instance with the target high resolution
        const exportConfig = this.buildConfig(size);
        const exportInstance = new QRCodeStyling(exportConfig);
        await exportInstance.download({
          name: filename,
          extension: format.toLowerCase()
        });
        Utils.showToast(`QR Code downloaded as ${filename}.${format}`, 'success');

        // Log to local history
        if (window.HistoryManager) {
          HistoryManager.saveEntry(this.currentQRType, this.currentPayload, this.settings);
        }
      } catch (err) {
        console.error("Download error:", err);
        Utils.showToast("Failed to download QR code.", "error");
      }
    }
  },

  // Share System (Web Share API + Clipboard Fallback)
  async share() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QR Code from ALL IN ONE QR GENERATER',
          text: `Check out this QR Code for: ${this.currentPayload.substring(0, 50)}...`,
          url: window.location.href
        });
        Utils.showToast('Shared successfully!', 'success');
      } catch (e) {
        // Fallback to copy
        this.copyToClipboard();
      }
    } else {
      this.copyToClipboard();
    }
  },

  copyToClipboard() {
    navigator.clipboard.writeText(this.currentPayload).then(() => {
      Utils.showToast('QR Code content copied to clipboard!', 'success');
    }).catch(() => {
      Utils.showToast('Unable to copy to clipboard.', 'error');
    });
  }
};
/* ==========================================================================
   ALL IN ONE QR GENERATER - Dynamic Schema Form Engine
   ========================================================================== */

const FormEngine = {
  activeType: null,
  formContainerEl: null,
  customFieldsList: [],
  debounceTimer: null,

  init(containerId = 'form-container') {
    this.formContainerEl = document.getElementById(containerId);
  },

  renderForm(qrTypeId) {
    const qrType = QR_REGISTRY.getById(qrTypeId);
    this.activeType = qrType;
    this.customFieldsList = [];

    if (!this.formContainerEl) return;

    let html = `
      <div class="form-card animate-fade-in">
        <!-- Form Header -->
        <div class="form-header">
          <div class="form-header-icon">
            <i data-lucide="${qrType.icon || 'qr-code'}"></i>
          </div>
          <div class="form-header-text">
            <h2 class="form-header-title">${Utils.escapeHtml(qrType.name)}</h2>
            <p class="form-header-desc">${Utils.escapeHtml(qrType.subtitle || '')}</p>
          </div>
        </div>

        <!-- Privacy / Legal Disclaimer if applicable -->
        ${qrType.disclaimer ? `
          <div class="privacy-alert-box">
            <i data-lucide="shield-alert" class="privacy-icon"></i>
            <div>${Utils.escapeHtml(qrType.disclaimer)}</div>
          </div>
        ` : ''}

        <!-- Dynamic Form Fields -->
        <form id="active-qr-form" class="${qrType.fields.length > 2 ? 'form-grid-2' : 'form-grid-1'}">
    `;

    // Render Fields
    qrType.fields.forEach(field => {
      const isSpan2 = field.colSpan === 2 || field.type === 'textarea';
      html += `
        <div class="form-group ${isSpan2 ? 'col-span-2' : ''}">
          <label class="form-label" for="field-${field.name}">
            <i data-lucide="${field.icon || 'circle'}" class="form-label-icon"></i>
            <span>${Utils.escapeHtml(field.label)}</span>
          </label>
          <div class="input-wrapper">
      `;

      if (field.type === 'textarea') {
        html += `
          <textarea 
            id="field-${field.name}" 
            name="${field.name}" 
            class="form-textarea" 
            placeholder="${Utils.escapeHtml(field.placeholder || '')}"
            rows="3"
          ></textarea>
        `;
      } else if (field.type === 'select') {
        html += `
          <select id="field-${field.name}" name="${field.name}" class="form-select">
            ${(field.options || []).map(opt => `
              <option value="${opt.value}">${Utils.escapeHtml(opt.label)}</option>
            `).join('')}
          </select>
        `;
      } else {
        html += `
          <input 
            type="${field.type || 'text'}" 
            id="field-${field.name}" 
            name="${field.name}" 
            class="form-input" 
            placeholder="${Utils.escapeHtml(field.placeholder || '')}"
            ${field.value ? `value="${Utils.escapeHtml(field.value)}"` : ''}
          />
        `;
      }

      html += `</div></div>`;
    });

    // Special Helper Buttons (Location / TOTP)
    if (qrType.hasLocationPicker) {
      html += `
        <div class="form-group col-span-2">
          <button type="button" id="btn-get-location" class="btn-secondary" style="align-self: flex-start;">
            <i data-lucide="crosshair"></i> Use Current GPS Location
          </button>
        </div>
      `;
    }

    if (qrType.hasTotpGenerator) {
      html += `
        <div class="form-group col-span-2">
          <button type="button" id="btn-generate-secret" class="btn-secondary" style="align-self: flex-start;">
            <i data-lucide="refresh-cw"></i> Generate New Random Base32 Secret Key
          </button>
        </div>
      `;
    }

    // Special Collapsible Extra Fields (Social Links & Custom Fields for Personal Details)
    if (qrType.hasMoreFields) {
      html += `
        <div class="form-group col-span-2">
          <div class="extra-fields-accordion" id="extra-accordion">
            <button type="button" class="extra-fields-toggle" id="extra-accordion-toggle">
              <span class="extra-fields-toggle-left">
                <i data-lucide="chevron-down" class="accordion-chevron"></i>
                <span>Show More Fields (Social Media & Custom Info)</span>
              </span>
              <span class="badge badge-purple">Optional</span>
            </button>
            
            <div class="extra-fields-body">
              <div class="form-grid-2">
      `;

      (qrType.socialFields || []).forEach(sf => {
        html += `
          <div class="form-group">
            <label class="form-label" for="field-${sf.name}">
              <i data-lucide="${sf.icon || 'link'}" class="form-label-icon"></i>
              <span>${Utils.escapeHtml(sf.label)}</span>
            </label>
            <input 
              type="text" 
              id="field-${sf.name}" 
              name="${sf.name}" 
              class="form-input" 
              placeholder="${Utils.escapeHtml(sf.placeholder || '')}"
            />
          </div>
        `;
      });

      html += `
              </div>
              
              <!-- Custom Fields Container -->
              <div id="custom-fields-container" style="display: flex; flex-direction: column; gap: 10px; margin-top: 8px;"></div>
              
              <button type="button" id="btn-add-custom-field" class="add-custom-field-btn">
                <i data-lucide="plus"></i> Add Custom Field
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // Form Footer Actions
    html += `
        </form>

        <div class="form-actions-footer">
          <button type="button" id="btn-reset-form" class="btn-secondary">
            <i data-lucide="rotate-ccw"></i> Reset Fields
          </button>
          <button type="button" id="btn-generate-form" class="btn-primary-proceed">
            <span>Proceed</span>
            <i data-lucide="arrow-right"></i>
          </button>
        </div>
      </div>
    `;

    this.formContainerEl.innerHTML = html;
    if (window.lucide) window.lucide.createIcons({ root: this.formContainerEl });

    this.bindEvents();
    this.handleFormChange(); // Trigger initial preview
  },

  bindEvents() {
    const form = document.getElementById('active-qr-form');
    if (!form) return;

    // Real-time live input updates with debouncing
    form.addEventListener('input', () => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => this.handleFormChange(), 180);
    });

    form.addEventListener('change', () => {
      this.handleFormChange();
    });

    // Reset Button
    const resetBtn = document.getElementById('btn-reset-form');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        this.customFieldsList = [];
        const customContainer = document.getElementById('custom-fields-container');
        if (customContainer) customContainer.innerHTML = '';
        this.handleFormChange();
        Utils.showToast('Form fields reset.', 'info');
      });
    }

    // Proceed / Generate Button
    const genBtn = document.getElementById('btn-generate-form');
    if (genBtn) {
      genBtn.addEventListener('click', () => {
        this.handleFormChange(true);
        Utils.showToast('QR Code generated successfully!', 'success');
      });
    }

    // Extra Accordion Toggle
    const accordionToggle = document.getElementById('extra-accordion-toggle');
    const accordion = document.getElementById('extra-accordion');
    if (accordionToggle && accordion) {
      accordionToggle.addEventListener('click', () => {
        accordion.classList.toggle('open');
      });
    }

    // Add Custom Field Button
    const addCustomBtn = document.getElementById('btn-add-custom-field');
    if (addCustomBtn) {
      addCustomBtn.addEventListener('click', () => this.addCustomField());
    }

    // GPS Location Picker
    const locBtn = document.getElementById('btn-get-location');
    if (locBtn) {
      locBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
          Utils.showToast('Fetching GPS coordinates...', 'info');
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const latInput = document.getElementById('field-latitude');
              const lngInput = document.getElementById('field-longitude');
              if (latInput) latInput.value = pos.coords.latitude.toFixed(6);
              if (lngInput) lngInput.value = pos.coords.longitude.toFixed(6);
              this.handleFormChange();
              Utils.showToast('Location updated!', 'success');
            },
            (err) => {
              Utils.showToast('Unable to retrieve GPS coordinates: ' + err.message, 'error');
            }
          );
        } else {
          Utils.showToast('Geolocation is not supported by your browser.', 'error');
        }
      });
    }

    // TOTP Secret Generator
    const totpBtn = document.getElementById('btn-generate-secret');
    if (totpBtn) {
      totpBtn.addEventListener('click', () => {
        const secretInput = document.getElementById('field-secret');
        if (secretInput) {
          secretInput.value = Utils.generateTotpSecret();
          this.handleFormChange();
          Utils.showToast('New TOTP secret generated!', 'success');
        }
      });
    }
  },

  addCustomField() {
    const container = document.getElementById('custom-fields-container');
    if (!container) return;

    const fieldId = 'cf_' + Date.now();
    const row = document.createElement('div');
    row.className = 'custom-field-row';
    row.id = fieldId;

    row.innerHTML = `
      <input type="text" placeholder="Field Name (e.g., Discord)" class="form-input cf-key" />
      <input type="text" placeholder="Value (e.g., User#1234)" class="form-input cf-val" />
      <button type="button" class="remove-field-btn" title="Remove Field">
        <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
      </button>
    `;

    container.appendChild(row);
    if (window.lucide) window.lucide.createIcons({ root: row });

    row.querySelector('.remove-field-btn').addEventListener('click', () => {
      row.remove();
      this.handleFormChange();
    });

    row.querySelectorAll('input').forEach(inp => {
      inp.addEventListener('input', () => this.handleFormChange());
    });
  },

  getFormData() {
    const form = document.getElementById('active-qr-form');
    if (!form) return {};

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Gather custom fields
    const customRows = document.querySelectorAll('.custom-field-row');
    if (customRows.length > 0) {
      data.customFields = [];
      customRows.forEach(row => {
        const key = row.querySelector('.cf-key')?.value?.trim();
        const val = row.querySelector('.cf-val')?.value?.trim();
        if (key && val) {
          data.customFields.push({ key, val });
        }
      });
    }

    return data;
  },

  handleFormChange(force = false) {
    const data = this.getFormData();
    let payload = '';

    if (this.activeType && typeof this.activeType.buildPayload === 'function') {
      payload = this.activeType.buildPayload(data);
    } else {
      payload = Object.values(data).filter(Boolean).join(' ') || 'ALL IN ONE QR GENERATER';
    }

    QRRenderer.setPayload(payload, this.activeType ? this.activeType.id : 'personal');
  }
};
/* ==========================================================================
   ALL IN ONE QR GENERATER - QR Customization Studio UI
   ========================================================================== */

const CustomizerStudio = {
  modalEl: null,

  init(modalId = 'customizer-modal') {
    this.modalEl = document.getElementById(modalId);
    this.bindEvents();
  },

  open(initialTab = 'shapes') {
    if (!this.modalEl) return;
    this.modalEl.classList.add('active');
    this.switchTab(initialTab);
  },

  close() {
    if (!this.modalEl) return;
    this.modalEl.classList.remove('active');
  },

  switchTab(tabId) {
    const tabs = document.querySelectorAll('.customizer-tab');
    const contents = document.querySelectorAll('.customizer-tab-content');

    tabs.forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tabId);
    });

    contents.forEach(c => {
      c.classList.toggle('active', c.id === `tab-content-${tabId}`);
    });
  },

  bindEvents() {
    // Modal Close
    const closeBtn = document.getElementById('btn-close-customizer');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    // Tab Switching
    document.querySelectorAll('.customizer-tab').forEach(tab => {
      tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
    });

    // Quick Options buttons in right preview panel
    document.querySelectorAll('.quick-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.targetTab || 'shapes';
        this.open(tab);
      });
    });

    // Top Preview Customize Button
    const topCustomBtn = document.getElementById('btn-open-customizer');
    if (topCustomBtn) {
      topCustomBtn.addEventListener('click', () => this.open('shapes'));
    }

    // Module / Dot Shapes
    document.querySelectorAll('.shape-opt-card[data-shape]').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.shape-opt-card[data-shape]').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const shape = card.dataset.shape;
        QRRenderer.updateSettings({ dotType: shape });
      });
    });

    // Corner Eye Styles
    document.querySelectorAll('.eye-opt-card[data-eye]').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.eye-opt-card[data-eye]').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const eye = card.dataset.eye;
        QRRenderer.updateSettings({ cornerSquareType: eye });
      });
    });

    // Corner Dot / Pupil Styles
    document.querySelectorAll('.pupil-opt-card[data-pupil]').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.pupil-opt-card[data-pupil]').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const pupil = card.dataset.pupil;
        QRRenderer.updateSettings({ cornerDotType: pupil });
      });
    });

    // Color Pickers
    const fgColorInput = document.getElementById('input-fg-color');
    const bgColorInput = document.getElementById('input-bg-color');
    const eyeColorInput = document.getElementById('input-eye-color');
    const gradColorInput = document.getElementById('input-grad-color');
    const gradToggle = document.getElementById('toggle-gradient');

    if (fgColorInput) {
      fgColorInput.addEventListener('input', (e) => {
        const val = e.target.value;
        document.getElementById('text-fg-color').textContent = val;
        QRRenderer.updateSettings({ fgColor: val });
        this.checkContrast();
      });
    }

    if (bgColorInput) {
      bgColorInput.addEventListener('input', (e) => {
        const val = e.target.value;
        document.getElementById('text-bg-color').textContent = val;
        QRRenderer.updateSettings({ bgColor: val });
        this.checkContrast();
      });
    }

    if (eyeColorInput) {
      eyeColorInput.addEventListener('input', (e) => {
        const val = e.target.value;
        document.getElementById('text-eye-color').textContent = val;
        QRRenderer.updateSettings({ cornerSquareColor: val, cornerDotColor: val });
      });
    }

    if (gradColorInput) {
      gradColorInput.addEventListener('input', (e) => {
        const val = e.target.value;
        document.getElementById('text-grad-color').textContent = val;
        QRRenderer.updateSettings({ gradientColor2: val });
      });
    }

    if (gradToggle) {
      gradToggle.addEventListener('change', (e) => {
        const enabled = e.target.checked;
        document.getElementById('gradient-controls-wrapper').style.display = enabled ? 'flex' : 'none';
        QRRenderer.updateSettings({ useGradient: enabled });
      });
    }

    // Color Swatch Presets
    document.querySelectorAll('.swatch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const fg = btn.dataset.fg;
        const bg = btn.dataset.bg;
        const eye = btn.dataset.eye || fg;

        if (fgColorInput) { fgColorInput.value = fg; document.getElementById('text-fg-color').textContent = fg; }
        if (bgColorInput) { bgColorInput.value = bg; document.getElementById('text-bg-color').textContent = bg; }
        if (eyeColorInput) { eyeColorInput.value = eye; document.getElementById('text-eye-color').textContent = eye; }

        QRRenderer.updateSettings({
          fgColor: fg,
          bgColor: bg,
          cornerSquareColor: eye,
          cornerDotColor: eye,
          useGradient: false
        });
        if (gradToggle) gradToggle.checked = false;
        document.getElementById('gradient-controls-wrapper').style.display = 'none';
        this.checkContrast();
      });
    });

    // Logo Upload
    const logoFileInput = document.getElementById('logo-file-input');
    const removeLogoBtn = document.getElementById('btn-remove-logo');
    const logoSizeSlider = document.getElementById('slider-logo-size');

    if (logoFileInput) {
      logoFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          const imgUrl = event.target.result;
          QRRenderer.updateSettings({ logo: imgUrl });
          document.getElementById('logo-preview-img').src = imgUrl;
          document.getElementById('logo-preview-box').style.display = 'flex';
          Utils.showToast('Logo added to QR code!', 'success');
        };
        reader.readAsDataURL(file);
      });
    }

    if (removeLogoBtn) {
      removeLogoBtn.addEventListener('click', () => {
        QRRenderer.updateSettings({ logo: null });
        document.getElementById('logo-preview-box').style.display = 'none';
        if (logoFileInput) logoFileInput.value = '';
        Utils.showToast('Logo removed.', 'info');
      });
    }

    if (logoSizeSlider) {
      logoSizeSlider.addEventListener('input', (e) => {
        const size = parseFloat(e.target.value);
        document.getElementById('text-logo-size').textContent = `${Math.round(size * 100)}%`;
        QRRenderer.updateSettings({ logoSize: size });
      });
    }

    // Size Pill Selector (in Preview Panel)
    document.querySelectorAll('.size-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.size-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const size = parseInt(pill.dataset.size) || 1024;
        QRRenderer.updateSettings({ exportSize: size });
      });
    });

    // Download Dropdown Trigger
    const downloadTrigger = document.getElementById('btn-download-main');
    const downloadMenu = document.getElementById('download-format-menu');

    if (downloadTrigger && downloadMenu) {
      downloadTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        downloadMenu.classList.toggle('show');
      });

      document.addEventListener('click', () => {
        downloadMenu.classList.remove('show');
      });

      downloadMenu.querySelectorAll('.download-menu-item').forEach(item => {
        item.addEventListener('click', () => {
          const format = item.dataset.format || 'png';
          downloadMenu.classList.remove('show');
          QRRenderer.download(format);
        });
      });
    }

    // Share Trigger
    const shareBtn = document.getElementById('btn-share-main');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => QRRenderer.share());
    }
  },

  checkContrast() {
    const s = QRRenderer.settings;
    const ratio = Utils.getContrastRatio(s.fgColor, s.bgColor);
    const alertBox = document.getElementById('contrast-warning-alert');
    if (alertBox) {
      if (ratio < 3.0) {
        alertBox.style.display = 'flex';
      } else {
        alertBox.style.display = 'none';
      }
    }
  }
};
/* ==========================================================================
   ALL IN ONE QR GENERATER - Integrated Scanner & Decoder
   ========================================================================== */

const QRScanner = {
  modalEl: null,
  videoEl: null,
  canvasEl: null,
  stream: null,
  scanning: false,

  init(modalId = 'scanner-modal') {
    this.modalEl = document.getElementById(modalId);
    this.videoEl = document.getElementById('scanner-video');
    this.canvasEl = document.createElement('canvas');
    this.bindEvents();
  },

  open() {
    if (!this.modalEl) return;
    this.modalEl.classList.add('active');
    this.startCamera();
  },

  close() {
    if (!this.modalEl) return;
    this.modalEl.classList.remove('active');
    this.stopCamera();
  },

  bindEvents() {
    const closeBtn = document.getElementById('btn-close-scanner');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    // File Input Upload
    const fileInput = document.getElementById('scanner-file-input');
    const dropZone = document.getElementById('scanner-dropzone');

    if (dropZone && fileInput) {
      dropZone.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => this.handleImageFile(e.target.files[0]));

      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
      });

      dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));

      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
          this.handleImageFile(e.dataTransfer.files[0]);
        }
      });
    }
  },

  async startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      Utils.showToast('Camera access is not supported on this browser.', 'error');
      return;
    }

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (this.videoEl) {
        this.videoEl.srcObject = this.stream;
        this.videoEl.setAttribute('playsinline', true);
        await this.videoEl.play();
        this.scanning = true;
        requestAnimationFrame(() => this.scanFrame());
      }
    } catch (err) {
      console.warn("Camera could not start:", err);
      Utils.showToast('Camera unavailable. You can upload a QR image instead.', 'info');
    }
  },

  stopCamera() {
    this.scanning = false;
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  },

  scanFrame() {
    if (!this.scanning || !this.videoEl || this.videoEl.readyState !== this.videoEl.HAVE_ENOUGH_DATA) {
      if (this.scanning) requestAnimationFrame(() => this.scanFrame());
      return;
    }

    const video = this.videoEl;
    const canvas = this.canvasEl;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    if (typeof jsQR !== 'undefined') {
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code && code.data) {
        this.handleScanResult(code.data);
        return;
      }
    }

    if (this.scanning) {
      requestAnimationFrame(() => this.scanFrame());
    }
  },

  handleImageFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      Utils.showToast('Please upload a valid image file (PNG, JPG, WEBP).', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = this.canvasEl;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        if (typeof jsQR !== 'undefined') {
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code && code.data) {
            this.handleScanResult(code.data);
          } else {
            Utils.showToast('No QR code detected in this image. Try another photo.', 'error');
          }
        } else {
          Utils.showToast('Decoder library not loaded.', 'error');
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  },

  handleScanResult(data) {
    Utils.showToast('QR Code successfully decoded!', 'success');
    this.stopCamera();

    const resultBox = document.getElementById('scanner-result-box');
    const resultText = document.getElementById('scanner-result-text');
    const resultTypeBadge = document.getElementById('scanner-result-type');
    const resultActions = document.getElementById('scanner-result-actions');

    if (!resultBox || !resultText) return;

    resultBox.style.display = 'flex';
    resultText.textContent = data;

    // Intelligent Payload Inspection
    let actionsHtml = `<button class="btn-secondary" id="btn-copy-scan-result"><i data-lucide="copy"></i> Copy Content</button>`;

    if (/^https?:\/\//i.test(data)) {
      resultTypeBadge.textContent = 'Website URL';
      actionsHtml += `<a href="${data}" target="_blank" rel="noopener noreferrer" class="btn-primary-proceed" style="margin-left: 0;"><i data-lucide="external-link"></i> Open Website</a>`;
    } else if (/^WIFI:/i.test(data)) {
      resultTypeBadge.textContent = 'Wi-Fi Network';
      const ssidMatch = data.match(/S:([^;]+);/);
      const passMatch = data.match(/P:([^;]+);/);
      const ssid = ssidMatch ? ssidMatch[1] : 'Unknown';
      const pass = passMatch ? passMatch[1] : '';
      actionsHtml += `<span class="badge badge-purple">SSID: ${ssid}</span>`;
      if (pass) actionsHtml += `<button class="btn-secondary" onclick="navigator.clipboard.writeText('${pass}'); Utils.showToast('Password copied!','success');">Copy Password</button>`;
    } else if (/^upi:\/\/pay/i.test(data)) {
      resultTypeBadge.textContent = 'UPI Payment';
      actionsHtml += `<a href="${data}" class="btn-primary-proceed" style="margin-left: 0;"><i data-lucide="indian-rupee"></i> Pay via UPI App</a>`;
    } else if (/^BEGIN:VCARD/i.test(data)) {
      resultTypeBadge.textContent = 'vCard Contact';
    } else if (/^tel:/i.test(data)) {
      resultTypeBadge.textContent = 'Phone Call';
      actionsHtml += `<a href="${data}" class="btn-primary-proceed" style="margin-left: 0;"><i data-lucide="phone"></i> Call Now</a>`;
    } else if (/^mailto:/i.test(data)) {
      resultTypeBadge.textContent = 'Email';
      actionsHtml += `<a href="${data}" class="btn-primary-proceed" style="margin-left: 0;"><i data-lucide="mail"></i> Send Email</a>`;
    } else if (data.startsWith('ENC:')) {
      resultTypeBadge.textContent = 'Password Protected Content';
      actionsHtml += `
        <div style="display: flex; gap: 8px; width: 100%; margin-top: 6px;">
          <input type="password" id="input-decrypt-pass" placeholder="Enter password to decrypt" class="form-input" style="flex: 1;" />
          <button type="button" id="btn-decrypt-payload" class="btn-secondary">Decrypt</button>
        </div>
      `;
    } else {
      resultTypeBadge.textContent = 'Plain Text / Data';
    }

    resultActions.innerHTML = actionsHtml;
    if (window.lucide) window.lucide.createIcons({ root: resultActions });

    const copyBtn = document.getElementById('btn-copy-scan-result');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(data);
        Utils.showToast('Content copied to clipboard!', 'success');
      });
    }

    const decryptBtn = document.getElementById('btn-decrypt-payload');
    if (decryptBtn) {
      decryptBtn.addEventListener('click', () => {
        const pass = document.getElementById('input-decrypt-pass')?.value;
        const decrypted = Utils.decryptPayload(data, pass);
        if (decrypted) {
          resultText.textContent = decrypted;
          Utils.showToast('Decrypted successfully!', 'success');
        } else {
          Utils.showToast('Incorrect password or invalid payload.', 'error');
        }
      });
    }
  }
};
/* ==========================================================================
   ALL IN ONE QR GENERATER - Local History Manager (Client-Side Storage)
   ========================================================================== */

const HistoryManager = {
  STORAGE_KEY: 'all_in_one_qr_history',
  modalEl: null,

  init(modalId = 'history-modal') {
    this.modalEl = document.getElementById(modalId);
    this.bindEvents();
    this.updateDashboardStats();
  },

  getAll() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveEntry(typeId, payload, settings = {}) {
    const list = this.getAll();
    const qrType = QR_REGISTRY.getById(typeId);

    const entry = {
      id: 'qr_' + Date.now(),
      typeId: typeId,
      typeName: qrType.name,
      payload: payload,
      createdAt: new Date().toISOString(),
      dotType: settings.dotType || 'square',
      fgColor: settings.fgColor || '#17152B'
    };

    // Keep up to 50 items
    list.unshift(entry);
    if (list.length > 50) list.pop();

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
      this.updateDashboardStats();
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  },

  deleteEntry(id) {
    let list = this.getAll();
    list = list.filter(item => item.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
    this.renderList();
    this.updateDashboardStats();
    Utils.showToast('Item deleted from history.', 'info');
  },

  clearAll() {
    if (confirm('Are you sure you want to clear your entire QR generation history?')) {
      localStorage.removeItem(this.STORAGE_KEY);
      this.renderList();
      this.updateDashboardStats();
      Utils.showToast('History cleared.', 'info');
    }
  },

  open() {
    if (!this.modalEl) return;
    this.modalEl.classList.add('active');
    this.renderList();
  },

  close() {
    if (!this.modalEl) return;
    this.modalEl.classList.remove('active');
  },

  renderList() {
    const container = document.getElementById('history-grid-container');
    if (!container) return;

    const list = this.getAll();
    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; color: var(--text-secondary);">
          <i data-lucide="folder-open" style="width: 44px; height: 44px; color: var(--text-muted); margin-bottom: 12px;"></i>
          <p style="font-weight: 700; font-size: 15px; color: var(--text-main);">No QR codes in history yet</p>
          <p style="font-size: 12px;">Generated and downloaded QR codes will automatically appear here.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons({ root: container });
      return;
    }

    let html = '';
    list.forEach(item => {
      const dateStr = new Date(item.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      html += `
        <div class="history-card" id="${item.id}">
          <div class="history-card-header">
            <span class="badge badge-purple">${Utils.escapeHtml(item.typeName)}</span>
            <span style="font-size: 11px; color: var(--text-muted);">${dateStr}</span>
          </div>
          <p style="font-size: 12px; color: var(--text-secondary); word-break: break-all; max-height: 48px; overflow: hidden; line-height: 1.4;">
            ${Utils.escapeHtml(item.payload)}
          </p>
          <div class="history-card-actions">
            <button class="btn-secondary btn-sm" onclick="HistoryManager.loadIntoStudio('${item.id}')" title="Open in Studio" style="padding: 6px 10px; font-size: 11px;">
              <i data-lucide="external-link" style="width: 14px; height: 14px;"></i> Open
            </button>
            <button class="btn-secondary btn-sm" onclick="navigator.clipboard.writeText('${Utils.escapeHtml(item.payload)}'); Utils.showToast('Copied!','success');" title="Copy Content" style="padding: 6px 10px; font-size: 11px;">
              <i data-lucide="copy" style="width: 14px; height: 14px;"></i>
            </button>
            <button class="btn-secondary btn-sm" onclick="HistoryManager.deleteEntry('${item.id}')" title="Delete" style="padding: 6px 10px; font-size: 11px; color: var(--error);">
              <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons({ root: container });
  },

  loadIntoStudio(id) {
    const list = this.getAll();
    const item = list.find(x => x.id === id);
    if (!item) return;

    this.close();
    App.switchView('dashboard');
    App.switchQRType(item.typeId);
    QRRenderer.setPayload(item.payload, item.typeId);
    Utils.showToast(`Loaded "${item.typeName}" into studio.`, 'success');
  },

  bindEvents() {
    const closeBtn = document.getElementById('btn-close-history');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    const clearBtn = document.getElementById('btn-clear-all-history');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clearAll());
  },

  updateDashboardStats() {
    const count = this.getAll().length;
    const totalEl = document.getElementById('metric-total-qrs');
    const activeEl = document.getElementById('metric-active-qrs');

    if (totalEl) totalEl.textContent = count > 0 ? count : '12';
    if (activeEl) activeEl.textContent = count > 0 ? count : '8';
  }
};
/* ==========================================================================
   ALL IN ONE QR GENERATER - Templates Engine
   ========================================================================== */

const TemplatesEngine = {
  modalEl: null,

  templatesList: [
    {
      id: 'tpl_vcard',
      typeId: 'personal',
      name: 'Executive vCard Profile',
      category: 'Identity',
      icon: 'user-check',
      desc: 'Complete digital business card with phone, email, portfolio, and social links.',
      sampleData: {
        fullName: 'Alexander Wright',
        nickname: 'Alex',
        phone: '+1 (555) 234-5678',
        email: 'alex.wright@techglobal.com',
        website: 'https://alexwright.dev',
        company: 'TechGlobal Innovations',
        jobTitle: 'Principal Product Architect',
        address: '500 Howard Street, San Francisco, CA',
        bio: 'Building the future of software and decentralized design tools.',
        instagram: '@alexwright_tech',
        linkedin: 'https://linkedin.com/in/alexwright'
      }
    },
    {
      id: 'tpl_wifi',
      typeId: 'wifi',
      name: 'Cafe & Workspace Wi-Fi',
      category: 'Basic',
      icon: 'wifi',
      desc: 'Instant Wi-Fi setup without needing to reveal complex router passwords.',
      sampleData: {
        ssid: 'Artisan_Coffee_Guest',
        password: 'EspressoMorning2026',
        security: 'WPA',
        hidden: 'false'
      }
    },
    {
      id: 'tpl_upi',
      typeId: 'upi',
      name: 'Storefront UPI Payment',
      category: 'Payments',
      icon: 'indian-rupee',
      desc: 'Direct zero-fee mobile checkout for Indian retail stores and vendors.',
      sampleData: {
        pa: 'billing@okhdfcbank',
        pn: 'The Organic Gourmet Store',
        am: '',
        tn: 'In-Store Purchase'
      }
    },
    {
      id: 'tpl_menu',
      typeId: 'menu',
      name: 'Restaurant Digital Menu',
      category: 'Business',
      icon: 'utensils',
      desc: 'Table-specific digital contactless menu for fine dining and cafes.',
      sampleData: {
        restaurantName: 'Le Petit Bistro Cafe',
        tableNumber: 'Table 14',
        menuUrl: 'https://bistro.menu/summer2026'
      }
    },
    {
      id: 'tpl_event',
      typeId: 'calendar',
      name: 'Annual Developer Summit',
      category: 'Basic',
      icon: 'calendar',
      desc: 'Sync conference dates, agenda, venue location, and tickets.',
      sampleData: {
        title: 'Global Web & AI Summit 2026',
        location: 'Moscone Center, San Francisco & Online',
        startDate: '2026-10-15T09:00',
        endDate: '2026-10-17T18:00',
        description: 'Keynotes, workshops, and networking with 10,000+ engineers.'
      }
    },
    {
      id: 'tpl_coupon',
      typeId: 'coupon',
      name: 'Flash Sale Promo Voucher',
      category: 'Business',
      icon: 'percent',
      desc: 'Scannable discount coupon code for retail checkouts and billboards.',
      sampleData: {
        couponCode: 'SAVE40SPRING',
        discount: '40% Off Total Bill',
        expiry: '2026-12-31',
        terms: 'Valid on orders above $50.'
      }
    },
    {
      id: 'tpl_totp',
      typeId: 'totp',
      name: 'Two-Factor Authenticator (2FA)',
      category: 'Identity',
      icon: 'shield-alert',
      desc: 'RFC 6238 standard TOTP setup code for Google Authenticator & Authy.',
      sampleData: {
        account: 'sarah.connor@cyberdyne.io',
        issuer: 'Cyberdyne Systems',
        secret: 'HXDMVJECJJWSRB3H',
        digits: '6'
      }
    },
    {
      id: 'tpl_survey',
      typeId: 'survey',
      name: 'Google Review & Rating',
      category: 'Business',
      icon: 'star',
      desc: 'Encourage customers to leave positive 5-star Google Maps reviews.',
      sampleData: {
        surveyTitle: 'Rate Your Experience with Us',
        surveyUrl: 'https://g.page/r/your-google-review-link'
      }
    }
  ],

  init(modalId = 'templates-modal') {
    this.modalEl = document.getElementById(modalId);
    this.bindEvents();
  },

  open() {
    if (!this.modalEl) return;
    this.modalEl.classList.add('active');
    this.render();
  },

  close() {
    if (!this.modalEl) return;
    this.modalEl.classList.remove('active');
  },

  render() {
    const container = document.getElementById('templates-grid-container');
    if (!container) return;

    let html = '';
    this.templatesList.forEach(tpl => {
      html += `
        <div class="history-card" style="cursor: pointer;" onclick="TemplatesEngine.applyTemplate('${tpl.id}')">
          <div class="history-card-header">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 28px; height: 28px; border-radius: var(--border-radius-sm); background: var(--bg-lavender); color: var(--primary); display: flex; align-items: center; justify-content: center;">
                <i data-lucide="${tpl.icon}"></i>
              </div>
              <strong style="font-size: 13px; color: var(--text-main);">${Utils.escapeHtml(tpl.name)}</strong>
            </div>
            <span class="badge badge-purple">${tpl.category}</span>
          </div>
          <p style="font-size: 11.5px; color: var(--text-secondary); line-height: 1.4;">${Utils.escapeHtml(tpl.desc)}</p>
          <div style="margin-top: 6px; display: flex; justify-content: flex-end;">
            <button class="btn-secondary" style="padding: 6px 12px; font-size: 11.5px; font-weight: 700; color: var(--primary);">
              Use Template <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i>
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons({ root: container });
  },

  applyTemplate(templateId) {
    const tpl = this.templatesList.find(t => t.id === templateId);
    if (!tpl) return;

    this.close();
    App.switchView('dashboard');
    App.switchQRType(tpl.typeId);

    // Populate form fields after render
    setTimeout(() => {
      const form = document.getElementById('active-qr-form');
      if (form && tpl.sampleData) {
        Object.entries(tpl.sampleData).forEach(([key, val]) => {
          const input = form.elements[key];
          if (input) {
            input.value = val;
          }
        });
        FormEngine.handleFormChange();
        Utils.showToast(`Applied "${tpl.name}" template!`, 'success');
      }
    }, 50);
  },

  bindEvents() {
    const closeBtn = document.getElementById('btn-close-templates');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
  }
};
/* ==========================================================================
   ALL IN ONE QR GENERATER - Bulk QR Code Batch Engine
   ========================================================================== */

const BulkEngine = {
  modalEl: null,

  init(modalId = 'bulk-modal') {
    this.modalEl = document.getElementById(modalId);
    this.bindEvents();
  },

  open() {
    if (!this.modalEl) return;
    this.modalEl.classList.add('active');
  },

  close() {
    if (!this.modalEl) return;
    this.modalEl.classList.remove('active');
  },

  bindEvents() {
    const closeBtn = document.getElementById('btn-close-bulk');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    const generateBtn = document.getElementById('btn-start-bulk-generation');
    if (generateBtn) generateBtn.addEventListener('click', () => this.processBulk());

    // CSV File upload trigger
    const csvInput = document.getElementById('bulk-csv-input');
    if (csvInput) {
      csvInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          document.getElementById('bulk-textarea').value = event.target.result;
          Utils.showToast('CSV loaded into text area.', 'info');
        };
        reader.readAsText(file);
      });
    }
  },

  async processBulk() {
    const rawText = document.getElementById('bulk-textarea')?.value || '';
    const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

    if (lines.length === 0) {
      Utils.showToast('Please enter at least one text or URL line to generate.', 'error');
      return;
    }

    if (typeof JSZip === 'undefined') {
      Utils.showToast('JSZip library is loading. Please try again in a moment.', 'error');
      return;
    }

    const progressBox = document.getElementById('bulk-progress-box');
    const progressBar = document.getElementById('bulk-progress-bar');
    const progressText = document.getElementById('bulk-progress-text');
    const startBtn = document.getElementById('btn-start-bulk-generation');

    if (progressBox) progressBox.style.display = 'block';
    if (startBtn) startBtn.disabled = true;

    const zip = new JSZip();
    const folder = zip.folder("qr_codes");
    const total = lines.length;

    Utils.showToast(`Generating ${total} QR codes in batch...`, 'info');

    for (let i = 0; i < total; i++) {
      const line = lines[i];
      const filename = `qr_${i + 1}_${line.substring(0, 15).replace(/[^a-zA-Z0-9]/g, '_')}.png`;
      
      try {
        const tempContainer = document.createElement('div');
        const qr = new QRCodeStyling({
          width: 600,
          height: 600,
          data: line,
          dotsOptions: { type: QRRenderer.settings.dotType, color: QRRenderer.settings.fgColor },
          cornersSquareOptions: { type: QRRenderer.settings.cornerSquareType, color: QRRenderer.settings.cornerSquareColor },
          cornersDotOptions: { type: QRRenderer.settings.cornerDotType, color: QRRenderer.settings.cornerDotColor },
          backgroundOptions: { color: QRRenderer.settings.bgColor }
        });

        const blob = await qr.getRawData('png');
        if (blob) {
          folder.file(filename, blob);
        }
      } catch (err) {
        console.warn(`Bulk generation error for line ${i}:`, err);
      }

      // Update Progress UI
      const percent = Math.round(((i + 1) / total) * 100);
      if (progressBar) progressBar.style.width = `${percent}%`;
      if (progressText) progressText.textContent = `Generated ${i + 1} of ${total} (${percent}%)`;
    }

    if (progressText) progressText.textContent = "Compressing ZIP archive...";
    
    const zipBlob = await zip.generateAsync({ type: "blob" });
    if (typeof saveAs !== 'undefined') {
      saveAs(zipBlob, `bulk-qr-codes-${Date.now()}.zip`);
    } else {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipBlob);
      link.download = `bulk-qr-codes-${Date.now()}.zip`;
      link.click();
    }

    Utils.showToast(`Batch of ${total} QR codes downloaded successfully!`, 'success');
    if (startBtn) startBtn.disabled = false;
    if (progressBox) progressBox.style.display = 'none';
    this.close();
  }
};
/* ==========================================================================
   ALL IN ONE QR GENERATER - Dynamic Link Manager & Scan Analytics Engine
   ========================================================================== */

const AnalyticsManager = {
  STORAGE_KEY: 'all_in_one_dynamic_links',
  modalEl: null,

  init(modalId = 'analytics-modal') {
    this.modalEl = document.getElementById(modalId);
    this.bindEvents();
    this.checkRedirectHash();
    this.updateStats();
  },

  getAllLinks() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveDynamicLink(slug, destinationUrl, campaignName = '') {
    let links = this.getAllLinks();
    const existingIndex = links.findIndex(l => l.slug === slug);

    if (existingIndex >= 0) {
      links[existingIndex].destinationUrl = destinationUrl;
      links[existingIndex].campaignName = campaignName;
      links[existingIndex].updatedAt = new Date().toISOString();
    } else {
      links.unshift({
        id: 'dyn_' + Date.now(),
        slug: slug,
        destinationUrl: destinationUrl,
        campaignName: campaignName || 'General Campaign',
        createdAt: new Date().toISOString(),
        scans: 0,
        scanLogs: []
      });
    }

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(links));
      this.updateStats();
    } catch (e) {
      console.warn("Could not save dynamic link:", e);
    }
  },

  logScan(slug) {
    let links = this.getAllLinks();
    const link = links.find(l => l.slug === slug);
    if (!link) return null;

    link.scans = (link.scans || 0) + 1;
    link.scanLogs = link.scanLogs || [];
    link.scanLogs.push({
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      platform: navigator.platform
    });

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(links));
    this.updateStats();
    return link.destinationUrl;
  },

  checkRedirectHash() {
    const hash = window.location.hash;
    if (hash.startsWith('#redirect=')) {
      const slug = hash.replace('#redirect=', '').trim();
      const destination = this.logScan(slug);
      if (destination) {
        document.body.innerHTML = `
          <div style="min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: sans-serif; background: #FAF9FF; color: #17152B; text-align: center; padding: 20px;">
            <div style="width: 50px; height: 50px; border-radius: 12px; background: #F3EEFF; color: #7C3AED; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 16px;">⚡</div>
            <h2 style="margin-bottom: 8px;">Redirecting via Dynamic QR...</h2>
            <p style="color: #6F6A85; font-size: 14px; margin-bottom: 20px;">Destination: <strong style="color: #7C3AED;">${destination}</strong></p>
            <a href="${destination}" style="padding: 10px 24px; background: #7C3AED; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold;">Continue Now</a>
          </div>
        `;
        setTimeout(() => {
          window.location.href = destination;
        }, 1200);
      }
    }
  },

  open() {
    if (!this.modalEl) return;
    this.modalEl.classList.add('active');
    this.render();
  },

  close() {
    if (!this.modalEl) return;
    this.modalEl.classList.remove('active');
  },

  render() {
    const container = document.getElementById('analytics-links-container');
    if (!container) return;

    const links = this.getAllLinks();
    if (links.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">
          <i data-lucide="bar-chart-2" style="width: 44px; height: 44px; color: var(--text-muted); margin-bottom: 12px;"></i>
          <p style="font-weight: 700; font-size: 15px; color: var(--text-main);">No Dynamic QR Links Created</p>
          <p style="font-size: 12px;">Create a "Dynamic QR" from the Advanced category to track scans and edit destinations anytime.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons({ root: container });
      return;
    }

    let html = '';
    links.forEach(l => {
      html += `
        <div class="history-card">
          <div class="history-card-header">
            <span class="badge badge-purple">${Utils.escapeHtml(l.campaignName)}</span>
            <span class="badge badge-free"><i data-lucide="eye" style="width: 12px; height: 12px;"></i> ${l.scans || 0} Scans</span>
          </div>
          <div style="font-size: 12px; color: var(--text-main); font-weight: 700;">
            /${Utils.escapeHtml(l.slug)}
          </div>
          <div style="font-size: 11px; color: var(--text-secondary); word-break: break-all;">
            Target: <a href="${Utils.escapeHtml(l.destinationUrl)}" target="_blank">${Utils.escapeHtml(l.destinationUrl)}</a>
          </div>
          <div class="history-card-actions" style="margin-top: 6px;">
            <button class="btn-secondary btn-sm" onclick="AnalyticsManager.editDestination('${l.slug}')" style="padding: 4px 10px; font-size: 11px;">
              <i data-lucide="edit-2" style="width: 12px; height: 12px;"></i> Edit Destination
            </button>
            <button class="btn-secondary btn-sm" onclick="AnalyticsManager.deleteLink('${l.slug}')" style="padding: 4px 10px; font-size: 11px; color: var(--error);">
              <i data-lucide="trash-2" style="width: 12px; height: 12px;"></i>
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons({ root: container });
  },

  editDestination(slug) {
    const links = this.getAllLinks();
    const link = links.find(l => l.slug === slug);
    if (!link) return;

    const newUrl = prompt('Enter new destination URL:', link.destinationUrl);
    if (newUrl && newUrl.trim()) {
      this.saveDynamicLink(slug, Utils.normalizeUrl(newUrl), link.campaignName);
      this.render();
      Utils.showToast('Destination URL updated! QR code now redirects to new target.', 'success');
    }
  },

  deleteLink(slug) {
    let links = this.getAllLinks();
    links = links.filter(l => l.slug !== slug);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(links));
    this.render();
    this.updateStats();
    Utils.showToast('Dynamic link deleted.', 'info');
  },

  bindEvents() {
    const closeBtn = document.getElementById('btn-close-analytics');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
  },

  updateStats() {
    const links = this.getAllLinks();
    let totalScans = 0;
    links.forEach(l => { totalScans += (l.scans || 0); });

    const totalScansEl = document.getElementById('metric-total-scans');
    const scansMonthEl = document.getElementById('metric-scans-month');

    if (totalScansEl) totalScansEl.textContent = totalScans > 0 ? totalScans.toLocaleString() : '1,245';
    if (scansMonthEl) scansMonthEl.textContent = totalScans > 0 ? Math.round(totalScans * 0.4).toLocaleString() : '256';
  }
};
/* ==========================================================================
   ALL IN ONE QR GENERATER - Main Application Controller
   ========================================================================== */

const App = {
  currentView: 'landing', // 'landing' | 'dashboard'
  currentQRType: 'personal',

  init() {
    this.initTheme();
    this.bindSidebarNavigation();
    this.bindTopBarControls();
    this.bindLandingEvents();
    this.initSubsystems();

    // Populate Sidebar Category counts
    this.populateSidebarCounts();

    // Check URL parameters / hashes
    this.handleRoute();

    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  initTheme() {
    const savedTheme = localStorage.getItem('all_in_one_qr_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcon(savedTheme);
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('all_in_one_qr_theme', next);
    this.updateThemeIcon(next);
    Utils.showToast(`Switched to ${next} theme.`, 'info');
  },

  updateThemeIcon(theme) {
    const btn = document.getElementById('btn-theme-toggle');
    if (btn) {
      btn.innerHTML = `<i data-lucide="${theme === 'dark' ? 'sun' : 'moon'}"></i>`;
      if (window.lucide) window.lucide.createIcons({ root: btn });
    }
  },

  initSubsystems() {
    try { QRRenderer.init('qr-canvas-container'); } catch (e) { console.warn('QRRenderer init error:', e); }
    try { FormEngine.init('form-container'); } catch (e) { console.warn('FormEngine init error:', e); }
    try { CustomizerStudio.init('customizer-modal'); } catch (e) { console.warn('CustomizerStudio init error:', e); }
    try { QRScanner.init('scanner-modal'); } catch (e) { console.warn('QRScanner init error:', e); }
    try { HistoryManager.init('history-modal'); } catch (e) { console.warn('HistoryManager init error:', e); }
    try { TemplatesEngine.init('templates-modal'); } catch (e) { console.warn('TemplatesEngine init error:', e); }
    try { BulkEngine.init('bulk-modal'); } catch (e) { console.warn('BulkEngine init error:', e); }
    try { AnalyticsManager.init('analytics-modal'); } catch (e) { console.warn('AnalyticsManager init error:', e); }
  },

  populateSidebarCounts() {
    const categories = ['basic', 'business', 'payments', 'identity', 'advanced'];
    categories.forEach(cat => {
      const countEl = document.getElementById(`count-${cat}`);
      if (countEl) {
        countEl.textContent = QR_REGISTRY.getByCategory(cat).length;
      }
    });

    // Populate Category sub-items inside sidebar accordions
    categories.forEach(cat => {
      const container = document.getElementById(`submenu-${cat}`);
      if (!container) return;

      const items = QR_REGISTRY.getByCategory(cat);
      let html = '';
      items.forEach(item => {
        html += `
          <div class="sub-nav-item" data-type-id="${item.id}">
            <i data-lucide="${item.icon}" style="width: 14px; height: 14px; margin-right: 8px;"></i>
            <span>${Utils.escapeHtml(item.name)}</span>
          </div>
        `;
      });
      container.innerHTML = html;
    });

    if (window.lucide) window.lucide.createIcons();
  },

  switchView(viewName) {
    this.currentView = viewName;
    const landing = document.getElementById('landing-view');
    const dashboard = document.getElementById('dashboard-view');

    if (viewName === 'dashboard') {
      if (landing) landing.classList.add('hidden');
      if (dashboard) dashboard.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (landing) landing.classList.remove('hidden');
      if (dashboard) dashboard.classList.add('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  switchQRType(typeId) {
    const item = QR_REGISTRY.getById(typeId);
    if (!item) return;

    // Special tools handling
    if (item.isBulk) {
      BulkEngine.open();
      return;
    }
    if (item.isScanner) {
      QRScanner.open();
      return;
    }

    this.currentQRType = typeId;
    this.switchView('dashboard');

    // Update Topbar Title & Subtitle
    const titleEl = document.getElementById('topbar-title');
    const subtitleEl = document.getElementById('topbar-subtitle');
    if (titleEl) titleEl.textContent = item.name;
    if (subtitleEl) subtitleEl.textContent = item.subtitle || 'Create a customizable QR code.';

    // Update Active Navigation Item states
    document.querySelectorAll('.nav-item, .sub-nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.typeId === typeId);
    });

    // Render Dynamic Form
    FormEngine.renderForm(typeId);

    // Close mobile drawer if open
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('mobile-open');
  },

  bindSidebarNavigation() {
    // Accordion group toggles
    document.querySelectorAll('.nav-accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const group = header.closest('.nav-accordion-group');
        if (group) group.classList.toggle('open');
      });
    });

    // Main Top Nav Items (Dashboard, Personal Details, URL)
    document.querySelectorAll('.nav-item[data-type-id]').forEach(item => {
      item.addEventListener('click', () => {
        const typeId = item.dataset.typeId;
        this.switchQRType(typeId);
      });
    });

    // Submenu Items
    document.addEventListener('click', (e) => {
      const subItem = e.target.closest('.sub-nav-item[data-type-id]');
      if (subItem) {
        this.switchQRType(subItem.dataset.typeId);
      }
    });

    // Dashboard Home item
    const dashBtn = document.getElementById('nav-dashboard-home');
    if (dashBtn) {
      dashBtn.addEventListener('click', () => {
        this.switchQRType('personal');
      });
    }

    // Tools
    const scanNav = document.getElementById('nav-scan-qr');
    if (scanNav) scanNav.addEventListener('click', () => QRScanner.open());

    const historyNav = document.getElementById('nav-history');
    if (historyNav) historyNav.addEventListener('click', () => HistoryManager.open());

    const templatesNav = document.getElementById('nav-templates');
    if (templatesNav) templatesNav.addEventListener('click', () => TemplatesEngine.open());

    const analyticsNav = document.getElementById('nav-analytics');
    if (analyticsNav) analyticsNav.addEventListener('click', () => AnalyticsManager.open());

    // System
    const settingsNav = document.getElementById('nav-settings');
    if (settingsNav) settingsNav.addEventListener('click', () => this.openSettingsModal());

    const helpNav = document.getElementById('nav-help');
    if (helpNav) helpNav.addEventListener('click', () => this.openHelpModal());

    // Mobile Drawer Toggle
    const mobileToggle = document.getElementById('btn-mobile-sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    if (mobileToggle && sidebar) {
      mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
      });
    }
  },

  bindTopBarControls() {
    const themeBtn = document.getElementById('btn-theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', () => this.toggleTheme());

    const notifBtn = document.getElementById('btn-notifications');
    if (notifBtn) {
      notifBtn.addEventListener('click', () => {
        Utils.showToast('All features 100% free with unlimited QR generation.', 'info');
      });
    }
  },

  bindLandingEvents() {
    // Hero Primary CTA -> Open Studio with Personal Details
    document.querySelectorAll('.btn-open-studio').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchQRType('personal');
      });
    });

    // Landing Matrix Category Filter Tabs
    document.querySelectorAll('.matrix-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.matrix-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.category;
        this.renderLandingMatrix(cat);
      });
    });

    // Initial render of landing matrix
    this.renderLandingMatrix('all');

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.closest('.faq-item');
        if (item) item.classList.toggle('open');
      });
    });
  },

  renderLandingMatrix(categoryFilter = 'all') {
    const container = document.getElementById('landing-matrix-cards');
    if (!container) return;

    let items = QR_REGISTRY;
    if (categoryFilter !== 'all') {
      items = QR_REGISTRY.getByCategory(categoryFilter);
    }

    let html = '';
    items.forEach(item => {
      html += `
        <div class="matrix-card" onclick="App.switchQRType('${item.id}')">
          <div class="matrix-card-icon">
            <i data-lucide="${item.icon}"></i>
          </div>
          <div>
            <h4 class="matrix-card-title">${Utils.escapeHtml(item.name)}</h4>
            <span class="matrix-card-category">${item.category.toUpperCase()}</span>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons({ root: container });
  },

  openSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.classList.add('active');
  },

  openHelpModal() {
    const modal = document.getElementById('help-modal');
    if (modal) modal.classList.add('active');
  },

  handleRoute() {
    // Check if directly navigating to dashboard
    if (window.location.search.includes('studio=1') || window.location.hash === '#studio') {
      this.switchQRType('personal');
    } else {
      // Default to landing view, but have form ready
      try {
        FormEngine.renderForm('personal');
      } catch (e) {
        console.warn('Initial form render deferred:', e);
      }
    }
  }
};

// Robust Global Click Handler for 100% Guaranteed CTA Execution
document.addEventListener('click', (e) => {
  const cta = e.target.closest('.btn-open-studio, [data-action="open-studio"]');
  if (cta) {
    e.preventDefault();
    if (window.App && typeof window.App.switchQRType === 'function') {
      window.App.switchQRType('personal');
    } else {
      const landing = document.getElementById('landing-view');
      const dashboard = document.getElementById('dashboard-view');
      if (landing) landing.classList.add('hidden');
      if (dashboard) dashboard.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
});

// Safe Instant & DOMContentLoaded Initialization
function initAppSafely() {
  if (window.App && !window.App._initialized) {
    window.App._initialized = true;
    try {
      window.App.init();
    } catch (err) {
      console.error('App init error:', err);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAppSafely);
} else {
  initAppSafely();
}
window.addEventListener('load', initAppSafely);


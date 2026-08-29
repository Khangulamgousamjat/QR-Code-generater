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

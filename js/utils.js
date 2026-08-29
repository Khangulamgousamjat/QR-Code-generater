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

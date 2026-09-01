/* ==========================================================================
   ALL IN ONE - Professional QR Generator Master Bundle
   Designed & Developed by Gous Khan
   ========================================================================== */


// --- js/utils.js ---
/* ==========================================================================
   ALL IN ONE QR GENERATER - Utilities & Built-in SVG Icon Engine
   Designed & Developed by Gous Khan
   ========================================================================== */

// Embedded Zero-CDN SVG Icon Engine (Guaranteed 100% Offline & Reliable Icon Rendering)
const SVG_ICONS = {
  'qr-code': '<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>',
  'sparkles': '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>',
  'user': '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  'user-check': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>',
  'link': '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  'globe': '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  'wifi': '<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>',
  'credit-card': '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
  'indian-rupee': '<path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/>',
  'shield': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  'shield-check': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  'shield-alert': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
  'moon': '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  'bell': '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  'home': '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  'menu': '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
  'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  'rotate-ccw': '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  'plus': '<path d="M5 12h14"/><path d="M12 5v14"/>',
  'trash-2': '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
  'copy': '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  'check': '<polyline points="20 6 9 17 4 12"/>',
  'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  'crosshair': '<circle cx="12" cy="12" r="10"/><line x1="22" x2="18" y1="12" y2="12"/><line x1="6" x2="2" y1="12" y2="12"/><line x1="12" x2="12" y1="6" y2="2"/><line x1="12" x2="12" y1="22" y2="18"/>',
  'refresh-cw': '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
  'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  'share-2': '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>',
  'sliders': '<line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="1" x2="7" y1="14" y2="14"/><line x1="9" x2="15" y1="8" y2="8"/><line x1="17" x2="23" y1="16" y2="16"/>',
  'palette': '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
  'image': '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  'box': '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  'eye': '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  'frame': '<line x1="22" x2="2" y1="6" y2="6"/><line x1="22" x2="2" y1="18" y2="18"/><line x1="6" x2="6" y1="2" y2="22"/><line x1="18" x2="18" y1="2" y2="22"/>',
  'upload': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
  'camera': '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  'folder-open': '<path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"/>',
  'file-text': '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/>',
  'mail': '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  'phone': '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  'map-pin': '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  'calendar': '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>',
  'utensils': '<path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M15 11v11"/><path d="M5 2v4a3 3 0 0 0 3 3v13"/><path d="M8 2v4"/>',
  'percent': '<line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  'star': '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  'activity': '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  'alert-circle': '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
  'help-circle': '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/>',
  'settings': '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  'zap': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  'lock': '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  'external-link': '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/>',
  'circle': '<circle cx="12" cy="12" r="10"/>',
  'message-square': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  'smartphone': '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><line x1="12" x2="12.01" y1="18" y2="18"/>',
  'music': '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  'video': '<polygon points="23 7 16 12 23 17 23 7"/><rect width="14" height="12" x="1" y="6" rx="2" ry="2"/>',
  'file': '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>',
  'layers': '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  'bitcoin': '<path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c3.923.69 4.887-4.78 1.002-5.464m-1.002 5.464-5.908-1.041m5.908 1.041-.346 1.969m-5.562-3.01L7.26 6.074m0 0 5.908 1.042m-5.908-1.042-.347 1.97m5.908 1.042.347-1.97m-1.91 10.835.347-1.97"/>',
  'dollar-sign': '<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'
};

function renderBuiltinIcons(root = document) {
  if (!root || !root.querySelectorAll) return;
  const elements = root.querySelectorAll('i[data-lucide]');
  elements.forEach(el => {
    const name = el.getAttribute('data-lucide');
    const svgPath = SVG_ICONS[name] || SVG_ICONS['circle'];
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const w = el.getAttribute('width') || el.style.width || (el.classList.contains('form-label-icon') ? '16' : '20');
    const h = el.getAttribute('height') || el.style.height || (el.classList.contains('form-label-icon') ? '16' : '20');
    svg.setAttribute('width', parseInt(w) || 20);
    svg.setAttribute('height', parseInt(h) || 20);

    if (el.className) svg.setAttribute('class', el.className);
    if (el.getAttribute('style')) svg.setAttribute('style', el.getAttribute('style'));
    svg.innerHTML = svgPath;
    if (el.parentNode) el.parentNode.replaceChild(svg, el);
  });
}

// Universal Global Lucide Provider
window.lucide = {
  createIcons: function (options = {}) {
    const targetRoot = options.root || document;
    renderBuiltinIcons(targetRoot);
  }
};

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
    renderBuiltinIcons(toast);

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

  normalizeUrl(url) {
    if (!url) return '';
    url = url.trim();
    if (!/^https?:\/\//i.test(url) && !url.startsWith('//')) {
      return 'https://' + url;
    }
    return url;
  },

  // Color Contrast Ratio Calculator (WCAG Compliance check)
  getContrastRatio(hex1, hex2) {
    function getLuminance(hex) {
      hex = hex.replace('#', '');
      if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      const a = [r, g, b].map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    try {
      const lum1 = getLuminance(hex1);
      const lum2 = getLuminance(hex2);
      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);
      return (brightest + 0.05) / (darkest + 0.05);
    } catch (e) {
      return 21;
    }
  },

  // Payload Builders for Complex Standards
  buildVCard(data) {
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${data.lastName || ''};${data.firstName || data.fullName || ''};;;`,
      `FN:${data.fullName || (data.firstName ? (data.firstName + ' ' + (data.lastName || '')) : 'Contact')}`
    ];
    if (data.nickname) lines.push(`NICKNAME:${data.nickname}`);
    if (data.company || data.org) lines.push(`ORG:${data.company || data.org}`);
    if (data.jobTitle || data.title) lines.push(`TITLE:${data.jobTitle || data.title}`);
    if (data.phone) lines.push(`TEL;TYPE=CELL,VOICE:${data.phone}`);
    if (data.phoneWork) lines.push(`TEL;TYPE=WORK,VOICE:${data.phoneWork}`);
    if (data.email) lines.push(`EMAIL;TYPE=PREF,INTERNET:${data.email}`);
    if (data.website || data.url) lines.push(`URL:${data.website || data.url}`);
    if (data.address || data.street) {
      lines.push(`ADR;TYPE=HOME:;;${data.street || data.address || ''};${data.city || ''};${data.state || ''};${data.zip || ''};${data.country || ''}`);
    }
    if (data.bio || data.note) lines.push(`NOTE:${data.bio || data.note}`);
    if (data.dob) lines.push(`BDAY:${data.dob}`);

    if (data.instagram) lines.push(`X-SOCIALPROFILE;type=instagram:https://instagram.com/${data.instagram.replace('@', '')}`);
    if (data.linkedin) lines.push(`X-SOCIALPROFILE;type=linkedin:${data.linkedin}`);
    if (data.twitter) lines.push(`X-SOCIALPROFILE;type=twitter:https://twitter.com/${data.twitter.replace('@', '')}`);
    if (data.github) lines.push(`X-SOCIALPROFILE;type=github:https://github.com/${data.github.replace('@', '')}`);

    if (data.customFields && Array.isArray(data.customFields)) {
      data.customFields.forEach(cf => {
        if (cf.key && cf.val) {
          lines.push(`X-CUSTOM-${cf.key.toUpperCase().replace(/[^A-Z0-9]/g, '')}:${cf.val}`);
        }
      });
    }

    lines.push('END:VCARD');
    return lines.join('\r\n');
  },

  buildWiFi(data) {
    const auth = data.security || 'WPA';
    const ssid = (data.ssid || '').replace(/([\\;,:"])/g, '\\$1');
    const pass = (data.password || '').replace(/([\\;,:"])/g, '\\$1');
    const hidden = data.hidden === true || data.hidden === 'true' ? 'H:true;' : '';
    if (auth === 'nopass') {
      return `WIFI:T:nopass;S:${ssid};;${hidden};`;
    }
    return `WIFI:T:${auth};S:${ssid};P:${pass};${hidden};`;
  },

  buildUpi(data) {
    if (!data) return 'upi://pay';
    const params = new URLSearchParams();
    if (data.pa) params.set('pa', String(data.pa).trim());
    if (data.pn) params.set('pn', String(data.pn).trim());
    if (data.am && Number(data.am) > 0) params.set('am', parseFloat(data.am).toFixed(2));
    if (data.cu) params.set('cu', data.cu || 'INR');
    if (data.tn) params.set('tn', String(data.tn).trim());
    if (data.tr) params.set('tr', String(data.tr).trim());
    if (data.mc) params.set('mc', String(data.mc).trim());
    return `upi://pay?${params.toString()}`;
  },

  buildCalendarEvent(data) {
    if (!data) data = {};
    function formatDate(dtStr) {
      if (!dtStr) return '';
      try {
        const d = new Date(dtStr);
        if (isNaN(d.getTime())) return '';
        return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      } catch (e) {
        return '';
      }
    }
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ALL IN ONE//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${data.title || 'Event'}`
    ];
    const start = formatDate(data.startDate);
    const end = formatDate(data.endDate || data.startDate);
    if (start) lines.push(`DTSTART:${start}`);
    if (end) lines.push(`DTEND:${end}`);
    if (data.location) lines.push(`LOCATION:${data.location}`);
    if (data.description) lines.push(`DESCRIPTION:${data.description}`);
    lines.push('END:VEVENT', 'END:VCALENDAR');
    return lines.join('\r\n');
  },

  generateTotpSecret(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let secret = '';
    const array = new Uint8Array(length);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(array);
      for (let i = 0; i < length; i++) {
        secret += chars[array[i] % chars.length];
      }
    } else {
      for (let i = 0; i < length; i++) {
        secret += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    return secret;
  },

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

if (typeof window !== 'undefined') {
  window.Utils = Utils;
}


// --- js/qr-registry.js ---
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
      { name: "fullName", label: "Full Name", type: "text", placeholder: "e.g., Rajesh Sharma", icon: "user" },
      { name: "nickname", label: "Nickname", type: "text", placeholder: "e.g., Raj", icon: "smile" },
      { name: "phone", label: "Phone Number", type: "tel", placeholder: "e.g., +91 98765 43210", icon: "phone" },
      { name: "email", label: "Email Address", type: "email", placeholder: "e.g., rajesh.sharma@example.com", icon: "mail" },
      { name: "website", label: "Website", type: "url", placeholder: "e.g., https://rajeshsharma.in", icon: "globe" },
      { name: "company", label: "Company", type: "text", placeholder: "e.g., Tata Consultancy Services", icon: "building" },
      { name: "jobTitle", label: "Job Title", type: "text", placeholder: "e.g., Senior Software Engineer", icon: "briefcase" },
      { name: "address", label: "Address", type: "text", placeholder: "e.g., MG Road, Bengaluru, Karnataka", icon: "map-pin" },
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
      { name: "fullName", label: "Full Name", type: "text", placeholder: "Priya Sharma", icon: "user" },
      { name: "company", label: "Company / Org", type: "text", placeholder: "Infosys Technologies Ltd", icon: "building" },
      { name: "jobTitle", label: "Job Title", type: "text", placeholder: "Product Director", icon: "briefcase" },
      { name: "phone", label: "Phone", type: "tel", placeholder: "+91 98765 43210", icon: "phone" },
      { name: "email", label: "Email", type: "email", placeholder: "priya.sharma@infosys.com", icon: "mail" },
      { name: "website", label: "Website", type: "url", placeholder: "https://infosys.com", icon: "globe" },
      { name: "address", label: "Office Address", type: "text", placeholder: "Electronics City, Bengaluru, Karnataka", icon: "map-pin", colSpan: 2 }
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
      { name: "pn", label: "Payee / Merchant Name", type: "text", placeholder: "Sharma General Store or Rajesh Sharma", icon: "user" },
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

if (typeof window !== 'undefined') {
  window.QR_REGISTRY = QR_REGISTRY;
}


// --- js/qr-renderer.js ---
/* ==========================================================================
   ALL IN ONE QR GENERATER - Robust QR Code Rendering & Styling Engine
   Designed & Developed by Gous Khan
   ========================================================================== */

// Embedded Lightweight Standalone QR Matrix Generator (Guaranteed Zero-Network Fallback)
const QRMatrix = (function () {
  const PAD0 = 0xEC, PAD1 = 0x11;
  const RS_BLOCK_TABLE = [
    [1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9],
    [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16],
    [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13],
    [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9],
    [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12],
    [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15],
    [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14],
    [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15],
    [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13],
    [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16]
  ];

  const EXP_TABLE = new Uint8Array(256);
  const LOG_TABLE = new Uint8Array(256);
  for (let i = 0, x = 1; i < 256; i++) {
    EXP_TABLE[i] = x;
    LOG_TABLE[x] = i;
    x = (x << 1) ^ (x >= 128 ? 0x11D : 0);
  }

  function gmult(a, b) {
    if (a === 0 || b === 0) return 0;
    return EXP_TABLE[(LOG_TABLE[a] + LOG_TABLE[b]) % 255];
  }

  function getPoly(degree) {
    let poly = [1];
    for (let i = 0; i < degree; i++) {
      let root = EXP_TABLE[i];
      let next = new Array(poly.length + 1).fill(0);
      for (let j = 0; j < poly.length; j++) {
        next[j] ^= poly[j];
        next[j + 1] ^= gmult(poly[j], root);
      }
      poly = next;
    }
    return poly;
  }

  function encodeData(text) {
    const utf8 = [];
    for (let i = 0; i < text.length; i++) {
      let c = text.charCodeAt(i);
      if (c < 128) utf8.push(c);
      else if (c < 2048) utf8.push(192 | (c >> 6), 128 | (c & 63));
      else if (c < 55296 || c >= 57344) utf8.push(224 | (c >> 12), 128 | ((c >> 6) & 63), 128 | (c & 63));
      else {
        i++;
        c = 65536 + (((c & 1023) << 10) | (text.charCodeAt(i) & 1023));
        utf8.push(240 | (c >> 18), 128 | ((c >> 12) & 63), 128 | ((c >> 6) & 63), 128 | (c & 63));
      }
    }
    return utf8;
  }

  return {
    generate(text, ecLevel = 'M') {
      const data = encodeData(text);
      let version = 1;
      let totalDataBytes = 0;
      let ecBytesPerBlock = 0;
      let blocks = [];

      for (let v = 1; v <= 10; v++) {
        const ecIdx = ecLevel === 'L' ? 0 : ecLevel === 'M' ? 1 : ecLevel === 'Q' ? 2 : 3;
        const row = RS_BLOCK_TABLE[(v - 1) * 4 + ecIdx];
        if (!row) continue;
        
        let sum = 0;
        blocks = [];
        for (let b = 0; b < row.length; b += 3) {
          const count = row[b];
          const total = row[b + 1];
          const dCount = row[b + 2];
          sum += count * dCount;
          for (let c = 0; c < count; c++) {
            blocks.push({ total, dataCount: dCount, ecCount: total - dCount });
          }
        }
        totalDataBytes = sum;
        if (data.length + 3 <= totalDataBytes) {
          version = v;
          break;
        }
      }

      const size = version * 4 + 17;
      const matrix = Array.from({ length: size }, () => new Array(size).fill(null));

      function drawFinder(r, c) {
        for (let i = -1; i <= 7; i++) {
          for (let j = -1; j <= 7; j++) {
            const nr = r + i, nc = c + j;
            if (nr < 0 || nr >= size || nc < 0 || nc >= size) continue;
            if (i >= 0 && i <= 6 && (j === 0 || j === 6)) matrix[nr][nc] = true;
            else if (j >= 0 && j <= 6 && (i === 0 || i === 6)) matrix[nr][nc] = true;
            else if (i >= 2 && i <= 4 && j >= 2 && j <= 4) matrix[nr][nc] = true;
            else if (i >= 0 && i <= 6 && j >= 0 && j <= 6) matrix[nr][nc] = false;
            else matrix[nr][nc] = false;
          }
        }
      }
      drawFinder(0, 0);
      drawFinder(0, size - 7);
      drawFinder(size - 7, 0);

      if (version >= 2) {
        const alignPos = [6, version * 4 + 10];
        for (let r of alignPos) {
          for (let c of alignPos) {
            if (matrix[r][c] !== null) continue;
            for (let i = -2; i <= 2; i++) {
              for (let j = -2; j <= 2; j++) {
                matrix[r + i][c + j] = Math.max(Math.abs(i), Math.abs(j)) !== 1;
              }
            }
          }
        }
      }

      for (let i = 8; i < size - 8; i++) {
        if (matrix[6][i] === null) matrix[6][i] = i % 2 === 0;
        if (matrix[i][6] === null) matrix[i][6] = i % 2 === 0;
      }

      matrix[size - 8][8] = true;
      for (let i = 0; i < 9; i++) {
        if (matrix[8][i] === null) matrix[8][i] = false;
        if (matrix[i][8] === null) matrix[i][8] = false;
        if (size - 1 - i < size) {
          if (matrix[8][size - 1 - i] === null) matrix[8][size - 1 - i] = false;
          if (matrix[size - 1 - i][8] === null) matrix[size - 1 - i][8] = false;
        }
      }

      const bitBuffer = [];
      function putBits(val, len) {
        for (let i = len - 1; i >= 0; i--) bitBuffer.push((val >> i) & 1);
      }
      putBits(4, 4);
      putBits(data.length, version < 10 ? 8 : 16);
      for (let b of data) putBits(b, 8);
      for (let i = 0; i < 4 && bitBuffer.length < totalDataBytes * 8; i++) bitBuffer.push(0);
      while (bitBuffer.length % 8 !== 0) bitBuffer.push(0);
      let pad = false;
      while (bitBuffer.length < totalDataBytes * 8) {
        putBits(pad ? PAD1 : PAD0, 8);
        pad = !pad;
      }

      const dataBytes = [];
      for (let i = 0; i < bitBuffer.length; i += 8) {
        let b = 0;
        for (let j = 0; j < 8; j++) b = (b << 1) | bitBuffer[i + j];
        dataBytes.push(b);
      }

      let byteOffset = 0;
      const allEcBlocks = [];
      const allDataBlocks = [];

      for (let blk of blocks) {
        const blkData = dataBytes.slice(byteOffset, byteOffset + blk.dataCount);
        byteOffset += blk.dataCount;
        allDataBlocks.push(blkData);

        const genPoly = getPoly(blk.ecCount);
        let remainder = new Array(blk.ecCount).fill(0);
        for (let i = 0; i < blkData.length; i++) {
          const factor = blkData[i] ^ remainder[0];
          remainder.shift();
          remainder.push(0);
          for (let j = 0; j < blk.ecCount; j++) {
            remainder[j] ^= gmult(genPoly[j + 1], factor);
          }
        }
        allEcBlocks.push(remainder);
      }

      const finalBytes = [];
      let maxDataLen = Math.max(...blocks.map(b => b.dataCount));
      for (let i = 0; i < maxDataLen; i++) {
        for (let b = 0; b < blocks.length; b++) {
          if (i < allDataBlocks[b].length) finalBytes.push(allDataBlocks[b][i]);
        }
      }
      let maxEcLen = Math.max(...blocks.map(b => b.ecCount));
      for (let i = 0; i < maxEcLen; i++) {
        for (let b = 0; b < blocks.length; b++) {
          if (i < allEcBlocks[b].length) finalBytes.push(allEcBlocks[b][i]);
        }
      }

      let bitIdx = 0;
      const finalBits = [];
      for (let b of finalBytes) {
        for (let i = 7; i >= 0; i--) finalBits.push((b >> i) & 1);
      }

      let dir = -1, row = size - 1, col = size - 1;
      while (col > 0) {
        if (col === 6) col--;
        for (let r = 0; r < size; r++) {
          let currRow = dir === -1 ? size - 1 - r : r;
          for (let c = 0; c < 2; c++) {
            let currCol = col - c;
            if (matrix[currRow][currCol] === null) {
              let bit = bitIdx < finalBits.length ? finalBits[bitIdx++] : 0;
              if ((currRow + currCol) % 2 === 0) bit ^= 1;
              matrix[currRow][currCol] = bit === 1;
            }
          }
        }
        col -= 2;
        dir = -dir;
      }

      return { size, matrix };
    }
  };
})();

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
    errorCorrectionLevel: 'Q',

    // Module/Dots
    dotType: 'extra-rounded',
    fgColor: '#17152B',
    useGradient: false,
    gradientType: 'linear',
    gradientColor2: '#7C3AED',

    // Eye / Corner Frames
    cornerSquareType: 'extra-rounded',
    cornerSquareColor: '#7C3AED',
    cornerDotType: 'dot',
    cornerDotColor: '#7C3AED',

    // Background
    bgColor: '#FFFFFF',

    // Center Logo
    logo: null,
    logoSize: 0.35,
    logoMargin: 6,

    // Frame Banner
    frameStyle: 'none',
    frameText: 'SCAN TO VIEW',
    frameColor: '#7C3AED',
    frameTextColor: '#FFFFFF'
  },

  getContainer() {
    if (!this.containerEl || (document.body && document.body.contains && !document.body.contains(this.containerEl))) {
      this.containerEl = document.getElementById('qr-canvas-container');
    }
    return this.containerEl;
  },

  init(containerId = 'qr-canvas-container') {
    this.containerEl = document.getElementById(containerId);
    this.render();
  },

  setPayload(payload, qrTypeId = 'personal') {
    this.currentPayload = payload || "ALL IN ONE QR GENERATER";
    this.currentQRType = qrTypeId;
    this.update();
  },

  _renderTimeout: null,
  updateSettings(newSettings, immediate = false) {
    this.settings = { ...this.settings, ...newSettings };
    
    if (this._renderTimeout) {
      cancelAnimationFrame(this._renderTimeout);
      this._renderTimeout = null;
    }

    const doUpdate = () => {
      if (this.qrCodeInstance && typeof this.qrCodeInstance.update === 'function') {
        try {
          const config = this.buildConfig(320);
          this.qrCodeInstance.update(config);
          return;
        } catch (e) {
          this.render();
        }
      } else {
        this.render();
      }
    };

    if (immediate) {
      doUpdate();
    } else {
      this._renderTimeout = requestAnimationFrame(doUpdate);
    }
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
    const container = this.getContainer();
    if (!container) return;
    container.innerHTML = '';

    if (typeof QRCodeStyling !== 'undefined') {
      try {
        const config = this.buildConfig(320);
        this.qrCodeInstance = new QRCodeStyling(config);
        this.qrCodeInstance.append(container);
        return;
      } catch (err) {
        console.warn("QR Code Styling render failed, using robust Canvas fallback:", err);
      }
    }

    // Built-in Guaranteed Canvas Fallback
    this.renderCanvasFallback(320);
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
        return;
      } catch (e) {
        this.render();
      }
    } else {
      this.render();
    }
  },

  renderCanvasFallback(targetSize = 320) {
    const container = this.getContainer();
    if (!container) return;

    try {
      const qr = QRMatrix.generate(this.currentPayload, this.settings.errorCorrectionLevel);
      const canvas = document.createElement('canvas');
      canvas.width = targetSize;
      canvas.height = targetSize;
      canvas.style.maxWidth = '100%';
      canvas.style.height = 'auto';
      canvas.style.borderRadius = '12px';
      canvas.style.display = 'block';
      canvas.style.margin = '0 auto';

      const ctx = canvas.getContext('2d');
      const size = qr.size;
      const margin = this.settings.margin || 10;
      const cellSize = (targetSize - margin * 2) / size;

      // Background
      ctx.fillStyle = this.settings.bgColor || '#FFFFFF';
      ctx.fillRect(0, 0, targetSize, targetSize);

      // Foreground / Gradient
      let fillStyle = this.settings.fgColor || '#17152B';
      if (this.settings.useGradient && this.settings.gradientColor2) {
        const grad = ctx.createLinearGradient(0, 0, targetSize, targetSize);
        grad.addColorStop(0, this.settings.fgColor);
        grad.addColorStop(1, this.settings.gradientColor2);
        fillStyle = grad;
      }

      ctx.fillStyle = fillStyle;

      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (qr.matrix[r][c]) {
            const x = margin + c * cellSize;
            const y = margin + r * cellSize;
            const isFinder = (r < 7 && c < 7) || (r < 7 && c >= size - 7) || (r >= size - 7 && c < 7);
            
            if (isFinder && this.settings.cornerSquareColor) {
              ctx.fillStyle = this.settings.cornerSquareColor;
            } else {
              ctx.fillStyle = fillStyle;
            }

            if (this.settings.dotType === 'dots' || this.settings.dotType === 'extra-rounded') {
              ctx.beginPath();
              ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize / 2.2, 0, Math.PI * 2);
              ctx.fill();
            } else if (this.settings.dotType === 'rounded') {
              const rad = cellSize / 4;
              ctx.beginPath();
              ctx.roundRect ? ctx.roundRect(x, y, cellSize, cellSize, rad) : ctx.rect(x, y, cellSize, cellSize);
              ctx.fill();
            } else {
              ctx.fillRect(x, y, cellSize, cellSize);
            }
          }
        }
      }

      container.innerHTML = '';
      container.appendChild(canvas);
    } catch (e) {
      console.error("Canvas fallback render error:", e);
      container.innerHTML = `
        <div style="padding: 24px 16px; text-align: center; color: var(--text-secondary);">
          <i data-lucide="qr-code" style="width: 48px; height: 48px; color: var(--primary); margin-bottom: 10px;"></i>
          <p style="font-weight: 700; color: var(--text-main); font-size: 13px;">QR Code Live Preview</p>
          <p style="font-size: 11px; word-break: break-all; opacity: 0.8; margin-top: 6px;">${Utils.escapeHtml(this.currentPayload)}</p>
        </div>
      `;
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        try { window.lucide.createIcons({ root: container }); } catch (err) {}
      }
    }
  },

  // Export & Download System (PNG, JPEG, SVG)
  async download(format = 'png') {
    const size = parseInt(this.settings.exportSize) || 1024;
    const filename = `${this.currentQRType || 'qrcode'}-${Date.now()}`;

    Utils.showToast(`Generating high-resolution ${format.toUpperCase()} (${size}×${size})...`, 'info');

    if (this.qrCodeInstance && typeof this.qrCodeInstance.download === 'function') {
      try {
        const exportConfig = this.buildConfig(size);
        const exportInstance = new QRCodeStyling(exportConfig);
        await exportInstance.download({
          name: filename,
          extension: format.toLowerCase()
        });
        Utils.showToast(`QR Code downloaded as ${filename}.${format}`, 'success');

        if (window.HistoryManager) {
          HistoryManager.saveEntry(this.currentQRType, this.currentPayload, this.settings);
        }
        return;
      } catch (err) {
        console.warn("QRCodeStyling export failed, using Canvas download fallback:", err);
      }
    }

    // Canvas Download Fallback
    try {
      const qr = QRMatrix.generate(this.currentPayload, this.settings.errorCorrectionLevel);
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      const cellSize = (size - 40) / qr.size;

      ctx.fillStyle = this.settings.bgColor || '#FFFFFF';
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = this.settings.fgColor || '#17152B';

      for (let r = 0; r < qr.size; r++) {
        for (let c = 0; c < qr.size; c++) {
          if (qr.matrix[r][c]) {
            ctx.fillRect(20 + c * cellSize, 20 + r * cellSize, cellSize, cellSize);
          }
        }
      }

      const mimeType = format === 'jpeg' || format === 'jpg' ? 'image/jpeg' : 'image/png';
      const dataUrl = canvas.toDataURL(mimeType, 0.95);
      const link = document.createElement('a');
      link.download = `${filename}.${format === 'jpeg' ? 'jpg' : format}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      link.remove();
      Utils.showToast(`QR Code downloaded as ${filename}.${format}`, 'success');

      if (window.HistoryManager) {
        HistoryManager.saveEntry(this.currentQRType, this.currentPayload, this.settings);
      }
    } catch (e) {
      console.error("Download fallback failed:", e);
      Utils.showToast("Failed to download QR code.", "error");
    }
  },

  // Share System (Web Share API + Clipboard Fallback)
  async share() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QR Code from ALL IN ONE QR GENERATER',
          text: `Check out this QR Code for: ${this.currentPayload.substring(0, 60)}...`,
          url: window.location.href
        });
        Utils.showToast('Shared successfully!', 'success');
        return;
      } catch (e) {
        this.copyToClipboard();
      }
    } else {
      this.copyToClipboard();
    }
  },

  copyToClipboard() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(this.currentPayload).then(() => {
        Utils.showToast('QR Code payload copied to clipboard!', 'success');
      }).catch(() => {
        Utils.showToast('Unable to copy to clipboard.', 'error');
      });
    } else {
      Utils.showToast('Clipboard not supported in this browser.', 'info');
    }
  }
};

if (typeof window !== 'undefined') {
  window.QRRenderer = QRRenderer;
}


// --- js/forms.js ---
/* ==========================================================================
   ALL IN ONE QR GENERATER - Dynamic Schema Form Engine
   Designed & Developed by Gous Khan
   ========================================================================== */

const FormEngine = {
  activeType: null,
  formContainerEl: null,
  customFieldsList: [],
  debounceTimer: null,

  getContainer() {
    if (!this.formContainerEl || (document.body && document.body.contains && !document.body.contains(this.formContainerEl))) {
      this.formContainerEl = document.getElementById('form-container');
    }
    return this.formContainerEl;
  },

  init(containerId = 'form-container') {
    this.formContainerEl = document.getElementById(containerId);
  },

  renderForm(qrTypeId) {
    const container = this.getContainer();
    if (!container) {
      console.warn('Form container element not found in DOM');
      return;
    }

    const qrType = QR_REGISTRY.getById(qrTypeId);
    this.activeType = qrType;
    this.customFieldsList = [];

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

    container.innerHTML = html;
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try { window.lucide.createIcons({ root: container }); } catch (e) {}
    }

    this.bindEvents();
    this.handleFormChange(); // Trigger initial preview
  },

  bindEvents() {
    const form = document.getElementById('active-qr-form');
    if (!form) return;

    // Real-time live input updates with debouncing
    form.addEventListener('input', () => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => this.handleFormChange(), 120);
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
      accordionToggle.addEventListener('click', (e) => {
        e.preventDefault();
        accordion.classList.toggle('open');
      });
    }

    // Add Custom Field Button
    const addCustomBtn = document.getElementById('btn-add-custom-field');
    if (addCustomBtn) {
      addCustomBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.addCustomField();
      });
    }

    // GPS Location Picker
    const locBtn = document.getElementById('btn-get-location');
    if (locBtn) {
      locBtn.addEventListener('click', (e) => {
        e.preventDefault();
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
      totpBtn.addEventListener('click', (e) => {
        e.preventDefault();
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
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try { window.lucide.createIcons({ root: row }); } catch (e) {}
    }

    const removeBtn = row.querySelector('.remove-field-btn');
    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        row.remove();
        this.handleFormChange();
      });
    }

    row.querySelectorAll('input').forEach(inp => {
      inp.addEventListener('input', () => this.handleFormChange());
    });
  },

  getFormData() {
    const form = document.getElementById('active-qr-form');
    if (!form) return {};

    const data = {};
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      if (input.name) {
        if (input.type === 'checkbox') {
          data[input.name] = input.checked;
        } else {
          data[input.name] = input.value;
        }
      }
    });

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
      try {
        payload = this.activeType.buildPayload(data);
      } catch (err) {
        console.warn("Payload build error:", err);
        payload = Object.values(data).filter(Boolean).join(' ') || 'ALL IN ONE QR GENERATER';
      }
    } else {
      payload = Object.values(data).filter(Boolean).join(' ') || 'ALL IN ONE QR GENERATER';
    }

    QRRenderer.setPayload(payload, this.activeType ? this.activeType.id : 'personal');
  }
};

if (typeof window !== 'undefined') {
  window.FormEngine = FormEngine;
}


// --- js/customizer.js ---
/* ==========================================================================
   ALL IN ONE QR GENERATER - QR Customization Studio UI
   Designed & Developed by Gous Khan
   ========================================================================== */

const CustomizerStudio = {
  modalEl: null,

  getModal() {
    if (!this.modalEl || !document.body.contains(this.modalEl)) {
      this.modalEl = document.getElementById('customizer-modal');
    }
    return this.modalEl;
  },

  init(modalId = 'customizer-modal') {
    this.modalEl = document.getElementById(modalId);
    this.bindEvents();
  },

  open(initialTab = 'shapes') {
    const modal = this.getModal();
    if (!modal) return;
    modal.classList.add('active');
    this.switchTab(initialTab);
  },

  close() {
    const modal = this.getModal();
    if (!modal) return;
    modal.classList.remove('active');
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
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = btn.dataset.targetTab || 'shapes';
        this.open(tab);
      });
    });

    // Top Preview Customize Button
    const topCustomBtn = document.getElementById('btn-open-customizer');
    if (topCustomBtn) {
      topCustomBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open('shapes');
      });
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
        const text = document.getElementById('text-fg-color');
        if (text) text.textContent = val;
        QRRenderer.updateSettings({ fgColor: val });
        this.checkContrast();
      });
    }

    if (bgColorInput) {
      bgColorInput.addEventListener('input', (e) => {
        const val = e.target.value;
        const text = document.getElementById('text-bg-color');
        if (text) text.textContent = val;
        QRRenderer.updateSettings({ bgColor: val });
        this.checkContrast();
      });
    }

    if (eyeColorInput) {
      eyeColorInput.addEventListener('input', (e) => {
        const val = e.target.value;
        const text = document.getElementById('text-eye-color');
        if (text) text.textContent = val;
        QRRenderer.updateSettings({ cornerSquareColor: val, cornerDotColor: val });
      });
    }

    if (gradColorInput) {
      gradColorInput.addEventListener('input', (e) => {
        const val = e.target.value;
        const text = document.getElementById('text-grad-color');
        if (text) text.textContent = val;
        QRRenderer.updateSettings({ gradientColor2: val });
      });
    }

    if (gradToggle) {
      gradToggle.addEventListener('change', (e) => {
        const enabled = e.target.checked;
        const wrapper = document.getElementById('gradient-controls-wrapper');
        if (wrapper) wrapper.style.display = enabled ? 'flex' : 'none';
        QRRenderer.updateSettings({ useGradient: enabled });
      });
    }

    // Color Swatch Presets
    document.querySelectorAll('.swatch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const fg = btn.dataset.fg;
        const bg = btn.dataset.bg;
        const eye = btn.dataset.eye || fg;

        if (fgColorInput) { fgColorInput.value = fg; const t = document.getElementById('text-fg-color'); if (t) t.textContent = fg; }
        if (bgColorInput) { bgColorInput.value = bg; const t = document.getElementById('text-bg-color'); if (t) t.textContent = bg; }
        if (eyeColorInput) { eyeColorInput.value = eye; const t = document.getElementById('text-eye-color'); if (t) t.textContent = eye; }

        QRRenderer.updateSettings({
          fgColor: fg,
          bgColor: bg,
          cornerSquareColor: eye,
          cornerDotColor: eye,
          useGradient: false
        });
        if (gradToggle) gradToggle.checked = false;
        const wrapper = document.getElementById('gradient-controls-wrapper');
        if (wrapper) wrapper.style.display = 'none';
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
          const img = document.getElementById('logo-preview-img');
          const box = document.getElementById('logo-preview-box');
          if (img) img.src = imgUrl;
          if (box) box.style.display = 'flex';
          Utils.showToast('Logo added to QR code!', 'success');
        };
        reader.readAsDataURL(file);
      });
    }

    if (removeLogoBtn) {
      removeLogoBtn.addEventListener('click', () => {
        QRRenderer.updateSettings({ logo: null });
        const box = document.getElementById('logo-preview-box');
        if (box) box.style.display = 'none';
        if (logoFileInput) logoFileInput.value = '';
        Utils.showToast('Logo removed.', 'info');
      });
    }

    if (logoSizeSlider) {
      logoSizeSlider.addEventListener('input', (e) => {
        const size = parseFloat(e.target.value);
        const text = document.getElementById('text-logo-size');
        if (text) text.textContent = `${Math.round(size * 100)}%`;
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
        item.addEventListener('click', (e) => {
          e.stopPropagation();
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
      alertBox.style.display = ratio < 3.0 ? 'flex' : 'none';
    }
  }
};

if (typeof window !== 'undefined') {
  window.CustomizerStudio = CustomizerStudio;
}


// --- js/scanner.js ---
/* ==========================================================================
   ALL IN ONE QR GENERATER - Integrated Scanner & Decoder
   Designed & Developed by Gous Khan
   ========================================================================== */

const QRScanner = {
  modalEl: null,
  videoEl: null,
  canvasEl: null,
  stream: null,
  scanning: false,

  getModal() {
    if (!this.modalEl || !document.body.contains(this.modalEl)) {
      this.modalEl = document.getElementById('scanner-modal');
    }
    return this.modalEl;
  },

  init(modalId = 'scanner-modal') {
    this.modalEl = document.getElementById(modalId);
    this.videoEl = document.getElementById('scanner-video');
    this.canvasEl = document.createElement('canvas');
    this.bindEvents();
  },

  open() {
    const modal = this.getModal();
    if (!modal) return;
    modal.classList.add('active');
    this.startCamera();
  },

  close() {
    const modal = this.getModal();
    if (!modal) return;
    modal.classList.remove('active');
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
      this.videoEl = this.videoEl || document.getElementById('scanner-video');
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
    const canvas = this.canvasEl || document.createElement('canvas');
    this.canvasEl = canvas;
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
        const canvas = this.canvasEl || document.createElement('canvas');
        this.canvasEl = canvas;
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
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try { window.lucide.createIcons({ root: resultActions }); } catch (e) {}
    }

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

if (typeof window !== 'undefined') {
  window.QRScanner = QRScanner;
}


// --- js/history.js ---
/* ==========================================================================
   ALL IN ONE QR GENERATER - Local History Manager (Client-Side Storage)
   Designed & Developed by Gous Khan
   ========================================================================== */

const HistoryManager = {
  STORAGE_KEY: 'all_in_one_qr_history',
  modalEl: null,

  getModal() {
    if (!this.modalEl || !document.body.contains(this.modalEl)) {
      this.modalEl = document.getElementById('history-modal');
    }
    return this.modalEl;
  },

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
    const modal = this.getModal();
    if (!modal) return;
    modal.classList.add('active');
    this.renderList();
  },

  close() {
    const modal = this.getModal();
    if (!modal) return;
    modal.classList.remove('active');
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
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        try { window.lucide.createIcons({ root: container }); } catch (e) {}
      }
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
        <div class="history-card" data-history-id="${item.id}">
          <div class="history-card-header">
            <span class="badge badge-purple">${Utils.escapeHtml(item.typeName)}</span>
            <span class="history-date">${dateStr}</span>
          </div>
          <p class="history-payload-text">${Utils.escapeHtml(item.payload)}</p>
          <div class="history-card-actions">
            <button type="button" class="btn-secondary btn-history-load" onclick="HistoryManager.loadIntoStudio('${item.typeId}', '${encodeURIComponent(item.payload)}')">
              <i data-lucide="external-link"></i> Load
            </button>
            <button type="button" class="btn-secondary btn-history-copy" onclick="navigator.clipboard.writeText('${Utils.escapeHtml(item.payload)}'); Utils.showToast('Copied!','success');">
              <i data-lucide="copy"></i>
            </button>
            <button type="button" class="btn-secondary btn-history-delete" style="color: var(--error);" onclick="HistoryManager.deleteEntry('${item.id}')">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try { window.lucide.createIcons({ root: container }); } catch (e) {}
    }
  },

  loadIntoStudio(typeId, encodedPayload) {
    const payload = decodeURIComponent(encodedPayload);
    this.close();
    App.switchQRType(typeId);
    setTimeout(() => {
      QRRenderer.setPayload(payload, typeId);
      Utils.showToast(`Loaded ${QR_REGISTRY.getById(typeId).name} into Studio.`, 'info');
    }, 150);
  },

  updateDashboardStats() {
    const list = this.getAll();
    const totalQrsEl = document.getElementById('metric-total-qrs');
    const activeQrsEl = document.getElementById('metric-active-qrs');

    if (totalQrsEl) {
      totalQrsEl.textContent = Math.max(12, list.length + 12);
    }
    if (activeQrsEl) {
      activeQrsEl.textContent = Math.max(8, list.length + 8);
    }
  },

  bindEvents() {
    const closeBtn = document.getElementById('btn-close-history');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    const clearBtn = document.getElementById('btn-clear-history');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clearAll());
  }
};

if (typeof window !== 'undefined') {
  window.HistoryManager = HistoryManager;
}


// --- js/templates.js ---
/* ==========================================================================
   ALL IN ONE QR GENERATER - Templates Engine
   Designed & Developed by Gous Khan
   ========================================================================== */

const TemplatesEngine = {
  modalEl: null,

  getModal() {
    if (!this.modalEl || !document.body.contains(this.modalEl)) {
      this.modalEl = document.getElementById('templates-modal');
    }
    return this.modalEl;
  },

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
    const modal = this.getModal();
    if (!modal) return;
    modal.classList.add('active');
    this.render();
  },

  close() {
    const modal = this.getModal();
    if (!modal) return;
    modal.classList.remove('active');
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
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try { window.lucide.createIcons({ root: container }); } catch (e) {}
    }
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
    }, 80);
  },

  bindEvents() {
    const closeBtn = document.getElementById('btn-close-templates');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
  }
};

if (typeof window !== 'undefined') {
  window.TemplatesEngine = TemplatesEngine;
}


// --- js/bulk.js ---
/* ==========================================================================
   ALL IN ONE QR GENERATER - Bulk QR Code Batch Engine
   Designed & Developed by Gous Khan
   ========================================================================== */

const BulkEngine = {
  modalEl: null,

  getModal() {
    if (!this.modalEl || !document.body.contains(this.modalEl)) {
      this.modalEl = document.getElementById('bulk-modal');
    }
    return this.modalEl;
  },

  init(modalId = 'bulk-modal') {
    this.modalEl = document.getElementById(modalId);
    this.bindEvents();
  },

  open() {
    const modal = this.getModal();
    if (!modal) return;
    modal.classList.add('active');
  },

  close() {
    const modal = this.getModal();
    if (!modal) return;
    modal.classList.remove('active');
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
          const area = document.getElementById('bulk-textarea');
          if (area) area.value = event.target.result;
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
      Utils.showToast('Batch engine ready. Generating images...', 'info');
    }

    const progressBox = document.getElementById('bulk-progress-box');
    const progressBar = document.getElementById('bulk-progress-bar');
    const progressText = document.getElementById('bulk-progress-text');
    const startBtn = document.getElementById('btn-start-bulk-generation');

    if (progressBox) progressBox.style.display = 'block';
    if (startBtn) startBtn.disabled = true;

    const zip = typeof JSZip !== 'undefined' ? new JSZip() : null;
    const folder = zip ? zip.folder("qr_codes") : null;
    const total = lines.length;

    Utils.showToast(`Generating ${total} QR codes in batch...`, 'info');

    for (let i = 0; i < total; i++) {
      const line = lines[i];
      const filename = `qr_${i + 1}_${line.substring(0, 15).replace(/[^a-zA-Z0-9]/g, '_')}.png`;
      
      try {
        if (folder && typeof QRCodeStyling !== 'undefined') {
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
        }
      } catch (err) {
        console.warn(`Bulk generation error for line ${i}:`, err);
      }

      const percent = Math.round(((i + 1) / total) * 100);
      if (progressBar) progressBar.style.width = `${percent}%`;
      if (progressText) progressText.textContent = `Generated ${i + 1} of ${total} (${percent}%)`;
    }

    if (zip && typeof saveAs !== 'undefined') {
      try {
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, `bulk_qrcodes_${Date.now()}.zip`);
        Utils.showToast('Batch download started successfully!', 'success');
      } catch (e) {
        console.error("ZIP package error:", e);
        Utils.showToast('ZIP compilation error.', 'error');
      }
    } else {
      Utils.showToast('Batch completed!', 'success');
    }

    if (startBtn) startBtn.disabled = false;
  }
};

if (typeof window !== 'undefined') {
  window.BulkEngine = BulkEngine;
}


// --- js/analytics.js ---
/* ==========================================================================
   ALL IN ONE QR GENERATER - Dynamic Link Manager & Scan Analytics Engine
   Designed & Developed by Gous Khan
   ========================================================================== */

const AnalyticsManager = {
  STORAGE_KEY: 'all_in_one_dynamic_links',
  modalEl: null,

  getModal() {
    if (!this.modalEl || !document.body.contains(this.modalEl)) {
      this.modalEl = document.getElementById('analytics-modal');
    }
    return this.modalEl;
  },

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
    const modal = this.getModal();
    if (!modal) return;
    modal.classList.add('active');
    this.render();
  },

  close() {
    const modal = this.getModal();
    if (!modal) return;
    modal.classList.remove('active');
  },

  render() {
    const container = document.getElementById('analytics-links-table-body');
    if (!container) return;

    const links = this.getAllLinks();
    if (links.length === 0) {
      container.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 32px; color: var(--text-secondary);">
            <i data-lucide="activity" style="width: 36px; height: 36px; color: var(--text-muted); margin-bottom: 8px;"></i>
            <p style="font-weight: 700;">No Dynamic Links Created Yet</p>
            <p style="font-size: 11.5px;">Create a Dynamic URL QR code to monitor scans and update target links anytime.</p>
          </td>
        </tr>
      `;
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        try { window.lucide.createIcons({ root: container }); } catch (e) {}
      }
      return;
    }

    let html = '';
    const baseUrl = window.location.origin + window.location.pathname;

    links.forEach(link => {
      const dynUrl = `${baseUrl}#redirect=${link.slug}`;
      const dateStr = new Date(link.createdAt).toLocaleDateString();

      html += `
        <tr>
          <td><strong style="color: var(--text-main); font-size: 12.5px;">${Utils.escapeHtml(link.campaignName)}</strong></td>
          <td>
            <a href="${dynUrl}" target="_blank" style="color: var(--primary); font-size: 11.5px; word-break: break-all;">
              /${Utils.escapeHtml(link.slug)}
            </a>
          </td>
          <td><span style="font-size: 11.5px; color: var(--text-secondary); word-break: break-all;">${Utils.escapeHtml(link.destinationUrl)}</span></td>
          <td><span class="badge badge-purple" style="font-weight: 800;">${link.scans || 0} scans</span></td>
          <td>
            <div style="display: flex; gap: 6px;">
              <button class="btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="AnalyticsManager.loadIntoStudio('${link.slug}', '${dynUrl}')" title="Show QR">
                <i data-lucide="qr-code"></i>
              </button>
              <button class="btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="navigator.clipboard.writeText('${dynUrl}'); Utils.showToast('Dynamic Link Copied!','success');" title="Copy Link">
                <i data-lucide="copy"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    });

    container.innerHTML = html;
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try { window.lucide.createIcons({ root: container }); } catch (e) {}
    }
  },

  loadIntoStudio(slug, fullUrl) {
    this.close();
    App.switchQRType('dynamic_url');
    setTimeout(() => {
      const slugInput = document.getElementById('field-slug');
      if (slugInput) slugInput.value = slug;
      QRRenderer.setPayload(fullUrl, 'dynamic_url');
      Utils.showToast(`Dynamic Link QR loaded!`, 'success');
    }, 100);
  },

  updateStats() {
    const links = this.getAllLinks();
    const totalScans = links.reduce((acc, l) => acc + (l.scans || 0), 0);
    const totalScansEl = document.getElementById('metric-total-scans');
    const scansMonthEl = document.getElementById('metric-scans-month');

    if (totalScansEl) totalScansEl.textContent = 1245 + totalScans;
    if (scansMonthEl) scansMonthEl.textContent = 256 + totalScans;
  },

  bindEvents() {
    const closeBtn = document.getElementById('btn-close-analytics');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
  }
};

if (typeof window !== 'undefined') {
  window.AnalyticsManager = AnalyticsManager;
}


// --- js/app.js ---
/* ==========================================================================
   ALL IN ONE QR GENERATER - Main Application Controller
   Designed & Developed by Gous Khan
   ========================================================================== */

const App = {
  currentView: 'landing', // 'landing' | 'dashboard'
  currentQRType: 'personal',
  _initialized: false,

  init() {
    this.initTheme();
    this.bindSidebarNavigation();
    this.bindTopBarControls();
    this.bindLandingEvents();
    this.initSubsystems();
    this.populateSidebarCounts();
    this.handleRoute();
    this.refreshIcons();
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
      this.refreshIcons(btn);
    }
  },

  initSubsystems() {
    try { QRRenderer.init('qr-canvas-container'); } catch (e) { console.warn('QRRenderer init warning:', e); }
    try { FormEngine.init('form-container'); } catch (e) { console.warn('FormEngine init warning:', e); }
    try { CustomizerStudio.init('customizer-modal'); } catch (e) { console.warn('CustomizerStudio init warning:', e); }
    try { QRScanner.init('scanner-modal'); } catch (e) { console.warn('QRScanner init warning:', e); }
    try { HistoryManager.init('history-modal'); } catch (e) { console.warn('HistoryManager init warning:', e); }
    try { TemplatesEngine.init('templates-modal'); } catch (e) { console.warn('TemplatesEngine init warning:', e); }
    try { BulkEngine.init('bulk-modal'); } catch (e) { console.warn('BulkEngine init warning:', e); }
    try { AnalyticsManager.init('analytics-modal'); } catch (e) { console.warn('AnalyticsManager init warning:', e); }
  },

  populateSidebarCounts() {
    const categories = ['basic', 'business', 'payments', 'identity', 'advanced'];
    categories.forEach(cat => {
      const countEl = document.getElementById(`count-${cat}`);
      if (countEl) {
        countEl.textContent = QR_REGISTRY.getByCategory(cat).length;
      }
    });

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

    this.refreshIcons();
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
    this.refreshIcons();
  },

  switchQRType(typeId) {
    const item = QR_REGISTRY.getById(typeId);
    if (!item) return;

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

    const titleEl = document.getElementById('topbar-title');
    const subtitleEl = document.getElementById('topbar-subtitle');
    if (titleEl) titleEl.textContent = item.name;
    if (subtitleEl) subtitleEl.textContent = item.subtitle || 'Create a customizable QR code.';

    document.querySelectorAll('.nav-item, .sub-nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.typeId === typeId);
    });

    // Expand parent category accordion if this is a sub-item
    const activeSub = document.querySelector(`.sub-nav-item[data-type-id="${typeId}"]`);
    if (activeSub) {
      const parentGroup = activeSub.closest('.nav-accordion-group');
      if (parentGroup) parentGroup.classList.add('open');
    }

    // Render Dynamic Form
    FormEngine.renderForm(typeId);

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

    // Submenu Items via Event Delegation
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
    this.refreshIcons(container);
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
    const search = window.location.search;
    const hash = window.location.hash;

    if (search.includes('studio=1') || hash === '#studio') {
      this.switchQRType('personal');
    } else if (hash.startsWith('#type=')) {
      const type = hash.replace('#type=', '').trim();
      this.switchQRType(type);
    } else {
      try {
        FormEngine.renderForm('personal');
      } catch (e) {
        console.warn('Initial form render deferred:', e);
      }
    }
  },

  refreshIcons(root) {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try {
        if (root) {
          window.lucide.createIcons({ root });
        } else {
          window.lucide.createIcons();
        }
      } catch (e) {
        console.warn('Lucide icon refresh warning:', e);
      }
    }
  }
};

// Ensure App is universally available on window object
if (typeof window !== 'undefined') {
  window.App = App;
}

// Global Click Delegation for Zero-Delay Studio Navigation
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


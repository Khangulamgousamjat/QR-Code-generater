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

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

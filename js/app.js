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
    QRRenderer.init('qr-canvas-container');
    FormEngine.init('form-container');
    CustomizerStudio.init('customizer-modal');
    QRScanner.init('scanner-modal');
    HistoryManager.init('history-modal');
    TemplatesEngine.init('templates-modal');
    BulkEngine.init('bulk-modal');
    AnalyticsManager.init('analytics-modal');
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
      FormEngine.renderForm('personal');
    }
  }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

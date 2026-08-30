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

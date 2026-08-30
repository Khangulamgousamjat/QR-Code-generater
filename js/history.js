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

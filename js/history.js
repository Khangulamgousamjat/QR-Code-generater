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

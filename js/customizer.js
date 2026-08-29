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

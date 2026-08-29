/* ==========================================================================
   ALL IN ONE QR GENERATER - QR Code Rendering & Styling Engine
   ========================================================================== */

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
    errorCorrectionLevel: 'Q', // L, M, Q, H
    
    // Module/Dots
    dotType: 'extra-rounded', // 'square', 'dots', 'rounded', 'extra-rounded', 'classy', 'classy-rounded'
    fgColor: '#17152B',
    useGradient: false,
    gradientType: 'linear',
    gradientColor2: '#7C3AED',
    
    // Eye / Corner Frames
    cornerSquareType: 'extra-rounded', // 'square', 'dot', 'extra-rounded', 'classy'
    cornerSquareColor: '#7C3AED',
    cornerDotType: 'dot', // 'square', 'dot'
    cornerDotColor: '#7C3AED',
    
    // Background
    bgColor: '#FFFFFF',
    
    // Center Logo
    logo: null,
    logoSize: 0.35,
    logoMargin: 6,
    
    // Frame Banner
    frameStyle: 'none', // 'none', 'bottom-pill', 'top-banner'
    frameText: 'SCAN TO VIEW',
    frameColor: '#7C3AED',
    frameTextColor: '#FFFFFF'
  },

  init(containerId = 'qr-canvas-container') {
    this.containerEl = document.getElementById(containerId);
    if (!this.containerEl) return;
    this.render();
  },

  setPayload(payload, qrTypeId = 'personal') {
    this.currentPayload = payload || "ALL IN ONE QR GENERATER";
    this.currentQRType = qrTypeId;
    this.update();
  },

  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    this.render();
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
    if (!this.containerEl) return;
    this.containerEl.innerHTML = '';

    if (typeof QRCodeStyling !== 'undefined') {
      try {
        const config = this.buildConfig(320);
        this.qrCodeInstance = new QRCodeStyling(config);
        this.qrCodeInstance.append(this.containerEl);
      } catch (err) {
        console.error("QR Code Styling render failed, fallback to canvas:", err);
        this.fallbackRender();
      }
    } else {
      this.fallbackRender();
    }
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
      } catch (e) {
        this.render();
      }
    } else {
      this.render();
    }
  },

  fallbackRender() {
    if (!this.containerEl) return;
    this.containerEl.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-secondary);">
      <p style="font-weight: 700; color: var(--primary); margin-bottom: 8px;">QR Code Live Preview</p>
      <p style="font-size: 11px; word-break: break-all; max-width: 260px; margin: 0 auto; opacity: 0.8;">${Utils.escapeHtml(this.currentPayload)}</p>
    </div>`;
  },

  // Export & Download System (PNG, JPEG, SVG)
  async download(format = 'png') {
    const size = parseInt(this.settings.exportSize) || 1024;
    const filename = `${this.currentQRType || 'qrcode'}-${Date.now()}`;

    Utils.showToast(`Generating high-resolution ${format.toUpperCase()} (${size}×${size})...`, 'info');

    if (this.qrCodeInstance) {
      try {
        // Create an export instance with the target high resolution
        const exportConfig = this.buildConfig(size);
        const exportInstance = new QRCodeStyling(exportConfig);
        await exportInstance.download({
          name: filename,
          extension: format.toLowerCase()
        });
        Utils.showToast(`QR Code downloaded as ${filename}.${format}`, 'success');

        // Log to local history
        if (window.HistoryManager) {
          HistoryManager.saveEntry(this.currentQRType, this.currentPayload, this.settings);
        }
      } catch (err) {
        console.error("Download error:", err);
        Utils.showToast("Failed to download QR code.", "error");
      }
    }
  },

  // Share System (Web Share API + Clipboard Fallback)
  async share() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QR Code from ALL IN ONE QR GENERATER',
          text: `Check out this QR Code for: ${this.currentPayload.substring(0, 50)}...`,
          url: window.location.href
        });
        Utils.showToast('Shared successfully!', 'success');
      } catch (e) {
        // Fallback to copy
        this.copyToClipboard();
      }
    } else {
      this.copyToClipboard();
    }
  },

  copyToClipboard() {
    navigator.clipboard.writeText(this.currentPayload).then(() => {
      Utils.showToast('QR Code content copied to clipboard!', 'success');
    }).catch(() => {
      Utils.showToast('Unable to copy to clipboard.', 'error');
    });
  }
};

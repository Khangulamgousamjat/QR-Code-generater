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

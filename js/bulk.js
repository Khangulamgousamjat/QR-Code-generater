/* ==========================================================================
   ALL IN ONE QR GENERATER - Bulk QR Code Batch Engine
   ========================================================================== */

const BulkEngine = {
  modalEl: null,

  init(modalId = 'bulk-modal') {
    this.modalEl = document.getElementById(modalId);
    this.bindEvents();
  },

  open() {
    if (!this.modalEl) return;
    this.modalEl.classList.add('active');
  },

  close() {
    if (!this.modalEl) return;
    this.modalEl.classList.remove('active');
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
          document.getElementById('bulk-textarea').value = event.target.result;
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
      Utils.showToast('JSZip library is loading. Please try again in a moment.', 'error');
      return;
    }

    const progressBox = document.getElementById('bulk-progress-box');
    const progressBar = document.getElementById('bulk-progress-bar');
    const progressText = document.getElementById('bulk-progress-text');
    const startBtn = document.getElementById('btn-start-bulk-generation');

    if (progressBox) progressBox.style.display = 'block';
    if (startBtn) startBtn.disabled = true;

    const zip = new JSZip();
    const folder = zip.folder("qr_codes");
    const total = lines.length;

    Utils.showToast(`Generating ${total} QR codes in batch...`, 'info');

    for (let i = 0; i < total; i++) {
      const line = lines[i];
      const filename = `qr_${i + 1}_${line.substring(0, 15).replace(/[^a-zA-Z0-9]/g, '_')}.png`;
      
      try {
        const tempContainer = document.createElement('div');
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
      } catch (err) {
        console.warn(`Bulk generation error for line ${i}:`, err);
      }

      // Update Progress UI
      const percent = Math.round(((i + 1) / total) * 100);
      if (progressBar) progressBar.style.width = `${percent}%`;
      if (progressText) progressText.textContent = `Generated ${i + 1} of ${total} (${percent}%)`;
    }

    if (progressText) progressText.textContent = "Compressing ZIP archive...";
    
    const zipBlob = await zip.generateAsync({ type: "blob" });
    if (typeof saveAs !== 'undefined') {
      saveAs(zipBlob, `bulk-qr-codes-${Date.now()}.zip`);
    } else {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipBlob);
      link.download = `bulk-qr-codes-${Date.now()}.zip`;
      link.click();
    }

    Utils.showToast(`Batch of ${total} QR codes downloaded successfully!`, 'success');
    if (startBtn) startBtn.disabled = false;
    if (progressBox) progressBox.style.display = 'none';
    this.close();
  }
};

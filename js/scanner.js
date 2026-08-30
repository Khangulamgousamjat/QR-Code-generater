/* ==========================================================================
   ALL IN ONE QR GENERATER - Integrated Scanner & Decoder
   Designed & Developed by Gous Khan
   ========================================================================== */

const QRScanner = {
  modalEl: null,
  videoEl: null,
  canvasEl: null,
  stream: null,
  scanning: false,

  getModal() {
    if (!this.modalEl || !document.body.contains(this.modalEl)) {
      this.modalEl = document.getElementById('scanner-modal');
    }
    return this.modalEl;
  },

  init(modalId = 'scanner-modal') {
    this.modalEl = document.getElementById(modalId);
    this.videoEl = document.getElementById('scanner-video');
    this.canvasEl = document.createElement('canvas');
    this.bindEvents();
  },

  open() {
    const modal = this.getModal();
    if (!modal) return;
    modal.classList.add('active');
    this.startCamera();
  },

  close() {
    const modal = this.getModal();
    if (!modal) return;
    modal.classList.remove('active');
    this.stopCamera();
  },

  bindEvents() {
    const closeBtn = document.getElementById('btn-close-scanner');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    // File Input Upload
    const fileInput = document.getElementById('scanner-file-input');
    const dropZone = document.getElementById('scanner-dropzone');

    if (dropZone && fileInput) {
      dropZone.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => this.handleImageFile(e.target.files[0]));

      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
      });

      dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));

      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
          this.handleImageFile(e.dataTransfer.files[0]);
        }
      });
    }
  },

  async startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      Utils.showToast('Camera access is not supported on this browser.', 'error');
      return;
    }

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      this.videoEl = this.videoEl || document.getElementById('scanner-video');
      if (this.videoEl) {
        this.videoEl.srcObject = this.stream;
        this.videoEl.setAttribute('playsinline', true);
        await this.videoEl.play();
        this.scanning = true;
        requestAnimationFrame(() => this.scanFrame());
      }
    } catch (err) {
      console.warn("Camera could not start:", err);
      Utils.showToast('Camera unavailable. You can upload a QR image instead.', 'info');
    }
  },

  stopCamera() {
    this.scanning = false;
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  },

  scanFrame() {
    if (!this.scanning || !this.videoEl || this.videoEl.readyState !== this.videoEl.HAVE_ENOUGH_DATA) {
      if (this.scanning) requestAnimationFrame(() => this.scanFrame());
      return;
    }

    const video = this.videoEl;
    const canvas = this.canvasEl || document.createElement('canvas');
    this.canvasEl = canvas;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    if (typeof jsQR !== 'undefined') {
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code && code.data) {
        this.handleScanResult(code.data);
        return;
      }
    }

    if (this.scanning) {
      requestAnimationFrame(() => this.scanFrame());
    }
  },

  handleImageFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      Utils.showToast('Please upload a valid image file (PNG, JPG, WEBP).', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = this.canvasEl || document.createElement('canvas');
        this.canvasEl = canvas;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        if (typeof jsQR !== 'undefined') {
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code && code.data) {
            this.handleScanResult(code.data);
          } else {
            Utils.showToast('No QR code detected in this image. Try another photo.', 'error');
          }
        } else {
          Utils.showToast('Decoder library not loaded.', 'error');
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  },

  handleScanResult(data) {
    Utils.showToast('QR Code successfully decoded!', 'success');
    this.stopCamera();

    const resultBox = document.getElementById('scanner-result-box');
    const resultText = document.getElementById('scanner-result-text');
    const resultTypeBadge = document.getElementById('scanner-result-type');
    const resultActions = document.getElementById('scanner-result-actions');

    if (!resultBox || !resultText) return;

    resultBox.style.display = 'flex';
    resultText.textContent = data;

    let actionsHtml = `<button class="btn-secondary" id="btn-copy-scan-result"><i data-lucide="copy"></i> Copy Content</button>`;

    if (/^https?:\/\//i.test(data)) {
      resultTypeBadge.textContent = 'Website URL';
      actionsHtml += `<a href="${data}" target="_blank" rel="noopener noreferrer" class="btn-primary-proceed" style="margin-left: 0;"><i data-lucide="external-link"></i> Open Website</a>`;
    } else if (/^WIFI:/i.test(data)) {
      resultTypeBadge.textContent = 'Wi-Fi Network';
      const ssidMatch = data.match(/S:([^;]+);/);
      const passMatch = data.match(/P:([^;]+);/);
      const ssid = ssidMatch ? ssidMatch[1] : 'Unknown';
      const pass = passMatch ? passMatch[1] : '';
      actionsHtml += `<span class="badge badge-purple">SSID: ${ssid}</span>`;
      if (pass) actionsHtml += `<button class="btn-secondary" onclick="navigator.clipboard.writeText('${pass}'); Utils.showToast('Password copied!','success');">Copy Password</button>`;
    } else if (/^upi:\/\/pay/i.test(data)) {
      resultTypeBadge.textContent = 'UPI Payment';
      actionsHtml += `<a href="${data}" class="btn-primary-proceed" style="margin-left: 0;"><i data-lucide="indian-rupee"></i> Pay via UPI App</a>`;
    } else if (/^BEGIN:VCARD/i.test(data)) {
      resultTypeBadge.textContent = 'vCard Contact';
    } else if (/^tel:/i.test(data)) {
      resultTypeBadge.textContent = 'Phone Call';
      actionsHtml += `<a href="${data}" class="btn-primary-proceed" style="margin-left: 0;"><i data-lucide="phone"></i> Call Now</a>`;
    } else if (/^mailto:/i.test(data)) {
      resultTypeBadge.textContent = 'Email';
      actionsHtml += `<a href="${data}" class="btn-primary-proceed" style="margin-left: 0;"><i data-lucide="mail"></i> Send Email</a>`;
    } else if (data.startsWith('ENC:')) {
      resultTypeBadge.textContent = 'Password Protected Content';
      actionsHtml += `
        <div style="display: flex; gap: 8px; width: 100%; margin-top: 6px;">
          <input type="password" id="input-decrypt-pass" placeholder="Enter password to decrypt" class="form-input" style="flex: 1;" />
          <button type="button" id="btn-decrypt-payload" class="btn-secondary">Decrypt</button>
        </div>
      `;
    } else {
      resultTypeBadge.textContent = 'Plain Text / Data';
    }

    resultActions.innerHTML = actionsHtml;
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try { window.lucide.createIcons({ root: resultActions }); } catch (e) {}
    }

    const copyBtn = document.getElementById('btn-copy-scan-result');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(data);
        Utils.showToast('Content copied to clipboard!', 'success');
      });
    }

    const decryptBtn = document.getElementById('btn-decrypt-payload');
    if (decryptBtn) {
      decryptBtn.addEventListener('click', () => {
        const pass = document.getElementById('input-decrypt-pass')?.value;
        const decrypted = Utils.decryptPayload(data, pass);
        if (decrypted) {
          resultText.textContent = decrypted;
          Utils.showToast('Decrypted successfully!', 'success');
        } else {
          Utils.showToast('Incorrect password or invalid payload.', 'error');
        }
      });
    }
  }
};

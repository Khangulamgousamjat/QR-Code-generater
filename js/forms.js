/* ==========================================================================
   ALL IN ONE QR GENERATER - Dynamic Schema Form Engine
   ========================================================================== */

const FormEngine = {
  activeType: null,
  formContainerEl: null,
  customFieldsList: [],
  debounceTimer: null,

  init(containerId = 'form-container') {
    this.formContainerEl = document.getElementById(containerId);
  },

  renderForm(qrTypeId) {
    const qrType = QR_REGISTRY.getById(qrTypeId);
    this.activeType = qrType;
    this.customFieldsList = [];

    if (!this.formContainerEl) return;

    let html = `
      <div class="form-card animate-fade-in">
        <!-- Form Header -->
        <div class="form-header">
          <div class="form-header-icon">
            <i data-lucide="${qrType.icon || 'qr-code'}"></i>
          </div>
          <div class="form-header-text">
            <h2 class="form-header-title">${Utils.escapeHtml(qrType.name)}</h2>
            <p class="form-header-desc">${Utils.escapeHtml(qrType.subtitle || '')}</p>
          </div>
        </div>

        <!-- Privacy / Legal Disclaimer if applicable -->
        ${qrType.disclaimer ? `
          <div class="privacy-alert-box">
            <i data-lucide="shield-alert" class="privacy-icon"></i>
            <div>${Utils.escapeHtml(qrType.disclaimer)}</div>
          </div>
        ` : ''}

        <!-- Dynamic Form Fields -->
        <form id="active-qr-form" class="${qrType.fields.length > 2 ? 'form-grid-2' : 'form-grid-1'}">
    `;

    // Render Fields
    qrType.fields.forEach(field => {
      const isSpan2 = field.colSpan === 2 || field.type === 'textarea';
      html += `
        <div class="form-group ${isSpan2 ? 'col-span-2' : ''}">
          <label class="form-label" for="field-${field.name}">
            <i data-lucide="${field.icon || 'circle'}" class="form-label-icon"></i>
            <span>${Utils.escapeHtml(field.label)}</span>
          </label>
          <div class="input-wrapper">
      `;

      if (field.type === 'textarea') {
        html += `
          <textarea 
            id="field-${field.name}" 
            name="${field.name}" 
            class="form-textarea" 
            placeholder="${Utils.escapeHtml(field.placeholder || '')}"
            rows="3"
          ></textarea>
        `;
      } else if (field.type === 'select') {
        html += `
          <select id="field-${field.name}" name="${field.name}" class="form-select">
            ${(field.options || []).map(opt => `
              <option value="${opt.value}">${Utils.escapeHtml(opt.label)}</option>
            `).join('')}
          </select>
        `;
      } else {
        html += `
          <input 
            type="${field.type || 'text'}" 
            id="field-${field.name}" 
            name="${field.name}" 
            class="form-input" 
            placeholder="${Utils.escapeHtml(field.placeholder || '')}"
            ${field.value ? `value="${Utils.escapeHtml(field.value)}"` : ''}
          />
        `;
      }

      html += `</div></div>`;
    });

    // Special Helper Buttons (Location / TOTP)
    if (qrType.hasLocationPicker) {
      html += `
        <div class="form-group col-span-2">
          <button type="button" id="btn-get-location" class="btn-secondary" style="align-self: flex-start;">
            <i data-lucide="crosshair"></i> Use Current GPS Location
          </button>
        </div>
      `;
    }

    if (qrType.hasTotpGenerator) {
      html += `
        <div class="form-group col-span-2">
          <button type="button" id="btn-generate-secret" class="btn-secondary" style="align-self: flex-start;">
            <i data-lucide="refresh-cw"></i> Generate New Random Base32 Secret Key
          </button>
        </div>
      `;
    }

    // Special Collapsible Extra Fields (Social Links & Custom Fields for Personal Details)
    if (qrType.hasMoreFields) {
      html += `
        <div class="form-group col-span-2">
          <div class="extra-fields-accordion" id="extra-accordion">
            <button type="button" class="extra-fields-toggle" id="extra-accordion-toggle">
              <span class="extra-fields-toggle-left">
                <i data-lucide="chevron-down" class="accordion-chevron"></i>
                <span>Show More Fields (Social Media & Custom Info)</span>
              </span>
              <span class="badge badge-purple">Optional</span>
            </button>
            
            <div class="extra-fields-body">
              <div class="form-grid-2">
      `;

      (qrType.socialFields || []).forEach(sf => {
        html += `
          <div class="form-group">
            <label class="form-label" for="field-${sf.name}">
              <i data-lucide="${sf.icon || 'link'}" class="form-label-icon"></i>
              <span>${Utils.escapeHtml(sf.label)}</span>
            </label>
            <input 
              type="text" 
              id="field-${sf.name}" 
              name="${sf.name}" 
              class="form-input" 
              placeholder="${Utils.escapeHtml(sf.placeholder || '')}"
            />
          </div>
        `;
      });

      html += `
              </div>
              
              <!-- Custom Fields Container -->
              <div id="custom-fields-container" style="display: flex; flex-direction: column; gap: 10px; margin-top: 8px;"></div>
              
              <button type="button" id="btn-add-custom-field" class="add-custom-field-btn">
                <i data-lucide="plus"></i> Add Custom Field
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // Form Footer Actions
    html += `
        </form>

        <div class="form-actions-footer">
          <button type="button" id="btn-reset-form" class="btn-secondary">
            <i data-lucide="rotate-ccw"></i> Reset Fields
          </button>
          <button type="button" id="btn-generate-form" class="btn-primary-proceed">
            <span>Proceed</span>
            <i data-lucide="arrow-right"></i>
          </button>
        </div>
      </div>
    `;

    this.formContainerEl.innerHTML = html;
    if (window.lucide) window.lucide.createIcons({ root: this.formContainerEl });

    this.bindEvents();
    this.handleFormChange(); // Trigger initial preview
  },

  bindEvents() {
    const form = document.getElementById('active-qr-form');
    if (!form) return;

    // Real-time live input updates with debouncing
    form.addEventListener('input', () => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => this.handleFormChange(), 180);
    });

    form.addEventListener('change', () => {
      this.handleFormChange();
    });

    // Reset Button
    const resetBtn = document.getElementById('btn-reset-form');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        this.customFieldsList = [];
        const customContainer = document.getElementById('custom-fields-container');
        if (customContainer) customContainer.innerHTML = '';
        this.handleFormChange();
        Utils.showToast('Form fields reset.', 'info');
      });
    }

    // Proceed / Generate Button
    const genBtn = document.getElementById('btn-generate-form');
    if (genBtn) {
      genBtn.addEventListener('click', () => {
        this.handleFormChange(true);
        Utils.showToast('QR Code generated successfully!', 'success');
      });
    }

    // Extra Accordion Toggle
    const accordionToggle = document.getElementById('extra-accordion-toggle');
    const accordion = document.getElementById('extra-accordion');
    if (accordionToggle && accordion) {
      accordionToggle.addEventListener('click', () => {
        accordion.classList.toggle('open');
      });
    }

    // Add Custom Field Button
    const addCustomBtn = document.getElementById('btn-add-custom-field');
    if (addCustomBtn) {
      addCustomBtn.addEventListener('click', () => this.addCustomField());
    }

    // GPS Location Picker
    const locBtn = document.getElementById('btn-get-location');
    if (locBtn) {
      locBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
          Utils.showToast('Fetching GPS coordinates...', 'info');
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const latInput = document.getElementById('field-latitude');
              const lngInput = document.getElementById('field-longitude');
              if (latInput) latInput.value = pos.coords.latitude.toFixed(6);
              if (lngInput) lngInput.value = pos.coords.longitude.toFixed(6);
              this.handleFormChange();
              Utils.showToast('Location updated!', 'success');
            },
            (err) => {
              Utils.showToast('Unable to retrieve GPS coordinates: ' + err.message, 'error');
            }
          );
        } else {
          Utils.showToast('Geolocation is not supported by your browser.', 'error');
        }
      });
    }

    // TOTP Secret Generator
    const totpBtn = document.getElementById('btn-generate-secret');
    if (totpBtn) {
      totpBtn.addEventListener('click', () => {
        const secretInput = document.getElementById('field-secret');
        if (secretInput) {
          secretInput.value = Utils.generateTotpSecret();
          this.handleFormChange();
          Utils.showToast('New TOTP secret generated!', 'success');
        }
      });
    }
  },

  addCustomField() {
    const container = document.getElementById('custom-fields-container');
    if (!container) return;

    const fieldId = 'cf_' + Date.now();
    const row = document.createElement('div');
    row.className = 'custom-field-row';
    row.id = fieldId;

    row.innerHTML = `
      <input type="text" placeholder="Field Name (e.g., Discord)" class="form-input cf-key" />
      <input type="text" placeholder="Value (e.g., User#1234)" class="form-input cf-val" />
      <button type="button" class="remove-field-btn" title="Remove Field">
        <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
      </button>
    `;

    container.appendChild(row);
    if (window.lucide) window.lucide.createIcons({ root: row });

    row.querySelector('.remove-field-btn').addEventListener('click', () => {
      row.remove();
      this.handleFormChange();
    });

    row.querySelectorAll('input').forEach(inp => {
      inp.addEventListener('input', () => this.handleFormChange());
    });
  },

  getFormData() {
    const form = document.getElementById('active-qr-form');
    if (!form) return {};

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Gather custom fields
    const customRows = document.querySelectorAll('.custom-field-row');
    if (customRows.length > 0) {
      data.customFields = [];
      customRows.forEach(row => {
        const key = row.querySelector('.cf-key')?.value?.trim();
        const val = row.querySelector('.cf-val')?.value?.trim();
        if (key && val) {
          data.customFields.push({ key, val });
        }
      });
    }

    return data;
  },

  handleFormChange(force = false) {
    const data = this.getFormData();
    let payload = '';

    if (this.activeType && typeof this.activeType.buildPayload === 'function') {
      payload = this.activeType.buildPayload(data);
    } else {
      payload = Object.values(data).filter(Boolean).join(' ') || 'ALL IN ONE QR GENERATER';
    }

    QRRenderer.setPayload(payload, this.activeType ? this.activeType.id : 'personal');
  }
};

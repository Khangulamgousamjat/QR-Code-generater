const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ALL IN ONE QR GENERATOR BUILD SYSTEM ===');

// 1. Fix and prepare Master CSS
let masterCSS = fs.readFileSync('style.css', 'utf8');

// Fix missing dots on class selectors if any
masterCSS = masterCSS.replace(/(^|\}|\n)\s*btn-hero-primary\s*\{/g, '$1\n.btn-hero-primary {');
masterCSS = masterCSS.replace(/(^|\}|\n)\s*btn-landing-cta\s*\{/g, '$1\n.btn-landing-cta {');
masterCSS = masterCSS.replace(/(^|\}|\n)\s*btn-open-studio\s*\{/g, '$1\n.btn-open-studio {');
masterCSS = masterCSS.replace(/btn-hero-primary:hover/g, '.btn-hero-primary:hover');
masterCSS = masterCSS.replace(/btn-landing-cta:hover/g, '.btn-landing-cta:hover');

fs.writeFileSync('style.css', masterCSS, 'utf8');
console.log('[CSS] style.css updated cleanly (length:', masterCSS.length, ')');

// 2. Build JS Bundle from source js/ files
const jsFiles = [
  'js/utils.js',
  'js/qr-registry.js',
  'js/qr-renderer.js',
  'js/forms.js',
  'js/customizer.js',
  'js/scanner.js',
  'js/history.js',
  'js/templates.js',
  'js/bulk.js',
  'js/analytics.js',
  'js/app.js'
];

let masterJS = `/* ==========================================================================
   ALL IN ONE - Professional QR Generator Master Bundle
   Designed & Developed by Gous Khan
   ========================================================================== */\n\n`;

jsFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  masterJS += `\n// --- ${file} ---\n` + content + '\n';
});

// Verify JS Syntax before saving
try {
  new vm.Script(masterJS, { filename: 'masterJS_test.js' });
  console.log('[JS] Master JS bundle validated successfully with ZERO syntax errors!');
} catch (err) {
  console.error('[JS FATAL ERROR] Master JS bundle syntax error:', err.message);
  process.exit(1);
}

fs.writeFileSync('script.js', masterJS, 'utf8');
fs.writeFileSync('bundle.js', masterJS, 'utf8');
console.log('[JS] script.js and bundle.js written successfully (length:', masterJS.length, ')');

// 3. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// Replace inline <style> content
const styleStartTag = '<!-- Inlined Master Stylesheet for 100% Guaranteed Zero-Latency First-Paint Styling -->\n  <style>';
const styleEndTag = '</style>';

const styleStartIdx = html.indexOf('<style>');
const styleEndIdx = html.indexOf('</style>', styleStartIdx);

if (styleStartIdx !== -1 && styleEndIdx !== -1) {
  html = html.substring(0, styleStartIdx + '<style>'.length) + '\n' + masterCSS + '\n' + html.substring(styleEndIdx);
  console.log('[HTML] Inlined CSS in index.html updated');
} else {
  console.error('[HTML ERROR] Could not find <style> tags in index.html');
}

// Replace inline <script> content
const scriptStartIdx = html.lastIndexOf('<script>');
const scriptEndIdx = html.lastIndexOf('</script>');

if (scriptStartIdx !== -1 && scriptEndIdx !== -1) {
  html = html.substring(0, scriptStartIdx + '<script>'.length) + '\n' + masterJS + '\n' + html.substring(scriptEndIdx);
  console.log('[HTML] Inlined JS script tag in index.html updated');
} else {
  console.error('[HTML ERROR] Could not find final <script> tag in index.html');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('[BUILD COMPLETE] index.html updated cleanly (total length:', html.length, ')');

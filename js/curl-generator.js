(function() {
  'use strict';

  function init() {
    const methodEl = document.getElementById('curl-method');
    const urlEl = document.getElementById('curl-url');
    const headersEl = document.getElementById('curl-headers');
    const bodyEl = document.getElementById('curl-body');
    const generateBtn = document.getElementById('curl-generate');
    const outputEl = document.getElementById('curl-output');
    const copyBtn = document.getElementById('curl-copy');

    generateBtn.addEventListener('click', () => {
      const url = urlEl.value.trim();
      if (!url) return;

      let cmd = "curl -X " + methodEl.value + " '" + url + "'";

      const headers = headersEl.value.trim();
      if (headers) {
        headers.split('\n').forEach(h => {
          if (h.trim()) cmd += " \\\n  -H '" + h.trim() + "'";
        });
      }

      const body = bodyEl.value.trim();
      const method = methodEl.value;
      if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
        cmd += " \\\n  -d '" + body.replace(/'/g, "'\\''") + "'";
      }

      outputEl.textContent = cmd;
    });

    copyBtn.addEventListener('click', () => {
      const text = outputEl.textContent;
      if (text && !text.includes('placeholder')) {
        navigator.clipboard.writeText(text);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

(function() {
  'use strict';

  function init() {
    const inputEl = document.getElementById('escape-input');
    const outputEl = document.getElementById('escape-output');
    const typeEl = document.getElementById('escape-type');
    const encodeBtn = document.getElementById('escape-encode');
    const decodeBtn = document.getElementById('escape-decode');
    const swapBtn = document.getElementById('escape-swap');
    const copyBtn = document.getElementById('escape-copy');
    const clearBtn = document.getElementById('escape-clear');
    const errorEl = document.getElementById('escape-error');

    function showError(msg) {
      errorEl.textContent = msg;
      errorEl.classList.remove('hidden');
    }

    function hideError() {
      errorEl.classList.add('hidden');
    }

    function escapeJson(str) {
      return JSON.stringify(str).slice(1, -1);
    }

    function unescapeJson(str) {
      try { return JSON.parse('"' + str + '"'); } catch (e) { throw new Error('Invalid escaped string'); }
    }

    function escapeJs(str) {
      return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
    }

    function unescapeJs(str) {
      return str.replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t').replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, '\\');
    }

    function escapeHtml(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    }

    function unescapeHtml(str) {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = str;
      return textarea.value;
    }

    encodeBtn.addEventListener('click', () => {
      hideError();
      const input = inputEl.value;
      if (!input) { showError('Input is empty'); return; }
      try {
        const type = typeEl.value;
        if (type === 'json') outputEl.textContent = escapeJson(input);
        else if (type === 'js') outputEl.textContent = escapeJs(input);
        else if (type === 'html') outputEl.textContent = escapeHtml(input);
        else if (type === 'css') outputEl.textContent = JSON.stringify(input).slice(1, -1);
      } catch (e) { showError(e.message); }
    });

    decodeBtn.addEventListener('click', () => {
      hideError();
      const input = inputEl.value;
      if (!input) { showError('Input is empty'); return; }
      try {
        const type = typeEl.value;
        if (type === 'json') outputEl.textContent = unescapeJson(input);
        else if (type === 'js') outputEl.textContent = unescapeJs(input);
        else if (type === 'html') outputEl.textContent = unescapeHtml(input);
        else if (type === 'css') outputEl.textContent = JSON.parse('"' + input + '"');
      } catch (e) { showError(e.message); }
    });

    swapBtn.addEventListener('click', () => {
      const output = outputEl.textContent;
      if (output && !output.includes('placeholder')) {
        inputEl.value = output;
        outputEl.innerHTML = '<span class="placeholder">Output will appear here</span>';
      }
    });

    copyBtn.addEventListener('click', () => {
      const text = outputEl.textContent;
      if (text && !text.includes('placeholder')) navigator.clipboard.writeText(text);
    });

    clearBtn.addEventListener('click', () => {
      inputEl.value = '';
      outputEl.innerHTML = '<span class="placeholder">Output will appear here</span>';
      hideError();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

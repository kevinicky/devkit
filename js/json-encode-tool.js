(function() {
  'use strict';

  function init() {
    const inputEl = document.getElementById('jsonenc-input');
    const outputEl = document.getElementById('jsonenc-output');
    const errorEl = document.getElementById('jsonenc-error');
    const encodeBtn = document.getElementById('jsonenc-encode');
    const decodeBtn = document.getElementById('jsonenc-decode');
    const swapBtn = document.getElementById('jsonenc-swap');
    const copyBtn = document.getElementById('jsonenc-copy');
    const clearBtn = document.getElementById('jsonenc-clear');

    function showError(msg) {
      errorEl.textContent = msg;
      errorEl.classList.remove('hidden');
    }

    function hideError() {
      errorEl.classList.add('hidden');
    }

    encodeBtn.addEventListener('click', () => {
      hideError();
      const input = inputEl.value;
      if (!input) { showError('Input is empty'); return; }
      try {
        JSON.parse(input);
        outputEl.textContent = encodeURIComponent(input);
      } catch (e) {
        showError('Invalid JSON: ' + e.message);
      }
    });

    decodeBtn.addEventListener('click', () => {
      hideError();
      const input = inputEl.value.trim();
      if (!input) { showError('Input is empty'); return; }
      try {
        const decoded = decodeURIComponent(input);
        JSON.parse(decoded);
        outputEl.textContent = decoded;
      } catch (e) {
        showError('Decode error: ' + e.message);
      }
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
      if (text && !text.includes('placeholder')) {
        navigator.clipboard.writeText(text).then(() => {
          const original = copyBtn.textContent;
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = original; }, 1500);
        });
      }
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

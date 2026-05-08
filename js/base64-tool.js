(function() {
  'use strict';

  function init() {
    const inputEl = document.getElementById('base64-input');
    const outputEl = document.getElementById('base64-output');
    const errorEl = document.getElementById('base64-error');
    const encodeBtn = document.getElementById('base64-encode');
    const decodeBtn = document.getElementById('base64-decode');
    const swapBtn = document.getElementById('base64-swap');
    const copyBtn = document.getElementById('base64-copy');
    const clearBtn = document.getElementById('base64-clear');

    function showError(msg) {
      errorEl.textContent = msg;
      errorEl.classList.remove('hidden');
    }

    function hideError() {
      errorEl.classList.add('hidden');
    }

    function setOutput(text) {
      outputEl.textContent = text;
    }

    encodeBtn.addEventListener('click', () => {
      hideError();
      const input = inputEl.value;
      if (!input) { showError('Input is empty'); return; }
      try {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } catch (e) {
        showError('Encode error: ' + e.message);
      }
    });

    decodeBtn.addEventListener('click', () => {
      hideError();
      const input = inputEl.value.trim();
      if (!input) { showError('Input is empty'); return; }
      try {
        setOutput(decodeURIComponent(escape(atob(input))));
      } catch (e) {
        showError('Decode error: Invalid Base64 string');
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

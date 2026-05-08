(function() {
  'use strict';

  function init() {
    const inputEl = document.getElementById('url-input');
    const outputEl = document.getElementById('url-output');
    const errorEl = document.getElementById('url-error');
    const encodeBtn = document.getElementById('url-encode');
    const decodeBtn = document.getElementById('url-decode');
    const swapBtn = document.getElementById('url-swap');
    const copyBtn = document.getElementById('url-copy');
    const clearBtn = document.getElementById('url-clear');

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
      setOutput(encodeURIComponent(input));
    });

    decodeBtn.addEventListener('click', () => {
      hideError();
      const input = inputEl.value.trim();
      if (!input) { showError('Input is empty'); return; }
      try {
        setOutput(decodeURIComponent(input));
      } catch (e) {
        showError('Decode error: Invalid encoded URL');
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

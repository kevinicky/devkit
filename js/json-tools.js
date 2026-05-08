(function() {
  'use strict';

  function prettify(json) {
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed, null, 2);
  }

  function minify(json) {
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed);
  }

  function encode(json) {
    return encodeURIComponent(json);
  }

  function decode(str) {
    return decodeURIComponent(str);
  }

  function init() {
    const inputEl = document.getElementById('json-input');
    const outputEl = document.getElementById('json-output');
    const errorEl = document.getElementById('json-error');
    const prettifyBtn = document.getElementById('json-prettify');
    const minifyBtn = document.getElementById('json-minify');
    const encodeBtn = document.getElementById('json-encode');
    const decodeBtn = document.getElementById('json-decode');
    const copyBtn = document.getElementById('json-copy');
    const clearBtn = document.getElementById('json-clear');

    function showError(msg) {
      errorEl.textContent = msg;
      errorEl.classList.remove('hidden');
    }

    function hideError() {
      errorEl.classList.add('hidden');
    }

    function process(fn) {
      hideError();
      const input = inputEl.value.trim();
      if (!input) {
        showError('Input is empty');
        return;
      }
      try {
        const result = fn(input);
        outputEl.textContent = result;
      } catch (e) {
        showError('Error: ' + e.message);
      }
    }

    prettifyBtn.addEventListener('click', () => process(prettify));
    minifyBtn.addEventListener('click', () => process(minify));
    encodeBtn.addEventListener('click', () => process(encode));
    decodeBtn.addEventListener('click', () => process(decode));

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

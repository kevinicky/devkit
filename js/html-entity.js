(function() {
  'use strict';

  function encodeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function decodeHtml(str) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
  }

  function init() {
    const inputEl = document.getElementById('htmlentity-input');
    const outputEl = document.getElementById('htmlentity-output');
    const encodeBtn = document.getElementById('htmlentity-encode');
    const decodeBtn = document.getElementById('htmlentity-decode');
    const swapBtn = document.getElementById('htmlentity-swap');
    const copyBtn = document.getElementById('htmlentity-copy');
    const clearBtn = document.getElementById('htmlentity-clear');

    encodeBtn.addEventListener('click', () => { outputEl.textContent = encodeHtml(inputEl.value); });
    decodeBtn.addEventListener('click', () => { outputEl.textContent = decodeHtml(inputEl.value); });

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
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

(function() {
  'use strict';

  function convertBase(value, fromBase, toBase) {
    const decimal = parseInt(value, fromBase);
    if (isNaN(decimal)) return null;
    return decimal.toString(toBase);
  }

  function init() {
    const inputEl = document.getElementById('baseconv-input');
    const binEl = document.getElementById('baseconv-bin');
    const octEl = document.getElementById('baseconv-oct');
    const decEl = document.getElementById('baseconv-dec');
    const hexEl = document.getElementById('baseconv-hex');

    let debounceTimer = null;

    inputEl.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const val = inputEl.value.trim();
        if (!val) {
          binEl.textContent = '-';
          octEl.textContent = '-';
          decEl.textContent = '-';
          hexEl.textContent = '-';
          return;
        }

        let decimal = null;
        if (/^[01]+$/.test(val)) decimal = parseInt(val, 2);
        else if (/^[0-7]+$/.test(val)) decimal = parseInt(val, 8);
        else if (/^[0-9]+$/.test(val)) decimal = parseInt(val, 10);
        else if (/^[0-9a-fA-F]+$/.test(val)) decimal = parseInt(val, 16);

        if (decimal === null || isNaN(decimal)) {
          binEl.textContent = 'Invalid';
          octEl.textContent = 'Invalid';
          decEl.textContent = 'Invalid';
          hexEl.textContent = 'Invalid';
          return;
        }

        binEl.textContent = decimal.toString(2);
        octEl.textContent = decimal.toString(8);
        decEl.textContent = decimal.toString(10);
        hexEl.textContent = decimal.toString(16).toUpperCase();
      }, 150);
    });

    document.querySelectorAll('.btn-copy-baseconv').forEach(btn => {
      btn.addEventListener('click', () => {
        const base = btn.dataset.base;
        const el = document.getElementById('baseconv-' + base);
        if (el && el.textContent !== '-') {
          navigator.clipboard.writeText(el.textContent).then(() => {
            const original = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => { btn.textContent = original; }, 1500);
          });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

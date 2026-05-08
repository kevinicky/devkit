(function() {
  'use strict';

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 15);
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function init() {
    const countInput = document.getElementById('uuid-count');
    const formatSelect = document.getElementById('uuid-format');
    const generateBtn = document.getElementById('uuid-generate');
    const outputEl = document.getElementById('uuid-output');
    const copyBtn = document.getElementById('uuid-copy');

    generateBtn.addEventListener('click', () => {
      const count = Math.min(Math.max(parseInt(countInput.value) || 1, 1), 100);
      const format = formatSelect.value;
      const uuids = [];

      for (let i = 0; i < count; i++) {
        let uuid = generateUUID();
        if (format === 'nodash') uuid = uuid.replace(/-/g, '');
        if (format === 'upper') uuid = uuid.toUpperCase();
        uuids.push(uuid);
      }

      outputEl.textContent = uuids.join('\n');
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

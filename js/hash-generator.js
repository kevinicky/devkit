(function() {
  'use strict';

  async function hashText(text, algorithm) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function init() {
    const inputEl = document.getElementById('hash-input');
    const md5El = document.getElementById('hash-md5');
    const sha1El = document.getElementById('hash-sha1');
    const sha256El = document.getElementById('hash-sha256');
    const sha512El = document.getElementById('hash-sha512');

    let debounceTimer = null;

    inputEl.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        const text = inputEl.value;
        if (!text) {
          md5El.textContent = '-';
          sha1El.textContent = '-';
          sha256El.textContent = '-';
          sha512El.textContent = '-';
          return;
        }

        try {
          const [sha1, sha256, sha512] = await Promise.all([
            hashText(text, 'SHA-1'),
            hashText(text, 'SHA-256'),
            hashText(text, 'SHA-512')
          ]);
          sha1El.textContent = sha1;
          sha256El.textContent = sha256;
          sha512El.textContent = sha512;
          md5El.textContent = 'MD5 not available (use SHA-256)';
        } catch (e) {
          sha1El.textContent = 'Error: ' + e.message;
          sha256El.textContent = 'Error: ' + e.message;
          sha512El.textContent = 'Error: ' + e.message;
        }
      }, 200);
    });

    document.querySelectorAll('.btn-copy-hash').forEach(btn => {
      btn.addEventListener('click', () => {
        const hashType = btn.dataset.hash;
        const el = document.getElementById('hash-' + hashType);
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

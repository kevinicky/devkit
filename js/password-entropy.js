(function() {
  'use strict';

  function formatTime(seconds) {
    if (seconds < 60) return Math.round(seconds) + ' seconds';
    if (seconds < 3600) return Math.round(seconds / 60) + ' minutes';
    if (seconds < 86400) return Math.round(seconds / 3600) + ' hours';
    if (seconds < 31536000) return Math.round(seconds / 86400) + ' days';
    if (seconds < 31536000 * 1000) return Math.round(seconds / 31536000) + ' years';
    return 'centuries';
  }

  function init() {
    const inputEl = document.getElementById('passent-input');
    const entropyEl = document.getElementById('passent-entropy');
    const poolEl = document.getElementById('passent-pool');
    const strengthEl = document.getElementById('passent-strength');
    const onlineEl = document.getElementById('passent-online');
    const offlineEl = document.getElementById('passent-offline');

    let debounceTimer = null;

    inputEl.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const pw = inputEl.value;
        if (!pw) {
          entropyEl.textContent = '-';
          poolEl.textContent = '-';
          strengthEl.textContent = '-';
          onlineEl.textContent = '-';
          offlineEl.textContent = '-';
          return;
        }

        let pool = 0;
        if (/[a-z]/.test(pw)) pool += 26;
        if (/[A-Z]/.test(pw)) pool += 26;
        if (/[0-9]/.test(pw)) pool += 10;
        if (/[^a-zA-Z0-9]/.test(pw)) pool += 32;

        const entropy = pw.length * Math.log2(pool || 1);
        const attempts = Math.pow(2, entropy);
        const onlineTime = attempts / 100;
        const offlineTime = attempts / 1e10;

        entropyEl.textContent = entropy.toFixed(1) + ' bits';
        poolEl.textContent = pool;

        let strength, cls;
        if (entropy < 28) { strength = 'Very Weak'; cls = 'strength-weak'; }
        else if (entropy < 36) { strength = 'Weak'; cls = 'strength-weak'; }
        else if (entropy < 60) { strength = 'Fair'; cls = 'strength-fair'; }
        else if (entropy < 80) { strength = 'Strong'; cls = 'strength-good'; }
        else { strength = 'Very Strong'; cls = 'strength-strong'; }

        strengthEl.innerHTML = '<span class="' + cls + '">' + strength + '</span>';
        onlineEl.textContent = '~' + formatTime(onlineTime);
        offlineEl.textContent = '~' + formatTime(offlineTime);
      }, 150);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

(function() {
  'use strict';

  function base64UrlEncode(str) {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  async function signJWT(header, payload, secret, algorithm) {
    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));
    const data = encodedHeader + '.' + encodedPayload;

    if (algorithm === 'HS256') {
      const encoder = new TextEncoder();
      const keyData = encoder.encode(secret);
      const cryptoKey = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
      const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(data));
      const signatureArray = new Uint8Array(signature);
      const signatureBase64 = btoa(String.fromCharCode(...signatureArray));
      return data + '.' + signatureBase64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    return data + '.UNSIGNED';
  }

  function init() {
    const headerEl = document.getElementById('jwtgen-header');
    const payloadEl = document.getElementById('jwtgen-payload');
    const secretEl = document.getElementById('jwtgen-secret');
    const generateBtn = document.getElementById('jwtgen-generate');
    const tokenEl = document.getElementById('jwtgen-token');
    const copyBtn = document.getElementById('jwtgen-copy');
    const errorEl = document.getElementById('jwtgen-error');

    function showError(msg) {
      errorEl.textContent = msg;
      errorEl.classList.remove('hidden');
    }

    function hideError() {
      errorEl.classList.add('hidden');
    }

    generateBtn.addEventListener('click', async () => {
      hideError();

      let header, payload;
      try {
        header = JSON.parse(headerEl.value);
      } catch (e) {
        showError('Invalid JSON in header: ' + e.message);
        return;
      }

      try {
        payload = JSON.parse(payloadEl.value);
      } catch (e) {
        showError('Invalid JSON in payload: ' + e.message);
        return;
      }

      const secret = secretEl.value;
      if (!secret) {
        showError('Secret is required for signing');
        return;
      }

      try {
        const algorithm = (header.alg || 'HS256').toUpperCase();
        const token = await signJWT(header, payload, secret, algorithm);
        tokenEl.textContent = token;
      } catch (e) {
        showError('Signing error: ' + e.message);
      }
    });

    copyBtn.addEventListener('click', () => {
      const text = tokenEl.textContent;
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

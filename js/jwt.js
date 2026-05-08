(function() {
  'use strict';

  function base64UrlDecode(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    const pad = str.length % 4;
    if (pad) {
      str += '='.repeat(4 - pad);
    }
    return decodeURIComponent(atob(str).split('').map(c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));
  }

  function decodeJWT(token) {
    try {
      token = token.trim();
      const parts = token.split('.');
      if (parts.length !== 3) {
        return { error: 'Invalid JWT format. Expected 3 parts separated by dots.' };
      }

      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));

      const now = Math.floor(Date.now() / 1000);
      let signatureStatus = 'Cannot verify signature (no secret provided)';
      let statusClass = 'jwt-signature-invalid';

      if (payload.exp && payload.exp < now) {
        signatureStatus = 'Token expired';
        statusClass = 'jwt-signature-invalid';
      } else if (payload.exp) {
        const expiresIn = payload.exp - now;
        signatureStatus = `Valid (expires in ${formatTime(expiresIn)})`;
        statusClass = 'jwt-signature-valid';
      } else if (!payload.exp) {
        signatureStatus = 'No expiration claim (exp)';
        statusClass = 'jwt-signature-invalid';
      }

      return { header, payload, signatureStatus, statusClass };
    } catch (e) {
      return { error: 'Failed to decode JWT: ' + e.message };
    }
  }

  function formatTime(seconds) {
    if (seconds < 60) return seconds + 's';
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm ' + (seconds % 60) + 's';
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hours + 'h ' + mins + 'm';
  }

  function syntaxHighlight(json) {
    if (typeof json !== 'string') {
      json = JSON.stringify(json, null, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
      let cls = 'jwt-payload-content';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'jwt-header-content';
        }
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }

  function init() {
    const input = document.getElementById('jwt-input');
    const headerEl = document.getElementById('jwt-header');
    const payloadEl = document.getElementById('jwt-payload');
    const signatureEl = document.getElementById('jwt-signature');

    let debounceTimer = null;

    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const token = input.value.trim();
        if (!token) {
          headerEl.innerHTML = '<span class="placeholder">Header will appear here</span>';
          payloadEl.innerHTML = '<span class="placeholder">Payload will appear here</span>';
          signatureEl.innerHTML = '<span class="placeholder">Signature verification status</span>';
          return;
        }

        const result = decodeJWT(token);

        if (result.error) {
          headerEl.innerHTML = '<span class="jwt-signature-invalid">' + escapeHtml(result.error) + '</span>';
          payloadEl.innerHTML = '';
          signatureEl.innerHTML = '';
          return;
        }

        headerEl.innerHTML = syntaxHighlight(result.header);
        payloadEl.innerHTML = syntaxHighlight(result.payload);
        signatureEl.innerHTML = '<span class="' + result.statusClass + '">' + escapeHtml(result.signatureStatus) + '</span>';
      }, 150);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

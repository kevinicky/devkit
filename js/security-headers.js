(function() {
  'use strict';

  const HEADERS = {
    'content-security-policy': { name: 'Content-Security-Policy', desc: 'Controls resources the browser can load', critical: true },
    'strict-transport-security': { name: 'Strict-Transport-Security', desc: 'Forces HTTPS connections', critical: true },
    'x-frame-options': { name: 'X-Frame-Options', desc: 'Prevents clickjacking attacks', critical: true },
    'x-content-type-options': { name: 'X-Content-Type-Options', desc: 'Prevents MIME-type sniffing', critical: true },
    'referrer-policy': { name: 'Referrer-Policy', desc: 'Controls referrer information', critical: false },
    'permissions-policy': { name: 'Permissions-Policy', desc: 'Controls browser features', critical: false },
    'x-xss-protection': { name: 'X-XSS-Protection', desc: 'Legacy XSS filter (deprecated)', critical: false },
    'cache-control': { name: 'Cache-Control', desc: 'Controls caching behavior', critical: false },
    'set-cookie': { name: 'Set-Cookie', desc: 'Cookie with security flags', critical: false }
  };

  function init() {
    const inputEl = document.getElementById('secheaders-input');
    const analyzeBtn = document.getElementById('secheaders-analyze');
    const resultsEl = document.getElementById('secheaders-results');

    analyzeBtn.addEventListener('click', () => {
      const headers = {};
      inputEl.value.split('\n').forEach(line => {
        const idx = line.indexOf(':');
        if (idx > 0) {
          headers[line.substring(0, idx).trim().toLowerCase()] = line.substring(idx + 1).trim();
        }
      });

      let html = '';
      let score = 0;
      let total = 0;

      Object.keys(HEADERS).forEach(key => {
        const h = HEADERS[key];
        total++;
        const present = headers[key];
        if (present) score++;

        let status = present ? 'present' : 'missing';
        let statusClass = present ? 'status-ok' : 'status-missing';

        let advice = '';
        if (key === 'content-security-policy' && present) {
          if (present.includes("'unsafe-inline'") || present.includes("'unsafe-eval'")) {
            advice = '⚠️ Consider removing unsafe-inline/unsafe-eval';
            statusClass = 'status-warn';
          }
        }
        if (key === 'x-xss-protection' && present) {
          advice = 'ℹ️ Deprecated - use CSP instead';
          statusClass = 'status-warn';
        }
        if (key === 'set-cookie' && present) {
          if (!present.includes('Secure') || !present.includes('HttpOnly')) {
            advice = '⚠️ Missing Secure or HttpOnly flags';
            statusClass = 'status-warn';
          }
        }

        html += '<div class="secheader-item ' + statusClass + '">';
        html += '<div class="secheader-name">' + (present ? '✓' : '✗') + ' ' + h.name + '</div>';
        html += '<div class="secheader-desc">' + h.desc + '</div>';
        if (present) html += '<div class="secheader-value">' + present + '</div>';
        if (advice) html += '<div class="secheader-advice">' + advice + '</div>';
        html += '</div>';
      });

      const pct = Math.round((score / total) * 100);
      html = '<div class="secheaders-score">Security Score: ' + pct + '% (' + score + '/' + total + ' headers)</div>' + html;
      resultsEl.innerHTML = html;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

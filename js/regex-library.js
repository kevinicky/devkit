(function() {
  'use strict';

  const PATTERNS = [
    { name: 'Email', pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', desc: 'Match email addresses' },
    { name: 'URL', pattern: '^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$', desc: 'Match URLs' },
    { name: 'IPv4', pattern: '^(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$', desc: 'Match IPv4 addresses' },
    { name: 'IPv6', pattern: '^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$', desc: 'Match IPv6 addresses' },
    { name: 'Phone (US)', pattern: '^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$', desc: 'Match US phone numbers' },
    { name: 'Date (YYYY-MM-DD)', pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$', desc: 'Match ISO dates' },
    { name: 'Time (HH:MM)', pattern: '^([01]\\d|2[0-3]):[0-5]\\d$', desc: 'Match 24h time' },
    { name: 'Credit Card', pattern: '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\\d{3})\\d{11})$', desc: 'Match credit card numbers' },
    { name: 'SSN (US)', pattern: '^\\d{3}-\\d{2}-\\d{4}$', desc: 'Match US Social Security Numbers' },
    { name: 'Hex Color', pattern: '^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$', desc: 'Match hex color codes' },
    { name: 'HTML Tag', pattern: '<\\/?[a-z][\\s\\S]*>', desc: 'Match HTML tags' },
    { name: 'Whitespace', pattern: '\\s+', desc: 'Match whitespace' },
    { name: 'Non-empty Line', pattern: '^.+$', desc: 'Match non-empty lines' },
    { name: 'UUID', pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$', desc: 'Match UUIDs' },
    { name: 'Zip Code (US)', pattern: '^\\d{5}(-\\d{4})?$', desc: 'Match US zip codes' },
    { name: 'Password (strong)', pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$', desc: 'Min 8 chars, upper, lower, number, symbol' },
    { name: 'Username', pattern: '^[a-zA-Z0-9_]{3,16}$', desc: '3-16 alphanumeric + underscore' },
    { name: 'MAC Address', pattern: '^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$', desc: 'Match MAC addresses' },
    { name: 'Base64', pattern: '^[A-Za-z0-9+/]*={0,2}$', desc: 'Match base64 strings' },
    { name: 'File Extension', pattern: '\\.[a-zA-Z0-9]+$', desc: 'Match file extensions' }
  ];

  function init() {
    const searchEl = document.getElementById('regexlib-search');
    const container = document.getElementById('regexlib-patterns');

    function render(filter) {
      const filtered = filter ? PATTERNS.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()) || p.desc.toLowerCase().includes(filter.toLowerCase())) : PATTERNS;

      container.innerHTML = '';
      filtered.forEach(p => {
        const div = document.createElement('div');
        div.className = 'regexlib-item';
        div.innerHTML = '<div class="regexlib-item-header">' +
          '<span class="regexlib-item-name">' + p.name + '</span>' +
          '<button class="btn-copy-regex btn-secondary" data-pattern="' + p.pattern.replace(/"/g, '&quot;') + '">Copy</button></div>' +
          '<code class="regexlib-pattern">/' + p.pattern + '/</code>' +
          '<div class="regexlib-desc">' + p.desc + '</div>';
        container.appendChild(div);
      });
    }

    searchEl.addEventListener('input', () => render(searchEl.value));

    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-copy-regex')) {
        navigator.clipboard.writeText(e.target.dataset.pattern);
        e.target.textContent = 'Copied!';
        setTimeout(() => { e.target.textContent = 'Copy'; }, 1500);
      }
    });

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

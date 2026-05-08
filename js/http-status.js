(function() {
  'use strict';

  const STATUSES = [
    { code: 100, desc: 'Continue', cat: 'Informational' },
    { code: 101, desc: 'Switching Protocols', cat: 'Informational' },
    { code: 102, desc: 'Processing', cat: 'Informational' },
    { code: 200, desc: 'OK', cat: 'Success' },
    { code: 201, desc: 'Created', cat: 'Success' },
    { code: 202, desc: 'Accepted', cat: 'Success' },
    { code: 204, desc: 'No Content', cat: 'Success' },
    { code: 205, desc: 'Reset Content', cat: 'Success' },
    { code: 206, desc: 'Partial Content', cat: 'Success' },
    { code: 301, desc: 'Moved Permanently', cat: 'Redirect' },
    { code: 302, desc: 'Found', cat: 'Redirect' },
    { code: 304, desc: 'Not Modified', cat: 'Redirect' },
    { code: 307, desc: 'Temporary Redirect', cat: 'Redirect' },
    { code: 308, desc: 'Permanent Redirect', cat: 'Redirect' },
    { code: 400, desc: 'Bad Request', cat: 'Client Error' },
    { code: 401, desc: 'Unauthorized', cat: 'Client Error' },
    { code: 403, desc: 'Forbidden', cat: 'Client Error' },
    { code: 404, desc: 'Not Found', cat: 'Client Error' },
    { code: 405, desc: 'Method Not Allowed', cat: 'Client Error' },
    { code: 408, desc: 'Request Timeout', cat: 'Client Error' },
    { code: 409, desc: 'Conflict', cat: 'Client Error' },
    { code: 410, desc: 'Gone', cat: 'Client Error' },
    { code: 413, desc: 'Payload Too Large', cat: 'Client Error' },
    { code: 414, desc: 'URI Too Long', cat: 'Client Error' },
    { code: 415, desc: 'Unsupported Media Type', cat: 'Client Error' },
    { code: 422, desc: 'Unprocessable Entity', cat: 'Client Error' },
    { code: 429, desc: 'Too Many Requests', cat: 'Client Error' },
    { code: 500, desc: 'Internal Server Error', cat: 'Server Error' },
    { code: 501, desc: 'Not Implemented', cat: 'Server Error' },
    { code: 502, desc: 'Bad Gateway', cat: 'Server Error' },
    { code: 503, desc: 'Service Unavailable', cat: 'Server Error' },
    { code: 504, desc: 'Gateway Timeout', cat: 'Server Error' }
  ];

  function init() {
    const searchEl = document.getElementById('httpstatus-search');
    const listEl = document.getElementById('httpstatus-list');

    function render(filter) {
      const filtered = filter ? STATUSES.filter(s =>
        String(s.code).includes(filter) || s.desc.toLowerCase().includes(filter.toLowerCase()) || s.cat.toLowerCase().includes(filter.toLowerCase())
      ) : STATUSES;

      let html = '';
      let lastCat = '';

      filtered.forEach(s => {
        if (s.cat !== lastCat) {
          lastCat = s.cat;
          html += '<div class="httpstatus-category">' + s.cat + '</div>';
        }
        const catClass = s.cat === 'Success' ? 'status-ok' : s.cat === 'Redirect' ? 'status-warn' : s.cat === 'Client Error' ? 'status-error' : s.cat === 'Server Error' ? 'status-danger' : '';
        html += '<div class="httpstatus-item ' + catClass + '">' +
          '<span class="httpstatus-code">' + s.code + '</span>' +
          '<span class="httpstatus-desc">' + s.desc + '</span>' +
          '<button class="btn-copy-status btn-secondary" data-code="' + s.code + '">Copy</button></div>';
      });

      listEl.innerHTML = html;
    }

    searchEl.addEventListener('input', () => render(searchEl.value));

    listEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-copy-status')) {
        navigator.clipboard.writeText(e.target.dataset.code);
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

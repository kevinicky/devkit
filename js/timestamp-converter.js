(function() {
  'use strict';

  function formatTimestamp(ts) {
    const date = new Date(ts * 1000);
    return date.toLocaleString('en-US', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      timeZoneName: 'short'
    });
  }

  function init() {
    const nowEl = document.getElementById('timestamp-now');
    const tsInput = document.getElementById('timestamp-input');
    const tsResult = document.getElementById('timestamp-result');
    const dateInput = document.getElementById('date-input');
    const dateResult = document.getElementById('date-result');

    setInterval(() => {
      nowEl.textContent = Math.floor(Date.now() / 1000);
    }, 1000);

    tsInput.addEventListener('input', () => {
      const ts = parseInt(tsInput.value);
      if (isNaN(ts)) {
        tsResult.textContent = '-';
        return;
      }
      tsResult.textContent = formatTimestamp(ts);
    });

    dateInput.addEventListener('input', () => {
      if (!dateInput.value) {
        dateResult.textContent = '-';
        return;
      }
      const date = new Date(dateInput.value);
      const ts = Math.floor(date.getTime() / 1000);
      dateResult.textContent = ts + ' (' + date.toISOString() + ')';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

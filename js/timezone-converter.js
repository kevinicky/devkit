(function() {
  'use strict';

  const TIMEZONES = [
    'UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
    'America/Anchorage', 'Pacific/Honolulu', 'America/Sao_Paulo', 'America/Argentina/Buenos_Aires',
    'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Moscow', 'Europe/Istanbul',
    'Asia/Dubai', 'Asia/Kolkata', 'Asia/Bangkok', 'Asia/Singapore', 'Asia/Shanghai',
    'Asia/Tokyo', 'Asia/Seoul', 'Asia/Jakarta', 'Australia/Sydney', 'Pacific/Auckland',
    'Asia/Jakarta', 'Asia/Manila', 'Asia/Kuala_Lumpur'
  ];

  let selectedZones = ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo'];

  function formatTime(date, tz) {
    try {
      return date.toLocaleString('en-US', {
        timeZone: tz, weekday: 'short', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
        timeZoneName: 'short'
      });
    } catch (e) {
      return 'Invalid timezone';
    }
  }

  function getOffset(date, tz) {
    try {
      const str = date.toLocaleString('en-US', { timeZone: tz, timeZoneName: 'shortOffset' });
      const match = str.match(/GMT([+-]\d+)?/);
      return match ? match[1] || '+0' : '';
    } catch (e) { return ''; }
  }

  function render() {
    const container = document.getElementById('timezone-list');
    const dtInput = document.getElementById('timezone-datetime');
    const date = dtInput.value ? new Date(dtInput.value) : new Date();

    let html = '';
    selectedZones.forEach((tz, i) => {
      const offset = getOffset(date, tz);
      const time = formatTime(date, tz);
      const isLocal = tz === 'UTC' || offset === getOffset(new Date(), tz);
      html += '<div class="timezone-item">' +
        '<div class="timezone-item-header">' +
        '<span class="timezone-name">' + tz.replace(/_/g, ' ') + '</span>' +
        '<span class="timezone-offset">GMT' + offset + '</span>' +
        '<button class="timezone-remove" data-idx="' + i + '">✕</button></div>' +
        '<div class="timezone-time">' + time + '</div></div>';
    });

    container.innerHTML = html;
  }

  function init() {
    const selectEl = document.getElementById('timezone-select');
    const addBtn = document.getElementById('timezone-add');
    const dtInput = document.getElementById('timezone-datetime');

    TIMEZONES.forEach(tz => {
      const opt = document.createElement('option');
      opt.value = tz;
      opt.textContent = tz.replace(/_/g, ' ');
      selectEl.appendChild(opt);
    });

    dtInput.value = new Date().toISOString().slice(0, 16);

    addBtn.addEventListener('click', () => {
      const tz = selectEl.value;
      if (!selectedZones.includes(tz)) {
        selectedZones.push(tz);
        render();
      }
    });

    document.getElementById('timezone-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('timezone-remove')) {
        selectedZones.splice(e.target.dataset.idx, 1);
        render();
      }
    });

    dtInput.addEventListener('input', render);
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

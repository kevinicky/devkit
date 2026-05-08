(function() {
  'use strict';

  function init() {
    const toolSelect = document.getElementById('tool-select');

    toolSelect.addEventListener('change', () => {
      const toolId = toolSelect.value;
      document.querySelectorAll('.tool').forEach(t => t.classList.remove('active'));
      const target = document.getElementById('tool-' + toolId);
      if (target) target.classList.add('active');
    });

    document.querySelectorAll('.jwt-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.jwt-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        document.querySelectorAll('.jwt-panel').forEach(p => p.classList.remove('active'));
        document.getElementById('jwt-' + tab.dataset.jwtTab + '-panel').classList.add('active');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.altKey) {
        const keyMap = {
          '1': 'jwt', '2': 'json', '3': 'jsonenc', '4': 'base64',
          '5': 'url', '6': 'idgen', '7': 'uuid', '8': 'password',
          '9': 'lorem', '0': 'hash'
        };
        if (keyMap[e.key]) {
          e.preventDefault();
          toolSelect.value = keyMap[e.key];
          toolSelect.dispatchEvent(new Event('change'));
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

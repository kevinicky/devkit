(function() {
  'use strict';

  function init() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tools = document.querySelectorAll('.tool');

    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const toolId = btn.dataset.tool;

        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        tools.forEach(t => t.classList.remove('active'));
        const target = document.getElementById('tool-' + toolId);
        if (target) target.classList.add('active');
      });
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
          '1': 'jwt', '2': 'json', '3': 'base64', '4': 'url',
          '5': 'idgen', '6': 'uuid', '7': 'password', '8': 'lorem',
          '9': 'hash', '0': 'timestamp'
        };
        if (keyMap[e.key]) {
          e.preventDefault();
          const btn = document.querySelector('[data-tool="' + keyMap[e.key] + '"]');
          if (btn) btn.click();
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

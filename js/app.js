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
        document.getElementById('tool-' + toolId).classList.add('active');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.altKey) {
        const keyMap = {
          '1': 'jwt',
          '2': 'idgen',
          '3': 'json',
          '4': 'regex',
          '5': 'pomodoro',
          '6': 'diff'
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

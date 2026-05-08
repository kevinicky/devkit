(function() {
  'use strict';

  function init() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const tools = document.querySelectorAll('.tool');

    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const toolId = btn.dataset.tool;
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tools.forEach(t => t.classList.remove('active'));
        const target = document.getElementById('tool-' + toolId);
        if (target) target.classList.add('active');
        try { sessionStorage.setItem('dk-active-tool', toolId); } catch (e) {}
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
          '1': 'jwt', '2': 'json', '3': 'jsonenc', '4': 'base64',
          '5': 'url', '6': 'idgen', '7': 'uuid', '8': 'password',
          '9': 'lorem', '0': 'hash'
        };
        if (keyMap[e.key]) {
          e.preventDefault();
          const btn = document.querySelector('.nav-btn[data-tool="' + keyMap[e.key] + '"]');
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

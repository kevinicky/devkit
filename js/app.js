(function() {
  'use strict';

  function init() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    const dropdownBtns = document.querySelectorAll('.nav-dropdown-btn');
    const dropdownItems = document.querySelectorAll('.nav-dropdown-item');

    dropdownBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = btn.closest('.nav-dropdown');
        const isOpen = dropdown.classList.contains('open');

        dropdowns.forEach(d => d.classList.remove('open'));

        if (!isOpen) {
          dropdown.classList.add('open');
        }
      });
    });

    dropdownItems.forEach(item => {
      item.addEventListener('click', () => {
        const toolId = item.dataset.tool;

        dropdownItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        document.querySelectorAll('.tool').forEach(t => t.classList.remove('active'));
        const target = document.getElementById('tool-' + toolId);
        if (target) target.classList.add('active');

        dropdowns.forEach(d => d.classList.remove('open'));

        try {
          sessionStorage.setItem('dk-active-tool', toolId);
        } catch (e) {}
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-dropdown')) {
        dropdowns.forEach(d => d.classList.remove('open'));
      }
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
          const item = document.querySelector('.nav-dropdown-item[data-tool="' + keyMap[e.key] + '"]');
          if (item) item.click();
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

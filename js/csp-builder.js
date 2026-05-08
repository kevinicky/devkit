(function() {
  'use strict';

  function init() {
    const selects = ['cspb-default', 'cspb-script', 'cspb-style', 'cspb-img', 'cspb-connect', 'cspb-frame'];
    const outputEl = document.getElementById('cspb-output');
    const copyBtn = document.getElementById('cspb-copy');

    function update() {
      const directives = [
        'default-src ' + document.getElementById('cspb-default').value,
        'script-src ' + document.getElementById('cspb-script').value,
        'style-src ' + document.getElementById('cspb-style').value,
        'img-src ' + document.getElementById('cspb-img').value,
        'connect-src ' + document.getElementById('cspb-connect').value,
        'frame-ancestors ' + document.getElementById('cspb-frame').value
      ];
      outputEl.textContent = directives.join('; ');
    }

    selects.forEach(id => {
      document.getElementById(id).addEventListener('change', update);
    });

    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(outputEl.textContent);
    });

    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

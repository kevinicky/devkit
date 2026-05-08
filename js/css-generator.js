(function() {
  'use strict';

  function updateBoxShadow() {
    const x = document.getElementById('bs-x').value;
    const y = document.getElementById('bs-y').value;
    const blur = document.getElementById('bs-blur').value;
    const spread = document.getElementById('bs-spread').value;
    const opacity = document.getElementById('bs-opacity').value;
    const color = document.getElementById('bs-color').value;

    document.getElementById('bs-x-val').textContent = x;
    document.getElementById('bs-y-val').textContent = y;
    document.getElementById('bs-blur-val').textContent = blur;
    document.getElementById('bs-spread-val').textContent = spread;
    document.getElementById('bs-opacity-val').textContent = (opacity / 100).toFixed(2);

    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 255;
    const g = (rgb >> 8) & 255;
    const b = rgb & 255;

    const shadow = x + 'px ' + y + 'px ' + blur + 'px ' + spread + 'px rgba(' + r + ',' + g + ',' + b + ',' + (opacity / 100) + ')';
    document.getElementById('bs-preview').style.boxShadow = shadow;
    document.getElementById('bs-code').textContent = 'box-shadow: ' + shadow + ';';
  }

  function updateGradient() {
    const type = document.getElementById('grad-type').value;
    const dir = document.getElementById('grad-direction').value;
    const c1 = document.getElementById('grad-color1').value;
    const c2 = document.getElementById('grad-color2').value;

    let gradient;
    if (type === 'linear') {
      gradient = 'linear-gradient(' + dir + ', ' + c1 + ', ' + c2 + ')';
    } else {
      gradient = 'radial-gradient(circle, ' + c1 + ', ' + c2 + ')';
    }

    document.getElementById('grad-preview').style.background = gradient;
    document.getElementById('grad-code').textContent = 'background: ' + gradient + ';';
  }

  function updateFlexbox() {
    const direction = document.getElementById('flex-direction').value;
    const justify = document.getElementById('flex-justify').value;
    const align = document.getElementById('flex-align').value;
    const wrap = document.getElementById('flex-wrap').value;
    const gap = document.getElementById('flex-gap').value;

    document.getElementById('flex-gap-val').textContent = gap;

    const preview = document.getElementById('flex-preview');
    preview.style.display = 'flex';
    preview.style.flexDirection = direction;
    preview.style.justifyContent = justify;
    preview.style.alignItems = align;
    preview.style.flexWrap = wrap;
    preview.style.gap = gap + 'px';

    const code = 'display: flex;\nflex-direction: ' + direction + ';\njustify-content: ' + justify + ';\nalign-items: ' + align + ';\nflex-wrap: ' + wrap + ';\ngap: ' + gap + 'px;';
    document.getElementById('flex-code').textContent = code;
  }

  function init() {
    document.querySelectorAll('.cssgen-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.cssgen-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.cssgen-panel').forEach(p => p.classList.remove('active'));
        document.getElementById('cssgen-' + tab.dataset.cssgenTab + '-panel').classList.add('active');
      });
    });

    ['bs-x', 'bs-y', 'bs-blur', 'bs-spread', 'bs-opacity', 'bs-color'].forEach(id => {
      document.getElementById(id).addEventListener('input', updateBoxShadow);
    });

    ['grad-type', 'grad-direction', 'grad-color1', 'grad-color2'].forEach(id => {
      document.getElementById(id).addEventListener('input', updateGradient);
    });

    ['flex-direction', 'flex-justify', 'flex-align', 'flex-wrap', 'flex-gap'].forEach(id => {
      document.getElementById(id).addEventListener('input', updateFlexbox);
    });

    document.getElementById('bs-copy').addEventListener('click', () => {
      navigator.clipboard.writeText(document.getElementById('bs-code').textContent);
    });
    document.getElementById('grad-copy').addEventListener('click', () => {
      navigator.clipboard.writeText(document.getElementById('grad-code').textContent);
    });
    document.getElementById('flex-copy').addEventListener('click', () => {
      navigator.clipboard.writeText(document.getElementById('flex-code').textContent);
    });

    updateBoxShadow();
    updateGradient();
    updateFlexbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

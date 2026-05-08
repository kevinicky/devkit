(function() {
  'use strict';

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  function hslToRgb(h, s, l) {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }

  function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  function updateColors(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return;

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    document.getElementById('color-picker').value = hex;
    document.getElementById('color-hex').value = hex;
    document.getElementById('color-rgb').value = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
    document.getElementById('color-hsl').value = 'hsl(' + hsl.h + ', ' + hsl.s + '%, ' + hsl.l + '%)';
    document.getElementById('color-preview').style.backgroundColor = hex;
  }

  function init() {
    const picker = document.getElementById('color-picker');
    const hexInput = document.getElementById('color-hex');
    const rgbInput = document.getElementById('color-rgb');
    const hslInput = document.getElementById('color-hsl');

    picker.addEventListener('input', () => updateColors(picker.value));

    hexInput.addEventListener('input', () => {
      let hex = hexInput.value;
      if (!hex.startsWith('#')) hex = '#' + hex;
      if (/^#[0-9a-fA-F]{6}$/.test(hex)) updateColors(hex);
    });

    rgbInput.addEventListener('input', () => {
      const match = rgbInput.value.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        const hex = rgbToHex(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
        updateColors(hex);
      }
    });

    hslInput.addEventListener('input', () => {
      const match = hslInput.value.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
      if (match) {
        const rgb = hslToRgb(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
        const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
        updateColors(hex);
      }
    });

    document.querySelectorAll('.btn-copy-color').forEach(btn => {
      btn.addEventListener('click', () => {
        const format = btn.dataset.format;
        const el = document.getElementById('color-' + format);
        if (el) {
          navigator.clipboard.writeText(el.value).then(() => {
            const original = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => { btn.textContent = original; }, 1500);
          });
        }
      });
    });

    updateColors(picker.value);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

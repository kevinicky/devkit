(function() {
  'use strict';

  const UNITS = {
    length: {
      mm: { name: 'Millimeters', factor: 0.001 },
      cm: { name: 'Centimeters', factor: 0.01 },
      m: { name: 'Meters', factor: 1 },
      km: { name: 'Kilometers', factor: 1000 },
      in: { name: 'Inches', factor: 0.0254 },
      ft: { name: 'Feet', factor: 0.3048 },
      yd: { name: 'Yards', factor: 0.9144 },
      mi: { name: 'Miles', factor: 1609.344 }
    },
    weight: {
      mg: { name: 'Milligrams', factor: 0.000001 },
      g: { name: 'Grams', factor: 0.001 },
      kg: { name: 'Kilograms', factor: 1 },
      oz: { name: 'Ounces', factor: 0.0283495 },
      lb: { name: 'Pounds', factor: 0.453592 }
    },
    temperature: {
      C: { name: 'Celsius' },
      F: { name: 'Fahrenheit' },
      K: { name: 'Kelvin' }
    },
    data: {
      B: { name: 'Bytes', factor: 1 },
      KB: { name: 'Kilobytes', factor: 1024 },
      MB: { name: 'Megabytes', factor: 1048576 },
      GB: { name: 'Gigabytes', factor: 1073741824 },
      TB: { name: 'Terabytes', factor: 1099511627776 }
    },
    time: {
      ms: { name: 'Milliseconds', factor: 0.001 },
      s: { name: 'Seconds', factor: 1 },
      min: { name: 'Minutes', factor: 60 },
      hr: { name: 'Hours', factor: 3600 },
      day: { name: 'Days', factor: 86400 },
      week: { name: 'Weeks', factor: 604800 }
    }
  };

  function convertTemp(value, from, to) {
    let celsius;
    if (from === 'C') celsius = value;
    else if (from === 'F') celsius = (value - 32) * 5/9;
    else celsius = value - 273.15;

    if (to === 'C') return celsius;
    if (to === 'F') return celsius * 9/5 + 32;
    return celsius + 273.15;
  }

  function convert(value, from, to, category) {
    if (category === 'temperature') return convertTemp(value, from, to);
    const units = UNITS[category];
    return value * units[from].factor / units[to].factor;
  }

  function init() {
    const categorySelect = document.getElementById('unit-category-select');
    const fromSelect = document.getElementById('unit-from');
    const toSelect = document.getElementById('unit-to');
    const fromValue = document.getElementById('unit-from-value');
    const toValue = document.getElementById('unit-to-value');
    const swapBtn = document.getElementById('unit-swap');

    function populateUnits() {
      const category = categorySelect.value;
      const units = UNITS[category];
      const keys = Object.keys(units);

      fromSelect.innerHTML = '';
      toSelect.innerHTML = '';

      keys.forEach((key, i) => {
        const opt1 = new Option(units[key].name + ' (' + key + ')', key);
        const opt2 = new Option(units[key].name + ' (' + key + ')', key);
        fromSelect.add(opt1);
        toSelect.add(opt2);
      });

      if (keys.length > 1) toSelect.selectedIndex = 1;
      doConvert();
    }

    function doConvert() {
      const category = categorySelect.value;
      const value = parseFloat(fromValue.value) || 0;
      const from = fromSelect.value;
      const to = toSelect.value;
      const result = convert(value, from, to, category);
      toValue.value = parseFloat(result.toPrecision(10));
    }

    categorySelect.addEventListener('change', populateUnits);
    fromSelect.addEventListener('change', doConvert);
    toSelect.addEventListener('change', doConvert);
    fromValue.addEventListener('input', doConvert);

    swapBtn.addEventListener('click', () => {
      const tempUnit = fromSelect.value;
      fromSelect.value = toSelect.value;
      toSelect.value = tempUnit;
      doConvert();
    });

    populateUnits();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

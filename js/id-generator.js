(function() {
  'use strict';

  function randomDigit() {
    return Math.floor(Math.random() * 10);
  }

  function randomDigits(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += randomDigit();
    }
    return result;
  }

  function generateKTP() {
    const province = String(Math.floor(Math.random() * 74) + 11).padStart(2, '0');
    const regency = String(Math.floor(Math.random() * 70) + 1).padStart(2, '0');
    const district = String(Math.floor(Math.random() * 30) + 1).padStart(2, '0');
    const day = Math.floor(Math.random() * 28) + 1;
    const month = Math.floor(Math.random() * 12) + 1;
    const year = Math.floor(Math.random() * 50) + 70;
    const dateStr = String(day).padStart(2, '0') + String(month).padStart(2, '0') + String(year).padStart(2, '0');
    const unique = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');
    return province + regency + district + dateStr + unique;
  }

  function generateThailandID() {
    let digits = String(Math.floor(Math.random() * 9) + 1);
    for (let i = 1; i < 12; i++) {
      digits += randomDigit();
    }
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(digits[i]) * (13 - i);
    }
    const checkDigit = (11 - (sum % 11)) % 10;
    return digits + checkDigit;
  }

  function generatePhilippinesID() {
    return randomDigits(12);
  }

  function generateSingaporeNRIC() {
    const weights = [2, 7, 6, 5, 4, 3, 2];
    const checksumLetters = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
    const prefix = Math.random() > 0.5 ? 'S' : 'T';
    let digits = '';
    for (let i = 0; i < 7; i++) {
      digits += randomDigit();
    }
    let sum = 0;
    if (prefix === 'T') {
      sum += 4;
    }
    for (let i = 0; i < 7; i++) {
      sum += parseInt(digits[i]) * weights[i];
    }
    const checkLetter = checksumLetters[sum % 11];
    return prefix + digits + checkLetter;
  }

  function generateMalaysiaNRIC() {
    const year = Math.floor(Math.random() * 50) + 60;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    const dateStr = String(year).padStart(2, '0') + String(month).padStart(2, '0') + String(day).padStart(2, '0');
    const placeCode = String(Math.floor(Math.random() * 30) + 1).padStart(2, '0');
    const serial = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
    const weights = [7, 6, 5, 4, 3, 2];
    const digits = dateStr + placeCode + serial;
    let sum = 0;
    for (let i = 0; i < 6; i++) {
      sum += parseInt(digits[i]) * weights[i];
    }
    const gender = Math.random() > 0.5 ? 'M' : 'F';
    const checksumMap = {
      '0': { M: 'J', F: 'K' },
      '1': { M: 'K', F: 'L' },
      '2': { M: 'L', F: 'M' },
      '3': { M: 'M', F: 'N' },
      '4': { M: 'N', F: 'P' },
      '5': { M: 'P', F: 'Q' },
      '6': { M: 'Q', F: 'R' },
      '7': { M: 'R', F: 'S' },
      '8': { M: 'S', F: 'T' },
      '9': { M: 'T', F: 'U' }
    };
    const checkDigit = sum % 10;
    const checkLetter = checksumMap[checkDigit][gender];
    return digits + checkLetter;
  }

  const generators = {
    id: { name: 'Indonesia (KTP)', fn: generateKTP, format: (id) => id },
    th: { name: 'Thailand', fn: generateThailandID, format: (id) => id.slice(0, 1) + '-' + id.slice(1, 5) + '-' + id.slice(5, 10) + '-' + id.slice(10) + '-' + id.slice(12) },
    ph: { name: 'Philippines', fn: generatePhilippinesID, format: (id) => id },
    sg: { name: 'Singapore (NRIC)', fn: generateSingaporeNRIC, format: (id) => id },
    my: { name: 'Malaysia (NRIC)', fn: generateMalaysiaNRIC, format: (id) => id.slice(0, 6) + '-' + id.slice(6, 9) + '-' + id.slice(9) }
  };

  function generate(country, count) {
    const gen = generators[country];
    if (!gen) return [];
    const results = [];
    for (let i = 0; i < count; i++) {
      results.push(gen.format(gen.fn()));
    }
    return results;
  }

  function init() {
    const countrySelect = document.getElementById('idgen-country');
    const countInput = document.getElementById('idgen-count');
    const generateBtn = document.getElementById('idgen-generate');
    const outputEl = document.getElementById('idgen-output');
    const copyBtn = document.getElementById('idgen-copy');

    generateBtn.addEventListener('click', () => {
      const country = countrySelect.value;
      const count = Math.min(Math.max(parseInt(countInput.value) || 1, 1), 100);
      const ids = generate(country, count);
      outputEl.textContent = ids.join('\n');
    });

    copyBtn.addEventListener('click', () => {
      const text = outputEl.textContent;
      if (text && !text.includes('placeholder')) {
        navigator.clipboard.writeText(text).then(() => {
          const originalText = copyBtn.textContent;
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = originalText; }, 1500);
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

(function() {
  'use strict';

  function generatePassword(length, useUpper, useLower, useNumbers, useSymbols) {
    let chars = '';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) return '';

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars[array[i] % chars.length];
    }
    return password;
  }

  function calculateStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) return { label: 'Weak', class: 'strength-weak' };
    if (score <= 4) return { label: 'Fair', class: 'strength-fair' };
    if (score <= 5) return { label: 'Good', class: 'strength-good' };
    return { label: 'Strong', class: 'strength-strong' };
  }

  function init() {
    const lengthSlider = document.getElementById('password-length');
    const lengthValue = document.getElementById('password-length-value');
    const upperCheck = document.getElementById('password-upper');
    const lowerCheck = document.getElementById('password-lower');
    const numbersCheck = document.getElementById('password-numbers');
    const symbolsCheck = document.getElementById('password-symbols');
    const generateBtn = document.getElementById('password-generate');
    const displayEl = document.getElementById('password-display');
    const copyBtn = document.getElementById('password-copy');
    const strengthEl = document.getElementById('password-strength');

    lengthSlider.addEventListener('input', () => {
      lengthValue.textContent = lengthSlider.value;
    });

    generateBtn.addEventListener('click', () => {
      const length = parseInt(lengthSlider.value);
      const password = generatePassword(length, upperCheck.checked, lowerCheck.checked, numbersCheck.checked, symbolsCheck.checked);

      if (!password) {
        displayEl.textContent = 'Select at least one option';
        strengthEl.textContent = '';
        return;
      }

      displayEl.textContent = password;
      const strength = calculateStrength(password);
      strengthEl.textContent = strength.label;
      strengthEl.className = 'password-strength ' + strength.class;
    });

    copyBtn.addEventListener('click', () => {
      const text = displayEl.textContent;
      if (text && text !== 'Click generate to create password' && text !== 'Select at least one option') {
        navigator.clipboard.writeText(text).then(() => {
          const original = copyBtn.textContent;
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = original; }, 1500);
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

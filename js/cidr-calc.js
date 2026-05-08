(function() {
  'use strict';

  function ipToNum(ip) {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
  }

  function numToIp(num) {
    return [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255
    ].join('.');
  }

  function init() {
    const inputEl = document.getElementById('cidr-input');
    const calcBtn = document.getElementById('cidr-calculate');
    const errorEl = document.getElementById('cidr-error');

    function showError(msg) {
      errorEl.textContent = msg;
      errorEl.classList.remove('hidden');
    }

    function hideError() {
      errorEl.classList.add('hidden');
    }

    function calculate() {
      hideError();
      const input = inputEl.value.trim();
      const match = input.match(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\/(\d{1,2})$/);

      if (!match) {
        showError('Invalid CIDR notation. Use format: 192.168.1.0/24');
        return;
      }

      const ip = match[1];
      const prefix = parseInt(match[2]);

      if (prefix < 0 || prefix > 32) {
        showError('Prefix must be between 0 and 32');
        return;
      }

      const ipNum = ipToNum(ip);
      const mask = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
      const wildcard = (~mask) >>> 0;
      const network = (ipNum & mask) >>> 0;
      const broadcast = (network | wildcard) >>> 0;
      const totalHosts = Math.pow(2, 32 - prefix);
      const usableHosts = prefix >= 31 ? 0 : totalHosts - 2;

      document.getElementById('cidr-network').textContent = numToIp(network);
      document.getElementById('cidr-broadcast').textContent = numToIp(broadcast);
      document.getElementById('cidr-first').textContent = prefix >= 31 ? 'N/A' : numToIp(network + 1);
      document.getElementById('cidr-last').textContent = prefix >= 31 ? 'N/A' : numToIp(broadcast - 1);
      document.getElementById('cidr-mask').textContent = numToIp(mask);
      document.getElementById('cidr-wildcard').textContent = numToIp(wildcard);
      document.getElementById('cidr-hosts').textContent = totalHosts.toLocaleString();
      document.getElementById('cidr-usable').textContent = usableHosts.toLocaleString();
    }

    calcBtn.addEventListener('click', calculate);
    inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') calculate(); });
    calculate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

(function() {
  'use strict';

  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function parseField(field, min, max, names) {
    if (field === '*') return 'Every ' + (names ? 'value' : 'minute');

    const parts = field.split(',');
    const values = [];

    parts.forEach(part => {
      if (part.includes('/')) {
        const [base, step] = part.split('/');
        const stepNum = parseInt(step);
        if (base === '*') {
          for (let i = min; i <= max; i += stepNum) values.push(i);
        }
      } else if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        for (let i = start; i <= end; i++) values.push(i);
      } else if (part.includes('*')) {
        for (let i = min; i <= max; i++) values.push(i);
      } else {
        values.push(parseInt(part));
      }
    });

    if (names) {
      return values.map(v => names[v] || v).join(', ');
    }
    return values.join(', ');
  }

  function describeCron(minute, hour, day, month, weekday) {
    const parts = [];

    if (minute.includes('/')) {
      const step = minute.split('/')[1];
      parts.push('Every ' + step + ' minutes');
    } else if (hour.includes('/')) {
      const step = hour.split('/')[1];
      parts.push('Every ' + step + ' hours');
    } else if (day === '*' && month === '*' && weekday === '*') {
      if (minute === '*' && hour === '*') {
        parts.push('Every minute');
      } else if (hour === '*') {
        parts.push('At minute ' + minute + ' of every hour');
      } else {
        parts.push('At ' + hour + ':' + (minute === '0' ? '00' : minute.padStart(2, '0')));
      }
    }

    if (day !== '*') parts.push('On day ' + day + ' of the month');
    if (month !== '*') parts.push('In ' + (MONTHS[parseInt(month) - 1] || 'month ' + month));
    if (weekday !== '*') parts.push('On ' + (DAYS[parseInt(weekday)] || 'day ' + weekday));

    return parts.join('. ') || 'Custom schedule';
  }

  function getNextRuns(minute, hour, day, month, weekday, count) {
    const runs = [];
    const now = new Date();
    let check = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1, 0);

    let iterations = 0;
    const maxIterations = 100000;

    while (runs.length < count && iterations < maxIterations) {
      iterations++;

      const m = check.getMinutes();
      const h = check.getHours();
      const d = check.getDate();
      const mo = check.getMonth() + 1;
      const wd = check.getDay();

      const matchMinute = minute === '*' || minute.split(',').includes(String(m)) || (minute.includes('/') && m % parseInt(minute.split('/')[1]) === 0);
      const matchHour = hour === '*' || hour.split(',').includes(String(h)) || (hour.includes('/') && h % parseInt(hour.split('/')[1]) === 0);
      const matchDay = day === '*' || day.split(',').includes(String(d));
      const matchMonth = month === '*' || month.split(',').includes(String(mo));
      const matchWeekday = weekday === '*' || weekday.split(',').includes(String(wd));

      if (matchMinute && matchHour && matchDay && matchMonth && matchWeekday) {
        runs.push(check.toLocaleString());
      }

      check = new Date(check.getTime() + 60000);
    }

    return runs;
  }

  function init() {
    const inputEl = document.getElementById('cron-input');
    const parseBtn = document.getElementById('cron-parse');
    const minuteEl = document.getElementById('cron-minute');
    const hourEl = document.getElementById('cron-hour');
    const dayEl = document.getElementById('cron-day');
    const monthEl = document.getElementById('cron-month');
    const weekdayEl = document.getElementById('cron-weekday');
    const descEl = document.getElementById('cron-description');
    const nextEl = document.getElementById('cron-next');

    function parse() {
      const expr = inputEl.value.trim();
      const parts = expr.split(/\s+/);

      if (parts.length !== 5) {
        descEl.textContent = 'Invalid cron expression. Expected 5 fields: minute hour day month weekday';
        return;
      }

      const [minute, hour, day, month, weekday] = parts;

      minuteEl.textContent = parseField(minute, 0, 59);
      hourEl.textContent = parseField(hour, 0, 23);
      dayEl.textContent = parseField(day, 1, 31);
      monthEl.textContent = parseField(month, 1, 12, MONTHS);
      weekdayEl.textContent = parseField(weekday, 0, 6, DAYS);

      descEl.textContent = describeCron(minute, hour, day, month, weekday);

      const nextRuns = getNextRuns(minute, hour, day, month, weekday, 3);
      if (nextRuns.length > 0) {
        nextEl.innerHTML = '<strong>Next runs:</strong><br>' + nextRuns.join('<br>');
      } else {
        nextEl.textContent = 'Could not calculate next runs';
      }
    }

    parseBtn.addEventListener('click', parse);
    inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') parse(); });

    parse();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

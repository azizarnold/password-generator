/**
 * Hostking Password Generator — script.js
 * Uses crypto.getRandomValues() for cryptographically secure randomness.
 * No data is sent to any server.
 */

'use strict';

/* ── Character sets ─────────────────────────────── */
const CHARS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers:   '0123456789',
  symbols:   '!@#$%^&*()-_=+[]{}|;:,.<>?',
};

const AMBIGUOUS = /[0Ol1I]/g;

/* ── DOM references ─────────────────────────────── */
const passwordOutput   = document.getElementById('passwordOutput');
const generateBtn      = document.getElementById('generateBtn');
const copyBtn          = document.getElementById('copyBtn');
const toggleVisibility = document.getElementById('toggleVisibility');
const lengthRange      = document.getElementById('lengthRange');
const lengthDisplay    = document.getElementById('lengthDisplay');
const strengthBar      = document.getElementById('strengthBar');
const strengthLabel    = document.getElementById('strengthLabel');
const copyToast        = document.getElementById('copyToast');
const themeToggle      = document.getElementById('themeToggle');
const themeIcon        = themeToggle.querySelector('.theme-icon');

const optUppercase       = document.getElementById('optUppercase');
const optLowercase       = document.getElementById('optLowercase');
const optNumbers         = document.getElementById('optNumbers');
const optSymbols         = document.getElementById('optSymbols');
const optExcludeAmbig    = document.getElementById('optExcludeAmbiguous');

/* ── State ──────────────────────────────────────── */
let passwordVisible = false;
let toastTimer = null;

/* ── Core: cryptographically secure random int ──── */
function secureRandomInt(max) {
  const array = new Uint32Array(1);
  let result;
  do {
    crypto.getRandomValues(array);
    result = array[0];
  } while (result >= Math.floor(0xFFFFFFFF / max) * max);
  return result % max;
}

/* ── Build charset from current options ─────────── */
function buildCharset() {
  let charset = '';
  if (optUppercase.checked) charset += CHARS.uppercase;
  if (optLowercase.checked) charset += CHARS.lowercase;
  if (optNumbers.checked)   charset += CHARS.numbers;
  if (optSymbols.checked)   charset += CHARS.symbols;
  if (optExcludeAmbig.checked) charset = charset.replace(AMBIGUOUS, '');
  return charset;
}

/* ── Generate password ──────────────────────────── */
function generatePassword() {
  const charset = buildCharset();
  const length  = parseInt(lengthRange.value, 10);

  if (!charset.length) {
    showError('Please select at least one character type.');
    return;
  }

  // Build required characters (one from each selected group)
  const required = [];
  if (optUppercase.checked) {
    let s = CHARS.uppercase;
    if (optExcludeAmbig.checked) s = s.replace(AMBIGUOUS, '');
    if (s.length) required.push(s[secureRandomInt(s.length)]);
  }
  if (optLowercase.checked) {
    let s = CHARS.lowercase;
    if (optExcludeAmbig.checked) s = s.replace(AMBIGUOUS, '');
    if (s.length) required.push(s[secureRandomInt(s.length)]);
  }
  if (optNumbers.checked) {
    let s = CHARS.numbers;
    if (optExcludeAmbig.checked) s = s.replace(AMBIGUOUS, '');
    if (s.length) required.push(s[secureRandomInt(s.length)]);
  }
  if (optSymbols.checked) {
    required.push(CHARS.symbols[secureRandomInt(CHARS.symbols.length)]);
  }

  // Fill remaining characters
  const password = [...required];
  for (let i = required.length; i < length; i++) {
    password.push(charset[secureRandomInt(charset.length)]);
  }

  // Shuffle using Fisher–Yates with crypto randomness
  for (let i = password.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [password[i], password[j]] = [password[j], password[i]];
  }

  const result = password.join('');
  setPasswordValue(result);
}

/* ── Display password ───────────────────────────── */
function setPasswordValue(value) {
  passwordOutput.value = value;
  passwordOutput.type  = passwordVisible ? 'text' : 'password';
  copyBtn.disabled     = !value;
  updateStrength(value);
}

/* ── Strength meter ─────────────────────────────── */
function updateStrength(password) {
  if (!password) {
    strengthBar.className = '';
    strengthBar.style.width = '0';
    strengthLabel.textContent = '';
    return;
  }

  const len = password.length;
  let score = 0;

  // Length score
  if (len >= 8)  score += 10;
  if (len >= 12) score += 15;
  if (len >= 16) score += 15;
  if (len >= 24) score += 10;

  // Character variety
  if (/[A-Z]/.test(password)) score += 10;
  if (/[a-z]/.test(password)) score += 10;
  if (/[0-9]/.test(password)) score += 10;
  if (/[^A-Za-z0-9]/.test(password)) score += 20;

  // Penalize short passwords hard
  if (len < 8) score = Math.min(score, 20);

  score = Math.min(score, 100);

  strengthBar.className = '';
  if (score < 30) {
    strengthBar.className = 'weak';
    strengthLabel.textContent = 'Strength: Weak';
  } else if (score < 55) {
    strengthBar.className = 'fair';
    strengthLabel.textContent = 'Strength: Fair';
  } else if (score < 80) {
    strengthBar.className = 'good';
    strengthLabel.textContent = 'Strength: Good';
  } else {
    strengthBar.className = 'strong';
    strengthLabel.textContent = 'Strength: Strong ✓';
  }
}

/* ── Copy to clipboard ──────────────────────────── */
async function copyPassword() {
  const val = passwordOutput.value;
  if (!val) return;

  try {
    await navigator.clipboard.writeText(val);
    showToast();
  } catch {
    // Fallback for older browsers
    passwordOutput.select();
    document.execCommand('copy');
    showToast();
  }
}

/* ── Toast notification ─────────────────────────── */
function showToast() {
  copyToast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => copyToast.classList.remove('show'), 2500);
}

/* ── Error display ──────────────────────────────── */
function showError(msg) {
  strengthLabel.textContent = msg;
  strengthLabel.style.color = 'var(--strength-weak)';
  setTimeout(() => { strengthLabel.style.color = ''; }, 3000);
}

/* ── Toggle password visibility ─────────────────── */
function togglePasswordVisibility() {
  passwordVisible = !passwordVisible;
  passwordOutput.type = passwordVisible ? 'text' : 'password';
  toggleVisibility.setAttribute('aria-pressed', passwordVisible.toString());
  const eyeIcon = document.getElementById('eyeIcon');
  if (passwordVisible) {
    eyeIcon.innerHTML = `
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"></path>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>`;
  } else {
    eyeIcon.innerHTML = `
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>`;
  }
}

/* ── Dark mode ──────────────────────────────────── */
function initTheme() {
  const stored = localStorage.getItem('hk-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = stored === 'dark' || (!stored && prefersDark);
  if (isDark) applyDark();
}

function applyDark() {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeIcon.textContent = '☀️';
}

function applyLight() {
  document.documentElement.removeAttribute('data-theme');
  themeIcon.textContent = '🌙';
}

function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    applyLight();
    localStorage.setItem('hk-theme', 'light');
  } else {
    applyDark();
    localStorage.setItem('hk-theme', 'dark');
  }
}

/* ── Event listeners ────────────────────────────── */
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);
toggleVisibility.addEventListener('click', togglePasswordVisibility);
themeToggle.addEventListener('click', toggleTheme);

lengthRange.addEventListener('input', () => {
  lengthDisplay.textContent = lengthRange.value;
  if (passwordOutput.value) generatePassword();
});

[optUppercase, optLowercase, optNumbers, optSymbols, optExcludeAmbig].forEach(el => {
  el.addEventListener('change', () => {
    if (passwordOutput.value) generatePassword();
  });
});

// Keyboard shortcut: Ctrl+G to generate, Ctrl+C to copy (when focused)
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
    e.preventDefault();
    generatePassword();
  }
});

/* ── Init ───────────────────────────────────────── */
initTheme();
generatePassword();

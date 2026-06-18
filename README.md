# 🔐 Password Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/hostking/password-generator?style=flat)](https://github.com/hostking/password-generator)
[![Last Commit](https://img.shields.io/github/last-commit/hostking/password-generator)](https://github.com/hostking/password-generator)

A modern, lightweight, **cryptographically secure** password generator built with HTML5, CSS3 and vanilla JavaScript. No frameworks, no dependencies, no tracking. Works entirely in your browser — nothing is sent to any server.

---

## ✨ Features

- 🔒 **Cryptographically secure** — uses `crypto.getRandomValues()`, not `Math.random()`
- 🎚️ **Adjustable length** — from 6 to 128 characters
- 🔤 Character options: Uppercase, Lowercase, Numbers, Symbols
- 🚫 **Exclude ambiguous characters** — no more confusing 0/O or l/I/1
- 📋 **One-click copy** with toast notification
- 👁️ **Show/Hide** password toggle
- 📊 **Real-time strength meter** with scoring
- 🌙 **Dark mode** (auto-detects system preference + manual toggle)
- 📱 **Fully responsive** — works on mobile, tablet and desktop
- ♿ **Accessible** — ARIA labels, keyboard shortcuts
- ⚡ **Zero dependencies** — one HTML file, one CSS file, one JS file
- 🚀 **GitHub Pages ready** — deploy instantly with no build step

---

## 📸 Screenshot

```
┌─────────────────────────────────────────────┐
│  🔐 Password Generator                      │
├─────────────────────────────────────────────┤
│  [Kx7!mPqR#2nVwYs9eJ]  👁  │
│  ████████████████████████ Strong ✓          │
│                                             │
│  Length: 20  ────────────●──────────        │
│  ☑ Uppercase  ☑ Lowercase                   │
│  ☑ Numbers    ☑ Symbols                     │
│  ☐ Exclude ambiguous                        │
│                                             │
│  [Generate Password]  [Copy to Clipboard]   │
└─────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Option 1: Download and open

1. [Download the repository](https://github.com/hostking/password-generator/archive/refs/heads/main.zip)
2. Extract the ZIP
3. Open `index.html` in any modern web browser

No web server required. No build step. No npm install.

### Option 2: Clone with Git

```bash
git clone https://github.com/hostking/password-generator.git
cd password-generator
open index.html
```

### Option 3: GitHub Pages

Fork this repository and enable GitHub Pages under **Settings → Pages → Deploy from branch → main**. Your tool will be live at `https://yourusername.github.io/password-generator/` within minutes.

---

## 📂 Folder Structure

```
password-generator/
│
├── index.html              # Main application
├── README.md               # This file
├── LICENSE                 # MIT License
├── CHANGELOG.md            # Version history
├── CONTRIBUTING.md         # How to contribute
├── SECURITY.md             # Security policy
├── CODE_OF_CONDUCT.md      # Community standards
├── .gitignore
│
├── assets/
│   ├── style.css           # All styles
│   └── script.js           # All JavaScript
│
└── .github/
    └── workflows/
        └── validate.yml    # GitHub Actions CI
```

---

## 🔒 Why crypto.getRandomValues()?

Most online password generators use `Math.random()` which is a **pseudo-random number generator (PRNG)**. It is predictable and not suitable for security-sensitive applications.

This generator uses the [Web Cryptography API](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues) (`crypto.getRandomValues()`), which draws entropy from the operating system's secure random number generator — the same source used by cryptographic libraries.

This makes each password genuinely unpredictable and safe to use for:

- Server root passwords
- Database passwords
- SSH key passphrases
- WordPress admin accounts
- API keys and tokens
- Email account passwords
- Hosting control panel passwords

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + G` (or `Cmd + G`) | Generate a new password |

---

## 🛡️ Security Considerations

- All password generation happens **client-side only**
- No analytics, cookies, or tracking scripts
- No external requests are made after page load
- Generated passwords are never logged or stored
- The tool works entirely offline once loaded

---

## 💡 Password Best Practices

When securing your accounts, consider:

1. **Use a unique password for every account** — never reuse passwords
2. **Aim for 16+ characters** — length matters more than complexity
3. **Include all character types** — upper, lower, numbers, symbols
4. **Use a password manager** — tools like Bitwarden, 1Password or KeePass help manage unique passwords
5. **Enable 2FA** — two-factor authentication adds a second layer of protection
6. **Change passwords regularly** on critical accounts

### Where to use strong passwords

| Account Type | Recommended Length |
|---|---|
| WordPress admin | 20+ characters |
| SSH / Root access | 32+ characters |
| cPanel / DirectAdmin | 20+ characters |
| MySQL / MariaDB | 24+ characters |
| Email accounts | 16+ characters |
| FTP / SFTP | 20+ characters |
| Domain registrar | 20+ characters |

---

## 🌐 Browser Support

| Browser | Supported |
|---------|-----------|
| Chrome 37+ | ✅ |
| Firefox 34+ | ✅ |
| Safari 10.1+ | ✅ |
| Edge 12+ | ✅ |
| Opera 24+ | ✅ |

`crypto.getRandomValues()` is supported in all modern browsers.

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request.

**Ideas for improvement:**
- Passphrase generator (word-based passwords)
- Pronounceable password mode
- Bulk password generation
- Password history (session only)
- QR code export
- Custom character exclusion list
- Entropy display
- Estimated crack time

---

## 📜 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

You are free to use, modify and distribute this project in personal and commercial applications.

---

## 🌍 About Hostking

This project is maintained by **Hostking**, a global web hosting provider offering fast, secure and reliable hosting solutions for businesses worldwide. Founded in 2013, Hostking provides shared hosting, WordPress hosting, VPS hosting, reseller hosting, domain registration, business email and SSL certificates.

Our services include:

- Shared Web Hosting
- WordPress Hosting
- VPS Hosting
- Reseller Hosting
- Domain Registration
- Business Email Hosting
- SSL Certificates

Visit Hostking:

🌍 International — https://www.hostking.host  
🇿🇦 South Africa — https://www.hostking.co.za  
🇦🇪 United Arab Emirates — https://www.hostking.ae  
🇳🇬 Nigeria — https://www.hostking.com.ng  

If you found this project useful, please consider giving it a ⭐ on GitHub!

# AGENTS.md - devkit

## Project Overview
**devkit** is a security-focused, client-side productivity toolkit for developers. Hosted on GitHub Pages, it runs entirely in the browser with zero persistent data storage or transmission.

## Architecture
- **Pure static site**: HTML, CSS, vanilla JavaScript
- **No build tools**: Ready to deploy as-is
- **No dependencies**: Zero external libraries for security
- **Single-page app**: Tab-based navigation
- **State persistence**: `sessionStorage` for form values (survives refresh, clears on tab close)

## File Structure
```
devkit/
├── index.html              # Main entry point
├── css/
│   └── style.css           # Dark theme styles
└── js/
    ├── app.js              # Navigation, keyboard shortcuts
    ├── security.js         # Single-tab enforcement (localStorage + BroadcastChannel)
    ├── state-manager.js    # Session-based state persistence
    ├── jwt.js              # JWT decoder
    ├── jwt-generator.js    # JWT generator (HS256)
    ├── id-generator.js     # ID generators (5 countries)
    ├── json-tools.js       # JSON prettify/minify/encode/decode
    ├── regex-tester.js     # Real-time regex tester
    ├── pomodoro.js         # Pomodoro timer
    ├── text-diff.js        # LCS-based line diff
    ├── hash-generator.js   # SHA-1/256/512 hashing
    ├── base64-tool.js      # Base64 encode/decode
    ├── url-tool.js         # URL encode/decode
    ├── uuid-generator.js   # v4 UUID generator
    ├── timestamp-converter.js  # Unix timestamp ↔ date
    ├── color-converter.js  # HEX ↔ RGB ↔ HSL
    ├── markdown-preview.js # Markdown to HTML
    ├── sql-formatter.js    # SQL format/minify
    ├── cron-parser.js      # Cron expression parser
    ├── notes-scratchpad.js # Memory-only notes
    ├── unit-converter.js   # Multi-category unit converter
    ├── lorem-generator.js  # Lorem ipsum generator
    └── password-generator.js  # Secure password generator
```

## Tools (20)

1. **JWT Decoder** - Decode header/payload, check expiration
2. **ID Generator** - Bulk IDs: Indonesia (KTP), Thailand, Philippines, Singapore (NRIC), Malaysia (NRIC)
3. **JSON Tools** - Prettify, minify, encode, decode
4. **Regex Tester** - Real-time matching with highlight and capture groups
5. **Pomodoro Timer** - Work/break modes with session tracking
6. **Text Diff** - LCS-based line diff with added/removed highlighting
7. **Hash Generator** - SHA-1, SHA-256, SHA-512 via Web Crypto API
8. **Base64** - Encode/decode with swap support
9. **URL Tools** - URL encode/decode with swap support
10. **UUID Generator** - v4 UUIDs in bulk (standard, no-dash, uppercase)
11. **Timestamp Converter** - Unix timestamp ↔ date with live clock
12. **Color Converter** - HEX ↔ RGB ↔ HSL with color picker
13. **Markdown Preview** - Live markdown to HTML rendering
14. **SQL Formatter** - Format and minify SQL queries
15. **Cron Parser** - Visual cron parser with next run times
16. **JWT Generator** - Create and sign JWT tokens (HS256)
17. **Scratchpad** - Memory-only notes (clears on refresh)
18. **Unit Converter** - Length, weight, temperature, data size, time
19. **Lorem Ipsum** - Placeholder text (words, sentences, paragraphs)
20. **Password Generator** - Secure passwords with strength meter

## Security Model

### What is NOT stored
- No localStorage for user data
- No cookies
- No IndexedDB
- No external requests or telemetry
- No server-side processing

### What IS stored (session only)
- `sessionStorage`: Form values, active tool, pomodoro stats
  - Survives page refresh
  - **Cleared when tab closes**
- `localStorage`: Only used for single-tab lock (tab ID + heartbeat timestamp)
  - No user data stored here

### Single-Tab Enforcement
- Uses `localStorage` for lock coordination + `BroadcastChannel` for real-time communication
- Heartbeat mechanism detects crashed/abandoned tabs
- "Take Over" button to reclaim access

## Keyboard Shortcuts
- `Alt+1` through `Alt+0`: Switch between first 10 tools

## Development Guidelines
- **Never add external dependencies** without explicit approval
- **Never persist user data** beyond sessionStorage (tab-scoped)
- **Keep it minimal**: No frameworks, no build steps
- **Security first**: All processing client-side, zero network requests
- **Vanilla JS only**: No npm packages

## GitHub Pages Deployment
1. Push to `main` branch
2. Settings > Pages > Source: `main` / `/ (root)`
3. URL: `https://<username>.github.io/devkit/`

## Copyright
© 2026 kevinicky

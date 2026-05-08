# AGENTS.md - devkit

## ⚠️ CRITICAL RULES - READ BEFORE ANY CHANGE

### Before committing:
1. **NEVER commit secrets, keys, tokens, or credentials** - scan all files first
2. **NEVER add external dependencies** (CDN links, npm packages, third-party scripts)
3. **NEVER add data persistence** beyond sessionStorage (no localStorage for user data, no cookies, no IndexedDB)
4. **ALWAYS validate all JS files** before committing: `node -e "const fs=require('fs');fs.readdirSync('js').forEach(f=>{try{new Function(fs.readFileSync('js/'+f,'utf8'));console.log('✓ '+f)}catch(e){console.log('✗ '+f+': '+e.message)}})"`
5. **ALWAYS update AGENTS.md and README.md** after any feature change, bug fix, or structural change
6. **ALWAYS test locally** before pushing - open index.html in browser and verify the changes work

### Security checklist before every commit:
- [ ] No API keys, tokens, or secrets in any file
- [ ] No external URLs or CDN links added
- [ ] No localStorage/cookies/IndexedDB for user data
- [ ] All processing is client-side only
- [ ] AGENTS.md and README.md are updated

### After making changes:
1. Update tool count and list in AGENTS.md and README.md
2. Update file structure if new files were added
3. Update keyboard shortcuts if changed
4. Validate all JS files
5. Commit both docs together with the code changes

## Project Overview
**devkit** is a security-focused, client-side productivity toolkit for developers. Hosted on GitHub Pages, it runs entirely in the browser with zero persistent data storage or transmission.

## Architecture
- **Pure static site**: HTML, CSS, vanilla JavaScript
- **No build tools**: Ready to deploy as-is
- **No dependencies**: Zero external libraries for security
- **Single-page app**: Tab-based navigation with grouped categories
- **State persistence**: `sessionStorage` for form values (survives refresh, clears on tab close)

## File Structure
```
devkit/
├── index.html              # Main entry point
├── css/
│   └── style.css           # Dark theme styles
└── js/
    ├── app.js              # Navigation, keyboard shortcuts, JWT sub-tabs
    ├── security.js         # Single-tab enforcement (localStorage + BroadcastChannel)
    ├── state-manager.js    # Session-based state persistence
    ├── jwt.js              # JWT decoder
    ├── jwt-generator.js    # JWT generator (HS256)
    ├── id-generator.js     # ID generators (5 countries)
    ├── json-tools.js       # JSON prettify/minify
    ├── json-encode-tool.js # JSON URL encode/decode
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

### Encode
1. **JWT** - Decode + Generate (HS256) with sub-tabs
2. **JSON Prettify** - Format and minify JSON
3. **JSON Encode** - URL encode/decode JSON strings
4. **Base64** - Encode/decode with swap support
5. **URL** - URL encode/decode with swap support

### Generate
5. **ID Generator** - Bulk IDs: Indonesia (KTP), Thailand, Philippines, Singapore (NRIC), Malaysia (NRIC)
6. **UUID** - v4 UUIDs in bulk (standard, no-dash, uppercase)
7. **Password** - Secure passwords with strength meter
8. **Lorem Ipsum** - Placeholder text (words, sentences, paragraphs)

### Convert
9. **Hash** - SHA-1, SHA-256, SHA-512 via Web Crypto API
10. **Timestamp** - Unix timestamp ↔ date with live clock
11. **Color** - HEX ↔ RGB ↔ HSL with color picker
12. **Unit** - Length, weight, temperature, data size, time

### Dev
13. **Regex** - Real-time matching with highlight and capture groups
14. **SQL** - Format and minify SQL queries
15. **Cron** - Visual cron parser with next run times
16. **Diff** - LCS-based line diff with added/removed highlighting

### Productivity
17. **Pomodoro** - Work/break modes with session tracking
18. **Markdown** - Live markdown to HTML rendering
19. **Scratchpad** - Memory-only notes (clears on refresh)

## Security Model

### What is NOT stored
- No localStorage for user data
- No cookies
- No IndexedDB
- No external requests or telemetry
- No server-side processing

### What IS stored (session only)
- `sessionStorage`: Form values, active tool
  - Survives page refresh
  - **Cleared when tab closes**
- `localStorage`: Only used for single-tab lock (tab ID + heartbeat timestamp)
  - No user data stored here

### Single-Tab Enforcement
- Uses `localStorage` for lock coordination + `BroadcastChannel` for real-time communication
- Detects same-tab refresh via `sessionStorage` to prevent false blocking
- Heartbeat mechanism detects crashed/abandoned tabs
- "Take Over" button to reclaim access

## Keyboard Shortcuts
- `Alt+1` through `Alt+0`: Switch between first 10 tools

## Navigation Structure
Tools are grouped into 5 categories in the nav:
- **Encode**: JWT, JSON, Base64, URL
- **Generate**: ID, UUID, Pass, Lorem
- **Convert**: Hash, Time, Color, Unit
- **Dev**: Regex, SQL, Cron, Diff
- **Productivity**: Pomodoro, MD, Notes

## Development Guidelines
- **Never add external dependencies** without explicit approval
- **Never persist user data** beyond sessionStorage (tab-scoped)
- **Keep it minimal**: No frameworks, no build steps
- **Security first**: All processing client-side, zero network requests
- **Vanilla JS only**: No npm packages
- **Always update AGENTS.md and README.md** after changes

## GitHub Pages Deployment
1. Push to `main` branch
2. Settings > Pages > Source: `main` / `/ (root)`
3. URL: `https://<username>.github.io/devkit/`

## Copyright
© 2026 kevinicky

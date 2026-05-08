# AGENTS.md - devkit

## Project Overview
**devkit** is a security-focused, client-side productivity toolkit for developers. Hosted on GitHub Pages, it runs entirely in the browser with zero data storage or transmission.

## Architecture
- **Pure static site**: HTML, CSS, vanilla JavaScript
- **No build tools**: Ready to deploy as-is
- **No dependencies**: Zero external libraries for security
- **Single-page app**: Tab-based navigation

## File Structure
```
devkit/
├── index.html          # Main entry point
├── css/
│   └── style.css       # Dark theme styles
└── js/
    ├── app.js          # Navigation, keyboard shortcuts
    ├── security.js     # Single-tab enforcement
    ├── jwt.js          # JWT decoder
    ├── id-generator.js # ID generators (5 countries)
    ├── json-tools.js   # JSON prettify/minify/encode/decode
    ├── regex-tester.js # Real-time regex tester
    ├── pomodoro.js     # Pomodoro timer
    └── text-diff.js    # Line-by-line diff tool
```

## Key Features

### Security
- **No data storage**: No localStorage, sessionStorage (except tab lock), cookies, or IndexedDB
- **No external requests**: All processing is client-side
- **No telemetry**: Zero analytics or tracking
- **Single-tab enforcement**: Uses BroadcastChannel API + sessionStorage to prevent multiple tabs

### Tools
1. **JWT Decoder**: Decodes header/payload, shows expiration status
2. **ID Generator**: Bulk generate IDs for Indonesia (KTP), Thailand, Philippines, Singapore (NRIC), Malaysia (NRIC)
3. **JSON Tools**: Prettify, minify, encode, decode
4. **Regex Tester**: Real-time matching with highlight and group capture
5. **Pomodoro Timer**: Work/break modes with session tracking
6. **Text Diff**: LCS-based line diff with added/removed highlighting

### Keyboard Shortcuts
- `Alt+1` through `Alt+6`: Switch between tools

## Development Guidelines
- **Never add external dependencies** without explicit approval
- **Never add data persistence** (localStorage, cookies, etc.)
- **Keep it minimal**: No frameworks, no build steps
- **Security first**: All data stays in memory only

## GitHub Pages Deployment
1. Push to a branch (e.g., `main`)
2. Go to Settings > Pages
3. Set source to the branch and `/ (root)` folder
4. URL will be: `https://<username>.github.io/devkit/`

# devkit

A security-focused developer productivity toolkit that runs entirely in your browser. No data stored. No data transmitted.

**URL**: `https://<your-username>.github.io/devkit/`

## Features

| Tool | Description |
|------|-------------|
| **JWT Decoder** | Decode JWT tokens, view header/payload, check expiration |
| **ID Generator** | Generate bulk IDs for Indonesia (KTP), Thailand, Philippines, Singapore (NRIC), Malaysia (NRIC) |
| **JSON Tools** | Prettify, minify, encode, decode JSON |
| **Regex Tester** | Real-time regex testing with match highlighting and capture groups |
| **Pomodoro Timer** | 25/5/15 minute modes with session tracking |
| **Text Diff** | Line-by-line diff comparison with added/removed highlighting |

## Security

- **Zero data storage**: Nothing is saved to localStorage, cookies, or any persistent storage
- **Zero external requests**: All processing happens locally in your browser
- **Single-tab only**: Prevents accidental data exposure across multiple tabs
- **No dependencies**: Zero third-party libraries means zero supply chain risk

## Keyboard Shortcuts

- `Alt+1` - JWT Decoder
- `Alt+2` - ID Generator
- `Alt+3` - JSON Tools
- `Alt+4` - Regex Tester
- `Alt+5` - Pomodoro Timer
- `Alt+6` - Text Diff

## Deploy to GitHub Pages

1. Create a new repository named `devkit`
2. Push all files to the `main` branch
3. Go to **Settings > Pages**
4. Set **Source** to `main` branch and `/ (root)` folder
5. Your site will be available at `https://<username>.github.io/devkit/`

## Tech Stack

- Vanilla HTML, CSS, JavaScript
- No frameworks, no build tools, no dependencies
- Dark theme optimized for developer productivity

## License

MIT

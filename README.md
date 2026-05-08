# devkit

A security-focused developer productivity toolkit that runs entirely in your browser. No data stored. No data transmitted.

**URL**: `https://kevinicky.github.io/devkit/`

## Tools (20)

| # | Tool | Description |
|---|------|-------------|
| 1 | **JWT Decoder** | Decode JWT tokens, view header/payload, check expiration |
| 2 | **ID Generator** | Bulk generate IDs for Indonesia (KTP), Thailand, Philippines, Singapore (NRIC), Malaysia (NRIC) |
| 3 | **JSON Tools** | Prettify, minify, encode, decode JSON |
| 4 | **Regex Tester** | Real-time regex testing with match highlighting and capture groups |
| 5 | **Pomodoro Timer** | 25/5/15 minute modes with session tracking |
| 6 | **Text Diff** | LCS-based line diff comparison with added/removed highlighting |
| 7 | **Hash Generator** | SHA-1, SHA-256, SHA-512 hashing |
| 8 | **Base64** | Encode/decode Base64 with swap support |
| 9 | **URL Tools** | URL encode/decode with swap support |
| 10 | **UUID Generator** | Generate v4 UUIDs in bulk (standard, no-dash, uppercase) |
| 11 | **Timestamp Converter** | Unix timestamp ↔ date conversion with live clock |
| 12 | **Color Converter** | HEX ↔ RGB ↔ HSL with color picker |
| 13 | **Markdown Preview** | Live markdown to HTML preview |
| 14 | **SQL Formatter** | Format and minify SQL queries |
| 15 | **Cron Parser** | Visual cron expression parser with next run times |
| 16 | **JWT Generator** | Create and sign JWT tokens (HS256) |
| 17 | **Scratchpad** | Memory-only notes (clears on refresh) |
| 18 | **Unit Converter** | Length, weight, temperature, data size, time |
| 19 | **Lorem Ipsum** | Generate placeholder text (words, sentences, paragraphs) |
| 20 | **Password Generator** | Secure passwords with strength meter |

## Security

- **Zero persistent storage**: All data lives in memory only
- **State persistence on refresh**: Uses `sessionStorage` for convenience (clears when tab closes)
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
- `Alt+7` - Hash Generator
- `Alt+8` - Base64
- `Alt+9` - URL Tools
- `Alt+0` - UUID Generator

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

© 2026 kevinicky

# devkit

A security-focused developer productivity toolkit that runs entirely in your browser. No data stored. No data transmitted.

**URL**: `https://kevinicky.github.io/devkit/`

## Tools (34)

### Encode
| Tool | Description |
|------|-------------|
| **JWT** | Decode tokens + Generate (HS256) with sub-tabs |
| **JSON Prettify** | Format and minify JSON |
| **JSON Encode** | URL encode/decode JSON strings |
| **Base64** | Encode/decode with swap support |
| **URL** | URL encode/decode with swap support |

### Generate
| Tool | Description |
|------|-------------|
| **ID Generator** | Bulk IDs: Indonesia (KTP), Thailand, Philippines, Singapore (NRIC), Malaysia (NRIC) |
| **UUID** | v4 UUIDs in bulk (standard, no-dash, uppercase) |
| **Password** | Secure passwords with strength meter |
| **Lorem Ipsum** | Placeholder text (words, sentences, paragraphs) |

### Convert
| Tool | Description |
|------|-------------|
| **Hash** | SHA-1, SHA-256, SHA-512 |
| **Base Converter** | Binary ↔ Octal ↔ Decimal ↔ Hex |
| **Timestamp** | Unix timestamp ↔ date with live clock |
| **Color** | HEX ↔ RGB ↔ HSL with color picker |
| **Unit** | Length, weight, temperature, data size, time |

### Dev
| Tool | Description |
|------|-------------|
| **Regex Tester** | Real-time matching with highlight and capture groups |
| **Regex Library** | 20 pre-built patterns (email, URL, IP, phone, etc.) |
| **SQL** | Format and minify SQL queries |
| **Cron** | Visual cron parser with next run times |
| **Text Diff** | LCS-based line diff comparison |
| **JSON Diff** | Structured JSON comparison (key-by-key) |

### Web
| Tool | Description |
|------|-------------|
| **CSS Generator** | Box shadow, gradient, flexbox visual builders |
| **cURL Generator** | Build HTTP requests as cURL commands |
| **HTML Entity** | Encode/decode HTML entities |
| **Escape** | Escape/unescape JSON, JS, HTML, CSS strings |
| **CIDR** | Network calculator (mask, hosts, broadcast) |

### Security
| Tool | Description |
|------|-------------|
| **Security Headers** | Analyze response headers, get security score |
| **CSP Builder** | Visual Content Security Policy generator |
| **Password Entropy** | Bits of entropy + crack time estimate |

### Productivity
| Tool | Description |
|------|-------------|
| **Pomodoro** | 25/5/15 minute modes with session tracking |
| **Markdown** | Live markdown to HTML preview |
| **Scratchpad** | Memory-only notes (clears on refresh) |
| **Checklist** | Memory-only task checklist |
| **Standup** | Yesterday/today/blockers template |
| **Snippet Pad** | Memory-only multi-tab code snippets |

## Security

- **Zero persistent storage**: All user data lives in memory only
- **State persistence on refresh**: Uses `sessionStorage` for convenience (clears when tab closes)
- **Zero external requests**: All processing happens locally in your browser
- **Single-tab only**: Prevents accidental data exposure across multiple tabs
- **No dependencies**: Zero third-party libraries means zero supply chain risk

## Keyboard Shortcuts

- `Alt+1` - JWT
- `Alt+2` - JSON Prettify
- `Alt+3` - JSON Encode
- `Alt+4` - Base64
- `Alt+5` - URL
- `Alt+6` - ID Generator
- `Alt+7` - UUID
- `Alt+8` - Password
- `Alt+9` - Lorem Ipsum
- `Alt+0` - Hash

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

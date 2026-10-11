# Password Security Analyzer

A cybersecurity learning project with two interfaces: a Python Tkinter desktop application and a Next.js web application. The web version is deployed at https://password-analyzer-web.vercel.app.

## Web application

```bash
cd password-analyzer-web
npm ci
npm run dev
```

Open http://localhost:3000. To check production compilation, run `npm run build`.

## Python desktop application

```bash
python password_analyzer.py
```

Requires Python 3 with Tkinter available. `password_analyzer.spec` is included for optional PyInstaller builds; compiled files are deliberately excluded.

## What it demonstrates

- Password length and character-composition checks
- Strong/weak display and SHA-256 hash demonstration
- Web UI and desktop UI implementations

## Important security limitations

The current web implementation sends entered passwords to its `/api/analyze` backend. **Do not enter real passwords**. Use fictional test values only. Its strength assessment checks composition rules and cannot reliably estimate resistance to guessing. The displayed unsalted SHA-256 hash is for education only, **not** suitable for password storage; authentication systems should use salted password-hashing functions such as Argon2id.

## Repository contents

- `password-analyzer-web/`: Next.js/React app and API source
- `password_analyzer.py`: Python desktop app
- `password_analyzer.spec`: Optional PyInstaller configuration
- `.gitignore`: excludes dependencies, build outputs and secrets

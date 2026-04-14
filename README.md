# Aubit AI Companion Prototype

This prototype turns the provided Aubit references into a polished companion-style experience with:

- Intro popup pod animation using the provided white box and living room
- Central Aubit lobby with study, test, games, customize, and settings flows
- Desktop-widget style launcher plus immersive room mode
- Voice wake phrase hooks using browser speech APIs
- Reward loop for coins, stars, outfits, and room progression

## Run In Browser

Open [index.html](/Users/bhupendra/Desktop/3D-Voice-Assistent/index.html) directly in a browser, or serve the folder locally:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Run As Desktop Shell

The project now includes an Electron scaffold for a real Windows widget shell:

```bash
npm install
npm run start
```

This launches:

- the immersive Aubit app window
- a transparent desktop widget window that uses the new Aubit shell image
- a tray menu for reopening the widget or the full app

Inside Electron, the `Desktop Widget` button now hides the immersive window and shows the desktop widget instead.

To build a Windows installer:

```bash
npm run dist
```

## Notes

- The frontend still works directly in the browser with the old compact-mode fallback.
- The Electron shell is scaffolded in `electron/` and uses `widget.html` for the transparent desktop companion window.
- Packaging requires installing the Electron dependencies first.
- Browser speech recognition depends on browser support and microphone permissions.

See [docs/architecture.md](/Users/bhupendra/Desktop/3D-Voice-Assistent/docs/architecture.md) for the desktop architecture and packaging roadmap.

## Backend

This repository now also includes a modular FastAPI backend under [backend/README.md](/Users/bhupendra/Desktop/3D-Voice-Assistent/backend/README.md).

It adds:

- API routes for login, game actions, AI responses, asset upload targets, and health checks
- Business logic services separated from route handlers
- MongoDB, Firebase, Redis, GCP Storage, OpenAI, ElevenLabs, Stripe, and Sentry integration points
- Security middleware, JWT auth, and Docker packaging

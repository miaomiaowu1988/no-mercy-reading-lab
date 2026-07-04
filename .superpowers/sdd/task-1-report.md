Task type: scaffold / frontend app shell

Implemented:
- Created the Vite React scaffold exactly as specified in the brief.
- Added `package.json`, `index.html`, `src/main.jsx`, `src/App.jsx`, and `src/styles.css`.
- The app now renders the requested product shell with the diagnostic bootcamp hero copy and styling.

Files changed:
- `E:\Desktop\no-mercy-reading-lab\package.json`
- `E:\Desktop\no-mercy-reading-lab\index.html`
- `E:\Desktop\no-mercy-reading-lab\src\main.jsx`
- `E:\Desktop\no-mercy-reading-lab\src\App.jsx`
- `E:\Desktop\no-mercy-reading-lab\src\styles.css`
- `E:\Desktop\no-mercy-reading-lab\package-lock.json`

Tests and results:
- `npm install` succeeded and produced `node_modules` and `package-lock.json`.
- `npm run build` succeeded with a production Vite build and generated `dist/`.
- Install warning observed: npm reported an `allow-scripts` notice for `esbuild`, but it did not block installation or the build.

TDD evidence:
- Not applicable for this task. This was a brief-driven scaffold/configuration task with exact file contents rather than behavior development.

Self-review findings:
- The scaffold matches the brief values verbatim.
- The root component is exported from `src/App.jsx` and wired through `src/main.jsx`.
- Build output confirms the app shell compiles cleanly.

Concerns:
- `package-lock.json` resolved `vite` to `6.4.3` within the requested `^6.0.0` range, which is expected but worth noting.
- The npm `allow-scripts` notice may matter for stricter environments, though it did not affect this task.

Review fix update:
- Adjusted `src/styles.css` to replace the dark-blue/slate-heavy shell with a neutral PACS-style base, using a light gray workspace, off-white panel, restrained gray borders, and muted accent text.
- Removed the radial glow/decorative orb treatment and kept the scaffold visually simple and consistent.

Verification:
- `npm run build` completed successfully.
- Output summary: Vite 6.4.3 built 24 modules in 1.36s and emitted the `dist/` bundle with no errors.

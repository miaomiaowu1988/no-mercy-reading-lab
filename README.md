# Dr. Xie's Diagnostic Bootcamp

Swipe. Guess. Reveal. Remember.

Dr. Xie's Diagnostic Bootcamp is a respiratory-focused diagnostic training prototype for chest CT, difficult respiratory cases, and respiratory-emergency ECG recognition.

## MVP Scope

- Daily CT
- Hard Cases
- ECG Flashcards
- Boss Case unlocking
- Weak Signs tracking
- Penalty Review with lightweight spaced repetition
- Local JSON demonstration cases
- Source-draft cases with local article images for private learning
- No backend and no login

## Compliance Note

The MVP does not use real patient data, copyrighted scans, or republished article images in any public-facing release. Source-draft cases are for private learning only, preserve original links, and are labeled as AI-generated drafts that are not medically reviewed. Demonstration cases are synthetic educational placeholders unless a local source image is explicitly credited.

## Source Draft Workflow

Use `sources/watchlist.json` to track target public accounts and topics. Run:

```powershell
npm run refresh:sources
```

This writes candidate search records to `sources/candidates/latest-candidates.json`. WeChat articles that require login or verification must be opened by the user in the browser; the project does not bypass verification, CAPTCHA, anti-bot checks, or access controls.

## Run Locally

```powershell
npm install
npm run build
npm run dev
```

Open the local Vite URL shown in the terminal.

Then run local browser checks against the dashboard and modules described in the task brief.

## Interview Pitch

This is a respiratory-focused diagnostic training prototype, not a medical image gallery. It recreates the clinical learning loop: inspect the image, read the context, commit to a diagnosis, reveal the answer, and review missed signs. The system tracks weak signs, penalty review items, streaks, accuracy, and Boss Case unlocking.

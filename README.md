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
- No backend and no login

## Compliance Note

The MVP does not use real patient data, copyrighted scans, or large-scale scraping. Demonstration cases are synthetic educational placeholders. Later article ingestion should preserve source links and structured learning summaries only, with human medical review.

## Run Locally

```powershell
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Interview Pitch

This is a respiratory-focused diagnostic training prototype, not a medical image gallery. It recreates the clinical learning loop: inspect the image, read the context, commit to a diagnosis, reveal the answer, and review missed signs. The system tracks weak signs, penalty review items, streaks, accuracy, and Boss Case unlocking.

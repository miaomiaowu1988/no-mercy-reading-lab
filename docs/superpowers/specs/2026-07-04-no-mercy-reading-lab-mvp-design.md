# Dr. Xie's Diagnostic Bootcamp MVP Design

## 1. Product Positioning

**Dr. Xie's Diagnostic Bootcamp** is a respiratory-focused diagnostic training web app for chest CT, difficult respiratory cases, and respiratory-emergency ECG recognition. It is not a medical image gallery. It recreates the clinical learning loop: inspect the image, read the context, commit to a diagnosis, reveal the answer, and review missed signs.

The public-facing product should feel professional enough for an interview, portfolio, or medical informatics discussion. The playful "No-Mercy" identity remains inside the product as training mechanics: No-Mercy Mode, Ruthless Review, streaks, penalty review, weak-sign tracking, and Boss Cases.

**Subtitle:** Swipe. Guess. Reveal. Remember.

**Formal English name:** Dr. Xie's Diagnostic Bootcamp

**Internal playful mode:** Evil Dr. Xie's No-Mercy Reading Lab

**Chinese formal name:** 谢博士诊断训练营

**Chinese playful name:** 邪恶谢博士残酷阅片实验室

## 2. Target Users

- Respiratory medicine residents and fellows who need repeated chest CT exposure.
- Medical students and junior doctors preparing for clinical rotations or exams.
- Clinicians who want quick refreshers on respiratory imaging and respiratory-emergency ECG patterns.
- Interview audience: medical informatics, data, AI, frontend, or clinical research interviewers.

## 3. MVP Goal

Build a demonstrable web prototype that proves the full learning loop:

1. Choose one training module.
2. Swipe through a case card.
3. Inspect a CT or ECG educational placeholder image.
4. Read a short clinical context.
5. Commit to a diagnosis or imaging-sign answer.
6. Reveal the answer, explanation, reasoning steps, common trap, and must-not-miss point.
7. Track performance, streak, weak signs, and penalty review items.
8. Unlock a Boss Case after a defined learning threshold.

The MVP should use curated, synthetic, or licensed demonstration cases first. Public article ingestion can come later as a separate pipeline.

## 4. Scope

### In Scope

- Mobile-first swipe card interface.
- Desktop layout inspired by PACS dashboards.
- Three main training modules:
  - Daily CT
  - Hard Cases
  - ECG Flashcards
- Locked challenge:
  - Boss Case
- Case card flow:
  - image first
  - short clinical history
  - question
  - options or sign tags
  - commit answer
  - reveal diagnosis
  - reasoning steps
  - common trap
  - must-not-miss point
  - explanation and source
- Progress mechanics:
  - level
  - case streak
  - accuracy
  - weak signs
  - spaced penalty review
  - Boss Case unlocked state
- Local JSON data source for the first prototype.
- Sample dataset of 20-30 demonstration cases.

### Out of Scope for MVP

- Automatic large-scale WeChat crawling.
- Login system.
- Multi-user accounts.
- Real patient data.
- Public deployment with copyrighted article images.
- AI diagnosis from raw medical images.
- DICOM viewer with full clinical PACS functionality.
- Full cardiology ECG curriculum unrelated to respiratory or emergency scenarios.

## 5. Information Architecture

### Home / Dashboard

Purpose: show the product identity and give fast entry into training.

Core elements:

- Product title: "Dr. Xie's Diagnostic Bootcamp"
- Subtitle: "Swipe. Guess. Reveal. Remember."
- Internal accent label: "No-Mercy Mode available"
- Module cards:
  - Daily CT
  - Hard Cases
  - ECG Flashcards
- Locked Boss Case panel:
  - "Complete 12 cases with accuracy >=70% or reach a 5-case streak to unlock."
- Today stats:
  - cases completed
  - accuracy
  - current streak
  - level
- "Your Weak Signs Today" panel:
  - Tree-in-bud
  - Mosaic attenuation
  - Right heart strain
- Penalty Review queue.

### Training Screen

Purpose: one-screen case solving.

Core elements:

- Case image area.
- Image controls:
  - window/level visual mock controls
  - slice indicator
  - zoom mock control
- Short clinical history.
- Question text.
- Answer options or imaging sign tags.
- Commit Answer button.
- Reveal Diagnosis button after submission.
- Explanation panel after reveal.
- Reasoning steps panel.
- Common Trap panel.
- Must Not Miss panel.
- Mark buttons:
  - Got it
  - Again, Doctor
  - Save Case

### Review Screen

Purpose: revisit mistakes and weak signs with lightweight spaced repetition.

Core elements:

- Penalty Review list.
- Weak Signs list.
- Next review timing.
- Mastery status.
- Filter by module, disease, sign, difficulty, and chief skill.
- Re-attempt card.

## 6. Training Modules

### Daily CT

High-yield chest CT pattern recognition.

Initial categories:

- Pneumonia and infection
- Pulmonary nodule
- Lung cancer
- Interstitial lung disease
- Bronchiectasis
- Pulmonary embolism
- Pleural effusion and pleural disease
- Emphysema and COPD

### Hard Cases

Advanced respiratory cases with atypical imaging or complex differential diagnosis.

Initial categories:

- Drug-induced lung injury
- Immune checkpoint inhibitor pneumonitis
- Connective tissue disease-associated ILD
- Pulmonary alveolar proteinosis
- Hypersensitivity pneumonitis
- Vasculitis-related lung disease
- Rare infection
- Mimics of lung cancer

### ECG Flashcards

Respiratory-emergency ECG rapid recognition. This module should not become a full cardiology ECG bank. It focuses on ECG patterns respiratory clinicians commonly need in chest pain, dyspnea, hypoxemia, pulmonary embolism, infection, pulmonary heart disease, electrolyte disorders, and emergency triage.

Initial categories:

- Pulmonary embolism-related ECG: S1Q3T3, right heart strain, sinus tachycardia, T-wave inversion
- Hypoxemia or infection-triggered atrial fibrillation and atrial flutter
- Hyperkalemia and hypokalemia patterns
- Acute chest pain triage: STEMI, NSTEMI, pulmonary embolism, pericarditis
- COPD and pulmonary heart disease with right ventricular strain
- Premature ventricular contractions, ventricular tachycardia, and wide-QRS tachycardia screening

### Boss Case

Locked challenge mode. Boss Case is not a primary homepage module; it is a challenge unlocked from the three main modules. A Boss Case combines history, image, and multi-step reasoning.

Boss Case requirements:

- Higher difficulty.
- More than one question.
- Diagnosis plus differential diagnosis.
- Requires explanation before completion.
- Professional locked-challenge styling, not horror or dungeon imagery.

## 7. Case Data Model

Each card is stored as structured JSON.

```json
{
  "id": "ct_001",
  "module": "Daily CT",
  "title": "Acute dyspnea with bilateral ground-glass opacities",
  "difficulty": "Intermediate",
  "body_system": "Respiratory",
  "modality": "Chest CT",
  "chief_skill": "pattern_recognition",
  "cognitive_level": "diagnosis",
  "urgency": "urgent",
  "history": "Male, 63, fever and dyspnea for 5 days.",
  "image": {
    "type": "educational_placeholder",
    "src": "assets/cases/ct_001.png",
    "alt": "Abstract chest CT educational placeholder"
  },
  "question_type": "single_choice",
  "question": "What is the most likely diagnosis?",
  "options": [
    "Viral pneumonia",
    "Pulmonary edema",
    "ILD exacerbation",
    "Pulmonary embolism"
  ],
  "answer": "Viral pneumonia",
  "signs": [
    "Ground-glass opacity",
    "Peripheral distribution",
    "Patchy consolidation"
  ],
  "must_know_signs": [
    "Peripheral GGO",
    "Patchy consolidation"
  ],
  "reasoning_steps": [
    "First assess distribution: bilateral, peripheral, and lower-lobe predominant.",
    "Then assess density: ground-glass opacity mixed with patchy consolidation.",
    "Combine the acute febrile history with the CT pattern; infection is favored."
  ],
  "explanation": "The case shows bilateral peripheral ground-glass opacities with patchy consolidation, supporting viral pneumonia in the given clinical context.",
  "differential": [
    "Organizing pneumonia",
    "Pulmonary edema",
    "Acute ILD exacerbation"
  ],
  "common_trap": "Do not diagnose acute ILD exacerbation from ground-glass opacity alone without considering time course, distribution, and infection signs.",
  "must_not_miss": "If severe hypoxemia or elevated D-dimer is present, evaluate for pulmonary embolism or mixed disease.",
  "pitfall": "Mistaking pulmonary edema for viral pneumonia without checking distribution and clinical context.",
  "source": {
    "type": "demo",
    "title": "Demo case for MVP",
    "url": ""
  },
  "learning_points": [
    "Connect distribution with differential diagnosis.",
    "Separate infection patterns from edema and ILD exacerbation."
  ],
  "review_interval_days": 1,
  "mastery_status": "learning"
}
```

Allowed `chief_skill` values:

- `pattern_recognition`
- `differential_diagnosis`
- `emergency_triage`
- `sign_identification`
- `management_next_step`

Allowed `mastery_status` values:

- `new`
- `learning`
- `review_due`
- `mastered`

## 8. Learning Mechanics

### Level

Level increases with completed cases and correct answers. It is motivational, but secondary to weak-sign learning.

Example rule:

- +10 XP for each completed case.
- +20 XP for correct answer on first try.
- +10 XP for completing Penalty Review.
- Level increases every 100 XP.

### Streak

Streak increases after correct answers and resets after incorrect answers.

UI example:

- "12-case streak"
- "Streak broken. Penalty Review updated."

### Penalty Review

Incorrect cases go into a spaced review queue.

Rules:

| Answer behavior | Review behavior |
| --- | --- |
| Wrong diagnosis | Add full case to Penalty Review |
| Missed key sign | Add that sign to Weak Signs |
| First review correct | Show again after 1 day |
| Second review correct | Show again after 3 days |
| Third review correct | Mark as mastered |

For the MVP, day-based intervals can be simulated using stored `nextReviewAt` timestamps in `localStorage`.

### Weak Signs

Weak Signs should be a core product feature, not a small stat. It answers the most important reading-training problem: "I know the disease name, but I do not reliably see the sign."

Examples:

- Ground-glass opacity
- Tree-in-bud
- Honeycombing
- Mosaic attenuation
- Pleural effusion
- Right heart strain

Homepage panel:

```text
Your Weak Signs Today
1. Tree-in-bud
2. Mosaic attenuation
3. Right heart strain
```

### Boss Case Unlock

First simple rule:

- Unlock after 12 completed cases and accuracy >=70%, or after a 5-case streak.

## 9. Visual Direction

The interface should look like a serious medical training tool with light bootcamp mechanics, not a horror game.

Use:

- PACS-inspired layout.
- Dark clinical dashboard.
- CT grayscale image panels.
- Clinical ECG green accents.
- Cyan highlights for active controls.
- Compact sign chips.
- Muted red for penalty/review states.
- Boss Case as a locked clinical challenge.

Avoid:

- skulls
- dungeon imagery
- monsters
- gore
- fake patient portraits
- overly decorative neon
- unreadable cyberpunk UI

Design principle:

> Serious medical tool + lightweight training-camp mechanics.

Not:

> Game interface with a medical skin.

## 10. Content and Compliance

The first prototype should not depend on aggressive scraping.

Recommended staged content strategy:

1. Use synthetic, licensed, or manually curated demo cases.
2. Add public source links only for attribution.
3. If WeChat article content is used, store source metadata and a small learning summary, not a full republished article.
4. Avoid identifiable patient images and personal information.
5. Keep raw source material read-only.
6. Use local placeholders or licensed/open images for public demos.

Interview compliance statement:

> The first version does not ingest real patient data or scrape at scale. It uses manually curated or synthetic educational cases to validate the training loop. Later article ingestion would extract structured learning cards and source links only, without copying full articles or storing identifiable patient information. All imported medical cases require human review.

## 11. Future Article-to-Case Pipeline

The later pipeline can turn public medical articles into training cards.

Proposed flow:

1. Input article URL or saved HTML.
2. Extract title, source, publication date, text, and image candidates.
3. Detect modality: CT, X-ray, ECG, pathology, bronchoscopy.
4. Suggest disease tags, chief skill, urgency, and imaging signs using keyword rules or NLP.
5. Human review confirms:
   - diagnosis
   - signs
   - reasoning steps
   - common trap
   - must-not-miss point
   - question
   - answer
   - explanation
   - source link
6. Save the final structured case as JSON.

Important principle: automated extraction can assist, but final medical training cards require human review.

## 12. Suggested Technical Stack

### Fast Interview Prototype

- Frontend: React + Vite
- Styling: plain CSS modules or a single focused CSS file
- Charts/stats: simple custom components first, ECharts later if needed
- Data: local JSON
- State: localStorage for progress and review scheduling
- Images: local educational placeholder assets

### Alternative Fast Demo

- Streamlit for rapid internal prototype.
- Less polished swipe experience, faster data exploration.

### Recommended Path

Use React + Vite. The swipe-card interaction is central to the product, and a polished frontend will make the interview demo much stronger.

## 13. MVP File Plan

Expected files for implementation:

- `package.json`
- `index.html`
- `src/main.jsx`
- `src/App.jsx`
- `src/data/cases.json`
- `src/lib/progress.js`
- `src/components/Dashboard.jsx`
- `src/components/TrainingCard.jsx`
- `src/components/ModuleCard.jsx`
- `src/components/ProgressPanel.jsx`
- `src/components/PenaltyReview.jsx`
- `src/components/WeakSignsPanel.jsx`
- `src/styles.css`
- `public/assets/cases/`

## 14. Interview Pitch

Short pitch:

> Dr. Xie's Diagnostic Bootcamp is a respiratory-focused diagnostic training prototype, not just a medical image gallery. The first version focuses on chest CT and respiratory-emergency ECG patterns. It recreates the clinical learning loop: inspect the image, read the context, commit to a diagnosis, reveal the answer, and review missed signs.

Technical pitch:

> The project has three layers: a content structuring layer that turns curated cases or public article summaries into JSON cards, a training interaction layer that supports swipe, answer, reveal, and review, and a learning analytics layer that tracks weak signs, penalty review items, streaks, accuracy, and Boss Case unlocking.

Medical pitch:

> The system is designed around the real cognitive workflow of image interpretation: inspect the image, connect it with clinical context, commit to a diagnosis, compare with the answer, then repeat missed signs until they become recognizable.

Compliance pitch:

> The MVP intentionally avoids large-scale scraping and real patient data. It uses synthetic or manually curated educational cases first. Later source ingestion would preserve links and structured summaries rather than republishing full articles or identifiable images.

## 15. Success Criteria

The MVP is successful if it can demonstrate:

- A professional public product identity with a memorable internal No-Mercy mode.
- A smooth swipe-based reading experience.
- At least 20 structured cases.
- Working answer/reveal flow.
- Reasoning steps, common trap, and must-not-miss panels.
- Working local progress tracking.
- Spaced Penalty Review and Weak Signs behavior.
- Boss Case unlock logic.
- A clear story for how public medical article content can later become structured training data.

## 16. Risks and Mitigations

### Risk: Copyright and content reuse

Mitigation: use educational placeholders or licensed/open images in the public demo; store source links; avoid republishing full article content.

### Risk: Medical accuracy

Mitigation: keep demo explanations conservative; label prototype content as educational; require human review for imported cases.

### Risk: Scope creep

Mitigation: keep MVP local-only with JSON data and no login, crawler, or backend.

### Risk: Too much game style

Mitigation: keep visual design PACS-inspired and professional; use gamification mainly in progress mechanics.

### Risk: ECG scope drift

Mitigation: limit ECG Flashcards to respiratory-emergency scenarios and explicitly avoid a full cardiology ECG bank in MVP.

## 17. Next Step

Create an implementation plan for a React + Vite prototype with local JSON data, educational placeholder images, localStorage progress tracking, spaced Penalty Review, Weak Signs, and Boss Case unlocking.

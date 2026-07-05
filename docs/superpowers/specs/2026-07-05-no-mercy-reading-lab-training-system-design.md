# No-Mercy Reading Lab Training System Design

## 1. Product Definition

**No-Mercy Reading Lab** is a respiratory-focused diagnostic training system for chest CT, difficult respiratory cases, and respiratory-emergency ECG recognition. It is not a generic flashcard app and not a pure image browser. The product turns fragmented medical learning material into a repeatable training loop:

1. Curate or import a case candidate.
2. Convert it into a structured training card.
3. Group cards into a training batch.
4. Route the learner based on performance.
5. Reinforce weak signs and wrong answers.
6. Unlock challenge cases as performance improves.

The key product value is the combination of:

- batch-based training
- performance-based routing
- weak-sign reinforcement
- human-reviewed structured case content

## 2. Positioning

This project sits at the intersection of:

- medical education product
- respiratory clinical knowledge base
- AI-assisted content structuring workflow

For interview use, the strongest framing is:

> No-Mercy Reading Lab is a respiratory-focused diagnostic training system. It structures chest CT, difficult respiratory cases, and respiratory-emergency ECG into reviewable training cards, then uses batch training, weak-sign tracking, penalty review, and challenge cases to turn content browsing into repeated diagnostic practice.

## 3. Target Users

- Respiratory residents and fellows
- Medical students preparing for rotations or exams
- Junior doctors building chest CT and ECG pattern recognition
- Interview reviewers evaluating product thinking, frontend execution, and domain knowledge

## 4. Core Modules

### Daily CT

High-yield chest CT pattern recognition.

### Hard Cases

Higher-complexity respiratory cases focused on differential diagnosis and traps.

### ECG Flashcards

Respiratory-emergency ECG recognition only. This module must stay scoped to respiratory and emergency interpretation rather than becoming a general cardiology ECG curriculum.

Recommended content priority:

1. Pulmonary embolism ECG patterns
2. Hypoxemia or infection-triggered atrial arrhythmias
3. Hyperkalemia and hypokalemia
4. Acute chest pain differential: STEMI, NSTEMI, PE, pericarditis
5. COPD or pulmonary heart disease patterns
6. Wide-QRS tachycardia initial recognition

### Boss Case

Locked multi-step challenge unlocked through sustained performance.

## 5. Training Batch Model

The system should support three batch sizes rather than forcing 50 questions in the MVP.

| Mode | `activeSetSize` | Purpose |
| --- | ---: | --- |
| Demo Mode | 10 | Interview and portfolio walkthrough |
| Daily Training | 20 | Practical daily use |
| Formal Batch | 50 | Full training cycle |

Product rule:

> The standard product batch is 50 questions, while the MVP demo defaults to 10 questions to show the complete loop quickly.

Each module maintains an `activeSet` for the current batch. The batch is assembled using:

1. approved source-backed cases
2. approved demo cases
3. reviewed variant cases, only when additional volume is needed

## 6. Performance Routing

The system should not use a single hard 80% gate with no flexibility. Instead it should route learners by batch performance.

| Batch accuracy | System behavior |
| --- | --- |
| `<60%` | Mandatory reinforcement with wrong cases and easier related cases |
| `60-79%` | Mixed reinforcement: wrong cases, weak-sign cases, and a small number of new cases |
| `>=80%` | Batch cleared, generate the next batch |
| `>=90%` | Batch cleared plus Boss Case progress bonus |

This makes the product feel adaptive rather than punitive.

## 7. User Flow

1. User opens the dashboard.
2. The dashboard shows one primary recommendation, such as `Continue Training`, with a reason derived from weak signs or unfinished batches.
3. User enters a module and receives the current `activeSet`.
4. For each case, the user:
   - inspects the image
   - reads the short clinical history
   - answers the question
   - reveals explanation and reasoning
   - optionally reports a problem with the case
5. When the batch ends, the user lands on a summary screen that behaves like a training prescription, not just a score sheet.
6. The system then sends the user into reinforcement or a refreshed batch depending on performance.

## 8. Page Structure

### Dashboard

Top priority is a clear next action, not dense metrics.

Recommended layout:

- title and subtitle
- primary CTA: `Continue Training`
- recommendation text, for example `Daily CT reinforcement recommended because mosaic attenuation was missed 3 times`
- three module entry cards
- Boss Case status
- weak signs panel
- penalty review panel
- compact progress metrics

### Module Training Page

- module label and batch progress
- main image viewport
- history
- question and options
- submit action
- reveal panel with:
  - answer
  - signs
  - reasoning steps
  - common trap
  - must not miss
  - next step when applicable
  - source note
- report issue action
- next case action

### Batch Summary Page

This screen should emphasize what the learner should do next.

Required sections:

- batch accuracy
- completed count
- streak summary
- weak-sign summary
- routing result
- next training plan

Example:

> Next Training Plan: reinforce tree-in-bud, mosaic attenuation, and right heart strain. Recommend 12 reinforcement questions. New batch deferred because accuracy is 74%.

### Case Builder

A lightweight local authoring tool is highly recommended even in early versions.

Minimum actions:

- paste source link or choose local draft input
- add history
- select or upload image
- set diagnosis and differential
- add sign labels
- add explanation and reasoning
- set medical review and content rights status
- save as structured JSON

This increases the portfolio value by showing content structuring and quality control, not just quiz UI.

## 9. Data Flow

### Content Intake

The source pool should be described conservatively:

- author-approved or openly licensed teaching materials
- public account original links with metadata and learning summaries only
- open databases or educational resources
- manually created demo cases
- locally authored examples

Avoid making public mirror pages a first-class source category in product-facing documentation.

### Structured Conversion

The system extracts or fills:

- title
- source account
- publication date
- image candidates
- history summary
- diagnosis
- signs
- differential
- explanation
- common trap
- must not miss
- next step

### Batch Assembly

For each module:

1. load approved source-backed cases not yet used in recent batches
2. add approved demo cases
3. add reviewed variant cases if needed to reach target batch size
4. produce an `activeSet`

Reinforcement batch composition should be explicit:

| Learner performance | Batch mix |
| --- | --- |
| `<60%` | 60% wrong cases, 30% easier related cases, 10% new cases |
| `60-79%` | 40% wrong cases, 40% weak-sign cases, 20% new cases |
| `>=80%` | next standard batch using normal approved content mix |

### Learning Record

Each answer updates:

- correctness
- timestamp
- streak
- XP
- weak signs
- penalty review queue
- batch progress
- issue reports when submitted

## 10. Case Schema

The schema should remain structured but become slightly more clinical.

```json
{
  "id": "ct_001",
  "module": "Daily CT",
  "title": "Acute dyspnea with wedge-shaped peripheral opacity",
  "modality": "Chest CT",
  "diagnosis": "Pulmonary embolism",
  "diagnosis_group": "vascular",
  "difficulty": "intermediate",
  "urgency_level": "emergent",
  "history": "Male, 63, acute dyspnea and pleuritic chest pain.",
  "image_signs": ["wedge-shaped opacity", "right heart strain"],
  "distribution": ["peripheral", "lower lobe"],
  "question": "What is the most likely diagnosis?",
  "options": ["Pulmonary embolism", "Pneumonia", "Heart failure", "Asthma exacerbation"],
  "answer": "Pulmonary embolism",
  "differential": ["pneumonia", "heart failure", "asthma exacerbation"],
  "common_trap": "Mistaking tachycardia and dyspnea for simple infection.",
  "must_not_miss": "Pulmonary embolism with right heart strain.",
  "next_step": "Consider CTPA and risk stratification if clinically suspected.",
  "source": {
    "type": "demo",
    "title": "Demo case",
    "url": "",
    "accessed_at": "2026-07-05",
    "license": "demo",
    "attribution_required": false
  },
  "content_type": "synthetic_demo",
  "image_license": "placeholder",
  "contains_phi": false,
  "medical_review_status": "approved",
  "content_rights_status": "demo",
  "public_demo_allowed": true,
  "reviewer": "human"
}
```

Recommended important fields:

- `urgency_level`
- `differential`
- `common_trap`
- `must_not_miss`
- `next_step`
- `source`
- `content_type`
- `contains_phi`
- `medical_review_status`
- `content_rights_status`
- `public_demo_allowed`
- `reviewer`

## 11. Variant Case Policy

Variant generation is allowed, but every variant should carry explicit lineage and review state.

```json
{
  "is_variant": true,
  "parent_case_id": "ct_001",
  "variant_type": "option_shuffle",
  "medical_review_status": "draft",
  "content_rights_status": "demo"
}
```

Allowed variant types:

- `option_shuffle`
- `history_simplified`
- `sign_focus`
- `differential_variant`

Policy:

> Variant cases default to draft status and must be human-reviewed before entering an active training batch.

## 12. State Model

The system should separate four distinct status groups.

### Content Status

- `draft`
- `reviewed`
- `approved`
- `deprecated`
- `flagged`

### User Learning Status

- `new`
- `answered_correct`
- `answered_wrong`
- `in_review`
- `mastered`

### Batch Status

- `idle`
- `in_progress`
- `awaiting_evaluation`
- `needs_reinforcement`
- `eligible_for_refresh`
- `refreshing`
- `completed`

### Issue Status

- `reported`
- `triaged`
- `fixed`
- `rejected`
- `archived`

This separation matters because a case can be `approved` as content while still being `in_review` for a learner.

## 13. Weak Signs and Review Logic

Weak signs should have a concrete trigger rather than remaining a display concept.

A sign becomes weak if any of the following is true:

1. the learner misses it in at least 2 cases overall
2. the learner misses it twice within the latest 10 related cases
3. the sign appears in a wrong-answer case and is marked as a `must_know_sign`

This gives the product a stable way to populate the weak-sign panel and reinforcement routing.

Penalty Review should follow a lightweight spaced review schedule:

- wrong case: enter immediate review queue
- first correct review: schedule again after 1 day
- second correct review: schedule again after 3 days
- third correct review: mark as mastered

Suggested stored shape:

```json
{
  "review_state": {
    "review_count": 0,
    "next_review_at": null,
    "mastery_status": "learning"
  }
}
```

## 14. Reward and Penalty Mechanics

Rewards should stay light and supportive.

Base reward:

- +10 XP for completion
- +20 XP for a correct first answer
- +10 XP for a successful review completion

Streak bonus recommendation:

- 3 correct in a row: small XP bonus
- 5 correct in a row: slightly larger XP bonus
- 10 correct in a row: visible bonus moment

Penalty rule:

- wrong answers reset current streak
- wrong answers add to penalty review
- missed key signs increase weak-sign counts

## 15. Report Issue Workflow

Every case should expose a lightweight report action.

Suggested report types:

- question wording issue
- answer issue
- explanation issue
- image mismatch
- image quality problem
- other

Reports should be stored locally first and appear in an issue queue for later triage.

## 16. Boss Case Unlock

Boss Case should use a specific MVP unlock rule rather than vague sustained performance language.

Recommended MVP rule:

Unlock when any one of the following is true:

- at least 30 cases completed and latest batch accuracy `>=80%`
- best streak `>=10`
- 3 weak signs improved to `mastered`

This keeps Boss Case tied to learning quality rather than only raw volume.

## 17. MVP Scope

The first demonstrable version should stay small and sharp.

### Include

- 30 local JSON cases
- Daily CT: 12
- Hard Cases: 8
- ECG Flashcards: 10
- dashboard
- module training page
- answer and reveal flow
- weak signs
- penalty review
- batch summary
- Boss Case locked or unlocked state
- localStorage progress

### Exclude

- login
- backend
- large-scale scraping
- real DICOM viewer
- user-uploaded real patient cases
- automatic medical diagnosis

Recommended staged delivery:

| Version | Focus |
| --- | --- |
| `v0.1` | Dashboard, training page, 10-question demo mode, answer and reveal, localStorage |
| `v0.2` | Batch summary, weak signs, penalty review |
| `v0.3` | Case Builder and issue queue |
| `v0.4` | Boss Case and reinforcement batch routing |

## 18. Technical Stack

- Frontend: React + Vite
- Styling: plain CSS in MVP, with room to migrate to CSS modules later if needed
- Data: local JSON files
- State: localStorage for MVP progress and review state
- Charts and metrics: simple custom UI components first
- Images: placeholder assets, open-license teaching images, or locally cached private-learning references
- Deployment: static site demo

## 19. MVP File Structure

- `package.json`
- `index.html`
- `src/main.jsx`
- `src/App.jsx`
- `src/data/allCases.js`
- `src/data/cases.js`
- `src/data/sourceCases.js`
- `src/lib/progress.js`
- `src/lib/batchRouter.js`
- `src/components/Dashboard.jsx`
- `src/components/ModuleCard.jsx`
- `src/components/TrainingCard.jsx`
- `src/components/BatchSummary.jsx`
- `src/components/WeakSignsPanel.jsx`
- `src/components/PenaltyReview.jsx`
- `src/components/CaseBuilder.jsx`
- `src/styles.css`
- `public/assets/cases/`
- `public/assets/source-cases/`

## 20. Implementation Milestones

### Milestone 1: Static Training Loop

- build Dashboard
- load local case data
- enter one module
- show image, history, question, and options
- submit and reveal answer
- save answer record to localStorage

### Milestone 2: Learning State

- track accuracy, streak, XP, and level
- add wrong cases to penalty review
- count missed signs
- show weak signs panel

### Milestone 3: Batch Routing

- implement `activeSetSize`
- generate batch summary
- route to reinforcement or next batch
- apply reinforcement batch mix rules

### Milestone 4: Content Tools

- add Case Builder
- add issue reporting
- save generated case JSON locally

## 21. Compliance and Safety

- Do not depend on aggressive scraping.
- Do not republish full public account articles.
- Prefer metadata, source attribution, and learning summaries.
- Treat imported source material as read-only reference.
- Avoid identifiable patient data.
- Require human review before source-derived or variant content becomes approved training content.

## 22. Success Criteria

The MVP succeeds if it demonstrates:

- a convincing training loop in 10-question demo mode
- a clear path to daily and formal batch modes
- weak-sign and penalty-review differentiation
- structured case content rather than loose media browsing
- a quality-control-aware article-to-case workflow
- a believable medical-education product story for interviews

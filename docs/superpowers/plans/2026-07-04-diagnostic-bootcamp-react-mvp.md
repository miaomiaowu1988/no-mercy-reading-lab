# Dr. Xie's Diagnostic Bootcamp React MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a React + Vite prototype for Dr. Xie's Diagnostic Bootcamp with swipe-style diagnostic cards, local JSON cases, Weak Signs, spaced Penalty Review, and Boss Case unlocking.

**Architecture:** The app is a static frontend. Case content lives in `src/data/cases.js`, progress and review scheduling live in `src/lib/progress.js`, and UI is split into focused components under `src/components/`. No backend, login, crawler, real patient data, or external medical image ingestion is included in the MVP.

**Tech Stack:** React, Vite, plain CSS, localStorage, local educational placeholder visuals.

## Global Constraints

- Public product name: `Dr. Xie's Diagnostic Bootcamp`.
- Internal playful mode: `Evil Dr. Xie's No-Mercy Reading Lab`.
- Subtitle: `Swipe. Guess. Reveal. Remember.`
- Main modules: `Daily CT`, `Hard Cases`, `ECG Flashcards`.
- Challenge module: `Boss Case`, locked until 12 completed cases with accuracy >=70% or a 5-case streak.
- ECG scope is limited to respiratory-emergency ECG recognition.
- Use no real patient data.
- Use no copyrighted scans or republished article images.
- Store progress in localStorage only.
- Keep visual style PACS-inspired and professional, with gamification in mechanics rather than horror imagery.
- Avoid skulls, dungeon imagery, monsters, gore, fake patient portraits, and overly decorative neon.

---

## File Structure

- Create `E:\Desktop\no-mercy-reading-lab\package.json`: npm scripts and dependencies.
- Create `E:\Desktop\no-mercy-reading-lab\index.html`: Vite HTML entry.
- Create `E:\Desktop\no-mercy-reading-lab\src\main.jsx`: React root bootstrap.
- Create `E:\Desktop\no-mercy-reading-lab\src\App.jsx`: top-level state, module selection, card flow.
- Create `E:\Desktop\no-mercy-reading-lab\src\data\cases.js`: 24 structured demonstration cases.
- Create `E:\Desktop\no-mercy-reading-lab\src\lib\progress.js`: localStorage progress, answer scoring, weak signs, penalty review, Boss Case unlock.
- Create `E:\Desktop\no-mercy-reading-lab\src\components\Dashboard.jsx`: home module cards, stats, weak signs, Boss Case state.
- Create `E:\Desktop\no-mercy-reading-lab\src\components\ModuleCard.jsx`: reusable module entry card.
- Create `E:\Desktop\no-mercy-reading-lab\src\components\TrainingCard.jsx`: case card, answer selection, reveal, swipe buttons.
- Create `E:\Desktop\no-mercy-reading-lab\src\components\CaseVisual.jsx`: synthetic CT/ECG educational placeholder visual.
- Create `E:\Desktop\no-mercy-reading-lab\src\components\ProgressPanel.jsx`: level, XP, streak, accuracy.
- Create `E:\Desktop\no-mercy-reading-lab\src\components\WeakSignsPanel.jsx`: weak signs ranking.
- Create `E:\Desktop\no-mercy-reading-lab\src\components\PenaltyReview.jsx`: spaced review queue.
- Create `E:\Desktop\no-mercy-reading-lab\src\styles.css`: full responsive visual system.
- Create `E:\Desktop\no-mercy-reading-lab\README.md`: run instructions, compliance note, interview pitch.

---

### Task 1: Scaffold the React App Shell

**Files:**
- Create: `E:\Desktop\no-mercy-reading-lab\package.json`
- Create: `E:\Desktop\no-mercy-reading-lab\index.html`
- Create: `E:\Desktop\no-mercy-reading-lab\src\main.jsx`
- Create: `E:\Desktop\no-mercy-reading-lab\src\App.jsx`
- Create: `E:\Desktop\no-mercy-reading-lab\src\styles.css`

**Interfaces:**
- Produces: a Vite React app that renders the product shell.
- Later tasks consume: `App` as the root component.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "no-mercy-reading-lab",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "vite build",
    "preview": "vite preview --host 127.0.0.1"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {}
}
```

- [ ] **Step 2: Create `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dr. Xie's Diagnostic Bootcamp</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Create `src/main.jsx`**

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 4: Create the initial `src/App.jsx`**

```jsx
export default function App() {
  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">No-Mercy Mode available</p>
        <h1>Dr. Xie's Diagnostic Bootcamp</h1>
        <p className="subtitle">Swipe. Guess. Reveal. Remember.</p>
        <p className="intro">
          A respiratory-focused diagnostic training prototype for chest CT,
          hard respiratory cases, and respiratory-emergency ECG recognition.
        </p>
      </section>
    </main>
  );
}
```

- [ ] **Step 5: Create initial `src/styles.css`**

```css
:root {
  color-scheme: dark;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: #070a0d;
  color: #edf7f5;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background:
    radial-gradient(circle at 20% 10%, rgba(31, 199, 168, 0.14), transparent 28rem),
    linear-gradient(135deg, #070a0d 0%, #111923 48%, #070a0d 100%);
}

button {
  font: inherit;
}

.app-shell {
  width: min(1180px, calc(100vw - 32px));
  margin: 0 auto;
  padding: 32px 0;
}

.hero-panel {
  border: 1px solid rgba(136, 160, 170, 0.28);
  background: rgba(10, 18, 24, 0.84);
  border-radius: 8px;
  padding: 28px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
}

.eyebrow {
  color: #2fe6b8;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin: 0 0 10px;
  text-transform: uppercase;
}

h1 {
  font-size: clamp(2rem, 5vw, 4.5rem);
  line-height: 1;
  margin: 0;
}

.subtitle {
  color: #b9fff0;
  font-size: 1.25rem;
  margin: 16px 0 0;
}

.intro {
  color: #9fb1bb;
  max-width: 720px;
  line-height: 1.6;
}
```

- [ ] **Step 6: Install dependencies**

Run:

```powershell
npm install
```

Expected: `node_modules` and `package-lock.json` are created without install errors.

- [ ] **Step 7: Build the scaffold**

Run:

```powershell
npm run build
```

Expected: Vite reports a successful production build and creates `dist`.

---

### Task 2: Add Structured Demonstration Cases

**Files:**
- Create: `E:\Desktop\no-mercy-reading-lab\src\data\cases.js`

**Interfaces:**
- Produces: `cases`, an array of case objects.
- Later tasks consume: `import { cases } from './data/cases.js';`

- [ ] **Step 1: Create `src/data/cases.js` with 24 demo cases**

```jsx
export const cases = [
  {
    id: 'ct-001',
    module: 'Daily CT',
    title: 'Acute fever with peripheral ground-glass opacities',
    difficulty: 'Intermediate',
    body_system: 'Respiratory',
    modality: 'Chest CT',
    chief_skill: 'pattern_recognition',
    cognitive_level: 'diagnosis',
    urgency: 'urgent',
    history: 'Male, 63, fever and dyspnea for 5 days.',
    visual: 'ct-ggo',
    question_type: 'single_choice',
    question: 'What is the most likely diagnosis?',
    options: ['Viral pneumonia', 'Pulmonary edema', 'ILD exacerbation', 'Pulmonary embolism'],
    answer: 'Viral pneumonia',
    signs: ['Ground-glass opacity', 'Peripheral distribution', 'Patchy consolidation'],
    must_know_signs: ['Peripheral GGO', 'Patchy consolidation'],
    reasoning_steps: [
      'Assess distribution: bilateral and peripheral.',
      'Assess density: ground-glass opacity mixed with consolidation.',
      'Combine the acute febrile history with the imaging pattern.'
    ],
    explanation: 'The acute febrile context and bilateral peripheral GGO pattern favor viral pneumonia over chronic ILD.',
    differential: ['Organizing pneumonia', 'Pulmonary edema', 'Acute ILD exacerbation'],
    common_trap: 'Do not call every ground-glass pattern ILD exacerbation.',
    must_not_miss: 'Escalating hypoxemia should trigger evaluation for mixed disease or embolism.',
    pitfall: 'Ignoring the time course.',
    source: { type: 'demo', title: 'Synthetic MVP case', url: '' },
    learning_points: ['Distribution matters.', 'Clinical time course changes the differential.'],
    review_interval_days: 1,
    mastery_status: 'new'
  },
  {
    id: 'ct-002',
    module: 'Daily CT',
    title: 'Chronic cough with tree-in-bud nodules',
    difficulty: 'Beginner',
    body_system: 'Respiratory',
    modality: 'Chest CT',
    chief_skill: 'sign_identification',
    cognitive_level: 'diagnosis',
    urgency: 'routine',
    history: 'Female, 48, chronic productive cough and recurrent low-grade fever.',
    visual: 'ct-tree',
    question_type: 'single_choice',
    question: 'Which imaging sign is most important?',
    options: ['Tree-in-bud', 'Honeycombing', 'Crazy paving', 'Air crescent sign'],
    answer: 'Tree-in-bud',
    signs: ['Tree-in-bud', 'Bronchiolar nodules', 'Airway-centered disease'],
    must_know_signs: ['Tree-in-bud'],
    reasoning_steps: ['Look for tiny branching centrilobular nodules.', 'Connect airway-centered nodules with infection or aspiration.', 'Use chronicity to consider nontuberculous mycobacterial disease.'],
    explanation: 'Tree-in-bud reflects bronchiolar impaction or inflammation and is common in airway-centered infection.',
    differential: ['Nontuberculous mycobacteria', 'Endobronchial tuberculosis', 'Aspiration bronchiolitis'],
    common_trap: 'Mistaking small airway nodules for random hematogenous nodules.',
    must_not_miss: 'Consider infection control and microbiologic testing when TB is possible.',
    pitfall: 'Ignoring airway distribution.',
    source: { type: 'demo', title: 'Synthetic MVP case', url: '' },
    learning_points: ['Tree-in-bud is a distribution clue.', 'Airway-centered patterns narrow the differential.'],
    review_interval_days: 1,
    mastery_status: 'new'
  },
  {
    id: 'ct-003',
    module: 'Daily CT',
    title: 'Incidental spiculated upper-lobe nodule',
    difficulty: 'Intermediate',
    body_system: 'Respiratory',
    modality: 'Chest CT',
    chief_skill: 'emergency_triage',
    cognitive_level: 'management_next_step',
    urgency: 'routine',
    history: 'Male, 70, smoking history, 14 mm right upper-lobe solid nodule.',
    visual: 'ct-nodule',
    question_type: 'single_choice',
    question: 'Which feature is most concerning?',
    options: ['Spiculated margin', 'Smooth calcification', 'Subpleural lymph node shape', 'Fat density'],
    answer: 'Spiculated margin',
    signs: ['Pulmonary nodule', 'Spiculation', 'Upper-lobe location'],
    must_know_signs: ['Spiculation'],
    reasoning_steps: ['Measure the nodule.', 'Assess morphology and margins.', 'Combine imaging risk with smoking history.'],
    explanation: 'A spiculated solid nodule in an older smoker has higher malignancy risk and needs structured follow-up or diagnostic evaluation.',
    differential: ['Primary lung cancer', 'Granuloma', 'Scar-related nodule'],
    common_trap: 'Treating every small nodule as low risk without morphology.',
    must_not_miss: 'Check prior imaging for growth.',
    pitfall: 'Missing the spiculated margin.',
    source: { type: 'demo', title: 'Synthetic MVP case', url: '' },
    learning_points: ['Nodule morphology matters.', 'Prior imaging can change management.'],
    review_interval_days: 1,
    mastery_status: 'new'
  },
  {
    id: 'ct-004',
    module: 'Daily CT',
    title: 'Progressive dyspnea with basal honeycombing',
    difficulty: 'Intermediate',
    body_system: 'Respiratory',
    modality: 'HRCT',
    chief_skill: 'pattern_recognition',
    cognitive_level: 'diagnosis',
    urgency: 'routine',
    history: 'Male, 68, progressive exertional dyspnea for 2 years.',
    visual: 'ct-honey',
    question_type: 'single_choice',
    question: 'Which pattern best fits the CT description?',
    options: ['UIP pattern', 'Lobar pneumonia', 'Miliary nodules', 'Pulmonary edema'],
    answer: 'UIP pattern',
    signs: ['Honeycombing', 'Basal predominance', 'Subpleural reticulation'],
    must_know_signs: ['Honeycombing', 'Subpleural reticulation'],
    reasoning_steps: ['Identify fibrosis signs.', 'Check basal and subpleural predominance.', 'Distinguish chronic fibrosis from acute infection.'],
    explanation: 'Basal subpleural reticulation with honeycombing is a classic UIP-pattern clue.',
    differential: ['Idiopathic pulmonary fibrosis', 'CTD-associated ILD', 'Chronic hypersensitivity pneumonitis'],
    common_trap: 'Calling traction bronchiectasis alone honeycombing.',
    must_not_miss: 'Ask about connective tissue disease and exposure history.',
    pitfall: 'Overlooking distribution.',
    source: { type: 'demo', title: 'Synthetic MVP case', url: '' },
    learning_points: ['Fibrosis pattern is distribution plus morphology.', 'UIP is not only one disease.'],
    review_interval_days: 1,
    mastery_status: 'new'
  },
  {
    id: 'ct-005',
    module: 'Daily CT',
    title: 'Sudden dyspnea with wedge-shaped perfusion defect',
    difficulty: 'Intermediate',
    body_system: 'Respiratory',
    modality: 'CTPA',
    chief_skill: 'emergency_triage',
    cognitive_level: 'diagnosis',
    urgency: 'emergent',
    history: 'Female, 55, sudden dyspnea, pleuritic chest pain, elevated D-dimer.',
    visual: 'ct-pe',
    question_type: 'single_choice',
    question: 'What must not be missed?',
    options: ['Pulmonary embolism', 'COPD exacerbation', 'Simple bronchitis', 'Stable granuloma'],
    answer: 'Pulmonary embolism',
    signs: ['Pulmonary embolism', 'Right heart strain', 'Wedge-shaped opacity'],
    must_know_signs: ['Right heart strain', 'Filling defect'],
    reasoning_steps: ['Start with acuity and pleuritic chest pain.', 'Look for vascular filling defects or infarct pattern.', 'Assess right heart strain if embolism is present.'],
    explanation: 'The acute presentation and CTPA-type clues prioritize pulmonary embolism and risk stratification.',
    differential: ['Pulmonary infarction', 'Pneumonia', 'Pneumothorax'],
    common_trap: 'Attributing acute dyspnea to infection without checking vascular risk.',
    must_not_miss: 'Right ventricular strain changes urgency.',
    pitfall: 'Missing the vascular diagnosis.',
    source: { type: 'demo', title: 'Synthetic MVP case', url: '' },
    learning_points: ['PE is a clinical-imaging diagnosis.', 'Right heart strain matters.'],
    review_interval_days: 1,
    mastery_status: 'new'
  },
  {
    id: 'ct-006',
    module: 'Daily CT',
    title: 'Dilated bronchi with recurrent infection',
    difficulty: 'Beginner',
    body_system: 'Respiratory',
    modality: 'Chest CT',
    chief_skill: 'sign_identification',
    cognitive_level: 'diagnosis',
    urgency: 'routine',
    history: 'Female, 61, chronic sputum production and recurrent lower respiratory infections.',
    visual: 'ct-airway',
    question_type: 'single_choice',
    question: 'Which sign supports bronchiectasis?',
    options: ['Signet ring sign', 'Air crescent sign', 'Halo sign', 'Bat wing edema'],
    answer: 'Signet ring sign',
    signs: ['Bronchiectasis', 'Signet ring sign', 'Bronchial wall thickening'],
    must_know_signs: ['Signet ring sign'],
    reasoning_steps: ['Compare bronchial diameter with adjacent artery.', 'Look for lack of tapering.', 'Relate airway dilation to chronic infection.'],
    explanation: 'Bronchial dilation larger than the adjacent artery supports bronchiectasis.',
    differential: ['Post-infectious bronchiectasis', 'ABPA', 'Primary ciliary dyskinesia'],
    common_trap: 'Confusing temporary bronchial wall thickening with established bronchiectasis.',
    must_not_miss: 'Consider ABPA when central bronchiectasis and asthma coexist.',
    pitfall: 'Not comparing bronchus and artery.',
    source: { type: 'demo', title: 'Synthetic MVP case', url: '' },
    learning_points: ['Use the artery as a ruler.', 'Bronchiectasis is a structural airway diagnosis.'],
    review_interval_days: 1,
    mastery_status: 'new'
  }
];

const templates = [
  ['ct-007', 'Daily CT', 'Large pleural effusion with compressive atelectasis', 'Pleural effusion'],
  ['ct-008', 'Daily CT', 'Diffuse emphysema with hyperinflation', 'Emphysema'],
  ['hard-001', 'Hard Cases', 'Drug-induced pneumonitis after new therapy', 'Drug-induced lung injury'],
  ['hard-002', 'Hard Cases', 'Checkpoint inhibitor pneumonitis mimic', 'Immune checkpoint inhibitor pneumonitis'],
  ['hard-003', 'Hard Cases', 'Crazy paving in a chronic dyspnea case', 'Pulmonary alveolar proteinosis'],
  ['hard-004', 'Hard Cases', 'Exposure-related mosaic attenuation', 'Hypersensitivity pneumonitis'],
  ['hard-005', 'Hard Cases', 'Hemoptysis with diffuse alveolar hemorrhage pattern', 'Vasculitis-related lung disease'],
  ['hard-006', 'Hard Cases', 'Fever with nodules and cavitation', 'Rare infection'],
  ['ecg-001', 'ECG Flashcards', 'Sudden dyspnea with S1Q3T3 pattern', 'Pulmonary embolism ECG'],
  ['ecg-002', 'ECG Flashcards', 'Hypoxemia-triggered irregular narrow-complex rhythm', 'Atrial fibrillation'],
  ['ecg-003', 'ECG Flashcards', 'Sawtooth flutter waves during COPD exacerbation', 'Atrial flutter'],
  ['ecg-004', 'ECG Flashcards', 'Tall peaked T waves in respiratory failure', 'Hyperkalemia'],
  ['ecg-005', 'ECG Flashcards', 'Diffuse ST elevation with pleuritic chest pain', 'Pericarditis'],
  ['ecg-006', 'ECG Flashcards', 'Wide QRS tachycardia in unstable patient', 'Ventricular tachycardia'],
  ['boss-001', 'Boss Case', 'Boss Case: dyspnea with CT and ECG disagreement', 'Mixed cardiopulmonary emergency'],
  ['boss-002', 'Boss Case', 'Boss Case: cancer mimic with infection clues', 'Mimic of lung cancer'],
  ['boss-003', 'Boss Case', 'Boss Case: acute ILD worsening or infection', 'Acute ILD differential'],
  ['boss-004', 'Boss Case', 'Boss Case: PE with right heart strain', 'High-risk pulmonary embolism']
];

export const demoCases = [
  ...cases,
  ...templates.map(([id, module, title, answer], index) => ({
    id,
    module,
    title,
    difficulty: module === 'Boss Case' ? 'Boss' : module === 'Hard Cases' ? 'Hard' : 'Intermediate',
    body_system: 'Respiratory',
    modality: module === 'ECG Flashcards' ? 'ECG' : 'Chest CT',
    chief_skill: module === 'ECG Flashcards' ? 'emergency_triage' : 'differential_diagnosis',
    cognitive_level: 'diagnosis',
    urgency: module === 'ECG Flashcards' ? 'urgent' : 'routine',
    history: 'Synthetic educational case for MVP demonstration.',
    visual: module === 'ECG Flashcards' ? 'ecg-rhythm' : `ct-demo-${index % 5}`,
    question_type: 'single_choice',
    question: 'What is the best answer for this training card?',
    options: [answer, 'Pulmonary edema', 'Simple bronchitis', 'Stable scar'],
    answer,
    signs: [answer, 'Pattern recognition', 'Clinical context'],
    must_know_signs: [answer],
    reasoning_steps: ['Identify the dominant pattern.', 'Match the pattern with the clinical context.', 'Avoid the common mimic.'],
    explanation: `${answer} is the intended teaching diagnosis for this MVP demonstration case.`,
    differential: ['Infection', 'Edema', 'Malignancy mimic'],
    common_trap: 'Do not answer from one visual clue without checking the clinical context.',
    must_not_miss: 'Escalate urgent cardiopulmonary patterns when instability is present.',
    pitfall: 'Premature closure.',
    source: { type: 'demo', title: 'Synthetic MVP case', url: '' },
    learning_points: ['Commit before reveal.', 'Review missed signs until mastered.'],
    review_interval_days: 1,
    mastery_status: 'new'
  }))
];
```

- [ ] **Step 2: Run a quick syntax check through build after Task 1 exists**

Run:

```powershell
npm run build
```

Expected: no module syntax errors.

---

### Task 3: Implement Progress, Weak Signs, and Review Scheduling

**Files:**
- Create: `E:\Desktop\no-mercy-reading-lab\src\lib\progress.js`

**Interfaces:**
- Produces:
  - `loadProgress(): Progress`
  - `saveProgress(progress: Progress): void`
  - `recordAnswer(progress: Progress, caseItem: Case, selectedAnswer: string): Progress`
  - `getStats(progress: Progress): Stats`
  - `isBossUnlocked(progress: Progress): boolean`
  - `getDueReviewItems(progress: Progress, now?: Date): ReviewItem[]`

- [ ] **Step 1: Create `src/lib/progress.js`**

```js
const STORAGE_KEY = 'diagnosticBootcampProgress.v1';

export function createInitialProgress() {
  return {
    completed: 0,
    correct: 0,
    xp: 0,
    streak: 0,
    bestStreak: 0,
    answers: {},
    weakSigns: {},
    reviewQueue: []
  };
}

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...createInitialProgress(), ...JSON.parse(raw) } : createInitialProgress();
  } catch {
    return createInitialProgress();
  }
}

export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getStats(progress) {
  const accuracy = progress.completed === 0 ? 0 : Math.round((progress.correct / progress.completed) * 100);
  return {
    completed: progress.completed,
    correct: progress.correct,
    accuracy,
    streak: progress.streak,
    bestStreak: progress.bestStreak,
    xp: progress.xp,
    level: Math.floor(progress.xp / 100) + 1
  };
}

export function isBossUnlocked(progress) {
  const stats = getStats(progress);
  return (stats.completed >= 12 && stats.accuracy >= 70) || stats.streak >= 5;
}

export function recordAnswer(progress, caseItem, selectedAnswer) {
  const isCorrect = selectedAnswer === caseItem.answer;
  const now = new Date();
  const nextProgress = {
    ...progress,
    completed: progress.completed + 1,
    correct: progress.correct + (isCorrect ? 1 : 0),
    xp: progress.xp + 10 + (isCorrect ? 20 : 0),
    streak: isCorrect ? progress.streak + 1 : 0,
    bestStreak: Math.max(progress.bestStreak, isCorrect ? progress.streak + 1 : 0),
    answers: {
      ...progress.answers,
      [caseItem.id]: {
        selectedAnswer,
        correct: isCorrect,
        answeredAt: now.toISOString()
      }
    },
    weakSigns: { ...progress.weakSigns },
    reviewQueue: [...progress.reviewQueue]
  };

  if (!isCorrect) {
    for (const sign of caseItem.must_know_signs || caseItem.signs || []) {
      nextProgress.weakSigns[sign] = (nextProgress.weakSigns[sign] || 0) + 1;
    }
    nextProgress.reviewQueue = upsertReviewItem(nextProgress.reviewQueue, caseItem.id, now, 0);
  }

  return nextProgress;
}

export function recordReviewResult(progress, caseId, wasCorrect, now = new Date()) {
  const nextProgress = { ...progress, reviewQueue: [...progress.reviewQueue] };
  const existing = nextProgress.reviewQueue.find((item) => item.caseId === caseId);
  if (!existing) return nextProgress;

  if (!wasCorrect) {
    existing.reviewStage = 0;
    existing.nextReviewAt = addDays(now, 1).toISOString();
    existing.mastery_status = 'learning';
    return nextProgress;
  }

  existing.reviewStage += 1;
  if (existing.reviewStage >= 3) {
    existing.mastery_status = 'mastered';
    existing.nextReviewAt = null;
  } else {
    const delay = existing.reviewStage === 1 ? 1 : 3;
    existing.mastery_status = 'review_due';
    existing.nextReviewAt = addDays(now, delay).toISOString();
  }
  return nextProgress;
}

export function getDueReviewItems(progress, now = new Date()) {
  return progress.reviewQueue.filter((item) => {
    if (item.mastery_status === 'mastered') return false;
    if (!item.nextReviewAt) return true;
    return new Date(item.nextReviewAt) <= now;
  });
}

export function getWeakSigns(progress) {
  return Object.entries(progress.weakSigns)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));
}

function upsertReviewItem(queue, caseId, now, reviewStage) {
  const existing = queue.find((item) => item.caseId === caseId);
  if (existing) {
    existing.reviewStage = reviewStage;
    existing.nextReviewAt = addDays(now, 1).toISOString();
    existing.mastery_status = 'learning';
    return queue;
  }
  return [
    ...queue,
    {
      caseId,
      reviewStage,
      nextReviewAt: addDays(now, 1).toISOString(),
      mastery_status: 'learning'
    }
  ];
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}
```

- [ ] **Step 2: Build to verify syntax**

Run:

```powershell
npm run build
```

Expected: successful build.

---

### Task 4: Build Dashboard and Module Navigation

**Files:**
- Modify: `E:\Desktop\no-mercy-reading-lab\src\App.jsx`
- Create: `E:\Desktop\no-mercy-reading-lab\src\components\Dashboard.jsx`
- Create: `E:\Desktop\no-mercy-reading-lab\src\components\ModuleCard.jsx`
- Create: `E:\Desktop\no-mercy-reading-lab\src\components\ProgressPanel.jsx`
- Create: `E:\Desktop\no-mercy-reading-lab\src\components\WeakSignsPanel.jsx`

**Interfaces:**
- Consumes: `demoCases`, `loadProgress`, `getStats`, `getWeakSigns`, `isBossUnlocked`.
- Produces: dashboard with module selection callback `onSelectModule(moduleName: string): void`.

- [ ] **Step 1: Create `ModuleCard.jsx`**

```jsx
export default function ModuleCard({ title, description, meta, locked, onClick }) {
  return (
    <button className={`module-card ${locked ? 'locked' : ''}`} onClick={onClick} disabled={locked}>
      <span className="module-meta">{meta}</span>
      <strong>{title}</strong>
      <span>{description}</span>
      {locked && <em>Locked clinical challenge</em>}
    </button>
  );
}
```

- [ ] **Step 2: Create `ProgressPanel.jsx`**

```jsx
export default function ProgressPanel({ stats }) {
  return (
    <section className="panel stats-grid" aria-label="Progress">
      <div><span>Level</span><strong>{stats.level}</strong></div>
      <div><span>Accuracy</span><strong>{stats.accuracy}%</strong></div>
      <div><span>Streak</span><strong>{stats.streak}</strong></div>
      <div><span>XP</span><strong>{stats.xp}</strong></div>
    </section>
  );
}
```

- [ ] **Step 3: Create `WeakSignsPanel.jsx`**

```jsx
export default function WeakSignsPanel({ weakSigns }) {
  const signs = weakSigns.length ? weakSigns : [
    { name: 'Tree-in-bud', count: 0 },
    { name: 'Mosaic attenuation', count: 0 },
    { name: 'Right heart strain', count: 0 }
  ];

  return (
    <section className="panel">
      <h2>Your Weak Signs Today</h2>
      <ol className="weak-signs">
        {signs.map((sign) => (
          <li key={sign.name}>
            <span>{sign.name}</span>
            <small>{sign.count ? `${sign.count} miss${sign.count > 1 ? 'es' : ''}` : 'watchlist'}</small>
          </li>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 4: Create `Dashboard.jsx`**

```jsx
import ModuleCard from './ModuleCard.jsx';
import ProgressPanel from './ProgressPanel.jsx';
import WeakSignsPanel from './WeakSignsPanel.jsx';

const modules = [
  {
    title: 'Daily CT',
    meta: 'Chest CT',
    description: 'High-yield chest CT pattern recognition.'
  },
  {
    title: 'Hard Cases',
    meta: 'Respiratory reasoning',
    description: 'Difficult respiratory cases and diagnostic traps.'
  },
  {
    title: 'ECG Flashcards',
    meta: 'Respiratory-emergency ECG',
    description: 'Rapid ECG recognition for dyspnea, hypoxemia, PE, and chest pain.'
  }
];

export default function Dashboard({ stats, weakSigns, bossUnlocked, onSelectModule }) {
  return (
    <div className="dashboard">
      <section className="hero-panel">
        <p className="eyebrow">No-Mercy Mode available</p>
        <h1>Dr. Xie's Diagnostic Bootcamp</h1>
        <p className="subtitle">Swipe. Guess. Reveal. Remember.</p>
        <p className="intro">
          Respiratory-focused diagnostic training for chest CT, hard cases,
          and respiratory-emergency ECG recognition.
        </p>
      </section>

      <ProgressPanel stats={stats} />
      <WeakSignsPanel weakSigns={weakSigns} />

      <section className="module-grid" aria-label="Training modules">
        {modules.map((module) => (
          <ModuleCard
            key={module.title}
            {...module}
            onClick={() => onSelectModule(module.title)}
          />
        ))}
        <ModuleCard
          title="Boss Case"
          meta="Locked challenge"
          description={bossUnlocked ? 'Multi-step clinical reasoning challenge unlocked.' : 'Complete 12 cases with accuracy >=70% or reach a 5-case streak.'}
          locked={!bossUnlocked}
          onClick={() => onSelectModule('Boss Case')}
        />
      </section>
    </div>
  );
}
```

- [ ] **Step 5: Replace `App.jsx` with dashboard state**

```jsx
import { useMemo, useState } from 'react';
import Dashboard from './components/Dashboard.jsx';
import { getStats, getWeakSigns, isBossUnlocked, loadProgress } from './lib/progress.js';

export default function App() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [progress] = useState(() => loadProgress());
  const stats = useMemo(() => getStats(progress), [progress]);
  const weakSigns = useMemo(() => getWeakSigns(progress), [progress]);
  const bossUnlocked = useMemo(() => isBossUnlocked(progress), [progress]);

  if (selectedModule) {
    return (
      <main className="app-shell">
        <button className="back-button" onClick={() => setSelectedModule(null)}>Back to dashboard</button>
        <section className="panel">
          <h1>{selectedModule}</h1>
          <p>Training cards arrive in the next task.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <Dashboard
        stats={stats}
        weakSigns={weakSigns}
        bossUnlocked={bossUnlocked}
        onSelectModule={setSelectedModule}
      />
    </main>
  );
}
```

- [ ] **Step 6: Build to verify**

Run:

```powershell
npm run build
```

Expected: successful build.

---

### Task 5: Build Training Card Interaction

**Files:**
- Modify: `E:\Desktop\no-mercy-reading-lab\src\App.jsx`
- Create: `E:\Desktop\no-mercy-reading-lab\src\components\TrainingCard.jsx`
- Create: `E:\Desktop\no-mercy-reading-lab\src\components\CaseVisual.jsx`

**Interfaces:**
- Consumes: `demoCases`, `recordAnswer`, `saveProgress`.
- Produces: answer selection, commit, reveal, next-card flow.

- [ ] **Step 1: Create `CaseVisual.jsx`**

```jsx
export default function CaseVisual({ visual, modality }) {
  const isEcg = modality === 'ECG';
  return (
    <div className={`case-visual ${isEcg ? 'ecg-visual' : 'ct-visual'} ${visual || ''}`}>
      {isEcg ? (
        <svg viewBox="0 0 640 220" role="img" aria-label="Synthetic ECG educational waveform">
          <polyline
            points="0,110 45,110 55,96 65,124 78,110 130,110 145,65 160,154 176,110 230,110 250,102 270,118 290,110 350,110 365,75 380,150 396,110 455,110 470,98 490,120 512,110 640,110"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <div className="ct-scan" aria-label="Synthetic chest CT educational placeholder">
          <span className="lung left" />
          <span className="lung right" />
          <span className="lesion lesion-a" />
          <span className="lesion lesion-b" />
        </div>
      )}
      <div className="visual-toolbar">
        <span>WL 420</span>
        <span>WW 1500</span>
        <span>Slice 18/42</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `TrainingCard.jsx`**

```jsx
import { useState } from 'react';
import CaseVisual from './CaseVisual.jsx';

export default function TrainingCard({ caseItem, index, total, onCommit, onNext }) {
  const [selected, setSelected] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = submitted && selected === caseItem.answer;

  function commit() {
    if (!selected) return;
    setSubmitted(true);
    onCommit(caseItem, selected);
  }

  function next() {
    setSelected('');
    setSubmitted(false);
    onNext();
  }

  return (
    <article className="training-card">
      <header className="case-header">
        <span>{caseItem.module}</span>
        <span>{index + 1}/{total}</span>
      </header>

      <CaseVisual visual={caseItem.visual} modality={caseItem.modality} />

      <section className="case-body">
        <p className="case-meta">{caseItem.modality} · {caseItem.difficulty} · {caseItem.chief_skill}</p>
        <h2>{caseItem.title}</h2>
        <p>{caseItem.history}</p>
        <h3>{caseItem.question}</h3>
        <div className="option-grid">
          {caseItem.options.map((option) => (
            <button
              key={option}
              className={`option ${selected === option ? 'selected' : ''}`}
              onClick={() => setSelected(option)}
              disabled={submitted}
            >
              {option}
            </button>
          ))}
        </div>

        {!submitted ? (
          <button className="primary-action" onClick={commit} disabled={!selected}>Commit Answer</button>
        ) : (
          <section className={`reveal-panel ${isCorrect ? 'correct' : 'wrong'}`}>
            <p className="result-line">{isCorrect ? 'Correct. You survived this case.' : 'Penalty Review updated.'}</p>
            <h3>Diagnosis: {caseItem.answer}</h3>
            <div className="chip-row">
              {caseItem.signs.map((sign) => <span key={sign}>{sign}</span>)}
            </div>
            <h4>Reasoning Steps</h4>
            <ol>
              {caseItem.reasoning_steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
            <h4>Common Trap</h4>
            <p>{caseItem.common_trap}</p>
            <h4>Must Not Miss</h4>
            <p>{caseItem.must_not_miss}</p>
            <h4>Explanation</h4>
            <p>{caseItem.explanation}</p>
            <button className="primary-action" onClick={next}>Again, Doctor</button>
          </section>
        )}
      </section>
    </article>
  );
}
```

- [ ] **Step 3: Replace `App.jsx` with training flow**

```jsx
import { useMemo, useState } from 'react';
import Dashboard from './components/Dashboard.jsx';
import TrainingCard from './components/TrainingCard.jsx';
import { demoCases } from './data/cases.js';
import {
  getStats,
  getWeakSigns,
  isBossUnlocked,
  loadProgress,
  recordAnswer,
  saveProgress
} from './lib/progress.js';

export default function App() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [progress, setProgress] = useState(() => loadProgress());
  const stats = useMemo(() => getStats(progress), [progress]);
  const weakSigns = useMemo(() => getWeakSigns(progress), [progress]);
  const bossUnlocked = useMemo(() => isBossUnlocked(progress), [progress]);

  const moduleCases = useMemo(() => {
    if (!selectedModule) return [];
    return demoCases.filter((caseItem) => caseItem.module === selectedModule);
  }, [selectedModule]);

  function selectModule(moduleName) {
    setSelectedModule(moduleName);
    setCardIndex(0);
  }

  function handleCommit(caseItem, selectedAnswer) {
    const nextProgress = recordAnswer(progress, caseItem, selectedAnswer);
    setProgress(nextProgress);
    saveProgress(nextProgress);
  }

  function nextCard() {
    setCardIndex((current) => (current + 1) % moduleCases.length);
  }

  if (selectedModule) {
    const currentCase = moduleCases[cardIndex];
    return (
      <main className="app-shell trainer-layout">
        <button className="back-button" onClick={() => setSelectedModule(null)}>Back to dashboard</button>
        {currentCase && (
          <TrainingCard
            caseItem={currentCase}
            index={cardIndex}
            total={moduleCases.length}
            onCommit={handleCommit}
            onNext={nextCard}
          />
        )}
      </main>
    );
  }

  return (
    <main className="app-shell">
      <Dashboard
        stats={stats}
        weakSigns={weakSigns}
        bossUnlocked={bossUnlocked}
        onSelectModule={selectModule}
      />
    </main>
  );
}
```

- [ ] **Step 4: Build to verify**

Run:

```powershell
npm run build
```

Expected: successful build.

---

### Task 6: Add Penalty Review Panel

**Files:**
- Modify: `E:\Desktop\no-mercy-reading-lab\src\App.jsx`
- Modify: `E:\Desktop\no-mercy-reading-lab\src\components\Dashboard.jsx`
- Create: `E:\Desktop\no-mercy-reading-lab\src\components\PenaltyReview.jsx`

**Interfaces:**
- Consumes: `getDueReviewItems(progress)` and `demoCases`.
- Produces: dashboard panel showing due review cases and mastery stage.

- [ ] **Step 1: Create `PenaltyReview.jsx`**

```jsx
export default function PenaltyReview({ dueItems, casesById }) {
  return (
    <section className="panel penalty-panel">
      <h2>Penalty Review</h2>
      {dueItems.length === 0 ? (
        <p className="muted">No cases due. The lab is quiet for now.</p>
      ) : (
        <ul className="review-list">
          {dueItems.map((item) => {
            const caseItem = casesById[item.caseId];
            return (
              <li key={item.caseId}>
                <strong>{caseItem?.title || item.caseId}</strong>
                <span>Stage {item.reviewStage + 1}/3 · {item.mastery_status}</span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Update `Dashboard.jsx` imports and signature**

```jsx
import ModuleCard from './ModuleCard.jsx';
import PenaltyReview from './PenaltyReview.jsx';
import ProgressPanel from './ProgressPanel.jsx';
import WeakSignsPanel from './WeakSignsPanel.jsx';
```

Change function signature:

```jsx
export default function Dashboard({ stats, weakSigns, dueReviewItems, casesById, bossUnlocked, onSelectModule }) {
```

Add this after `WeakSignsPanel`:

```jsx
<PenaltyReview dueItems={dueReviewItems} casesById={casesById} />
```

- [ ] **Step 3: Update `App.jsx` to pass review data**

Add import:

```jsx
import { getDueReviewItems } from './lib/progress.js';
```

Add memo values:

```jsx
const dueReviewItems = useMemo(() => getDueReviewItems(progress), [progress]);
const casesById = useMemo(() => Object.fromEntries(demoCases.map((caseItem) => [caseItem.id, caseItem])), []);
```

Pass props into `Dashboard`:

```jsx
dueReviewItems={dueReviewItems}
casesById={casesById}
```

- [ ] **Step 4: Build to verify**

Run:

```powershell
npm run build
```

Expected: successful build.

---

### Task 7: Finish PACS-Inspired Responsive Styling

**Files:**
- Modify: `E:\Desktop\no-mercy-reading-lab\src\styles.css`

**Interfaces:**
- Consumes all component class names.
- Produces responsive desktop and mobile UI.

- [ ] **Step 1: Append final CSS**

```css
.dashboard {
  display: grid;
  gap: 18px;
  grid-template-columns: 1.3fr 0.7fr;
}

.dashboard .hero-panel {
  grid-column: 1 / -1;
}

.panel {
  border: 1px solid rgba(136, 160, 170, 0.22);
  background: rgba(9, 17, 23, 0.82);
  border-radius: 8px;
  padding: 18px;
}

.panel h2,
.panel h3,
.panel h4 {
  margin-top: 0;
}

.module-grid {
  display: grid;
  gap: 14px;
  grid-column: 1 / -1;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.module-card {
  min-height: 170px;
  padding: 18px;
  border: 1px solid rgba(47, 230, 184, 0.24);
  border-radius: 8px;
  background: linear-gradient(145deg, rgba(15, 28, 38, 0.96), rgba(8, 12, 17, 0.96));
  color: inherit;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.module-card strong {
  font-size: 1.25rem;
}

.module-card span:last-of-type {
  color: #a6bac2;
  line-height: 1.45;
}

.module-card.locked {
  border-color: rgba(205, 78, 93, 0.42);
  cursor: not-allowed;
  opacity: 0.78;
}

.module-meta {
  color: #2fe6b8;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.stats-grid div {
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  padding: 12px;
}

.stats-grid span,
.muted {
  color: #8ea1aa;
}

.stats-grid strong {
  display: block;
  font-size: 1.45rem;
  margin-top: 6px;
}

.weak-signs,
.review-list {
  display: grid;
  gap: 10px;
  margin: 0;
  padding-left: 20px;
}

.weak-signs li,
.review-list li {
  color: #dfecea;
}

.weak-signs small,
.review-list span {
  color: #8ea1aa;
  display: block;
}

.trainer-layout {
  max-width: 900px;
}

.back-button,
.primary-action {
  border: 0;
  border-radius: 8px;
  background: #2fe6b8;
  color: #04100e;
  cursor: pointer;
  font-weight: 800;
  padding: 12px 16px;
}

.back-button {
  background: rgba(255, 255, 255, 0.08);
  color: #edf7f5;
  margin-bottom: 16px;
}

.training-card {
  border: 1px solid rgba(136, 160, 170, 0.28);
  border-radius: 8px;
  overflow: hidden;
  background: rgba(8, 14, 20, 0.94);
}

.case-header {
  display: flex;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(136, 160, 170, 0.18);
  color: #9fb1bb;
}

.case-visual {
  position: relative;
  min-height: 320px;
  color: #35e8bb;
  background:
    linear-gradient(rgba(47, 230, 184, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(47, 230, 184, 0.08) 1px, transparent 1px),
    #05080b;
  background-size: 28px 28px;
  display: grid;
  place-items: center;
}

.ct-scan {
  width: min(430px, 86vw);
  aspect-ratio: 1.25;
  border-radius: 8px;
  position: relative;
  background: radial-gradient(circle, #dbe4e6 0%, #647078 32%, #141a20 67%);
  box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.8);
}

.lung {
  position: absolute;
  top: 18%;
  width: 28%;
  height: 56%;
  border-radius: 48% 42% 48% 42%;
  background: radial-gradient(circle at 50% 45%, #232b33, #0b1015);
  border: 2px solid rgba(230, 238, 240, 0.22);
}

.lung.left {
  left: 18%;
}

.lung.right {
  right: 18%;
}

.lesion {
  position: absolute;
  border-radius: 50%;
  background: rgba(230, 238, 240, 0.72);
  filter: blur(5px);
}

.lesion-a {
  left: 30%;
  top: 32%;
  width: 42px;
  height: 28px;
}

.lesion-b {
  right: 28%;
  top: 48%;
  width: 34px;
  height: 24px;
}

.ecg-visual svg {
  width: min(620px, 90vw);
  color: #35e8bb;
  filter: drop-shadow(0 0 14px rgba(47, 230, 184, 0.22));
}

.visual-toolbar {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 12px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.visual-toolbar span,
.chip-row span {
  border: 1px solid rgba(47, 230, 184, 0.28);
  border-radius: 999px;
  color: #b9fff0;
  background: rgba(47, 230, 184, 0.08);
  padding: 6px 10px;
  font-size: 0.8rem;
}

.case-body {
  padding: 22px;
}

.case-meta {
  color: #8ea1aa;
}

.option-grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 18px 0;
}

.option {
  border: 1px solid rgba(136, 160, 170, 0.28);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  color: inherit;
  cursor: pointer;
  padding: 14px;
  text-align: left;
}

.option.selected {
  border-color: #2fe6b8;
  background: rgba(47, 230, 184, 0.14);
}

.reveal-panel {
  border-radius: 8px;
  margin-top: 18px;
  padding: 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(136, 160, 170, 0.22);
}

.reveal-panel.wrong {
  border-color: rgba(205, 78, 93, 0.55);
}

.result-line {
  color: #2fe6b8;
  font-weight: 800;
}

.reveal-panel.wrong .result-line {
  color: #ff7382;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0;
}

@media (max-width: 820px) {
  .app-shell {
    width: min(100vw - 20px, 720px);
    padding: 18px 0;
  }

  .dashboard,
  .module-grid,
  .stats-grid,
  .option-grid {
    grid-template-columns: 1fr;
  }

  .hero-panel {
    padding: 22px;
  }

  .case-visual {
    min-height: 260px;
  }
}
```

- [ ] **Step 2: Build to verify**

Run:

```powershell
npm run build
```

Expected: successful build.

---

### Task 8: Add README and Final Verification

**Files:**
- Create: `E:\Desktop\no-mercy-reading-lab\README.md`

**Interfaces:**
- Produces: local run instructions and interview framing.

- [ ] **Step 1: Create `README.md`**

```markdown
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
```

- [ ] **Step 2: Run production build**

Run:

```powershell
npm run build
```

Expected: successful build.

- [ ] **Step 3: Start dev server**

Run:

```powershell
npm run dev
```

Expected: Vite serves the app at a local URL such as `http://127.0.0.1:5173/`.

- [ ] **Step 4: Manual browser checks**

Verify:

- Dashboard renders the formal product name.
- No-Mercy appears only as an internal accent.
- Daily CT, Hard Cases, ECG Flashcards are primary modules.
- Boss Case is locked initially.
- Opening a module shows a case card.
- Selecting a wrong answer updates Penalty Review and Weak Signs after returning to dashboard.
- Selecting correct answers increases streak and XP.
- The UI remains usable below 820px wide.

- [ ] **Step 5: Commit if this directory is initialized as a git repository**

Run:

```powershell
git status --short
git add .
git commit -m "feat: build diagnostic bootcamp MVP"
```

Expected: commit succeeds if the project has git initialized. If it is not a git repository, skip this step and report that no commit was made.

---

## Self-Review

Spec coverage:

- Formal naming and internal No-Mercy mode are covered in Tasks 1, 4, and 8.
- Daily CT, Hard Cases, ECG Flashcards, and Boss Case are covered in Tasks 2, 4, and 5.
- Reasoning steps, common trap, and must-not-miss fields are covered in Tasks 2 and 5.
- Weak Signs are covered in Tasks 3, 4, and 6.
- Spaced Penalty Review is covered in Tasks 3 and 6.
- Respiratory-emergency ECG scope is covered in Tasks 2 and 8.
- Compliance framing is covered in Task 8.

Placeholder scan:

- The app intentionally uses synthetic educational placeholder visuals, as required by the spec.
- No open placeholder requirements remain.

Type consistency:

- `demoCases`, `loadProgress`, `recordAnswer`, `getStats`, `getWeakSigns`, `getDueReviewItems`, and `isBossUnlocked` are consistently named across tasks.

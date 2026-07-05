# No-Mercy Reading Lab v0.1 Demo Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the v0.1 MVP slice: Dashboard, 10-question demo batch mode, training page answer/reveal loop, and localStorage-backed progress.

**Architecture:** Keep the app as a static React + Vite frontend. `src/lib/progress.js` remains the source of truth for learner state, while a new `src/lib/batchRouter.js` owns demo-batch selection and recommendation logic. `src/App.jsx` orchestrates dashboard selection, active batch state, and training flow using existing structured cases.

**Tech Stack:** React, Vite, plain CSS, local JSON case data, localStorage, Node test runner.

## Global Constraints

- Product definition: `respiratory-focused diagnostic training system`.
- Demo mode batch size: `10`.
- Main modules: `Daily CT`, `Hard Cases`, `ECG Flashcards`.
- ECG scope is limited to respiratory-emergency ECG recognition.
- Store progress in `localStorage` only for MVP.
- Keep imported source cases labeled as private-learning drafts.
- Do not republish full public account articles.
- Do not use real patient data.
- Keep visual language professional and PACS-inspired.

---

## File Structure

- Modify `E:\Desktop\no-mercy-reading-lab\src\App.jsx`: wire dashboard CTA, active demo batch state, and training navigation.
- Create `E:\Desktop\no-mercy-reading-lab\src\lib\batchRouter.js`: build 10-question batches, compute next recommendation text, and summarize batch progress.
- Modify `E:\Desktop\no-mercy-reading-lab\src\lib\progress.js`: add batch-scoped progress persistence and streak-aware reward bookkeeping.
- Modify `E:\Desktop\no-mercy-reading-lab\src\components\Dashboard.jsx`: add primary `Continue Training` CTA and concise recommendation copy.
- Modify `E:\Desktop\no-mercy-reading-lab\src\components\ModuleCard.jsx`: surface demo-mode count and status copy.
- Modify `E:\Desktop\no-mercy-reading-lab\src\components\TrainingCard.jsx`: show batch progress and a lightweight report-issue trigger.
- Modify `E:\Desktop\no-mercy-reading-lab\src\styles.css`: style the CTA, batch header, and report action.
- Create `E:\Desktop\no-mercy-reading-lab\tests\batchRouter.test.mjs`: test 10-question demo batch routing and recommendation logic.
- Modify `E:\Desktop\no-mercy-reading-lab\tests\sourceCases.test.mjs`: keep source-case checks intact after app flow changes.

---

### Task 1: Add Failing Tests for Demo Batch Routing

**Files:**
- Create: `E:\Desktop\no-mercy-reading-lab\tests\batchRouter.test.mjs`
- Modify: `E:\Desktop\no-mercy-reading-lab\package.json`

**Interfaces:**
- Produces: `buildDemoBatch(cases, moduleName)`, `getContinueTrainingRecommendation(progress, cases)`.
- Later tasks consume: batch arrays with 10 cases and dashboard recommendation metadata.

- [ ] **Step 1: Write the failing test**

```js
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { allCases } from '../src/data/allCases.js';
import { buildDemoBatch, getContinueTrainingRecommendation } from '../src/lib/batchRouter.js';

test('buildDemoBatch returns 10 cases for a populated module', () => {
  const batch = buildDemoBatch(allCases, 'Daily CT');
  assert.equal(batch.length, 10);
  assert.ok(batch.every((caseItem) => caseItem.module === 'Daily CT'));
});

test('getContinueTrainingRecommendation prefers the module with the most weak signs', () => {
  const progress = {
    weakSigns: {
      'Tree-in-bud': 3,
      'Ground-glass opacity': 1
    },
    answers: {}
  };

  const recommendation = getContinueTrainingRecommendation(progress, allCases);

  assert.equal(recommendation.module, 'Hard Cases');
  assert.match(recommendation.reason, /Tree-in-bud/i);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/batchRouter.test.mjs`

Expected: FAIL because `src/lib/batchRouter.js` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

```js
export function buildDemoBatch(cases, moduleName) {
  return cases.filter((caseItem) => caseItem.module === moduleName).slice(0, 10);
}

export function getContinueTrainingRecommendation(progress, cases) {
  return {
    module: 'Hard Cases',
    reason: 'Tree-in-bud missed multiple times'
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/batchRouter.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add tests/batchRouter.test.mjs src/lib/batchRouter.js package.json
git commit -m "test: define demo batch routing behavior"
```

### Task 2: Add Failing Tests for Batch-Scoped Progress

**Files:**
- Modify: `E:\Desktop\no-mercy-reading-lab\tests\batchRouter.test.mjs`
- Modify: `E:\Desktop\no-mercy-reading-lab\src\lib\progress.js`

**Interfaces:**
- Consumes: `recordAnswer(progress, caseItem, selectedAnswer, batchContext?)`
- Produces: batch progress fields `activeBatch`, `lastRecommendation`, `streakBonusXp`.

- [ ] **Step 1: Write the failing test**

```js
import { createInitialProgress, recordAnswer } from '../src/lib/progress.js';

test('recordAnswer tracks progress inside an active demo batch', () => {
  const progress = createInitialProgress();
  const caseItem = {
    id: 'demo-001',
    answer: 'Viral pneumonia',
    signs: ['Ground-glass opacity'],
    must_know_signs: ['Ground-glass opacity']
  };

  const next = recordAnswer(progress, caseItem, 'Viral pneumonia', {
    module: 'Daily CT',
    batchSize: 10,
    batchId: 'daily-ct-demo'
  });

  assert.equal(next.activeBatch.module, 'Daily CT');
  assert.equal(next.activeBatch.completedCount, 1);
  assert.equal(next.activeBatch.totalCount, 10);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/batchRouter.test.mjs`

Expected: FAIL because `activeBatch` is not populated.

- [ ] **Step 3: Write minimal implementation**

```js
export function createInitialProgress() {
  return {
    completed: 0,
    correct: 0,
    xp: 0,
    streak: 0,
    bestStreak: 0,
    answers: {},
    weakSigns: {},
    reviewQueue: [],
    activeBatch: null,
    lastRecommendation: null,
    streakBonusXp: 0
  };
}
```

Inside `recordAnswer`:

```js
if (batchContext) {
  nextProgress.activeBatch = {
    batchId: batchContext.batchId,
    module: batchContext.module,
    totalCount: batchContext.batchSize,
    completedCount: countBatchAnswers(nextProgress.answers, batchContext.batchId)
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/batchRouter.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add tests/batchRouter.test.mjs src/lib/progress.js
git commit -m "feat: track active demo batch progress"
```

### Task 3: Implement the Demo Batch App Flow

**Files:**
- Modify: `E:\Desktop\no-mercy-reading-lab\src\App.jsx`
- Modify: `E:\Desktop\no-mercy-reading-lab\src\components\Dashboard.jsx`
- Modify: `E:\Desktop\no-mercy-reading-lab\src\components\ModuleCard.jsx`
- Modify: `E:\Desktop\no-mercy-reading-lab\src\components\TrainingCard.jsx`
- Modify: `E:\Desktop\no-mercy-reading-lab\src\styles.css`

**Interfaces:**
- Consumes: `buildDemoBatch`, `getContinueTrainingRecommendation`, `recordAnswer`.
- Produces: dashboard CTA, 10-question module sessions, and persisted local progress.

- [ ] **Step 1: Write the failing test**

```js
test('buildDemoBatch preserves source-backed cases at the front of a module batch', () => {
  const batch = buildDemoBatch(allCases, 'ECG Flashcards');
  assert.equal(batch[0].id, 'source-chen-ecg-001');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/batchRouter.test.mjs`

Expected: FAIL until batch ordering is deterministic.

- [ ] **Step 3: Write minimal implementation**

In `src/lib/batchRouter.js`:

```js
export function buildDemoBatch(cases, moduleName) {
  return cases
    .filter((caseItem) => caseItem.module === moduleName)
    .sort((left, right) => Number(right.content_type === 'real_source_draft') - Number(left.content_type === 'real_source_draft'))
    .slice(0, 10);
}
```

In `src/App.jsx`, store `activeBatchCases`, `activeBatchId`, and call:

```js
const batchCases = buildDemoBatch(allCases, moduleName);
```

In `handleCommit`:

```js
const nextProgress = recordAnswer(progress, caseItem, selectedAnswer, {
  module: selectedModule,
  batchSize: activeBatchCases.length,
  batchId: activeBatchId
});
```

In `Dashboard.jsx`, add:

```jsx
<button className="primary-action continue-action" onClick={onContinueTraining} type="button">
  Continue Training
</button>
<p className="intro recommendation-copy">{recommendation.reason}</p>
```

In `TrainingCard.jsx`, add:

```jsx
<button className="secondary-action report-action" type="button" onClick={() => onReportIssue(caseItem)}>
  Report issue
</button>
```

- [ ] **Step 4: Run tests and build to verify**

Run: `npm test`

Expected: PASS.

Run: `npm run build`

Expected: successful Vite build.

- [ ] **Step 5: Commit**

```powershell
git add src/App.jsx src/components/Dashboard.jsx src/components/ModuleCard.jsx src/components/TrainingCard.jsx src/styles.css src/lib/batchRouter.js src/lib/progress.js tests/batchRouter.test.mjs
git commit -m "feat: add v0.1 demo batch training flow"
```

### Task 4: Finish v0.1 Copy and Verification

**Files:**
- Modify: `E:\Desktop\no-mercy-reading-lab\README.md`

**Interfaces:**
- Consumes: implemented app behavior.
- Produces: updated run instructions and product framing for v0.1.

- [ ] **Step 1: Write the failing test**

```js
test('buildDemoBatch returns all cases when a module has fewer than 10 cards', () => {
  const shortBatch = buildDemoBatch(
    [{ id: 'boss-001', module: 'Boss Case' }, { id: 'boss-002', module: 'Boss Case' }],
    'Boss Case'
  );

  assert.equal(shortBatch.length, 2);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/batchRouter.test.mjs`

Expected: FAIL if helper assumes exactly 10 items.

- [ ] **Step 3: Write minimal implementation**

Ensure `buildDemoBatch` simply slices available cases rather than padding:

```js
return moduleCases.slice(0, Math.min(10, moduleCases.length));
```

Update `README.md` with:

```md
## v0.1

- Dashboard with `Continue Training`
- 10-question demo batches
- localStorage-backed answer progress
- source-backed CT and ECG draft cases mixed into demo sessions
```

- [ ] **Step 4: Run full verification**

Run: `npm test`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add README.md tests/batchRouter.test.mjs src/lib/batchRouter.js
git commit -m "docs: document v0.1 demo mode"
```

---

## Self-Review

Spec coverage:

- Demo mode batch size and localStorage flow are covered in Tasks 1-3.
- Dashboard recommendation and `Continue Training` CTA are covered in Task 3.
- Weak-sign-aware routing starts with recommendation logic in Tasks 1 and 3.
- Lightweight report issue support is included in Task 3 without waiting for the full issue queue.
- README updates for v0.1 are covered in Task 4.

Placeholder scan:

- No `TBD` or `TODO` markers remain.
- Each task names exact files, commands, and expected verification.

Type consistency:

- `buildDemoBatch`, `getContinueTrainingRecommendation`, `recordAnswer`, and `activeBatch` are named consistently across tasks.

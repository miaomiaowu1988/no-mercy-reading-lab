import assert from 'node:assert/strict';
import { test } from 'node:test';

import { allCases } from '../src/data/allCases.js';
import { buildDemoBatch, getContinueTrainingRecommendation } from '../src/lib/batchRouter.js';
import { createInitialProgress, recordAnswer, reportCaseIssue } from '../src/lib/progress.js';

test('buildDemoBatch only returns real-image practice cases and excludes synthetic placeholders', () => {
  const dailyCtBatch = buildDemoBatch(allCases, 'Daily CT');
  const ecgBatch = buildDemoBatch(allCases, 'ECG Flashcards');
  const hardCaseBatch = buildDemoBatch(allCases, 'Hard Cases');

  assert.equal(dailyCtBatch.length, 5);
  assert.equal(dailyCtBatch[0].content_type, 'real_source_draft');
  assert.equal(dailyCtBatch[0].image_status, 'real');
  assert.equal(dailyCtBatch[1].content_type, 'real_source_draft');
  assert.ok(dailyCtBatch.every((caseItem) => caseItem.image_status === 'real'));

  assert.equal(ecgBatch.length, 5);
  assert.equal(ecgBatch[0].content_type, 'real_source_draft');
  assert.equal(ecgBatch[0].image_status, 'real');
  assert.ok(ecgBatch.every((caseItem) => caseItem.image_status === 'real'));

  assert.equal(hardCaseBatch.length, 2);
  assert.ok(hardCaseBatch.every((caseItem) => caseItem.module === 'Hard Cases'));
  assert.equal(hardCaseBatch[0].content_type, 'real_source_draft');
  assert.ok(
    [...dailyCtBatch, ...ecgBatch, ...hardCaseBatch].every(
      (caseItem) => caseItem.content_type !== 'auto_generated_source_candidate_draft'
        && caseItem.content_type !== 'synthetic_demo'
    )
  );
});

test('getContinueTrainingRecommendation resumes the active module when a real-image set is in progress', () => {
  const progress = {
    ...createInitialProgress(),
    activeBatch: {
      batchId: 'daily-ct-demo',
      module: 'Daily CT',
      totalCount: 10,
      completedCount: 3
    }
  };

  const recommendation = getContinueTrainingRecommendation(progress, allCases);

  assert.equal(recommendation.module, 'Daily CT');
  assert.match(recommendation.reason, /3\/10/i);
  assert.match(recommendation.reason, /real-image practice set/i);
});

test('recordAnswer stores active batch progress and streak bonus XP for demo mode', () => {
  const progress = createInitialProgress();
  const caseItem = allCases.find((item) => item.id === 'ct-001');

  let nextProgress = recordAnswer(progress, caseItem, caseItem.answer, {
    module: 'Daily CT',
    batchSize: 10,
    batchId: 'daily-ct-demo'
  });

  const secondCase = allCases.find((item) => item.id === 'ct-002');
  nextProgress = recordAnswer(nextProgress, secondCase, secondCase.answer, {
    module: 'Daily CT',
    batchSize: 10,
    batchId: 'daily-ct-demo'
  });

  const thirdCase = allCases.find((item) => item.id === 'ct-003');
  nextProgress = recordAnswer(nextProgress, thirdCase, thirdCase.answer, {
    module: 'Daily CT',
    batchSize: 10,
    batchId: 'daily-ct-demo'
  });

  assert.equal(nextProgress.activeBatch.module, 'Daily CT');
  assert.equal(nextProgress.activeBatch.completedCount, 3);
  assert.equal(nextProgress.activeBatch.totalCount, 10);
  assert.equal(nextProgress.streak, 3);
  assert.equal(nextProgress.streakBonusXp, 10);
});

test('reportCaseIssue appends a local issue record for later triage', () => {
  const progress = createInitialProgress();
  const caseItem = allCases.find((item) => item.id === 'source-chen-ecg-001');
  const nextProgress = reportCaseIssue(progress, caseItem, {
    type: 'image_mismatch',
    note: 'Need manual review of lead annotation.'
  });

  assert.equal(nextProgress.issueReports.length, 1);
  assert.equal(nextProgress.issueReports[0].caseId, caseItem.id);
  assert.equal(nextProgress.issueReports[0].type, 'image_mismatch');
  assert.equal(nextProgress.issueReports[0].status, 'reported');
});

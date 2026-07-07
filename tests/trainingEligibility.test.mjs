import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  getCaseSourceStage,
  getCaseLifecycleCounts,
  getTrainingEligibility,
  isDemoEligible,
  isFormalTrainingEligible,
  isReviewEligible
} from '../src/lib/trainingEligibility.js';
import { buildDemoBatch, buildFormalTrainingBatch, buildReviewBatch } from '../src/lib/batchRouter.js';

const syntheticDemo = {
  id: 'synthetic',
  module: 'Daily CT',
  content_type: 'synthetic_demo',
  public_demo_allowed: true,
  image_status: 'placeholder',
  image_missing: true,
  medical_review_status: 'draft',
  image_text_alignment: 'not_applicable',
  training_eligibility: 'demo_only'
};

const autoDraft = {
  id: 'auto-draft',
  module: 'Daily CT',
  content_type: 'auto_generated_source_candidate_draft',
  public_demo_allowed: false,
  image_status: 'missing',
  image_missing: true,
  medical_review_status: 'unreviewed',
  image_text_alignment: 'unknown',
  training_eligibility: 'draft_review_only'
};

const realSourceDraft = {
  id: 'source-draft',
  module: 'Daily CT',
  content_type: 'real_source_draft',
  public_demo_allowed: false,
  image_status: 'real',
  image_missing: false,
  medical_review_status: 'unreviewed',
  image_text_alignment: 'unknown',
  training_eligibility: 'source_review_only'
};

const reviewedRealCase = {
  id: 'reviewed-real',
  module: 'Daily CT',
  content_type: 'reviewed_real_case',
  public_demo_allowed: true,
  image_status: 'real',
  image_missing: false,
  medical_review_status: 'reviewed',
  image_text_alignment: 'matched',
  training_eligibility: 'formal_training'
};

test('case stages are stable for demo, auto draft, source draft, and reviewed real cases', () => {
  assert.equal(getCaseSourceStage(syntheticDemo), 'synthetic_demo');
  assert.equal(getCaseSourceStage(autoDraft), 'auto_draft');
  assert.equal(getCaseSourceStage(realSourceDraft), 'real_source_draft');
  assert.equal(getCaseSourceStage(reviewedRealCase), 'reviewed_real_case');
});

test('formal training requires real image, review, matched text, and formal eligibility marker together', () => {
  assert.equal(isFormalTrainingEligible(syntheticDemo), false);
  assert.equal(isFormalTrainingEligible(autoDraft), false);
  assert.equal(isFormalTrainingEligible(realSourceDraft), false);
  assert.equal(
    isFormalTrainingEligible({
      ...reviewedRealCase,
      image_text_alignment: 'partial'
    }),
    false
  );
  assert.equal(isFormalTrainingEligible(reviewedRealCase), true);
});

test('training eligibility explains why each layer can appear where it appears', () => {
  assert.equal(getTrainingEligibility(syntheticDemo), 'demo_only');
  assert.equal(getTrainingEligibility(autoDraft), 'draft_review_only');
  assert.equal(getTrainingEligibility(realSourceDraft), 'source_review_only');
  assert.equal(getTrainingEligibility(reviewedRealCase), 'formal_training');
});

test('demo, review, and formal batch builders route cases by mode', () => {
  const cases = [syntheticDemo, autoDraft, realSourceDraft, reviewedRealCase];

  assert.deepEqual(buildDemoBatch(cases, 'Daily CT').map((caseItem) => caseItem.id), [
    'source-draft',
    'reviewed-real'
  ]);
  assert.deepEqual(buildReviewBatch(cases, 'Daily CT').map((caseItem) => caseItem.id), [
    'source-draft',
    'auto-draft'
  ]);
  assert.deepEqual(buildFormalTrainingBatch(cases, 'Daily CT').map((caseItem) => caseItem.id), [
    'reviewed-real'
  ]);
});

test('public_demo_allowed false blocks demo even when a case has a real image', () => {
  assert.equal(isDemoEligible(realSourceDraft), false);
  assert.equal(isReviewEligible(realSourceDraft), true);
  assert.equal(isDemoEligible({ ...reviewedRealCase, public_demo_allowed: false }), false);
});

test('case lifecycle counts expose source pipeline maturity', () => {
  const counts = getCaseLifecycleCounts([syntheticDemo, autoDraft, realSourceDraft, reviewedRealCase]);

  assert.deepEqual(counts, {
    total: 4,
    syntheticDemo: 1,
    autoDraft: 1,
    realSourceDraft: 1,
    reviewedRealCase: 1,
    formalEligible: 1
  });
});

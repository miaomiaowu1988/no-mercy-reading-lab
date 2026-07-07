import assert from 'node:assert/strict';
import { test } from 'node:test';

import { allCases } from '../src/data/allCases.js';
import { openSourceCases } from '../src/data/openSourceCases.js';
import { isFormalTrainingEligible, isReviewEligible } from '../src/lib/trainingEligibility.js';

test('open source seed cases add remote real images without bypassing review gates', () => {
  assert.ok(openSourceCases.length >= 8);

  for (const caseItem of openSourceCases) {
    assert.equal(caseItem.content_type, 'real_source_draft');
    assert.equal(caseItem.case_stage, 'real_source_draft');
    assert.equal(caseItem.source_type, 'public_web');
    assert.equal(caseItem.source_name, 'Wikimedia Commons');
    assert.match(caseItem.source_url, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
    assert.match(caseItem.image.src, /^https:\/\/commons\.wikimedia\.org\/wiki\/Special:Redirect\/file\//);
    assert.equal(caseItem.image_status, 'real');
    assert.equal(caseItem.image_missing, false);
    assert.equal(caseItem.medical_review_status, 'unreviewed');
    assert.equal(caseItem.image_text_alignment, 'unknown');
    assert.equal(caseItem.training_eligibility, 'source_review_only');
    assert.equal(caseItem.public_demo_allowed, false);
    assert.equal(isReviewEligible(caseItem), true);
    assert.equal(isFormalTrainingEligible(caseItem), false);
  }
});

test('open source seed cases are included in the global case pool', () => {
  const allCaseIds = new Set(allCases.map((caseItem) => caseItem.id));

  for (const caseItem of openSourceCases) {
    assert.ok(allCaseIds.has(caseItem.id), `${caseItem.id} is missing from allCases`);
  }
});

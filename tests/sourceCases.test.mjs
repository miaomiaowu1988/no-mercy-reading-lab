import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { test } from 'node:test';

import { allCases } from '../src/data/allCases.js';
import { sourceCases } from '../src/data/sourceCases.js';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));

test('source cases are included in the training case collection', () => {
  assert.ok(sourceCases.length >= 2);
  for (const sourceCase of sourceCases) {
    assert.ok(allCases.some((caseItem) => caseItem.id === sourceCase.id));
  }
});

test('source cases carry private-learning and draft-review metadata', () => {
  for (const sourceCase of sourceCases) {
    assert.equal(sourceCase.content_type, 'real_source_draft');
    assert.equal(sourceCase.case_stage, 'real_source_draft');
    assert.equal(sourceCase.source_type, 'public_web');
    assert.equal(sourceCase.source_name, sourceCase.source.account);
    assert.equal(sourceCase.source_url, sourceCase.source.url);
    assert.ok(sourceCase.source_case_id);
    assert.equal(sourceCase.image_status, 'real');
    assert.equal(sourceCase.image_missing, false);
    assert.equal(sourceCase.medical_review_status, 'unreviewed');
    assert.equal(sourceCase.image_text_alignment, 'unknown');
    assert.equal(sourceCase.training_eligibility, 'source_review_only');
    assert.equal(sourceCase.public_demo_allowed, false);
    assert.equal(sourceCase.verification_status, 'ai_generated_draft_not_medically_reviewed');
    assert.equal(sourceCase.usage_scope, 'private_learning_only');
    assert.match(sourceCase.source.url, /^https:\/\//);
    assert.ok(sourceCase.source.account);
    assert.ok(sourceCase.image_credit);
  }
});

test('source cases include CT drafts from requested respiratory accounts', () => {
  const requestedCtAccounts = new Set(['肺部影像联盟', '丁香园呼吸时间']);
  const ctAccounts = new Set(
    sourceCases
      .filter((sourceCase) => sourceCase.modality === 'Chest CT')
      .map((sourceCase) => sourceCase.source.account)
  );

  for (const account of requestedCtAccounts) {
    assert.ok(ctAccounts.has(account), `missing Chest CT source case from ${account}`);
  }
});

test('source cases use local image assets that exist', () => {
  for (const sourceCase of sourceCases) {
    assert.ok(sourceCase.image?.src, `${sourceCase.id} has no image src`);
    assert.ok(sourceCase.image.src.startsWith('/assets/source-cases/'));
    const assetPath = join(rootDir, 'public', sourceCase.image.src.replace(/^\//, ''));
    assert.ok(existsSync(assetPath), `${assetPath} does not exist`);
  }
});

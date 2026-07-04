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
    assert.equal(sourceCase.verification_status, 'ai_generated_draft_not_medically_reviewed');
    assert.equal(sourceCase.usage_scope, 'private_learning_only');
    assert.match(sourceCase.source.url, /^https:\/\/mp\.weixin\.qq\.com\/s\//);
    assert.ok(sourceCase.source.account);
    assert.ok(sourceCase.image_credit);
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

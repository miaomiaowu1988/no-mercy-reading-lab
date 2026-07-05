import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

import { autoDraftCases } from '../src/data/autoDraftCases.js';

const rootDir = 'E:\\Desktop\\no-mercy-reading-lab';

test('auto draft case generator script is available as an npm script', () => {
  const packageJson = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf8'));

  assert.equal(packageJson.scripts['generate:draft-cases'], 'node scripts/generate_draft_cases.mjs');
  assert.ok(existsSync(join(rootDir, 'scripts', 'generate_draft_cases.mjs')));
});

test('weekly GitHub Actions workflow runs source refresh and draft generation', () => {
  const workflowPath = join(rootDir, '.github', 'workflows', 'auto-update-cases.yml');
  assert.ok(existsSync(workflowPath), 'auto-update-cases.yml should exist');

  const workflow = readFileSync(workflowPath, 'utf8');
  assert.match(workflow, /cron:/);
  assert.match(workflow, /npm run refresh:sources/);
  assert.match(workflow, /npm run generate:draft-cases/);
  assert.match(workflow, /npm test/);
  assert.match(workflow, /npm run build/);
});

test('generated auto draft cases stay clearly marked as unreviewed private-learning drafts', () => {
  assert.ok(autoDraftCases.length > 0, 'autoDraftCases should include starter generated drafts');

  for (const caseItem of autoDraftCases) {
    assert.equal(caseItem.content_type, 'auto_generated_source_candidate_draft');
    assert.equal(caseItem.medical_review_status, 'draft');
    assert.equal(caseItem.content_rights_status, 'unknown');
    assert.equal(caseItem.usage_scope, 'private_learning_only');
    assert.equal(caseItem.contains_phi, false);
    assert.equal(caseItem.public_demo_allowed, false);
    assert.ok(caseItem.source?.search_url || caseItem.source?.url);
  }
});

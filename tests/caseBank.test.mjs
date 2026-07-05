import assert from 'node:assert/strict';
import { test } from 'node:test';

import { demoCases } from '../src/data/cases.js';
import { sourceCases } from '../src/data/sourceCases.js';

const starterCases = [...sourceCases, ...demoCases];

const REQUIRED_FIELDS = [
  'id',
  'module',
  'title',
  'difficulty',
  'modality',
  'chief_skill',
  'history',
  'question',
  'options',
  'answer',
  'signs',
  'must_know_signs',
  'reasoning_steps',
  'explanation',
  'differential',
  'common_trap',
  'must_not_miss',
  'source'
];

test('case bank contains 100 starter training cases', () => {
  assert.equal(starterCases.length, 100);
});

test('starter bank has enough cases in the three primary modules', () => {
  const counts = countBy(starterCases, 'module');

  assert.equal(counts['Daily CT'], 40);
  assert.equal(counts['Hard Cases'], 30);
  assert.equal(counts['ECG Flashcards'], 26);
  assert.equal(counts['Boss Case'], 4);
});

test('all starter cases carry the fields required by the training card', () => {
  const ids = new Set();

  for (const caseItem of starterCases) {
    assert.ok(!ids.has(caseItem.id), `duplicate case id: ${caseItem.id}`);
    ids.add(caseItem.id);

    for (const field of REQUIRED_FIELDS) {
      assert.notEqual(caseItem[field], undefined, `${caseItem.id} is missing ${field}`);
    }

    assert.ok(caseItem.options.includes(caseItem.answer), `${caseItem.id} options do not include answer`);
    assert.ok(caseItem.signs.length >= 2, `${caseItem.id} needs at least two signs`);
    assert.ok(caseItem.must_know_signs.length >= 1, `${caseItem.id} needs must_know_signs`);
    assert.ok(caseItem.reasoning_steps.length >= 3, `${caseItem.id} needs reasoning_steps`);
  }
});

function countBy(items, field) {
  return items.reduce((counts, item) => {
    counts[item[field]] = (counts[item[field]] || 0) + 1;
    return counts;
  }, {});
}

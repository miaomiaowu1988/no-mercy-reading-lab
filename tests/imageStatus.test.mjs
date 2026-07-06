import assert from 'node:assert/strict';
import { test } from 'node:test';

import { hasMissingImage, getImageStatus, getImageStatusCounts, getImageStatusLabel } from '../src/lib/imageStatus.js';

test('getImageStatus classifies real, placeholder, missing, and failed-load cases', () => {
  assert.equal(
    getImageStatus({
      content_type: 'real_source_draft',
      image_license: 'open',
      image: { src: '/assets/example.png' }
    }),
    'real'
  );

  assert.equal(
    getImageStatus({
      content_type: 'synthetic_demo',
      image_status: 'placeholder',
      image_missing: true,
      image_license: 'placeholder'
    }),
    'placeholder'
  );

  assert.equal(
    getImageStatus({
      content_type: 'real_source_draft',
      image_license: 'open'
    }),
    'missing'
  );

  assert.equal(
    getImageStatus({
      content_type: 'real_source_draft',
      image_license: 'open',
      image: { src: '/assets/broken.png' }
    }, true),
    'failed_load'
  );
});

test('hasMissingImage marks placeholder, missing, and failed source images as not formal-ready', () => {
  assert.equal(hasMissingImage({ image_status: 'placeholder', image_missing: true }), true);
  assert.equal(hasMissingImage({ image_status: 'missing', image_missing: true }), true);
  assert.equal(hasMissingImage({ image: { src: '/assets/broken.png' }, image_license: 'open' }, true), true);
  assert.equal(hasMissingImage({ image: { src: '/assets/real.png' }, image_license: 'open' }), false);
});

test('getImageStatusLabel returns display labels for the training UI', () => {
  assert.equal(getImageStatusLabel('real'), 'Real source image');
  assert.equal(getImageStatusLabel('placeholder'), 'Demo placeholder');
  assert.equal(getImageStatusLabel('missing'), 'Image missing');
  assert.equal(getImageStatusLabel('failed_load'), 'Image failed to load');
});

test('getImageStatusCounts summarizes asset readiness for maintainers', () => {
  const counts = getImageStatusCounts([
    { image: { src: '/assets/real.png' }, image_license: 'open' },
    { content_type: 'synthetic_demo', image_status: 'placeholder', image_license: 'placeholder' },
    { content_type: 'real_source_draft', image_license: 'open' }
  ]);

  assert.deepEqual(counts, {
    real: 1,
    placeholder: 1,
    missing: 1,
    failed_load: 0
  });
});

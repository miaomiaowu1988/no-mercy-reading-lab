import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

const rootDir = 'E:\\Desktop\\no-mercy-reading-lab';
const indexHtml = readFileSync(join(rootDir, 'index.html'), 'utf8');

test('index.html includes mobile web app metadata', () => {
  assert.match(indexHtml, /manifest\.webmanifest/);
  assert.match(indexHtml, /apple-touch-icon\.png/);
  assert.match(indexHtml, /theme-color/i);
});

test('manifest exists with installable web app fields', () => {
  const manifestPath = join(rootDir, 'public', 'manifest.webmanifest');
  assert.ok(existsSync(manifestPath), 'manifest.webmanifest should exist');

  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  assert.equal(manifest.name, "Dr. Xie's Diagnostic Bootcamp");
  assert.equal(manifest.short_name, 'Bootcamp');
  assert.equal(manifest.display, 'standalone');
  assert.equal(manifest.start_url, '/');
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length >= 2);
});

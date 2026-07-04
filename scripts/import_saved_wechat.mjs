import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));

function getArg(name) {
  const prefix = `--${name}=`;
  const value = process.argv.find((arg) => arg.startsWith(prefix));
  return value ? value.slice(prefix.length) : '';
}

function extractTitle(html) {
  const ogTitle = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)?.[1];
  const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1];
  return decodeHtml(ogTitle || title || 'Saved WeChat article');
}

function decodeHtml(text) {
  return text
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
}

async function main() {
  const htmlPath = getArg('html');
  const account = getArg('account') || 'Unknown WeChat account';
  const url = getArg('url');
  const imagePath = getArg('image');

  if (!htmlPath || !url) {
    throw new Error('Usage: node scripts/import_saved_wechat.mjs --html=article.html --url=https://mp.weixin.qq.com/s/... --account=公众号名 [--image=local-image.png]');
  }

  const html = await readFile(htmlPath, 'utf8');
  const title = extractTitle(html);
  const slug = url.split('/').pop()?.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 24) || Date.now().toString();
  const outDir = join(rootDir, 'sources', 'imports');
  await mkdir(outDir, { recursive: true });

  let copiedImage = '';
  if (imagePath) {
    const assetDir = join(rootDir, 'public', 'assets', 'source-cases');
    await mkdir(assetDir, { recursive: true });
    const filename = `${slug}-${basename(imagePath)}`;
    await copyFile(imagePath, join(assetDir, filename));
    copiedImage = `/assets/source-cases/${filename}`;
  }

  const draft = {
    id: `import-${slug}`,
    source_account: account,
    source_url: url,
    source_title: title,
    image_src: copiedImage,
    content_type: 'real_source_draft',
    verification_status: 'ai_generated_draft_not_medically_reviewed',
    usage_scope: 'private_learning_only',
    next_step: 'Convert this import draft into src/data/sourceCases.js after checking title, images, and teaching target.'
  };

  const outPath = join(outDir, `${slug}.json`);
  await writeFile(outPath, `${JSON.stringify(draft, null, 2)}\n`);
  console.log(`Wrote import draft to ${outPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

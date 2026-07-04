import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const watchlistPath = join(rootDir, 'sources', 'watchlist.json');
const outDir = join(rootDir, 'sources', 'candidates');
const outPath = join(outDir, 'latest-candidates.json');

function buildSearchQuery(account, topic) {
  const alias = account.aliases?.[0] || account.name;
  return `"${alias}" "${topic}" site:mp.weixin.qq.com OR site:qq.com OR site:doctorpda.cn OR site:yxppt.com`;
}

function buildSearchUrl(query) {
  return `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
}

async function main() {
  const watchlist = JSON.parse(await readFile(watchlistPath, 'utf8'));
  const generatedAt = new Date().toISOString();
  const candidates = [];

  for (const account of watchlist.accounts) {
    for (const topic of account.topics) {
      const query = buildSearchQuery(account, topic);
      candidates.push({
        account: account.name,
        topic,
        query,
        search_url: buildSearchUrl(query),
        status: 'candidate_search_only',
        next_step: 'Open search results, keep only publicly accessible articles, then convert verified pages into source draft cards.'
      });
    }
  }

  await mkdir(outDir, { recursive: true });
  await writeFile(
    outPath,
    `${JSON.stringify({
      generated_at: generatedAt,
      usage_scope: 'private_learning_only',
      verification_status: 'candidate_list_not_medically_reviewed',
      rules: watchlist.priority_rules,
      candidates
    }, null, 2)}\n`
  );

  console.log(`Wrote ${candidates.length} candidate searches to ${outPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

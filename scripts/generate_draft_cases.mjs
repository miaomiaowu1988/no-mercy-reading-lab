import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const candidatesPath = join(rootDir, 'sources', 'candidates', 'latest-candidates.json');
const outPath = join(rootDir, 'src', 'data', 'autoDraftCases.js');
const MAX_DRAFTS = Number.parseInt(process.env.AUTO_DRAFT_CASE_LIMIT || '12', 10);

const topicProfiles = [
  {
    match: /肺结节|磨玻璃结节/,
    module: 'Daily CT',
    modality: 'Chest CT',
    answer: 'Pulmonary nodule risk stratification',
    signs: ['Pulmonary nodule', 'Growth assessment', 'Thin-slice comparison'],
    options: ['Pulmonary nodule risk stratification', 'Acute pulmonary edema', 'Simple bronchitis', 'Hyperkalemia']
  },
  {
    match: /ILD|间质性肺疾病/,
    module: 'Hard Cases',
    modality: 'HRCT',
    answer: 'Interstitial lung disease pattern analysis',
    signs: ['Reticulation', 'Distribution analysis', 'Fibrosis pattern'],
    options: ['Interstitial lung disease pattern analysis', 'Pulmonary nodule risk stratification', 'Atrial fibrillation', 'Simple pleural effusion']
  },
  {
    match: /肺栓塞|肺栓塞心电图/,
    module: 'ECG Flashcards',
    modality: 'ECG',
    answer: 'Pulmonary embolism triage pattern',
    signs: ['Right heart strain', 'Sinus tachycardia', 'Dyspnea context'],
    options: ['Pulmonary embolism triage pattern', 'UIP pattern fibrosis', 'Stable scar', 'Benign early repolarization']
  },
  {
    match: /心电图|房颤|宽QRS|低氧/,
    module: 'ECG Flashcards',
    modality: 'ECG',
    answer: 'Respiratory-emergency ECG interpretation',
    signs: ['Respiratory trigger', 'Rhythm identification', 'Emergency triage'],
    options: ['Respiratory-emergency ECG interpretation', 'Pulmonary alveolar proteinosis', 'Pleural plaque', 'Airway stenosis']
  },
  {
    match: /疑难病例/,
    module: 'Hard Cases',
    modality: 'Chest CT',
    answer: 'Difficult respiratory differential diagnosis',
    signs: ['Atypical presentation', 'Differential diagnosis', 'Clinical context'],
    options: ['Difficult respiratory differential diagnosis', 'Simple bronchitis', 'Normal variant ECG', 'Stable granuloma']
  }
];

function classifyCandidate(candidate) {
  const text = `${candidate.topic || ''} ${candidate.query || ''}`;
  return topicProfiles.find((profile) => profile.match.test(text)) || {
    module: 'Daily CT',
    modality: 'Chest CT',
    answer: 'Chest CT pattern recognition',
    signs: ['Chest CT pattern', 'Distribution analysis', 'Clinical context'],
    options: ['Chest CT pattern recognition', 'Stable ECG artifact', 'Benign skin lesion', 'Normal spirometry']
  };
}

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .slice(0, 48);
}

function createDraftCase(candidate, index, generatedAt) {
  const profile = classifyCandidate(candidate);
  const accountSlug = slugify(candidate.account || 'source');
  const topicSlug = slugify(candidate.topic || `topic-${index + 1}`);
  const id = `auto-${accountSlug || 'source'}-${topicSlug || index + 1}-${String(index + 1).padStart(2, '0')}`;

  return {
    id,
    module: profile.module,
    title: `${candidate.account} candidate: ${candidate.topic}`,
    difficulty: profile.module === 'Hard Cases' ? 'Hard' : 'Intermediate',
    body_system: profile.module === 'ECG Flashcards' ? 'Cardiopulmonary' : 'Respiratory',
    modality: profile.modality,
    chief_skill: profile.module === 'ECG Flashcards' ? 'emergency_triage' : 'pattern_recognition',
    cognitive_level: 'diagnosis',
    urgency: profile.module === 'ECG Flashcards' ? 'urgent' : 'routine',
    content_type: 'auto_generated_source_candidate_draft',
    medical_review_status: 'draft',
    content_rights_status: 'unknown',
    usage_scope: 'private_learning_only',
    public_demo_allowed: false,
    contains_phi: false,
    image_license: 'unknown',
    generated_at: generatedAt,
    history: `Auto-generated draft from a public-source candidate search for ${candidate.account} / ${candidate.topic}. Use only as a private learning prompt until the source page is manually reviewed.`,
    visual: profile.module === 'ECG Flashcards' ? 'ecg-rhythm' : 'auto-source-draft',
    question_type: 'single_choice',
    question: 'What should this candidate article most likely become in the training bank after review?',
    options: profile.options,
    answer: profile.answer,
    signs: profile.signs,
    must_know_signs: profile.signs.slice(0, 2),
    reasoning_steps: [
      'Start from the source account and topic rather than assuming a final diagnosis.',
      'Open only publicly accessible source pages and keep original links for attribution.',
      'Keep this card in draft state until medical content and rights status are reviewed.'
    ],
    explanation: `This is an auto-generated draft prompt based on the candidate query: ${candidate.query}. It is a placeholder for future article-to-case review, not a final medical teaching card.`,
    differential: ['Source-backed case draft', 'Synthetic fallback case', 'Manual review needed'],
    common_trap: 'Treating candidate-search metadata as if it were a reviewed article or diagnosis.',
    must_not_miss: 'Do not promote this case to reviewed training content until the source is accessible, attributed, and medically checked.',
    pitfall: 'Letting automation blur source rights or medical review status.',
    source: {
      type: 'candidate_search',
      account: candidate.account,
      topic: candidate.topic,
      query: candidate.query,
      search_url: candidate.search_url,
      generated_from: 'sources/candidates/latest-candidates.json'
    },
    image_credit: 'No source image cached. Placeholder visual only.',
    learning_points: [
      'Automation can prepare draft prompts, but review controls final teaching content.',
      'Candidate source metadata must stay separate from approved source-backed cases.'
    ],
    review_interval_days: 1,
    mastery_status: 'new'
  };
}

function toModule(cases) {
  return `// Auto-generated by scripts/generate_draft_cases.mjs. Do not edit by hand.\nexport const autoDraftCases = ${JSON.stringify(cases, null, 2)};\n`;
}

async function main() {
  const candidateList = JSON.parse(await readFile(candidatesPath, 'utf8'));
  const generatedAt = new Date().toISOString();
  const candidates = Array.isArray(candidateList.candidates) ? candidateList.candidates : [];
  const draftCases = candidates.slice(0, MAX_DRAFTS).map((candidate, index) =>
    createDraftCase(candidate, index, generatedAt)
  );

  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, toModule(draftCases));
  console.log(`Wrote ${draftCases.length} auto draft cases to ${outPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

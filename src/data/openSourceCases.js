const commonsCases = [
  {
    id: 'open-commons-ct-ggo-nodule-001',
    module: 'Daily CT',
    title: 'Ground-glass lung nodule on chest CT',
    difficulty: 'Intermediate',
    modality: 'Chest CT',
    chief_skill: 'pattern_recognition',
    urgency: 'routine',
    answer: 'Ground-glass pulmonary nodule',
    signs: ['Ground-glass opacity', 'Pulmonary nodule', 'Thin-slice CT review'],
    history: 'Open-source chest CT teaching image showing a ground-glass lung nodule candidate for structured review.',
    fileName: 'CT of ground glass lung nodule.png'
  },
  {
    id: 'open-commons-ct-pulmonary-embolism-001',
    module: 'Daily CT',
    title: 'Pulmonary embolism on CT angiography',
    difficulty: 'Hard',
    modality: 'CTPA',
    chief_skill: 'emergency_triage',
    urgency: 'emergent',
    answer: 'Pulmonary embolism',
    signs: ['Vascular filling defect', 'CT pulmonary angiography', 'Acute dyspnea context'],
    history: 'Open-source CT pulmonary angiography image candidate for PE recognition and triage practice.',
    fileName: 'Pulmonary embolism.jpg'
  },
  {
    id: 'open-commons-ct-crazy-paving-001',
    module: 'Hard Cases',
    title: 'Crazy paving pattern on chest CT',
    difficulty: 'Hard',
    modality: 'Chest CT',
    chief_skill: 'pattern_recognition',
    urgency: 'routine',
    answer: 'Crazy paving pattern differential',
    signs: ['Crazy paving', 'Ground-glass opacity', 'Septal thickening'],
    history: 'Open-source chest CT image candidate showing a crazy paving pattern for differential diagnosis review.',
    fileName: 'Crazy paving pattern on chest CT scan.jpg'
  },
  {
    id: 'open-commons-ct-reversed-halo-001',
    module: 'Hard Cases',
    title: 'Reversed halo sign on chest CT',
    difficulty: 'Hard',
    modality: 'Chest CT',
    chief_skill: 'sign_identification',
    urgency: 'routine',
    answer: 'Reversed halo sign',
    signs: ['Reversed halo sign', 'Peripheral consolidation', 'Organizing pneumonia pattern'],
    history: 'Open-source chest CT image candidate for reviewing the reversed halo sign and its differential.',
    fileName: 'Chest CT with reversed halo sign.jpg'
  },
  {
    id: 'open-commons-ct-pjp-001',
    module: 'Daily CT',
    title: 'Pneumocystis pneumonia infiltrates on CT',
    difficulty: 'Intermediate',
    modality: 'Chest CT',
    chief_skill: 'pattern_recognition',
    urgency: 'urgent',
    answer: 'Pneumocystis jirovecii pneumonia pattern',
    signs: ['Diffuse infiltrates', 'Ground-glass opacity', 'Immunocompromised context'],
    history: 'Open-source CT image candidate showing infiltrates described in Pneumocystis pneumonia.',
    fileName: 'CT of infiltrates of pneumocystis pneumonia.jpg'
  },
  {
    id: 'open-commons-ecg-rbbb-001',
    module: 'ECG Flashcards',
    title: 'Normal sinus rhythm with right bundle branch block',
    difficulty: 'Intermediate',
    modality: 'ECG',
    chief_skill: 'sign_identification',
    urgency: 'routine',
    answer: 'Right bundle branch block',
    signs: ['Wide QRS', 'RBBB morphology', 'Sinus rhythm'],
    history: 'Open-source ECG image candidate for reviewing right bundle branch block morphology.',
    fileName: 'ECG NSR with RBBB 74 bpm.jpg'
  },
  {
    id: 'open-commons-ecg-pe-001',
    module: 'ECG Flashcards',
    title: 'Pulmonary embolism ECG candidate',
    difficulty: 'Hard',
    modality: 'ECG',
    chief_skill: 'emergency_triage',
    urgency: 'urgent',
    answer: 'Pulmonary embolism triage pattern',
    signs: ['Right heart strain', 'Dyspnea context', 'ECG triage clue'],
    history: 'Open-source ECG image candidate associated with pulmonary embolism review.',
    fileName: 'Pulm embolism.jpg'
  },
  {
    id: 'open-commons-ecg-rbbb-avblock-001',
    module: 'ECG Flashcards',
    title: 'RBBB with first-degree AV block',
    difficulty: 'Intermediate',
    modality: 'ECG',
    chief_skill: 'sign_identification',
    urgency: 'routine',
    answer: 'RBBB with first-degree AV block',
    signs: ['Right bundle branch block', 'First-degree AV block', 'PR prolongation'],
    history: 'Open-source ECG image candidate for conduction-system pattern review.',
    fileName: 'RBBB with first degree AV block.jpg'
  }
];

export const openSourceCases = commonsCases.map(createOpenSourceCase);

function createOpenSourceCase(caseItem) {
  const sourceUrl = `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(caseItem.fileName).replace(/%20/g, '_')}`;
  const imageUrl = `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(caseItem.fileName)}`;

  return {
    id: caseItem.id,
    module: caseItem.module,
    title: caseItem.title,
    difficulty: caseItem.difficulty,
    body_system: caseItem.module === 'ECG Flashcards' ? 'Cardiopulmonary' : 'Respiratory',
    modality: caseItem.modality,
    chief_skill: caseItem.chief_skill,
    cognitive_level: caseItem.chief_skill === 'emergency_triage' ? 'management' : 'diagnosis',
    urgency: caseItem.urgency,
    content_type: 'real_source_draft',
    case_stage: 'real_source_draft',
    source_type: 'public_web',
    source_name: 'Wikimedia Commons',
    source_url: sourceUrl,
    source_case_id: caseItem.fileName,
    verification_status: 'open_source_image_seed_not_medically_reviewed',
    usage_scope: 'public_source_review',
    image_status: 'real',
    image_missing: false,
    medical_review_status: 'unreviewed',
    image_text_alignment: 'unknown',
    training_eligibility: 'source_review_only',
    public_demo_allowed: false,
    contains_phi: false,
    image_license: 'commons_license_review_needed',
    history: caseItem.history,
    image: {
      type: 'remote_public_source_asset',
      src: imageUrl,
      alt: `${caseItem.title} image from Wikimedia Commons`
    },
    image_credit: `Remote image from Wikimedia Commons file page: ${caseItem.fileName}. License metadata should be reviewed before formal training.`,
    visual: caseItem.module === 'ECG Flashcards' ? 'open-source-ecg' : 'open-source-ct',
    question_type: 'single_choice',
    question: 'What is the best source-review label for this open image candidate?',
    options: buildOptions(caseItem.answer, caseItem.module),
    answer: caseItem.answer,
    signs: caseItem.signs,
    must_know_signs: caseItem.signs.slice(0, 2),
    reasoning_steps: [
      `Start by confirming whether the image truly demonstrates ${caseItem.signs[0]}.`,
      'Check the source page license, attribution, and image description before using it outside private review.',
      'Only promote this card after confirming image-text alignment and medical accuracy.'
    ],
    explanation: `${caseItem.title} is added as an open-source image candidate. It has a real remote image, but remains unreviewed until the visual finding and explanation are checked.`,
    differential: buildDifferential(caseItem.answer, caseItem.module),
    common_trap: 'Treating an open-source image title as sufficient proof of diagnosis without reviewing the image and context.',
    must_not_miss: 'Do not promote this source draft to formal training until license, image-text alignment, and medical review are complete.',
    pitfall: 'Confusing real image availability with formal training readiness.',
    source: {
      type: 'wikimedia_commons_file',
      account: 'Wikimedia Commons',
      title: caseItem.fileName,
      url: sourceUrl
    },
    learning_points: [
      `Use ${caseItem.signs[0]} as the first review target.`,
      'Separate source-image collection from reviewed teaching content.'
    ],
    review_interval_days: 2,
    mastery_status: 'new'
  };
}

function buildOptions(answer, module) {
  const distractors =
    module === 'ECG Flashcards'
      ? ['Sinus tachycardia', 'Acute coronary syndrome', 'Artifact requiring repeat ECG']
      : ['Pulmonary edema', 'Stable scar', 'Simple bronchitis'];

  return [answer, ...distractors.filter((option) => option !== answer)].slice(0, 4);
}

function buildDifferential(answer, module) {
  const defaults =
    module === 'ECG Flashcards'
      ? ['Right ventricular strain', 'Bundle branch block', 'Acute coronary syndrome']
      : ['Infection', 'Edema', 'Malignancy mimic'];

  return [answer, ...defaults.filter((item) => item !== answer)].slice(0, 4);
}

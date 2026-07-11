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
  },
  {
    id: 'open-commons-ct-nodule-cystic-airspace-001',
    module: 'Daily CT',
    title: 'Lung nodule abutting a cystic airspace',
    difficulty: 'Hard',
    modality: 'Chest CT',
    chief_skill: 'pattern_recognition',
    urgency: 'routine',
    answer: 'Cystic-airspace associated lung nodule',
    signs: ['Pulmonary nodule', 'Cystic airspace relationship', 'Thin-slice morphology'],
    history: 'Open-source CT candidate showing a lung nodule abutting a cystic airspace.',
    fileName: 'CT of a lung nodule abutting a cystic airspace.png'
  },
  {
    id: 'open-commons-ct-nodule-bubble-lucencies-001',
    module: 'Daily CT',
    title: 'Lung nodule with bubble-like lucencies',
    difficulty: 'Hard',
    modality: 'Chest CT',
    chief_skill: 'sign_identification',
    urgency: 'routine',
    answer: 'Pulmonary nodule with bubble-like lucencies',
    signs: ['Bubble-like lucencies', 'Pulmonary nodule', 'Adenocarcinoma-spectrum clue'],
    history: 'Open-source CT candidate for reviewing bubble-like lucencies within a lung nodule.',
    fileName: 'CT of lung nodule with bubble-like lucencies.png'
  },
  {
    id: 'open-commons-ct-nodule-notch-001',
    module: 'Daily CT',
    title: 'Lung nodule with notch sign',
    difficulty: 'Intermediate',
    modality: 'Chest CT',
    chief_skill: 'sign_identification',
    urgency: 'routine',
    answer: 'Pulmonary nodule notch sign',
    signs: ['Notch sign', 'Pulmonary nodule', 'Margin analysis'],
    history: 'Open-source CT candidate for margin review of a lung nodule with notch sign.',
    fileName: 'CT of a lung nodule with a notch sign.png'
  },
  {
    id: 'open-commons-ct-nodule-pleural-retraction-001',
    module: 'Daily CT',
    title: 'Lung nodule with pleural retraction',
    difficulty: 'Intermediate',
    modality: 'Chest CT',
    chief_skill: 'sign_identification',
    urgency: 'routine',
    answer: 'Pulmonary nodule with pleural retraction',
    signs: ['Pleural retraction', 'Pulmonary nodule', 'Risk feature'],
    history: 'Open-source CT candidate for reviewing pleural retraction related to a pulmonary nodule.',
    fileName: 'CT of a lung nodule with pleural retraction.png'
  },
  {
    id: 'open-commons-ct-nodule-vascular-convergence-001',
    module: 'Daily CT',
    title: 'Lung nodule with vascular convergence',
    difficulty: 'Hard',
    modality: 'Chest CT',
    chief_skill: 'sign_identification',
    urgency: 'routine',
    answer: 'Pulmonary nodule with vascular convergence',
    signs: ['Vascular convergence', 'Pulmonary nodule', 'Morphologic risk clue'],
    history: 'Open-source CT candidate for reviewing vascular convergence around a lung nodule.',
    fileName: 'CT of lung nodule with vascular convergence.png'
  },
  {
    id: 'open-commons-ct-part-solid-nodule-001',
    module: 'Daily CT',
    title: 'Part-solid lung nodule',
    difficulty: 'Intermediate',
    modality: 'Chest CT',
    chief_skill: 'management_next_step',
    urgency: 'routine',
    answer: 'Part-solid pulmonary nodule',
    signs: ['Part-solid nodule', 'Ground-glass component', 'Solid component assessment'],
    history: 'Open-source CT candidate for reviewing part-solid pulmonary nodule risk stratification.',
    fileName: 'CT of part solid lung nodule.png'
  },
  {
    id: 'open-commons-ct-spiculated-nodule-001',
    module: 'Daily CT',
    title: 'Spiculated lung nodule with lucencies',
    difficulty: 'Hard',
    modality: 'Chest CT',
    chief_skill: 'pattern_recognition',
    urgency: 'routine',
    answer: 'Spiculated pulmonary nodule',
    signs: ['Spiculation', 'Bubble-like lucencies', 'Pulmonary nodule'],
    history: 'Open-source CT candidate for reviewing a spiculated lung nodule with internal lucencies.',
    fileName: 'CT of spiculated lung nodule with bubble-like lucencies.png'
  },
  {
    id: 'open-commons-ct-lobar-pneumonia-001',
    module: 'Daily CT',
    title: 'Lobar pneumonia on CT',
    difficulty: 'Intermediate',
    modality: 'Chest CT',
    chief_skill: 'pattern_recognition',
    urgency: 'urgent',
    answer: 'Lobar pneumonia',
    signs: ['Lobar consolidation', 'Air-space opacity', 'Infectious context'],
    history: 'Open-source CT candidate for reviewing lobar pneumonia pattern.',
    fileName: 'CT of lobar pneumonia.jpg'
  },
  {
    id: 'open-commons-ct-pneumonia-abscess-001',
    module: 'Hard Cases',
    title: 'Pneumonia with abscess cavities and effusions',
    difficulty: 'Hard',
    modality: 'Chest CT',
    chief_skill: 'differential_diagnosis',
    urgency: 'urgent',
    answer: 'Complicated pneumonia with abscess formation',
    signs: ['Cavitary opacity', 'Pleural effusion', 'Complicated infection'],
    history: 'Open-source CT candidate showing pneumonia with abscess cavities and effusions.',
    fileName: 'CT chest in pneumonia with abscesses caverns and effusions.jpg'
  },
  {
    id: 'open-commons-ct-lung-abscess-001',
    module: 'Hard Cases',
    title: 'Lung abscess on CT',
    difficulty: 'Hard',
    modality: 'Chest CT',
    chief_skill: 'differential_diagnosis',
    urgency: 'urgent',
    answer: 'Lung abscess',
    signs: ['Cavitary lesion', 'Air-fluid level', 'Infectious context'],
    history: 'Open-source CT candidate for reviewing lung abscess imaging features.',
    fileName: 'Lung abscess - CT scan (7471756882).jpg'
  },
  {
    id: 'open-commons-ct-cavitary-tuberculosis-001',
    module: 'Hard Cases',
    title: 'Cavitary tuberculosis on CT',
    difficulty: 'Hard',
    modality: 'Chest CT',
    chief_skill: 'pattern_recognition',
    urgency: 'urgent',
    answer: 'Cavitary pulmonary tuberculosis',
    signs: ['Cavitation', 'Upper-lobe disease', 'Tuberculosis context'],
    history: 'Open-source CT candidate showing cavitary pulmonary tuberculosis.',
    fileName: 'Cavitary tuberculosis - CT scan (6984891687).jpg'
  },
  {
    id: 'open-commons-ct-miliary-tuberculosis-001',
    module: 'Hard Cases',
    title: 'Miliary tuberculosis on CT',
    difficulty: 'Hard',
    modality: 'Chest CT',
    chief_skill: 'pattern_recognition',
    urgency: 'urgent',
    answer: 'Miliary tuberculosis',
    signs: ['Miliary nodules', 'Diffuse micronodules', 'Hematogenous spread'],
    history: 'Open-source CT candidate for reviewing miliary tuberculosis.',
    fileName: 'CT of miliary tuberculosis.jpg'
  },
  {
    id: 'open-commons-ct-bronchiectasis-001',
    module: 'Daily CT',
    title: 'Bronchiectasis on CT',
    difficulty: 'Intermediate',
    modality: 'Chest CT',
    chief_skill: 'sign_identification',
    urgency: 'routine',
    answer: 'Bronchiectasis',
    signs: ['Dilated bronchi', 'Bronchial wall thickening', 'Lack of tapering'],
    history: 'Open-source CT candidate for reviewing bronchiectasis.',
    fileName: 'Bronquiectasia.jpeg'
  },
  {
    id: 'open-commons-ct-basal-bronchiectasis-001',
    module: 'Daily CT',
    title: 'Basal bronchiectasis on coronal CT',
    difficulty: 'Intermediate',
    modality: 'Chest CT',
    chief_skill: 'sign_identification',
    urgency: 'routine',
    answer: 'Basal bronchiectasis',
    signs: ['Basal bronchiectasis', 'Coronal CT review', 'Airway dilation'],
    history: 'Open-source coronal CT candidate for reviewing basal bronchiectasis.',
    fileName: 'Bronchiektasen links basal 51M - CT coronar - 001.jpg'
  },
  {
    id: 'open-commons-ct-massive-bronchiectasis-001',
    module: 'Hard Cases',
    title: 'Massive bronchiectasis on CT',
    difficulty: 'Hard',
    modality: 'Chest CT',
    chief_skill: 'pattern_recognition',
    urgency: 'routine',
    answer: 'Severe bronchiectasis',
    signs: ['Marked bronchial dilation', 'Airway distortion', 'Chronic airway disease'],
    history: 'Open-source CT candidate for severe bronchiectasis review.',
    fileName: 'Massive Bronchiektasen - CT LF axial 001.jpg'
  },
  {
    id: 'open-commons-ct-uip-001',
    module: 'Hard Cases',
    title: 'Usual interstitial pneumonia on CT',
    difficulty: 'Hard',
    modality: 'HRCT',
    chief_skill: 'pattern_recognition',
    urgency: 'routine',
    answer: 'Usual interstitial pneumonia pattern',
    signs: ['Subpleural fibrosis', 'Basal predominance', 'Honeycombing'],
    history: 'Open-source HRCT candidate for UIP pattern review.',
    fileName: 'CT scan in usual interstitial pneumonia (UIP).jpg'
  },
  {
    id: 'open-commons-ct-ipf-001',
    module: 'Hard Cases',
    title: 'Idiopathic pulmonary fibrosis on HRCT',
    difficulty: 'Hard',
    modality: 'HRCT',
    chief_skill: 'pattern_recognition',
    urgency: 'routine',
    answer: 'Idiopathic pulmonary fibrosis pattern',
    signs: ['Reticulation', 'Fibrosis', 'HRCT distribution'],
    history: 'Open-source HRCT candidate from an IPF patient.',
    fileName: 'HR tomography of the chest of an IPF patient.jpg'
  },
  {
    id: 'open-commons-ct-ipf-002',
    module: 'Hard Cases',
    title: 'Idiopathic pulmonary fibrosis HRCT follow-up candidate',
    difficulty: 'Hard',
    modality: 'HRCT',
    chief_skill: 'pattern_recognition',
    urgency: 'routine',
    answer: 'Idiopathic pulmonary fibrosis pattern',
    signs: ['Fibrotic ILD', 'Reticulation', 'Distribution analysis'],
    history: 'Open-source HRCT candidate for reviewing fibrotic interstitial lung disease pattern.',
    fileName: 'HR tomography of the chest of an IPF patient 1.jpg'
  },
  {
    id: 'open-commons-ct-pneumothorax-001',
    module: 'Daily CT',
    title: 'Pneumothorax on CT',
    difficulty: 'Intermediate',
    modality: 'Chest CT',
    chief_skill: 'emergency_triage',
    urgency: 'urgent',
    answer: 'Pneumothorax',
    signs: ['Pleural air', 'Collapsed lung edge', 'Emergency triage'],
    history: 'Open-source CT candidate for reviewing pneumothorax.',
    fileName: 'Pneumothorax CT.jpg'
  },
  {
    id: 'open-commons-ct-apical-pneumothorax-001',
    module: 'Daily CT',
    title: 'Apical pneumothorax on CT',
    difficulty: 'Intermediate',
    modality: 'Chest CT',
    chief_skill: 'emergency_triage',
    urgency: 'urgent',
    answer: 'Apical pneumothorax',
    signs: ['Apical pleural air', 'Chest trauma context', 'CT and radiograph comparison'],
    history: 'Open-source image candidate showing apical pneumothorax on CT and chest radiograph.',
    fileName: 'Apical pneumothorax shown on CT and chest X-ray with left first rib fracture.png'
  },
  {
    id: 'open-commons-ct-massive-pe-001',
    module: 'Daily CT',
    title: 'Massive pulmonary embolism on CTPA',
    difficulty: 'Hard',
    modality: 'CTPA',
    chief_skill: 'emergency_triage',
    urgency: 'emergent',
    answer: 'Massive pulmonary embolism',
    signs: ['Large filling defect', 'Pulmonary arterial occlusion', 'Emergency triage'],
    history: 'Open-source CTPA candidate showing massive pulmonary embolism and occlusion.',
    fileName: 'CTA Chest With Massive Pulmonary Embolism and Complete Occlusion.jpg'
  },
  {
    id: 'open-commons-ct-pe-ctpa-001',
    module: 'Daily CT',
    title: 'Pulmonary embolism CTPA candidate',
    difficulty: 'Hard',
    modality: 'CTPA',
    chief_skill: 'emergency_triage',
    urgency: 'emergent',
    answer: 'Pulmonary embolism',
    signs: ['CTPA filling defect', 'Pulmonary embolism', 'Acute dyspnea context'],
    history: 'Open-source CTPA candidate for pulmonary embolism recognition.',
    fileName: 'Pulmonary embolism CTPA.JPEG'
  },
  {
    id: 'open-commons-ct-emphysema-001',
    module: 'Daily CT',
    title: 'Emphysema on CT',
    difficulty: 'Intermediate',
    modality: 'Chest CT',
    chief_skill: 'pattern_recognition',
    urgency: 'routine',
    answer: 'Emphysema',
    signs: ['Low attenuation', 'Hyperinflation', 'Parenchymal destruction'],
    history: 'Open-source CT candidate for reviewing emphysema.',
    fileName: 'Emphysema CT.JPG'
  },
  {
    id: 'open-commons-ecg-af-001',
    module: 'ECG Flashcards',
    title: 'Atrial fibrillation ECG',
    difficulty: 'Intermediate',
    modality: 'ECG',
    chief_skill: 'sign_identification',
    urgency: 'urgent',
    answer: 'Atrial fibrillation',
    signs: ['Irregularly irregular rhythm', 'Absent organized P waves', 'Narrow-complex rhythm'],
    history: 'Open-source ECG candidate for reviewing atrial fibrillation.',
    fileName: 'Atrial fibrillation 01.jpg'
  },
  {
    id: 'open-commons-ecg-af-two-leads-001',
    module: 'ECG Flashcards',
    title: 'Atrial fibrillation in two leads',
    difficulty: 'Intermediate',
    modality: 'ECG',
    chief_skill: 'sign_identification',
    urgency: 'urgent',
    answer: 'Atrial fibrillation',
    signs: ['Irregular rhythm', 'No consistent P waves', 'Two-lead rhythm review'],
    history: 'Open-source ECG candidate showing atrial fibrillation in two leads.',
    fileName: 'Atrial Fibrillation in two leads.jpg'
  },
  {
    id: 'open-commons-ecg-af-90-001',
    module: 'ECG Flashcards',
    title: 'Atrial fibrillation around 90 bpm',
    difficulty: 'Intermediate',
    modality: 'ECG',
    chief_skill: 'sign_identification',
    urgency: 'urgent',
    answer: 'Atrial fibrillation',
    signs: ['Atrial fibrillation', 'Ventricular rate assessment', 'Irregular rhythm'],
    history: 'Open-source ECG candidate showing atrial fibrillation around 90 bpm.',
    fileName: 'ECG Atrial Fibrillation 90 bpm.jpg'
  },
  {
    id: 'open-commons-ecg-hyperkalemia-001',
    module: 'ECG Flashcards',
    title: 'Hyperkalemia ECG with absent P waves',
    difficulty: 'Hard',
    modality: 'ECG',
    chief_skill: 'emergency_triage',
    urgency: 'emergent',
    answer: 'Hyperkalemia ECG pattern',
    signs: ['Absent P waves', 'Hyperkalemia context', 'Conduction risk'],
    history: 'Open-source ECG candidate demonstrating hyperkalemia with absent P waves.',
    fileName: 'ECG demonstrating hyperkalemia with absent P waves.png'
  },
  {
    id: 'open-commons-ecg-hyperkalemia-002',
    module: 'ECG Flashcards',
    title: 'Hyperkalemia ECG candidate',
    difficulty: 'Hard',
    modality: 'ECG',
    chief_skill: 'emergency_triage',
    urgency: 'emergent',
    answer: 'Hyperkalemia ECG pattern',
    signs: ['Peaked T waves', 'QRS widening risk', 'Electrolyte emergency'],
    history: 'Open-source ECG candidate for hyperkalemia pattern review.',
    fileName: 'Hyperkalemia ECG.jpg'
  },
  {
    id: 'open-commons-ecg-vt-001',
    module: 'ECG Flashcards',
    title: 'Ventricular tachycardia ECG',
    difficulty: 'Hard',
    modality: 'ECG',
    chief_skill: 'emergency_triage',
    urgency: 'emergent',
    answer: 'Ventricular tachycardia',
    signs: ['Wide-complex tachycardia', 'Ventricular rhythm', 'Emergency triage'],
    history: 'Open-source ECG candidate for ventricular tachycardia review.',
    fileName: 'Electrocardiogram of Ventricular Tachycardia.png'
  },
  {
    id: 'open-commons-ecg-vt-lead-ii-001',
    module: 'ECG Flashcards',
    title: 'Lead II ventricular tachycardia rhythm strip',
    difficulty: 'Hard',
    modality: 'ECG',
    chief_skill: 'emergency_triage',
    urgency: 'emergent',
    answer: 'Ventricular tachycardia',
    signs: ['Lead II rhythm strip', 'Wide-complex tachycardia', 'Ventricular tachycardia'],
    history: 'Open-source ECG rhythm strip candidate for ventricular tachycardia.',
    fileName: 'Lead II rhythm ventricular tachycardia Vtach VT.JPG'
  },
  {
    id: 'open-commons-ecg-rbbb-tachycardia-001',
    module: 'ECG Flashcards',
    title: 'Right bundle branch block with tachycardia',
    difficulty: 'Intermediate',
    modality: 'ECG',
    chief_skill: 'sign_identification',
    urgency: 'urgent',
    answer: 'Right bundle branch block with tachycardia',
    signs: ['RBBB morphology', 'Tachycardia', 'Wide QRS'],
    history: 'Open-source ECG candidate showing right bundle branch block with tachycardia.',
    fileName: 'Cardiogram indicating right bundle branch block with tachycardia.jpg'
  },
  {
    id: 'open-commons-ecg-rbbb-unlabeled-001',
    module: 'ECG Flashcards',
    title: 'Right bundle branch block ECG unlabeled',
    difficulty: 'Intermediate',
    modality: 'ECG',
    chief_skill: 'sign_identification',
    urgency: 'routine',
    answer: 'Right bundle branch block',
    signs: ['RBBB morphology', 'Wide QRS', 'Right precordial pattern'],
    history: 'Open-source ECG candidate for unlabeled right bundle branch block review.',
    fileName: 'Right Bundle Branch Block ECG Unlabeled.jpg'
  },
  {
    id: 'open-commons-ecg-rbbb-stemi-001',
    module: 'ECG Flashcards',
    title: 'Right bundle branch block with STEMI candidate',
    difficulty: 'Hard',
    modality: 'ECG',
    chief_skill: 'emergency_triage',
    urgency: 'emergent',
    answer: 'RBBB with possible STEMI pattern',
    signs: ['RBBB morphology', 'STEMI concern', 'Emergency triage'],
    history: 'Open-source ECG candidate for reviewing RBBB with possible STEMI features.',
    fileName: 'Right bundle block with STEMI.jpg'
  },
  {
    id: 'open-commons-ecg-lbbb-af-001',
    module: 'ECG Flashcards',
    title: 'Atrial fibrillation with LBBB candidate',
    difficulty: 'Hard',
    modality: 'ECG',
    chief_skill: 'differential_diagnosis',
    urgency: 'urgent',
    answer: 'Atrial fibrillation with bundle branch block',
    signs: ['Atrial fibrillation', 'Bundle branch block', 'Wide-complex irregular rhythm'],
    history: 'Open-source ECG candidate showing LBBB with atrial fibrillation.',
    fileName: 'LBBB atrial fibrillation.png'
  }
];

export const openSourceCases = commonsCases.map(createOpenSourceCase);

function createOpenSourceCase(caseItem) {
  const sourceUrl = `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(caseItem.fileName).replace(/%20/g, '_')}`;
  const imageUrl = `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(caseItem.fileName)}`;
  const teachingProfile = getTeachingProfile(caseItem);

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
    history: buildClinicalHistory(caseItem, teachingProfile),
    image: {
      type: 'remote_public_source_asset',
      src: imageUrl,
      alt: `${caseItem.title} image from Wikimedia Commons`
    },
    image_credit: `Wikimedia Commons file: ${caseItem.fileName}.`,
    visual: caseItem.module === 'ECG Flashcards' ? 'open-source-ecg' : 'open-source-ct',
    question_type: 'single_choice',
    question: 'What is the most likely imaging interpretation?',
    options: buildOptions(caseItem.answer, teachingProfile),
    answer: caseItem.answer,
    signs: caseItem.signs,
    must_know_signs: caseItem.signs.slice(0, 2),
    reasoning_steps: buildReasoningSteps(caseItem, teachingProfile),
    explanation: buildExplanation(caseItem, teachingProfile),
    differential: buildDifferential(caseItem.answer, teachingProfile),
    common_trap: teachingProfile.trap,
    must_not_miss: teachingProfile.mustNotMiss,
    pitfall: 'Choosing the label before checking whether the image, symptom tempo, and differential all fit.',
    source: {
      type: 'wikimedia_commons_file',
      account: 'Wikimedia Commons',
      title: caseItem.fileName,
      url: sourceUrl
    },
    learning_points: [
      `Use ${caseItem.signs[0]} as the first review target.`,
      teachingProfile.imageBasics,
      'Separate source-image collection from reviewed teaching content.'
    ],
    review_interval_days: 2,
    mastery_status: 'new'
  };
}

function buildClinicalHistory(caseItem, profile) {
  return [
    `Clinical scenario: ${profile.stem}`,
    `Key clues: look for ${caseItem.signs.join(', ')}.`,
    `Use the clinical context to decide whether ${caseItem.answer} fits better than ${profile.mimics.slice(0, 3).join(', ')}.`,
    caseItem.history
  ].join(' ');
}

function buildOptions(answer, profile) {
  return [answer, ...profile.mimics.filter((option) => option !== answer)].slice(0, 4);
}

function buildDifferential(answer, profile) {
  return [answer, ...profile.mimics.filter((item) => item !== answer)].slice(0, 5);
}

function buildReasoningSteps(caseItem, profile) {
  return [
    `Start with the clinical tempo: ${profile.tempo}`,
    `Find the anchor sign on the image: ${caseItem.signs[0]}.`,
    `Use the supporting clues ${caseItem.signs.slice(1).join(' and ')} to decide whether the pattern is internally consistent.`,
    `Actively compare against ${profile.mimics.slice(0, 3).join(', ')} before committing.`,
    `Finish with safety: ${profile.mustNotMiss}`
  ];
}

function buildExplanation(caseItem, profile) {
  return [
    `Image basics: ${profile.imageBasics}`,
    `Why this answer fits: ${caseItem.answer} is favored when ${caseItem.signs.join(', ')} line up with the clinical scenario rather than appearing as an isolated label.`,
    `Differential: ${profile.differentialTeaching}`
  ].join(' ');
}

function getTeachingProfile(caseItem) {
  const text = `${caseItem.title} ${caseItem.answer} ${caseItem.signs.join(' ')}`.toLowerCase();

  if (caseItem.module === 'ECG Flashcards') {
    return getEcgProfile(text);
  }

  if (text.includes('embol')) {
    return {
      stem: 'A 58-year-old patient has abrupt dyspnea, pleuritic chest discomfort, tachycardia, and elevated thromboembolic risk after recent immobility. Oxygen saturation is lower than expected for the chest examination.',
      tempo: 'sudden onset dyspnea and pleuritic pain raise concern for a vascular emergency.',
      imageBasics: 'On CTPA, pulmonary embolism is suggested by an intraluminal arterial filling defect, vessel cutoff, or downstream wedge-shaped infarct pattern; right-heart strain changes the urgency.',
      mimics: ['Pulmonary artery artifact', 'Pneumonia', 'Atelectasis', 'Pulmonary infarction without visible embolus'],
      differentialTeaching: 'Differentiate PE from flow artifact by checking multiple planes and vessel continuity; pneumonia usually follows air-space or lobar patterns, while atelectasis has volume loss.',
      trap: 'Calling PE from a single bright or dark vessel focus without checking contrast timing, adjacent slices, and clinical risk.',
      mustNotMiss: 'If PE is suspected with hypotension, syncope, or right-heart strain, triage it as potentially high risk.'
    };
  }

  if (text.includes('nodule')) {
    return {
      stem: 'A 64-year-old former smoker undergoes follow-up thin-slice CT after an incidental pulmonary nodule was seen on screening. Prior images are limited, so morphology, density, margins, and pleural or vascular relationships matter.',
      tempo: 'incidental or slowly evolving focal opacity makes morphology and comparison imaging more important than acute symptoms.',
      imageBasics: 'Pulmonary nodules are reviewed by size, density, margin, growth, solid component, air bronchogram or lucency, pleural retraction, and relationship to vessels or cystic airspaces.',
      mimics: ['Focal scar', 'Inflammatory nodule', 'Adenocarcinoma-spectrum lesion', 'Granuloma'],
      differentialTeaching: 'Inflammatory nodules often change or resolve, scars may be linear or stable, granulomas may calcify, and adenocarcinoma-spectrum lesions often persist or grow slowly with increasing solid component.',
      trap: 'Over-calling malignancy from one axial slice without reviewing thin sections, prior studies, and multiplanar morphology.',
      mustNotMiss: 'Growth, increasing solid component, spiculation, pleural retraction, or high-risk clinical context should trigger closer follow-up or specialist review.'
    };
  }

  if (text.includes('pneumonia') || text.includes('abscess') || text.includes('pneumocystis')) {
    return {
      stem: 'A patient presents with fever, cough, rising inflammatory markers, and worsening oxygenation. Immune status and aspiration risk are important because they change the most likely infection pattern.',
      tempo: 'subacute fever and respiratory decline point toward infection, but the distribution and complications narrow the cause.',
      imageBasics: 'Infection on CT is assessed by consolidation, ground-glass opacity, cavitation, air-fluid level, effusion, airway-centered spread, and whether disease is lobar, diffuse, or dependent.',
      mimics: ['Pulmonary edema', 'Organizing pneumonia', 'Aspiration', 'Malignancy with post-obstructive infection'],
      differentialTeaching: 'Edema tends to be symmetric with septal thickening and effusions, organizing pneumonia is often peripheral or migratory, aspiration is dependent, and malignancy may cause recurrent same-lobe infection.',
      trap: 'Treating every opacity as routine pneumonia without checking immune status, cavitation, effusion, or airway obstruction.',
      mustNotMiss: 'Cavitation, empyema, severe hypoxemia, or immunocompromise should prompt urgent escalation.'
    };
  }

  if (text.includes('tuberculosis')) {
    return {
      stem: 'A patient has chronic cough, weight loss, night sweats, or exposure risk. CT is being reviewed to decide whether the pattern suggests active or disseminated mycobacterial infection.',
      tempo: 'chronic systemic symptoms plus upper-lobe or diffuse nodular disease make tuberculosis a key consideration.',
      imageBasics: 'Tuberculosis may show upper-lobe cavitation, tree-in-bud endobronchial spread, lymphadenopathy, or diffuse miliary micronodules depending on host status and route of spread.',
      mimics: ['Necrotizing bacterial pneumonia', 'Fungal infection', 'Septic emboli', 'Cavitating malignancy'],
      differentialTeaching: 'Necrotizing pneumonia is often more acute, fungal disease depends on immune status, septic emboli are peripheral and vascular, and malignancy tends to be a focal thick-walled lesion.',
      trap: 'Missing infection-control implications when cavitation or miliary nodules appear in the right clinical setting.',
      mustNotMiss: 'Possible active tuberculosis needs isolation, microbiologic testing, and public-health-aware management.'
    };
  }

  if (text.includes('bronchiectasis') || text.includes('panbronchiolitis')) {
    return {
      stem: 'A patient reports years of productive cough, recurrent lower respiratory infections, and intermittent wheeze. CT is being reviewed for chronic airway damage rather than a single acute infiltrate.',
      tempo: 'longstanding sputum production and recurrent infections favor chronic airway disease.',
      imageBasics: 'Bronchiectasis is suggested by bronchial dilation, lack of tapering, visible bronchi near the pleura, bronchial wall thickening, mucus plugging, and signet-ring appearance.',
      mimics: ['Acute bronchitis', 'Cystic lung disease', 'Traction bronchiectasis from fibrosis', 'Endobronchial obstruction'],
      differentialTeaching: 'Acute bronchitis usually lacks fixed airway dilation; traction bronchiectasis follows fibrotic distortion; obstruction should be suspected when disease is focal or recurrent in one region.',
      trap: 'Ignoring distribution, because focal, diffuse, central, and lower-lobe bronchiectasis point to different causes.',
      mustNotMiss: 'Focal severe bronchiectasis or recurrent same-lobe infection should prompt evaluation for obstruction or atypical infection.'
    };
  }

  if (text.includes('fibrosis') || text.includes('uip') || text.includes('ipf')) {
    return {
      stem: 'A 69-year-old patient has slowly progressive exertional dyspnea, dry cough, inspiratory crackles, and reduced diffusion capacity. HRCT is being reviewed for a fibrotic interstitial lung disease pattern.',
      tempo: 'gradual progression over months to years points toward fibrotic ILD rather than acute infection.',
      imageBasics: 'Fibrotic ILD review focuses on basal and subpleural predominance, reticulation, traction bronchiectasis, honeycombing, volume loss, and whether features fit UIP or an alternative pattern.',
      mimics: ['Fibrotic NSIP', 'Chronic hypersensitivity pneumonitis', 'Post-infectious fibrosis', 'Asbestosis'],
      differentialTeaching: 'NSIP is often more ground-glass and symmetric, hypersensitivity pneumonitis may show air trapping or upper/mid-lung disease, and asbestosis needs pleural exposure clues.',
      trap: 'Calling UIP without checking distribution, honeycombing confidence, and signs that suggest an alternative diagnosis.',
      mustNotMiss: 'Acute worsening on a fibrotic background may represent acute exacerbation, infection, edema, or pulmonary embolism.'
    };
  }

  if (text.includes('pneumothorax')) {
    return {
      stem: 'A patient develops sudden unilateral pleuritic chest pain and dyspnea after cough, trauma, or underlying cystic lung disease. CT is being reviewed for pleural air and lung collapse.',
      tempo: 'abrupt pleuritic symptoms suggest pleural air or vascular events before chronic airway disease.',
      imageBasics: 'Pneumothorax is identified by pleural air, a visible visceral pleural line, absent peripheral lung markings, and degree of collapse; tension physiology is a clinical emergency.',
      mimics: ['Skin fold artifact', 'Large bulla', 'Pneumomediastinum', 'Post-procedural air'],
      differentialTeaching: 'Bullae have walls and often remain within lung parenchyma, skin folds extend beyond the thorax, and pneumomediastinum tracks centrally around mediastinal structures.',
      trap: 'Mistaking a large bulla or artifact for pneumothorax without tracing the pleural line.',
      mustNotMiss: 'Hypotension, mediastinal shift, or severe respiratory distress should be treated as possible tension pneumothorax.'
    };
  }

  if (text.includes('emphysema')) {
    return {
      stem: 'A long-term smoker has chronic exertional dyspnea, reduced exercise tolerance, and obstructive physiology. CT is being reviewed for parenchymal destruction and hyperinflation.',
      tempo: 'chronic progressive breathlessness favors COPD-spectrum parenchymal disease.',
      imageBasics: 'Emphysema appears as low-attenuation lung without visible walls, vascular pruning, hyperinflation, and centrilobular or paraseptal distribution depending on subtype.',
      mimics: ['Cystic lung disease', 'Air trapping from small airways disease', 'Pneumothorax', 'Overexposure or windowing artifact'],
      differentialTeaching: 'True cysts have definable walls, air trapping is best seen on expiratory imaging, and pneumothorax has pleural air outside the visceral pleural line.',
      trap: 'Over-reading low attenuation without checking vessels, distribution, expiratory images, and window settings.',
      mustNotMiss: 'Large bullae can mimic pneumothorax and can complicate procedures or acute dyspnea evaluation.'
    };
  }

  return {
    stem: 'A patient has respiratory symptoms and a chest image that needs structured interpretation. The goal is to integrate pattern, distribution, acuity, and clinical context before selecting the label.',
    tempo: 'match the imaging pattern to symptom tempo and severity before choosing a diagnosis.',
    imageBasics: `For this pattern, first identify ${caseItem.signs[0]}, then check distribution, associated findings, and whether the clinical context supports the label.`,
    mimics: ['Infection', 'Pulmonary edema', 'Malignancy mimic', 'Chronic inflammatory disease'],
    differentialTeaching: 'Separate acute infection, edema, malignancy, and chronic inflammatory patterns by distribution, associated signs, and change over time.',
    trap: 'Selecting the source-file title as the answer without independently checking the image.',
    mustNotMiss: 'Escalate if the pattern suggests an unstable respiratory or cardiovascular emergency.'
  };
}

function getEcgProfile(text) {
  if (text.includes('atrial fibrillation')) {
    return {
      stem: 'A patient with dyspnea, pneumonia or COPD exacerbation reports palpitations and variable pulse intensity. The ECG is reviewed to decide whether the rhythm is atrial fibrillation rather than sinus tachycardia.',
      tempo: 'new irregular tachycardia during respiratory illness often reflects atrial irritability or strain.',
      imageBasics: 'Atrial fibrillation is recognized by irregularly irregular RR intervals, absent organized P waves, and variable fibrillatory baseline activity; always assess ventricular rate and stability.',
      mimics: ['Sinus rhythm with frequent PACs', 'Multifocal atrial tachycardia', 'Atrial flutter with variable block', 'Artifact'],
      differentialTeaching: 'PACs still have identifiable premature P waves, MAT has at least three P morphologies, flutter has organized atrial activity, and artifact should not march consistently through QRS timing.',
      trap: 'Calling any irregular rhythm AF without checking P waves, baseline artifact, and QRS regularity.',
      mustNotMiss: 'If AF appears with hypotension, ischemia, heart failure, or severe hypoxemia, treat the clinical instability first.'
    };
  }

  if (text.includes('hyperkalemia')) {
    return {
      stem: 'A patient with kidney disease or severe acidosis has weakness, bradycardia, or shock physiology during respiratory failure. The ECG is reviewed for electrolyte-driven conduction danger.',
      tempo: 'acute metabolic deterioration can produce rapidly progressive ECG changes.',
      imageBasics: 'Hyperkalemia may show tall peaked T waves, PR prolongation, P-wave flattening or loss, QRS widening, sine-wave progression, and malignant arrhythmia risk.',
      mimics: ['Early repolarization', 'Acute STEMI', 'Hyperacute ischemic T waves', 'Lead placement artifact'],
      differentialTeaching: 'Hyperacute ischemic T waves are regional and symptom-linked, early repolarization is usually stable, and hyperkalemia often has diffuse repolarization plus conduction slowing.',
      trap: 'Waiting for a perfect ECG pattern before treating a clinically dangerous potassium level.',
      mustNotMiss: 'Severe hyperkalemia with QRS widening or instability requires immediate treatment while confirming labs.'
    };
  }

  if (text.includes('ventricular tachycardia')) {
    return {
      stem: 'A patient has syncope, chest discomfort, severe hypoxemia, or shock with a fast wide-complex rhythm. The ECG is reviewed to distinguish ventricular tachycardia from supraventricular tachycardia with aberrancy.',
      tempo: 'sudden wide-complex tachycardia with instability should be treated as VT until proven otherwise.',
      imageBasics: 'Ventricular tachycardia is suggested by wide QRS tachycardia, AV dissociation, capture or fusion beats, extreme axis, concordance, and structural heart disease context.',
      mimics: ['SVT with aberrancy', 'Pre-excited atrial fibrillation', 'Paced rhythm', 'Hyperkalemia-related wide QRS rhythm'],
      differentialTeaching: 'SVT with aberrancy is possible, but instability, AV dissociation, very wide QRS, and structural disease increase VT probability; hyperkalemia must be considered if QRS widening is diffuse.',
      trap: 'Assuming a wide-complex tachycardia is SVT because the patient is temporarily awake.',
      mustNotMiss: 'Unstable wide-complex tachycardia needs immediate synchronized cardioversion according to resuscitation protocols.'
    };
  }

  if (text.includes('right bundle') || text.includes('rbbb')) {
    return {
      stem: 'A patient with dyspnea or chest symptoms has a wide QRS ECG. The task is to identify right bundle branch block morphology and decide whether secondary ST-T changes explain the tracing.',
      tempo: 'conduction findings may be chronic, but new dyspnea or chest pain makes comparison with prior ECG important.',
      imageBasics: 'RBBB usually has QRS duration at least 120 ms, rsR or M-shaped morphology in V1-V2, broad terminal S waves in lateral leads, and secondary anterior ST-T changes.',
      mimics: ['Right ventricular strain', 'Anterior ischemia', 'Brugada pattern', 'Lead misplacement'],
      differentialTeaching: 'RV strain often has right-axis and T-wave inversion in a PE context, ischemia has dynamic territorial changes, Brugada has coved ST elevation, and lead misplacement can distort V1-V2.',
      trap: 'Dismissing all anterior ST-T changes as benign just because RBBB is present.',
      mustNotMiss: 'New symptoms, dynamic changes, or ischemic morphology still require urgent clinical correlation.'
    };
  }

  if (text.includes('pulmonary embolism') || text.includes('right heart strain')) {
    return {
      stem: 'A patient has acute dyspnea, pleuritic pain, tachycardia, and risk factors for venous thromboembolism. The ECG is reviewed for supportive signs of right-heart strain.',
      tempo: 'acute cardiopulmonary strain can produce sinus tachycardia and right-sided repolarization changes.',
      imageBasics: 'PE ECG findings are nonspecific but may include sinus tachycardia, right-axis deviation, S1Q3T3, RBBB, and anterior or inferior T-wave inversion from RV strain.',
      mimics: ['Acute coronary syndrome', 'Chronic pulmonary hypertension', 'RBBB without acute strain', 'Normal sinus tachycardia'],
      differentialTeaching: 'ACS has territorial ischemic changes, chronic pulmonary hypertension has prior or persistent right-strain signs, and sinus tachycardia alone is not diagnostic of PE.',
      trap: 'Using ECG to rule out PE; the ECG supports risk assessment but does not exclude PE.',
      mustNotMiss: 'High-risk PE with syncope, hypotension, or RV strain needs urgent escalation.'
    };
  }

  return {
    stem: 'A patient with respiratory symptoms has an ECG abnormality that may change triage. Review rhythm, rate, QRS width, axis, intervals, and repolarization before choosing the interpretation.',
    tempo: 'ECG urgency depends on symptoms, hemodynamic stability, and whether the pattern is new.',
    imageBasics: 'ECG interpretation should proceed systematically: rate, rhythm, axis, intervals, QRS morphology, ST-T changes, and comparison with prior tracings.',
    mimics: ['Sinus tachycardia', 'Acute coronary syndrome', 'Electrolyte disturbance', 'Artifact'],
    differentialTeaching: 'Separate rhythm disturbance, ischemia, electrolyte change, and artifact by looking for consistency across leads and clinical fit.',
    trap: 'Jumping to a named ECG pattern without checking rate, rhythm, intervals, and lead quality.',
    mustNotMiss: 'Unstable rhythms, STEMI patterns, and dangerous electrolyte patterns require immediate clinical action.'
  };
}

const dailyCtBlueprints = [
  ['ct-001', 'Acute fever with peripheral ground-glass opacities', 'Viral pneumonia', 'Ground-glass opacity', 'Peripheral distribution', 'Patchy consolidation', 'Male, 63, fever and dyspnea for 5 days.', 'urgent'],
  ['ct-002', 'Chronic cough with tree-in-bud nodules', 'Tree-in-bud bronchiolitis', 'Tree-in-bud', 'Bronchiolar nodules', 'Airway-centered disease', 'Female, 48, chronic productive cough and recurrent low-grade fever.', 'routine'],
  ['ct-003', 'Incidental spiculated upper-lobe nodule', 'High-risk pulmonary nodule', 'Spiculated margin', 'Upper-lobe location', 'Solid nodule', 'Male, 70, smoking history, 14 mm right upper-lobe solid nodule.', 'routine'],
  ['ct-004', 'Progressive dyspnea with basal honeycombing', 'UIP pattern fibrosis', 'Honeycombing', 'Basal predominance', 'Subpleural reticulation', 'Male, 68, progressive exertional dyspnea for 2 years.', 'routine'],
  ['ct-005', 'Sudden dyspnea with wedge-shaped opacity', 'Pulmonary embolism', 'Wedge-shaped opacity', 'Right heart strain', 'Vascular filling defect', 'Female, 55, sudden dyspnea, pleuritic chest pain, elevated D-dimer.', 'emergent'],
  ['ct-006', 'Dilated bronchi with recurrent infection', 'Bronchiectasis', 'Signet ring sign', 'Bronchial wall thickening', 'Lack of tapering', 'Female, 61, chronic sputum production and recurrent lower respiratory infections.', 'routine'],
  ['ct-007', 'Large unilateral pleural fluid collection', 'Pleural effusion', 'Dependent pleural fluid', 'Compressive atelectasis', 'Meniscus contour', 'Male, 66, progressive dyspnea and dullness to percussion at the right base.', 'urgent'],
  ['ct-008', 'Diffuse low attenuation with hyperinflation', 'Emphysema', 'Low attenuation', 'Hyperinflation', 'Vascular pruning', 'Male, 72, long smoking history and chronic exertional dyspnea.', 'routine'],
  ['ct-009', 'Central bronchiectasis in asthma', 'Allergic bronchopulmonary aspergillosis', 'Central bronchiectasis', 'Mucoid impaction', 'High-attenuation mucus', 'Female, 36, asthma, fleeting infiltrates, and eosinophilia.', 'routine'],
  ['ct-010', 'Upper-lobe cavitary lesion with fever', 'Post-primary tuberculosis', 'Cavitation', 'Tree-in-bud spread', 'Upper-lobe predominance', 'Male, 42, fever, night sweats, cough, and weight loss.', 'urgent'],
  ['ct-011', 'Acute lobar consolidation with air bronchograms', 'Lobar bacterial pneumonia', 'Dense consolidation', 'Air bronchogram', 'Segmental distribution', 'Female, 51, fever, productive cough, and pleuritic pain.', 'urgent'],
  ['ct-012', 'Perihilar opacities with septal thickening', 'Cardiogenic pulmonary edema', 'Smooth septal thickening', 'Perihilar opacity', 'Pleural effusion', 'Male, 74, orthopnea and acute dyspnea with leg swelling.', 'urgent'],
  ['ct-013', 'Crazy paving with subacute dyspnea', 'Pulmonary alveolar proteinosis', 'Crazy paving', 'Geographic ground-glass opacity', 'Interlobular septal thickening', 'Male, 45, subacute dyspnea and milky bronchoalveolar lavage.', 'routine'],
  ['ct-014', 'Peripheral consolidation with reverse halo', 'Organizing pneumonia', 'Reverse halo sign', 'Peripheral consolidation', 'Migratory opacity', 'Female, 58, cough and dyspnea after a viral illness.', 'routine'],
  ['ct-015', 'Mosaic attenuation with air trapping', 'Small airways disease', 'Mosaic attenuation', 'Air trapping', 'Expiratory heterogeneity', 'Female, 52, chronic dyspnea worse around workplace exposure.', 'routine'],
  ['ct-016', 'Diffuse random tiny nodules', 'Miliary nodules', 'Random micronodules', 'Diffuse distribution', 'Hematogenous spread', 'Male, 39, fever and weight loss with immunosuppression.', 'urgent'],
  ['ct-017', 'Dependent lower-lobe aspiration pattern', 'Aspiration pneumonia', 'Dependent consolidation', 'Airway debris', 'Lower-lobe predominance', 'Male, 82, dysphagia and fever after choking episode.', 'urgent'],
  ['ct-018', 'Acute chest pain with pneumothorax', 'Pneumothorax', 'Pleural line', 'Absent peripheral lung markings', 'Partial lung collapse', 'Tall male, 24, sudden unilateral pleuritic chest pain.', 'emergent'],
  ['ct-019', 'Peripheral wedge opacity after hemoptysis', 'Pulmonary infarction', 'Peripheral wedge opacity', 'Pleural base', 'Vascular risk context', 'Female, 59, hemoptysis and pleuritic pain after recent surgery.', 'emergent'],
  ['ct-020', 'Diffuse lower-lobe reticulation in CTD', 'CTD-associated ILD', 'Reticulation', 'Traction bronchiectasis', 'Basal predominance', 'Female, 49, Raynaud symptoms, arthritis, and progressive dyspnea.', 'routine'],
  ['ct-021', 'Upper-lobe fibrosis with calcified nodes', 'Sarcoidosis-related fibrosis', 'Perilymphatic nodules', 'Upper-lobe fibrosis', 'Hilar lymphadenopathy', 'Female, 44, chronic cough and bilateral hilar adenopathy.', 'routine'],
  ['ct-022', 'Nocturnal fever with cavitating nodules', 'Septic pulmonary emboli', 'Peripheral nodules', 'Cavitation', 'Feeding vessel sign', 'Male, 33, fever, bacteremia, and intravenous line infection.', 'urgent'],
  ['ct-023', 'Halo sign in neutropenic patient', 'Angioinvasive aspergillosis', 'Halo sign', 'Nodular opacity', 'Neutropenic context', 'Female, 57, neutropenia and persistent fever despite antibiotics.', 'emergent'],
  ['ct-024', 'Air crescent during neutrophil recovery', 'Recovering invasive aspergillosis', 'Air crescent sign', 'Cavitary nodule', 'Immune recovery context', 'Male, 60, leukemia patient improving after neutrophil recovery.', 'urgent'],
  ['ct-025', 'Diffuse centrilobular nodules in smoker', 'Respiratory bronchiolitis ILD', 'Centrilobular nodules', 'Upper-lobe predominance', 'Smoking history', 'Male, 41, heavy smoking and mild chronic dyspnea.', 'routine'],
  ['ct-026', 'Lower-lobe mucus plugging with atelectasis', 'Mucus plugging', 'Bronchial obstruction', 'Subsegmental atelectasis', 'Airway impaction', 'Female, 69, weak cough after surgery and new basal opacity.', 'routine'],
  ['ct-027', 'Enlarged pulmonary artery on CT', 'Pulmonary hypertension', 'Pulmonary artery enlargement', 'Right ventricular enlargement', 'Mosaic perfusion', 'Male, 62, exertional dyspnea and loud P2 on examination.', 'routine'],
  ['ct-028', 'Trauma with patchy pulmonary opacity', 'Pulmonary contusion', 'Patchy consolidation', 'No anatomic segment boundary', 'Trauma context', 'Male, 28, blunt chest trauma after traffic accident.', 'urgent'],
  ['ct-029', 'Peripheral basal cysts with pneumothorax history', 'Lymphangioleiomyomatosis', 'Thin-walled cysts', 'Diffuse cystic lung disease', 'Recurrent pneumothorax', 'Female, 32, recurrent pneumothorax and progressive dyspnea.', 'routine'],
  ['ct-030', 'Diffuse cysts with nodules in smoker', 'Pulmonary Langerhans cell histiocytosis', 'Irregular cysts', 'Upper-lobe predominance', 'Smoking association', 'Male, 35, smoker with cough and spontaneous pneumothorax.', 'routine'],
  ['ct-031', 'Pleural plaques with basal fibrosis', 'Asbestos-related pleural disease', 'Pleural plaques', 'Calcified pleura', 'Basal fibrosis', 'Male, 73, shipyard exposure and progressive dyspnea.', 'routine'],
  ['ct-032', 'Bulky hilar nodes with airway narrowing', 'Central lung cancer with adenopathy', 'Hilar mass', 'Airway narrowing', 'Atelectasis', 'Male, 67, smoking history, hemoptysis, and weight loss.', 'urgent'],
  ['ct-033', 'Diffuse bronchial wall thickening in asthma flare', 'Asthma exacerbation airway changes', 'Bronchial wall thickening', 'Mucus plugging', 'Hyperinflation', 'Female, 29, wheeze and nocturnal cough after allergen exposure.', 'routine'],
  ['ct-034', 'Subpleural lines after viral pneumonia', 'Post-infectious organizing change', 'Subpleural line', 'Residual ground-glass opacity', 'Bandlike opacity', 'Male, 50, persistent dyspnea one month after viral pneumonia.', 'routine'],
  ['ct-035', 'Lower-lobe consolidation in immunocompromised host', 'Pneumocystis jirovecii pneumonia', 'Diffuse ground-glass opacity', 'Perihilar distribution', 'Immunosuppression', 'Female, 46, HIV not on therapy with progressive dyspnea.', 'urgent'],
  ['ct-036', 'Dependent ground-glass opacity in heart failure', 'Hydrostatic edema', 'Dependent ground-glass opacity', 'Septal thickening', 'Cardiomegaly', 'Male, 79, acute dyspnea, hypertension, and elevated BNP.', 'urgent'],
  ['ct-037', 'Patchy opacity after radiation therapy', 'Radiation pneumonitis', 'Geographic consolidation', 'Radiation-field distribution', 'Ground-glass opacity', 'Female, 63, cough weeks after thoracic radiotherapy.', 'routine'],
  ['ct-038', 'Focal rounded pneumonia mimic', 'Round pneumonia', 'Rounded consolidation', 'Air bronchogram', 'Infectious symptoms', 'Male, 47, fever and cough with a round lower-lobe opacity.', 'routine']
];

const hardCaseBlueprints = [
  ['hard-001', 'Drug-induced pneumonitis after new therapy', 'Drug-induced lung injury', 'Temporal drug exposure', 'Diffuse ground-glass opacity', 'Organizing pattern'],
  ['hard-002', 'Checkpoint inhibitor pneumonitis mimic', 'Immune checkpoint inhibitor pneumonitis', 'Immunotherapy exposure', 'Organizing pneumonia pattern', 'Exclusion of infection'],
  ['hard-003', 'Crazy paving in a chronic dyspnea case', 'Pulmonary alveolar proteinosis', 'Crazy paving', 'Geographic opacity', 'Milky lavage clue'],
  ['hard-004', 'Exposure-related mosaic attenuation', 'Hypersensitivity pneumonitis', 'Mosaic attenuation', 'Air trapping', 'Exposure history'],
  ['hard-005', 'Hemoptysis with diffuse alveolar opacity', 'Diffuse alveolar hemorrhage', 'Hemoptysis', 'Diffuse ground-glass opacity', 'Anemia context'],
  ['hard-006', 'Fever with nodules and cavitation', 'Nocardiosis', 'Cavitary nodules', 'Immunosuppression', 'Subacute fever'],
  ['hard-007', 'Sarcoid mimic with perilymphatic nodules', 'Sarcoidosis', 'Perilymphatic nodules', 'Hilar adenopathy', 'Upper-lobe disease'],
  ['hard-008', 'Cancer therapy with new bilateral opacities', 'Radiation recall pneumonitis', 'Treatment field clue', 'New consolidation', 'Drug trigger'],
  ['hard-009', 'Recurrent pneumonia in one lobe', 'Obstructing endobronchial lesion', 'Recurrent same-lobe opacity', 'Atelectasis', 'Airway cutoff'],
  ['hard-010', 'Acute ILD worsening with fever', 'Acute exacerbation of ILD', 'Background fibrosis', 'New ground-glass opacity', 'Rapid deterioration'],
  ['hard-011', 'Hemoptysis with renal findings', 'Pulmonary renal syndrome', 'Diffuse alveolar hemorrhage', 'Renal involvement', 'Autoimmune context'],
  ['hard-012', 'Asthma with fleeting opacities', 'ABPA', 'Asthma context', 'Central bronchiectasis', 'Eosinophilia'],
  ['hard-013', 'Cavitating upper-lobe lesion after aspiration risk', 'Anaerobic lung abscess', 'Thick-walled cavity', 'Air-fluid level', 'Aspiration risk'],
  ['hard-014', 'Refractory pneumonia with bulging fissure', 'Klebsiella pneumonia', 'Lobar consolidation', 'Bulging fissure', 'Alcohol use risk'],
  ['hard-015', 'Diffuse nodules in malignancy history', 'Lymphangitic carcinomatosis', 'Septal thickening', 'Nodular interstitium', 'Cancer history'],
  ['hard-016', 'Severe hypoxemia with near-normal chest radiograph', 'Early pulmonary embolism', 'Disproportionate dyspnea', 'Risk factor', 'CTPA need'],
  ['hard-017', 'Slowly enlarging ground-glass nodule', 'Adenocarcinoma spectrum lesion', 'Persistent GGO nodule', 'Slow growth', 'Solid component'],
  ['hard-018', 'Nodules with eosinophilia', 'Eosinophilic pneumonia', 'Peripheral consolidation', 'Eosinophilia', 'Steroid response'],
  ['hard-019', 'Diffuse cystic lung disease in woman', 'Lymphangioleiomyomatosis', 'Diffuse thin-walled cysts', 'Female patient', 'Pneumothorax history'],
  ['hard-020', 'Upper-lobe cysts and nodules in smoker', 'Pulmonary Langerhans cell histiocytosis', 'Irregular cysts', 'Nodules', 'Smoking history'],
  ['hard-021', 'Pulmonary edema or viral pneumonia dilemma', 'Cardiogenic pulmonary edema', 'Septal thickening', 'Pleural effusion', 'Cardiac context'],
  ['hard-022', 'Cavitary lesion with thick irregular wall', 'Cavitating lung cancer', 'Irregular wall', 'Smoking history', 'Upper-lobe lesion'],
  ['hard-023', 'Peripheral nodules after line infection', 'Septic pulmonary emboli', 'Peripheral cavitating nodules', 'Feeding vessel sign', 'Bacteremia'],
  ['hard-024', 'Airway disease with high IgE', 'ABPA with mucus impaction', 'High-attenuation mucus', 'Central bronchiectasis', 'Asthma'],
  ['hard-025', 'Diffuse GGO in transplant patient', 'Opportunistic viral pneumonia', 'Immunosuppression', 'Diffuse GGO', 'Systemic symptoms'],
  ['hard-026', 'Unilateral hyperlucent lung', 'Swyer-James-MacLeod syndrome', 'Unilateral hyperlucency', 'Air trapping', 'Post-infectious history'],
  ['hard-027', 'Focal stenosis with post-obstructive change', 'Airway stenosis', 'Focal airway narrowing', 'Post-obstructive atelectasis', 'Prior intubation'],
  ['hard-028', 'Rounded atelectasis near pleural disease', 'Rounded atelectasis', 'Comet tail sign', 'Pleural thickening', 'Subpleural masslike opacity'],
  ['hard-029', 'Diffuse calcified tiny nodules', 'Healed varicella pneumonia', 'Calcified micronodules', 'Diffuse distribution', 'Remote infection'],
  ['hard-030', 'CT signs of inhalational injury', 'Smoke inhalation airway injury', 'Airway wall thickening', 'Centrilobular nodules', 'Exposure context']
];

const ecgBlueprints = [
  ['ecg-001', 'Sudden dyspnea with S1Q3T3 and right heart strain', 'Pulmonary embolism with right heart strain', 'S1Q3T3 pattern', 'Right axis deviation', 'Sinus tachycardia'],
  ['ecg-002', 'Hypoxemia-triggered irregular narrow-complex tachycardia', 'Atrial fibrillation during COPD exacerbation', 'Irregularly irregular rhythm', 'Absent P waves', 'Narrow QRS'],
  ['ecg-003', 'Sawtooth flutter waves during acute COPD flare', 'Atrial flutter with 2:1 conduction', 'Sawtooth flutter waves', 'Regular tachycardia', 'Fixed response'],
  ['ecg-004', 'Tall peaked T waves in respiratory failure', 'Hyperkalemia in respiratory failure', 'Tall peaked T waves', 'QRS widening', 'Acidosis context'],
  ['ecg-005', 'Diffuse ST elevation after respiratory infection', 'Pericarditis after viral pneumonia', 'Diffuse ST elevation', 'PR depression', 'Pleuritic pain'],
  ['ecg-006', 'Wide QRS tachycardia during hypoxemic collapse', 'Ventricular tachycardia in severe hypoxemia', 'Wide-complex tachycardia', 'Instability', 'AV dissociation'],
  ['ecg-007', 'Sinus tachycardia in severe pneumonia', 'Sinus tachycardia from sepsis and hypoxemia', 'Sinus P waves', 'Fast regular rhythm', 'Infection context'],
  ['ecg-008', 'Right ventricular strain with anterior T inversion', 'Acute pulmonary hypertension strain', 'Anterior T-wave inversion', 'Right axis deviation', 'Dyspnea context'],
  ['ecg-009', 'Multifocal atrial tachycardia in COPD', 'Multifocal atrial tachycardia', 'Three P-wave morphologies', 'Irregular atrial rhythm', 'COPD context'],
  ['ecg-010', 'Low voltage QRS with dyspnea', 'Large pericardial effusion pattern', 'Low voltage', 'Electrical alternans', 'Dyspnea and hypotension'],
  ['ecg-011', 'ST depression during hypoxemic stress', 'Demand ischemia during respiratory failure', 'ST depression', 'Tachycardia', 'Hypoxemic stress'],
  ['ecg-012', 'Prolonged QT after macrolide exposure', 'Drug-related QT prolongation', 'Prolonged QT', 'Macrolide exposure', 'Torsades risk'],
  ['ecg-013', 'U waves after bronchodilator overuse', 'Hypokalemia pattern', 'Prominent U waves', 'ST depression', 'Low potassium context'],
  ['ecg-014', 'Right atrial enlargement in pulmonary disease', 'P pulmonale', 'Peaked P waves', 'Inferior lead prominence', 'Chronic lung disease'],
  ['ecg-015', 'Right ventricular hypertrophy in COPD', 'Right ventricular hypertrophy', 'Tall R in V1', 'Right axis deviation', 'COPD context'],
  ['ecg-016', 'Atrial flutter mistaken for sinus tachycardia', 'Atrial flutter', 'Hidden flutter waves', 'Regular narrow tachycardia', 'Fixed rate'],
  ['ecg-017', 'NSTEMI mimic in dyspneic patient', 'Pulmonary embolism strain mimic', 'T-wave inversion', 'Right precordial leads', 'PE context'],
  ['ecg-018', 'Acute STEMI found during dyspnea triage', 'STEMI requiring urgent escalation', 'Territorial ST elevation', 'Reciprocal change', 'Chest pressure'],
  ['ecg-019', 'Bradycardia after hyperkalemia worsens', 'Severe hyperkalemia conduction delay', 'Bradycardia', 'QRS widening', 'Peaked T waves'],
  ['ecg-020', 'PACs during pneumonia recovery', 'Premature atrial contractions', 'Early P waves', 'Narrow QRS', 'Post-infectious irritability'],
  ['ecg-021', 'PVCs during hypoxemic COPD flare', 'Premature ventricular contractions', 'Wide premature beats', 'Compensatory pause', 'Hypoxemia'],
  ['ecg-022', 'QT prolongation with fluoroquinolone therapy', 'Medication-associated QT prolongation', 'Long QT', 'Fluoroquinolone exposure', 'Syncope risk'],
  ['ecg-023', 'Atrial fibrillation after pulmonary embolism', 'AF triggered by acute PE', 'Irregular rhythm', 'Right strain clue', 'PE context'],
  ['ecg-024', 'Stable narrow tachycardia in asthma attack', 'SVT during adrenergic stress', 'Regular narrow tachycardia', 'Abrupt onset', 'Beta-agonist context']
];

const bossBlueprints = [
  ['boss-001', 'Boss Case: dyspnea with CT and ECG disagreement', 'Mixed cardiopulmonary emergency', 'Conflicting data', 'Multi-step reasoning', 'Triage priority'],
  ['boss-002', 'Boss Case: cancer mimic with infection clues', 'Mimic of lung cancer', 'Masslike opacity', 'Infectious symptoms', 'Follow-up response'],
  ['boss-003', 'Boss Case: acute ILD worsening or infection', 'Acute ILD differential', 'Background fibrosis', 'New GGO', 'Infection exclusion'],
  ['boss-004', 'Boss Case: PE with right heart strain', 'High-risk pulmonary embolism', 'Right heart strain', 'CTPA clue', 'Hemodynamic risk']
];

export const cases = dailyCtBlueprints.map((blueprint, index) => createCtCase(blueprint, index));

export const demoCases = [
  ...cases,
  ...hardCaseBlueprints.map((blueprint, index) => createHardCase(blueprint, index)),
  ...ecgBlueprints.map((blueprint, index) => createEcgCase(blueprint, index)),
  ...bossBlueprints.map((blueprint, index) => createBossCase(blueprint, index))
];

function createCtCase([id, title, answer, signA, signB, signC, history, urgency], index) {
  return createCase({
    id,
    module: 'Daily CT',
    title,
    answer,
    signs: [signA, signB, signC],
    history,
    urgency,
    modality: index === 4 ? 'CTPA' : index === 3 ? 'HRCT' : 'Chest CT',
    difficulty: index % 5 === 1 ? 'Beginner' : index % 5 === 4 ? 'Hard' : 'Intermediate',
    chief_skill: index % 4 === 0 ? 'pattern_recognition' : index % 4 === 1 ? 'sign_identification' : index % 4 === 2 ? 'management_next_step' : 'emergency_triage',
    visual: `ct-demo-${index % 7}`,
    question: index % 3 === 0 ? 'What is the most likely diagnosis?' : index % 3 === 1 ? 'Which imaging sign drives the interpretation?' : 'What should be prioritized in this case?'
  });
}

function createHardCase([id, title, answer, signA, signB, signC], index) {
  return createCase({
    id,
    module: 'Hard Cases',
    title,
    answer,
    signs: [signA, signB, signC],
    history: `Synthetic hard respiratory case ${index + 1}: atypical presentation requiring differential diagnosis and trap checking.`,
    urgency: index % 4 === 0 ? 'urgent' : 'routine',
    modality: 'Chest CT',
    difficulty: 'Hard',
    chief_skill: index % 3 === 0 ? 'differential_diagnosis' : index % 3 === 1 ? 'pattern_recognition' : 'management_next_step',
    visual: `ct-hard-${index % 8}`,
    question: 'Which diagnosis best explains the imaging pattern and clinical context?'
  });
}

function createEcgCase([id, title, answer, signA, signB, signC], index) {
  return createCase({
    id,
    module: 'ECG Flashcards',
    title,
    answer,
    signs: [signA, signB, signC],
    history: `Respiratory-emergency ECG case ${index + 1}: dyspnea or hypoxemia with a rhythm or repolarization clue.`,
    urgency: index % 4 === 0 ? 'emergent' : 'urgent',
    modality: 'ECG',
    difficulty: index % 4 === 0 ? 'Hard' : 'Intermediate',
    chief_skill: index % 3 === 0 ? 'emergency_triage' : index % 3 === 1 ? 'sign_identification' : 'pattern_recognition',
    visual: 'ecg-rhythm',
    question: 'What is the best ECG interpretation in this respiratory context?'
  });
}

function createBossCase([id, title, answer, signA, signB, signC], index) {
  return createCase({
    id,
    module: 'Boss Case',
    title,
    answer,
    signs: [signA, signB, signC],
    history: `Boss challenge ${index + 1}: integrate history, CT pattern, ECG clue, and urgency before committing.`,
    urgency: 'emergent',
    modality: 'Chest CT + ECG',
    difficulty: 'Boss',
    chief_skill: 'differential_diagnosis',
    visual: `boss-${index + 1}`,
    question: 'What is the safest integrated diagnosis or next action?'
  });
}

function createCase({
  id,
  module,
  title,
  answer,
  signs,
  history,
  urgency,
  modality,
  difficulty,
  chief_skill,
  visual,
  question
}) {
  return {
    id,
    module,
    title,
    difficulty,
    body_system: module === 'ECG Flashcards' ? 'Cardiopulmonary' : 'Respiratory',
    modality,
    chief_skill,
    cognitive_level: chief_skill === 'management_next_step' ? 'management' : 'diagnosis',
    urgency,
    content_type: 'synthetic_demo',
    case_stage: 'synthetic_demo',
    source_type: 'synthetic_demo',
    source_name: 'Synthetic starter case',
    source_url: '',
    source_case_id: id,
    medical_review_status: 'draft',
    content_rights_status: 'demo',
    public_demo_allowed: true,
    contains_phi: false,
    image_status: 'placeholder',
    image_missing: true,
    image_text_alignment: 'not_applicable',
    training_eligibility: 'demo_only',
    image_license: 'placeholder',
    history,
    visual,
    question_type: 'single_choice',
    question,
    options: buildOptions(answer, module),
    answer,
    signs,
    must_know_signs: signs.slice(0, 2),
    reasoning_steps: [
      `Identify the dominant clue: ${signs[0]}.`,
      `Check whether the pattern fits the clinical context: ${history}`,
      `Compare the main diagnosis with close mimics before committing to ${answer}.`
    ],
    explanation: `${answer} is favored because the training pattern combines ${signs.join(', ')} with the provided respiratory clinical context. This starter case is synthetic and intended for pattern practice.`,
    differential: buildDifferential(answer, module),
    common_trap: `Anchoring on ${signs[0]} alone without checking distribution, acuity, and the respiratory context.`,
    must_not_miss: urgency === 'emergent' ? `Escalate immediately if ${answer} is suspected in an unstable patient.` : `Review prior data and clinical context before finalizing ${answer}.`,
    pitfall: 'Premature closure before checking the key mimic.',
    source: { type: 'demo', title: 'Synthetic starter case', url: '' },
    learning_points: [
      `Recognize ${signs[0]} quickly.`,
      `Use ${signs[1]} to narrow the differential.`
    ],
    review_interval_days: 1,
    mastery_status: 'new'
  };
}

function buildOptions(answer, module) {
  const distractors =
    module === 'ECG Flashcards'
      ? ['Sinus tachycardia', 'Acute coronary syndrome', 'Benign artifact']
      : module === 'Hard Cases'
        ? ['Bacterial pneumonia', 'Pulmonary edema', 'Primary lung cancer']
        : ['Pulmonary edema', 'Simple bronchitis', 'Stable scar'];

  return [answer, ...distractors.filter((option) => option !== answer)].slice(0, 4);
}

function buildDifferential(answer, module) {
  const defaults =
    module === 'ECG Flashcards'
      ? ['Pulmonary embolism strain', 'Acute coronary syndrome', 'Electrolyte disturbance']
      : ['Infection', 'Edema', 'Malignancy mimic'];
  return [answer, ...defaults.filter((item) => item !== answer)].slice(0, 4);
}

import { getImageStatus, hasMissingImage } from './imageStatus.js';

const STAGE_LABELS = {
  synthetic_demo: 'Synthetic demo',
  auto_draft: 'Auto draft',
  real_source_draft: 'Real source draft',
  reviewed_real_case: 'Reviewed real case'
};

export function getCaseSourceStage(caseItem) {
  if (caseItem?.case_stage) return caseItem.case_stage;

  if (caseItem?.content_type === 'synthetic_demo') return 'synthetic_demo';
  if (caseItem?.content_type === 'auto_generated_source_candidate_draft') return 'auto_draft';
  if (isFormalTrainingEligible(caseItem) || caseItem?.content_type === 'reviewed_real_case') {
    return 'reviewed_real_case';
  }
  if (caseItem?.content_type === 'real_source_draft' || getImageStatus(caseItem) === 'real') {
    return 'real_source_draft';
  }

  return 'auto_draft';
}

export function getCaseSourceStageLabel(stage) {
  return STAGE_LABELS[stage] || STAGE_LABELS.auto_draft;
}

export function getTrainingEligibility(caseItem) {
  if (caseItem?.training_eligibility) return caseItem.training_eligibility;

  const stage = getCaseSourceStage(caseItem);
  if (stage === 'synthetic_demo') return 'demo_only';
  if (stage === 'reviewed_real_case' && isFormalTrainingEligible(caseItem)) return 'formal_training';
  if (stage === 'real_source_draft') return 'source_review_only';
  return 'draft_review_only';
}

export function isFormalTrainingEligible(caseItem) {
  return (
    getImageStatus(caseItem) === 'real' &&
    !hasMissingImage(caseItem) &&
    caseItem?.medical_review_status === 'reviewed' &&
    caseItem?.image_text_alignment === 'matched' &&
    caseItem?.training_eligibility === 'formal_training'
  );
}

export function isDemoEligible(caseItem) {
  if (caseItem?.public_demo_allowed === false) return false;
  return getCaseSourceStage(caseItem) === 'synthetic_demo' || isFormalTrainingEligible(caseItem);
}

export function isReviewEligible(caseItem) {
  const stage = getCaseSourceStage(caseItem);
  return stage === 'auto_draft' || stage === 'real_source_draft';
}

export function getCaseLifecycleCounts(cases) {
  return cases.reduce(
    (counts, caseItem) => {
      counts.total += 1;
      const stage = getCaseSourceStage(caseItem);
      if (stage === 'synthetic_demo') counts.syntheticDemo += 1;
      if (stage === 'auto_draft') counts.autoDraft += 1;
      if (stage === 'real_source_draft') counts.realSourceDraft += 1;
      if (stage === 'reviewed_real_case') counts.reviewedRealCase += 1;
      if (isFormalTrainingEligible(caseItem)) counts.formalEligible += 1;
      return counts;
    },
    {
      total: 0,
      syntheticDemo: 0,
      autoDraft: 0,
      realSourceDraft: 0,
      reviewedRealCase: 0,
      formalEligible: 0
    }
  );
}

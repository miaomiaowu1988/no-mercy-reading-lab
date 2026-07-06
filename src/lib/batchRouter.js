import { isDemoEligible, isFormalTrainingEligible, isReviewEligible } from './trainingEligibility.js';

const DEMO_BATCH_SIZE = 10;

export function buildDemoBatch(cases, moduleName) {
  return cases
    .filter((caseItem) => caseItem.module === moduleName && isDemoEligible(caseItem))
    .sort(compareSourceFirst)
    .slice(0, DEMO_BATCH_SIZE);
}

export function buildFormalTrainingBatch(cases, moduleName) {
  return cases
    .filter((caseItem) => caseItem.module === moduleName && isFormalTrainingEligible(caseItem))
    .sort(compareSourceFirst)
    .slice(0, DEMO_BATCH_SIZE);
}

export function buildReviewBatch(cases, moduleName) {
  return cases
    .filter((caseItem) => caseItem.module === moduleName && isReviewEligible(caseItem))
    .sort(compareSourceFirst)
    .slice(0, DEMO_BATCH_SIZE);
}

export function getContinueTrainingRecommendation(progress, cases) {
  const activeBatch = progress?.activeBatch;
  if (activeBatch && activeBatch.completedCount < activeBatch.totalCount) {
    return {
      module: activeBatch.module,
      reason: `Resume ${activeBatch.module} demo batch (${activeBatch.completedCount}/${activeBatch.totalCount} completed).`
    };
  }

  const weakSignEntries = Object.entries(progress?.weakSigns || {});
  if (weakSignEntries.length > 0) {
    const [topWeakSign] = weakSignEntries.sort((left, right) => right[1] - left[1]);
    const weakCase = cases.find((caseItem) =>
      [...(caseItem.must_know_signs || []), ...(caseItem.signs || [])].includes(topWeakSign[0])
    );
    if (weakCase) {
      return {
        module: weakCase.module,
        reason: `${topWeakSign[0]} has been missed ${topWeakSign[1]} times.`
      };
    }
  }

  const defaultModule = ['Daily CT', 'Hard Cases', 'ECG Flashcards'].find((moduleName) =>
    cases.some((caseItem) => caseItem.module === moduleName)
  );

  return {
    module: defaultModule || null,
    reason: defaultModule ? `Start a new ${defaultModule} demo batch.` : 'No training modules available.'
  };
}

function compareSourceFirst(left, right) {
  const sourceRank = Number(Boolean(right.content_type === 'real_source_draft')) - Number(Boolean(left.content_type === 'real_source_draft'));
  return sourceRank;
}

export { DEMO_BATCH_SIZE };

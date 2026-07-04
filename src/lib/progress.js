const STORAGE_KEY = 'diagnosticBootcampProgress.v1';

export function createInitialProgress() {
  return {
    completed: 0,
    correct: 0,
    xp: 0,
    streak: 0,
    bestStreak: 0,
    answers: {},
    weakSigns: {},
    reviewQueue: []
  };
}

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialProgress();
    return normalizeProgress({ ...createInitialProgress(), ...JSON.parse(raw) });
  } catch {
    return createInitialProgress();
  }
}

export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function recordAnswer(progress, caseItem, selectedAnswer) {
  const currentProgress = normalizeProgress(progress);
  const isCorrect = selectedAnswer === caseItem.answer;
  const now = new Date();
  const nextProgress = normalizeProgress({
    ...currentProgress,
    completed: currentProgress.completed + 1,
    correct: currentProgress.correct + (isCorrect ? 1 : 0),
    xp: currentProgress.xp + 10 + (isCorrect ? 20 : 0),
    streak: isCorrect ? currentProgress.streak + 1 : 0,
    bestStreak: Math.max(currentProgress.bestStreak, isCorrect ? currentProgress.streak + 1 : 0),
    answers: {
      ...currentProgress.answers,
      [caseItem.id]: {
        selectedAnswer,
        correct: isCorrect,
        answeredAt: now.toISOString()
      }
    },
    weakSigns: { ...currentProgress.weakSigns },
    reviewQueue: [...currentProgress.reviewQueue]
  });

  if (!isCorrect) {
    for (const sign of caseItem.must_know_signs || caseItem.signs || []) {
      nextProgress.weakSigns[sign] = (nextProgress.weakSigns[sign] || 0) + 1;
    }
    nextProgress.reviewQueue = upsertReviewItem(nextProgress.reviewQueue, caseItem.id, now, 0);
  }

  return nextProgress;
}

export function recordReviewResult(progress, caseId, wasCorrect, now = new Date()) {
  const currentProgress = normalizeProgress(progress);
  const nextProgress = normalizeProgress({
    ...currentProgress,
    reviewQueue: [...currentProgress.reviewQueue]
  });
  const existing = nextProgress.reviewQueue.find((item) => item.caseId === caseId);
  if (!existing) return nextProgress;

  if (!wasCorrect) {
    existing.reviewStage = 0;
    existing.nextReviewAt = addDays(now, 1).toISOString();
    existing.mastery_status = 'learning';
    return nextProgress;
  }

  nextProgress.xp += 10;
  existing.reviewStage += 1;
  if (existing.reviewStage >= 3) {
    existing.mastery_status = 'mastered';
    existing.nextReviewAt = null;
  } else {
    const delay = existing.reviewStage === 1 ? 1 : 3;
    existing.mastery_status = 'review_due';
    existing.nextReviewAt = addDays(now, delay).toISOString();
  }
  return nextProgress;
}

export function getStats(progress) {
  const currentProgress = normalizeProgress(progress);
  const accuracy = currentProgress.completed === 0 ? 0 : Math.round((currentProgress.correct / currentProgress.completed) * 100);
  return {
    completed: currentProgress.completed,
    correct: currentProgress.correct,
    accuracy,
    streak: currentProgress.streak,
    bestStreak: currentProgress.bestStreak,
    xp: currentProgress.xp,
    level: Math.floor(currentProgress.xp / 100) + 1
  };
}

export function isBossUnlocked(progress) {
  const stats = getStats(progress);
  return (stats.completed >= 12 && stats.accuracy >= 70) || stats.streak >= 5;
}

export function getDueReviewItems(progress, now = new Date()) {
  return normalizeProgress(progress).reviewQueue.filter((item) => {
    if (item.mastery_status === 'mastered') return false;
    if (!item.nextReviewAt) return true;
    return new Date(item.nextReviewAt) <= now;
  });
}

export function getWeakSigns(progress) {
  return Object.entries(normalizeProgress(progress).weakSigns)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));
}

function upsertReviewItem(queue, caseId, now, reviewStage) {
  const existing = queue.find((item) => item.caseId === caseId);
  if (existing) {
    existing.reviewStage = reviewStage;
    existing.nextReviewAt = addDays(now, 1).toISOString();
    existing.mastery_status = 'learning';
    return queue;
  }
  return [
    ...queue,
    {
      caseId,
      reviewStage,
      nextReviewAt: addDays(now, 1).toISOString(),
      mastery_status: 'learning'
    }
  ];
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function normalizeProgress(progress) {
  const base = createInitialProgress();
  return {
    ...base,
    ...progress,
    answers: isPlainObject(progress?.answers) ? progress.answers : base.answers,
    weakSigns: isPlainObject(progress?.weakSigns) ? progress.weakSigns : base.weakSigns,
    reviewQueue: Array.isArray(progress?.reviewQueue) ? progress.reviewQueue : base.reviewQueue
  };
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

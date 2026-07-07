import { useEffect, useMemo, useState } from 'react';
import Dashboard from './components/Dashboard.jsx';
import TrainingCard from './components/TrainingCard.jsx';
import { allCases } from './data/allCases.js';
import { buildDemoBatch, getContinueTrainingRecommendation } from './lib/batchRouter.js';
import { getImageStatusCounts } from './lib/imageStatus.js';
import { getCaseLifecycleCounts, isReviewEligible } from './lib/trainingEligibility.js';
import {
  getDueReviewItems,
  getStats,
  getWeakSigns,
  isBossUnlocked,
  loadProgress,
  reportCaseIssue,
  recordAnswer,
  saveProgress
} from './lib/progress.js';

export default function App() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [progress, setProgress] = useState(() => loadProgress());
  const [theme, setTheme] = useState(() => loadTheme());
  const stats = useMemo(() => getStats(progress), [progress]);
  const weakSigns = useMemo(() => getWeakSigns(progress), [progress]);
  const dueReviewItems = useMemo(() => getDueReviewItems(progress), [progress]);
  const imageStatusCounts = useMemo(() => getImageStatusCounts(allCases), []);
  const lifecycleCounts = useMemo(() => getCaseLifecycleCounts(allCases), []);
  const sourceReviewCases = useMemo(() => allCases.filter(isReviewEligible), []);
  const casesById = useMemo(
    () => Object.fromEntries(allCases.map((caseItem) => [caseItem.id, caseItem])),
    []
  );
  const bossUnlocked = useMemo(() => isBossUnlocked(progress), [progress]);
  const recommendation = useMemo(
    () => getContinueTrainingRecommendation(progress, allCases),
    [progress]
  );
  const moduleSummaries = useMemo(
    () =>
      ['Daily CT', 'Hard Cases', 'ECG Flashcards'].map((moduleName) => {
        const demoBatch = buildDemoBatch(allCases, moduleName);
        const inProgress = progress.activeBatch?.module === moduleName ? progress.activeBatch : null;
        return {
          title: moduleName,
          demoCount: demoBatch.length,
          completedCount: inProgress?.completedCount || 0,
          totalCount: inProgress?.totalCount || demoBatch.length
        };
      }),
    [progress]
  );

  const moduleCases = useMemo(() => {
    if (!selectedModule) return [];
    return buildDemoBatch(allCases, selectedModule);
  }, [selectedModule]);
  const activeBatchId = useMemo(
    () => (selectedModule ? `${selectedModule.toLowerCase().replace(/\s+/g, '-')}-real-image` : null),
    [selectedModule]
  );

  useEffect(() => {
    document.body.dataset.theme = theme;
    window.localStorage?.setItem('no-mercy-theme', theme);
  }, [theme]);

  function selectModule(moduleName) {
    setSelectedModule(moduleName);
    setCardIndex(0);
  }

  function continueTraining() {
    if (!recommendation.module) return;
    selectModule(recommendation.module);
  }

  function handleCommit(caseItem, selectedAnswer) {
    const nextProgress = recordAnswer(progress, caseItem, selectedAnswer, {
      module: selectedModule,
      batchSize: moduleCases.length,
      batchId: activeBatchId
    });
    setProgress(nextProgress);
    saveProgress(nextProgress);
  }

  function handleReportIssue(caseItem) {
    const nextProgress = reportCaseIssue(progress, caseItem, {
      type: 'other',
      note: 'Flagged from real-image practice card.'
    });
    setProgress(nextProgress);
    saveProgress(nextProgress);
  }

  function nextCard() {
    setCardIndex((current) => (current + 1) % moduleCases.length);
  }

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'night' ? 'day' : 'night'));
  }

  if (selectedModule) {
    const currentCase = moduleCases[cardIndex];
    return (
      <main className="app-shell trainer-layout">
        <div className="top-actions">
          <button className="back-button" onClick={() => setSelectedModule(null)} type="button">
            Back to dashboard
          </button>
          <button className="theme-toggle" onClick={toggleTheme} type="button">
            {theme === 'night' ? 'Day mode' : 'Night mode'}
          </button>
        </div>
        {currentCase && (
          <TrainingCard
            caseItem={currentCase}
            index={cardIndex}
            total={moduleCases.length}
            onCommit={handleCommit}
            onNext={nextCard}
            onReportIssue={handleReportIssue}
          />
        )}
      </main>
    );
  }

  return (
    <main className="app-shell">
      <Dashboard
        stats={stats}
        weakSigns={weakSigns}
        dueReviewItems={dueReviewItems}
        casesById={casesById}
        imageStatusCounts={imageStatusCounts}
        lifecycleCounts={lifecycleCounts}
        sourceReviewCases={sourceReviewCases}
        bossUnlocked={bossUnlocked}
        recommendation={recommendation}
        moduleSummaries={moduleSummaries}
        theme={theme}
        onToggleTheme={toggleTheme}
        onContinueTraining={continueTraining}
        onSelectModule={selectModule}
      />
    </main>
  );
}

function loadTheme() {
  if (typeof window === 'undefined') return 'night';
  return window.localStorage?.getItem('no-mercy-theme') === 'day' ? 'day' : 'night';
}

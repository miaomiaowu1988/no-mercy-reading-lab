import { useMemo, useState } from 'react';
import Dashboard from './components/Dashboard.jsx';
import TrainingCard from './components/TrainingCard.jsx';
import { allCases } from './data/allCases.js';
import { buildDemoBatch, getContinueTrainingRecommendation } from './lib/batchRouter.js';
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
  const stats = useMemo(() => getStats(progress), [progress]);
  const weakSigns = useMemo(() => getWeakSigns(progress), [progress]);
  const dueReviewItems = useMemo(() => getDueReviewItems(progress), [progress]);
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
    () => (selectedModule ? `${selectedModule.toLowerCase().replace(/\s+/g, '-')}-demo` : null),
    [selectedModule]
  );

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
      note: 'Flagged from demo mode card.'
    });
    setProgress(nextProgress);
    saveProgress(nextProgress);
  }

  function nextCard() {
    setCardIndex((current) => (current + 1) % moduleCases.length);
  }

  if (selectedModule) {
    const currentCase = moduleCases[cardIndex];
    return (
      <main className="app-shell trainer-layout">
        <button className="back-button" onClick={() => setSelectedModule(null)} type="button">
          Back to dashboard
        </button>
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
        bossUnlocked={bossUnlocked}
        recommendation={recommendation}
        moduleSummaries={moduleSummaries}
        onContinueTraining={continueTraining}
        onSelectModule={selectModule}
      />
    </main>
  );
}

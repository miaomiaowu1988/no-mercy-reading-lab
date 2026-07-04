import { useMemo, useState } from 'react';
import Dashboard from './components/Dashboard.jsx';
import TrainingCard from './components/TrainingCard.jsx';
import { demoCases } from './data/cases.js';
import {
  getDueReviewItems,
  getStats,
  getWeakSigns,
  isBossUnlocked,
  loadProgress,
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
    () => Object.fromEntries(demoCases.map((caseItem) => [caseItem.id, caseItem])),
    []
  );
  const bossUnlocked = useMemo(() => isBossUnlocked(progress), [progress]);

  const moduleCases = useMemo(() => {
    if (!selectedModule) return [];
    return demoCases.filter((caseItem) => caseItem.module === selectedModule);
  }, [selectedModule]);

  function selectModule(moduleName) {
    setSelectedModule(moduleName);
    setCardIndex(0);
  }

  function handleCommit(caseItem, selectedAnswer) {
    const nextProgress = recordAnswer(progress, caseItem, selectedAnswer);
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
        onSelectModule={selectModule}
      />
    </main>
  );
}

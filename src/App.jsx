import { useMemo, useState } from 'react';
import Dashboard from './components/Dashboard.jsx';
import { demoCases } from './data/cases.js';
import { getStats, getWeakSigns, isBossUnlocked, loadProgress } from './lib/progress.js';

export default function App() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [progress] = useState(() => loadProgress());
  const stats = useMemo(() => getStats(progress), [progress]);
  const weakSigns = useMemo(() => getWeakSigns(progress), [progress]);
  const bossUnlocked = useMemo(() => isBossUnlocked(progress), [progress]);
  const moduleCount = useMemo(() => new Set(demoCases.map((caseItem) => caseItem.module)).size, []);

  if (selectedModule) {
    return (
      <main className="app-shell" data-module-count={moduleCount}>
        <button className="back-button" onClick={() => setSelectedModule(null)} type="button">
          Back to dashboard
        </button>
        <section className="panel">
          <h1>{selectedModule}</h1>
          <p>Training cards arrive in the next task.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell" data-module-count={moduleCount}>
      <Dashboard
        stats={stats}
        weakSigns={weakSigns}
        bossUnlocked={bossUnlocked}
        onSelectModule={setSelectedModule}
      />
    </main>
  );
}

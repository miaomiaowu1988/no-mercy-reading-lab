import ModuleCard from './ModuleCard.jsx';
import ProgressPanel from './ProgressPanel.jsx';
import WeakSignsPanel from './WeakSignsPanel.jsx';

const modules = [
  {
    title: 'Daily CT',
    meta: 'Chest CT',
    description: 'High-yield chest CT pattern recognition.'
  },
  {
    title: 'Hard Cases',
    meta: 'Respiratory reasoning',
    description: 'Difficult respiratory cases and diagnostic traps.'
  },
  {
    title: 'ECG Flashcards',
    meta: 'Respiratory-emergency ECG',
    description: 'Rapid ECG recognition for dyspnea, hypoxemia, PE, and chest pain.'
  }
];

export default function Dashboard({ stats, weakSigns, bossUnlocked, onSelectModule }) {
  return (
    <div className="dashboard">
      <section className="hero-panel">
        <p className="eyebrow">No-Mercy Mode available</p>
        <h1>Dr. Xie's Diagnostic Bootcamp</h1>
        <p className="subtitle">Swipe. Guess. Reveal. Remember.</p>
        <p className="intro">
          Respiratory-focused diagnostic training for chest CT, hard cases, and respiratory-emergency ECG recognition.
        </p>
      </section>

      <ProgressPanel stats={stats} />
      <WeakSignsPanel weakSigns={weakSigns} />

      <section className="module-grid" aria-label="Training modules">
        {modules.map((module) => (
          <ModuleCard key={module.title} {...module} onClick={() => onSelectModule(module.title)} />
        ))}
        <ModuleCard
          title="Boss Case"
          meta="Locked challenge"
          description={
            bossUnlocked
              ? 'Multi-step clinical reasoning challenge unlocked.'
              : 'Complete 12 cases with accuracy >=70% or reach a 5-case streak.'
          }
          locked={!bossUnlocked}
          onClick={() => onSelectModule('Boss Case')}
        />
      </section>
    </div>
  );
}

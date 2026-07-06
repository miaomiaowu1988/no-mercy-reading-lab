import ModuleCard from './ModuleCard.jsx';
import PenaltyReview from './PenaltyReview.jsx';
import ProgressPanel from './ProgressPanel.jsx';
import SourceReviewPanel from './SourceReviewPanel.jsx';
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

export default function Dashboard({
  stats,
  weakSigns,
  dueReviewItems,
  casesById,
  imageStatusCounts,
  lifecycleCounts,
  sourceReviewCases,
  bossUnlocked,
  recommendation,
  moduleSummaries,
  onContinueTraining,
  onSelectModule
}) {
  return (
    <div className="dashboard">
      <section className="hero-panel">
        <p className="eyebrow">No-Mercy Mode available</p>
        <h1>Dr. Xie's Diagnostic Bootcamp</h1>
        <p className="subtitle">Swipe. Guess. Reveal. Remember.</p>
        <p className="intro">
          Respiratory-focused diagnostic training for chest CT, hard cases, and respiratory-emergency ECG recognition.
        </p>
        <div className="hero-actions">
          <button className="primary-action continue-action" onClick={onContinueTraining} type="button">
            Continue Training
          </button>
          <p className="recommendation-copy">
            {recommendation?.module ? `Today's recommendation: ${recommendation.module}. ${recommendation.reason}` : 'Pick any module to start a demo batch.'}
          </p>
        </div>
      </section>

      <ProgressPanel stats={stats} />
      <section className="panel image-status-panel">
        <h2>Case Pipeline</h2>
        <p className="muted">Formal training only admits reviewed, matched, real-source images.</p>
        <div className="image-status-grid">
          <div>
            <span>Total cases</span>
            <strong>{lifecycleCounts?.total || 0}</strong>
          </div>
          <div>
            <span>Synthetic demo</span>
            <strong>{lifecycleCounts?.syntheticDemo || 0}</strong>
          </div>
          <div>
            <span>Auto draft</span>
            <strong>{lifecycleCounts?.autoDraft || 0}</strong>
          </div>
          <div>
            <span>Real source draft</span>
            <strong>{lifecycleCounts?.realSourceDraft || 0}</strong>
          </div>
          <div>
            <span>Reviewed real</span>
            <strong>{lifecycleCounts?.reviewedRealCase || 0}</strong>
          </div>
          <div>
            <span>Formal eligible</span>
            <strong>{lifecycleCounts?.formalEligible || 0}</strong>
          </div>
          <div>
            <span>Real images</span>
            <strong>{imageStatusCounts?.real || 0}</strong>
          </div>
          <div>
            <span>Placeholder images</span>
            <strong>{imageStatusCounts?.placeholder || 0}</strong>
          </div>
          <div>
            <span>Missing images</span>
            <strong>{imageStatusCounts?.missing || 0}</strong>
          </div>
          <div>
            <span>Failed load</span>
            <strong>{imageStatusCounts?.failed_load || 0}</strong>
          </div>
        </div>
        <p className="maturity-copy">
          Formal eligible / Total: {lifecycleCounts?.formalEligible || 0}/{lifecycleCounts?.total || 0}. Reviewed real / Real images:{' '}
          {lifecycleCounts?.reviewedRealCase || 0}/{imageStatusCounts?.real || 0}.
        </p>
      </section>
      <SourceReviewPanel cases={sourceReviewCases || []} />
      <WeakSignsPanel weakSigns={weakSigns} />
      <PenaltyReview dueItems={dueReviewItems} casesById={casesById} />

      <section className="module-grid" aria-label="Training modules">
        {modules.map((module) => {
          const summary = moduleSummaries.find((item) => item.title === module.title);
          return (
            <ModuleCard
              key={module.title}
              {...module}
              demoCount={summary?.demoCount || 0}
              completedCount={summary?.completedCount || 0}
              totalCount={summary?.totalCount || summary?.demoCount || 0}
              onClick={() => onSelectModule(module.title)}
            />
          );
        })}
        <ModuleCard
          title="Boss Case"
          meta="Locked challenge"
          description={
            bossUnlocked
              ? 'Multi-step clinical reasoning challenge unlocked.'
              : 'Complete 12 cases with accuracy >=70% or reach a 5-case streak.'
          }
          demoCount={4}
          completedCount={0}
          totalCount={4}
          locked={!bossUnlocked}
          onClick={() => onSelectModule('Boss Case')}
        />
      </section>
    </div>
  );
}

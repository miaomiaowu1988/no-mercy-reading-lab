export default function ProgressPanel({ stats }) {
  return (
    <section className="panel stats-grid" aria-label="Progress">
      <div>
        <span>Level</span>
        <strong>{stats.level}</strong>
      </div>
      <div>
        <span>Accuracy</span>
        <strong>{stats.accuracy}%</strong>
      </div>
      <div>
        <span>Streak</span>
        <strong>{stats.streak}</strong>
      </div>
      <div>
        <span>XP</span>
        <strong>{stats.xp}</strong>
      </div>
    </section>
  );
}

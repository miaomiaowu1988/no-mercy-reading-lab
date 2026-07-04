export default function ModuleCard({ title, description, meta, locked, onClick }) {
  return (
    <button className={`module-card ${locked ? 'locked' : ''}`} onClick={onClick} disabled={locked} type="button">
      <span className="module-meta">{meta}</span>
      <strong>{title}</strong>
      <span>{description}</span>
      {locked && <em>Locked clinical challenge</em>}
    </button>
  );
}

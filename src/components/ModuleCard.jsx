export default function ModuleCard({
  title,
  description,
  meta,
  demoCount,
  completedCount,
  totalCount,
  locked,
  onClick
}) {
  const statusText =
    completedCount > 0 && totalCount > 0
      ? `${completedCount}/${totalCount} answered in current real-image set`
      : `${demoCount} real-image cases available`;

  return (
    <button className={`module-card ${locked ? 'locked' : ''}`} onClick={onClick} disabled={locked} type="button">
      <span className="module-meta">{meta}</span>
      <strong>{title}</strong>
      <span>{description}</span>
      <small className="module-status">{statusText}</small>
      {locked && <em>Locked clinical challenge</em>}
    </button>
  );
}

export default function WeakSignsPanel({ weakSigns }) {
  const signs = weakSigns.length
    ? weakSigns
    : [
        { name: 'Tree-in-bud', count: 0 },
        { name: 'Mosaic attenuation', count: 0 },
        { name: 'Right heart strain', count: 0 }
      ];

  return (
    <section className="panel">
      <h2>Your Weak Signs Today</h2>
      <ol className="weak-signs">
        {signs.map((sign) => (
          <li key={sign.name}>
            <span>{sign.name}</span>
            <small>{sign.count ? `${sign.count} miss${sign.count > 1 ? 'es' : ''}` : 'watchlist'}</small>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function PenaltyReview({ dueItems, casesById }) {
  return (
    <section className="panel penalty-panel">
      <h2>Penalty Review</h2>
      {dueItems.length === 0 ? (
        <p className="muted">No cases due. The lab is quiet for now.</p>
      ) : (
        <ul className="review-list">
          {dueItems.map((item) => {
            const caseItem = casesById[item.caseId];
            return (
              <li key={item.caseId}>
                <strong>{caseItem?.title || item.caseId}</strong>
                <span>
                  Stage {item.reviewStage + 1}/3 · {item.mastery_status}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

import { useState } from 'react';
import CaseVisual from './CaseVisual.jsx';

export default function TrainingCard({ caseItem, index, total, onCommit, onNext }) {
  const [selected, setSelected] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = submitted && selected === caseItem.answer;

  function commit() {
    if (!selected) return;
    setSubmitted(true);
    onCommit(caseItem, selected);
  }

  function next() {
    setSelected('');
    setSubmitted(false);
    onNext();
  }

  return (
    <article className="training-card">
      <header className="case-header">
        <span>{caseItem.module}</span>
        <span>
          {index + 1}/{total}
        </span>
      </header>

      <CaseVisual visual={caseItem.visual} modality={caseItem.modality} />

      <section className="case-body">
        <p className="case-meta">
          {caseItem.modality} · {caseItem.difficulty} · {caseItem.chief_skill}
        </p>
        <h2>{caseItem.title}</h2>
        <p>{caseItem.history}</p>
        <h3>{caseItem.question}</h3>
        <div className="option-grid">
          {caseItem.options.map((option) => (
            <button
              key={option}
              className={`option ${selected === option ? 'selected' : ''}`}
              onClick={() => setSelected(option)}
              disabled={submitted}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>

        {!submitted ? (
          <button className="primary-action" onClick={commit} disabled={!selected} type="button">
            Commit Answer
          </button>
        ) : (
          <section className={`reveal-panel ${isCorrect ? 'correct' : 'wrong'}`}>
            <p className="result-line">
              {isCorrect ? 'Correct. You survived this case.' : 'Penalty Review updated.'}
            </p>
            <h3>Diagnosis: {caseItem.answer}</h3>
            <div className="chip-row">
              {caseItem.signs.map((sign) => (
                <span key={sign}>{sign}</span>
              ))}
            </div>
            <h4>Reasoning Steps</h4>
            <ol>
              {caseItem.reasoning_steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <h4>Common Trap</h4>
            <p>{caseItem.common_trap}</p>
            <h4>Must Not Miss</h4>
            <p>{caseItem.must_not_miss}</p>
            <h4>Explanation</h4>
            <p>{caseItem.explanation}</p>
            <button className="primary-action" onClick={next} type="button">
              Again, Doctor
            </button>
          </section>
        )}
      </section>
    </article>
  );
}

import { useEffect, useState } from 'react';
import CaseVisual from './CaseVisual.jsx';
import { getImageStatus, getImageStatusLabel } from '../lib/imageStatus.js';

export default function TrainingCard({ caseItem, index, total, onCommit, onNext, onReportIssue }) {
  const [selected, setSelected] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [reported, setReported] = useState(false);
  const [imageStatus, setImageStatus] = useState(() => getImageStatus(caseItem));
  const isCorrect = submitted && selected === caseItem.answer;
  const batchLabel =
    caseItem.content_type === 'real_source_draft'
      ? 'Real-image practice'
      : imageStatus === 'placeholder'
        ? 'Synthetic demo batch'
        : getImageStatusLabel(imageStatus);
  const showImageNotice = imageStatus !== 'real';

  useEffect(() => {
    setImageStatus(getImageStatus(caseItem));
  }, [caseItem]);

  function commit() {
    if (!selected) return;
    setSubmitted(true);
    onCommit(caseItem, selected);
  }

  function next() {
    setSelected('');
    setSubmitted(false);
    setReported(false);
    onNext();
  }

  function reportIssue() {
    onReportIssue?.(caseItem);
    setReported(true);
  }

  return (
    <article className="training-card">
      <header className="case-header">
        <div>
          <strong>{caseItem.module}</strong>
          <p className={`batch-label image-status-${imageStatus}`}>{batchLabel}</p>
        </div>
        <div className="case-progress">
          <span>
            {index + 1}/{total}
          </span>
          <small>{Math.round(((index + 1) / total) * 100)}% through this set</small>
        </div>
      </header>

      <CaseVisual
        caseItem={caseItem}
        image={caseItem.image}
        visual={caseItem.visual}
        modality={caseItem.modality}
        onImageStatusChange={setImageStatus}
      />

      <section className="case-body">
        {showImageNotice && (
          <div className={`image-notice image-status-${imageStatus}`}>
            <strong>{getImageStatusLabel(imageStatus)}</strong>
            <span>Skip this card until the image is available.</span>
          </div>
        )}
        <p className="case-meta">
          {caseItem.modality} · {caseItem.difficulty} · {caseItem.chief_skill}
        </p>
        <h2>{caseItem.title}</h2>
        <p>{caseItem.history}</p>
        <div className="case-actions">
          <button className="secondary-action report-action" onClick={reportIssue} type="button">
            {reported ? 'Issue reported' : 'Report issue'}
          </button>
        </div>
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
            Submit
          </button>
        ) : (
          <section className={`reveal-panel ${isCorrect ? 'correct' : 'wrong'}`}>
            <p className="result-line">
              {isCorrect ? 'Correct' : 'Review this one again'}
            </p>
            <h3>{caseItem.answer}</h3>
            <div className="chip-row">
              {caseItem.signs.map((sign) => (
                <span key={sign}>{sign}</span>
              ))}
            </div>
            <h4>Basic Knowledge + Differential</h4>
            <p>{caseItem.explanation}</p>
            <h4>Differential</h4>
            <div className="chip-row">
              {caseItem.differential.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <h4>Reasoning</h4>
            <ol>
              {caseItem.reasoning_steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="compact-note">
              Watch for: {caseItem.common_trap} {caseItem.must_not_miss}
            </p>
            {caseItem.source?.url && (
              <p className="source-note">
                Source: {caseItem.source.account || caseItem.source.title}{' '}
                <a href={caseItem.source.url} target="_blank" rel="noreferrer">
                  original link
                </a>
              </p>
            )}
            <div className="reveal-actions">
              <button className="secondary-action report-action" onClick={reportIssue} type="button">
                {reported ? 'Issue reported' : 'Report issue'}
              </button>
              <button className="primary-action" onClick={next} type="button">
                Next case
              </button>
            </div>
          </section>
        )}
      </section>
    </article>
  );
}

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
      ? 'Real-image source review batch'
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
            <span>
              {imageStatus === 'placeholder'
                ? 'This case is for workflow demonstration only; image findings are not represented by the visual.'
                : imageStatus === 'missing'
                  ? 'This case has no displayable source image and is not eligible for formal training.'
                  : 'The source image could not be loaded and is not eligible for formal training.'}
            </span>
          </div>
        )}
        {caseItem.content_type === 'real_source_draft' && (
          <div className="source-banner">
            <strong>Source draft</strong>
            <span>AI-generated draft, not medically reviewed. Private learning use only.</span>
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
            {caseItem.source?.url && (
              <p className="source-note">
                Source: {caseItem.source.account || caseItem.source.title}{' '}
                <a href={caseItem.source.url} target="_blank" rel="noreferrer">
                  original link
                </a>
              </p>
            )}
            {caseItem.image_credit && <p className="source-note">{caseItem.image_credit}</p>}
            <div className="reveal-actions">
              <button className="secondary-action report-action" onClick={reportIssue} type="button">
                {reported ? 'Issue reported' : 'Report issue'}
              </button>
              <button className="primary-action" onClick={next} type="button">
                Again, Doctor
              </button>
            </div>
          </section>
        )}
      </section>
    </article>
  );
}

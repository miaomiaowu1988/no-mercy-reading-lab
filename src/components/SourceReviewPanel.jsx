import { getImageStatusLabel } from '../lib/imageStatus.js';
import {
  getCaseSourceStage,
  getCaseSourceStageLabel,
  getTrainingEligibility,
  isFormalTrainingEligible
} from '../lib/trainingEligibility.js';

export default function SourceReviewPanel({ cases }) {
  const reviewCases = cases.slice(0, 6);

  return (
    <section className="panel source-review-panel">
      <div className="section-heading">
        <div>
          <h2>Source Review</h2>
          <p className="muted">Audit source cases before they become formal training.</p>
        </div>
      </div>
      <div className="review-case-list">
        {reviewCases.map((caseItem) => {
          const stage = getCaseSourceStage(caseItem);
          return (
            <article className="review-case" key={caseItem.id}>
              <div>
                <strong>{caseItem.title}</strong>
                <p>{getCaseSourceStageLabel(stage)}</p>
              </div>
              <dl>
                <div>
                  <dt>image_status</dt>
                  <dd>{getImageStatusLabel(caseItem.image_status)}</dd>
                </div>
                <div>
                  <dt>source_type</dt>
                  <dd>{caseItem.source_type || 'unknown'}</dd>
                </div>
                <div>
                  <dt>image_license</dt>
                  <dd>{caseItem.image_license || 'unknown'}</dd>
                </div>
                <div>
                  <dt>medical_review</dt>
                  <dd>{caseItem.medical_review_status || 'unreviewed'}</dd>
                </div>
                <div>
                  <dt>alignment</dt>
                  <dd>{caseItem.image_text_alignment || 'unknown'}</dd>
                </div>
                <div>
                  <dt>eligibility</dt>
                  <dd>{getTrainingEligibility(caseItem)}</dd>
                </div>
                <div>
                  <dt>public_demo</dt>
                  <dd>{String(caseItem.public_demo_allowed === true)}</dd>
                </div>
              </dl>
              <span className={`review-badge ${isFormalTrainingEligible(caseItem) ? 'ready' : 'blocked'}`}>
                {isFormalTrainingEligible(caseItem) ? 'formal ready' : 'review gate'}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}

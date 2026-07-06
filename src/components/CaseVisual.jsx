import { useEffect, useState } from 'react';
import { getImageStatus } from '../lib/imageStatus.js';

export default function CaseVisual({ caseItem, image, visual, modality, onImageStatusChange }) {
  const isEcg = modality === 'ECG';
  const [imageLoadFailed, setImageLoadFailed] = useState(false);
  const imageStatus = getImageStatus(caseItem || { image }, imageLoadFailed);
  const hasSourceImage = image?.src && imageStatus === 'real';

  useEffect(() => {
    setImageLoadFailed(false);
  }, [image?.src]);

  useEffect(() => {
    onImageStatusChange?.(imageStatus);
  }, [imageStatus, onImageStatusChange]);

  return (
    <div className={`case-visual ${isEcg ? 'ecg-visual' : 'ct-visual'} ${visual || ''}`}>
      {hasSourceImage ? (
        <img
          className="source-case-image"
          src={image.src}
          alt={image.alt || 'Source case image'}
          onError={() => setImageLoadFailed(true)}
        />
      ) : imageStatus === 'failed_load' ? (
        <div className="image-state-message">Image failed to load.</div>
      ) : imageStatus === 'missing' ? (
        <div className="image-state-message">Image missing.</div>
      ) : isEcg ? (
        <svg viewBox="0 0 640 220" role="img" aria-label="Synthetic ECG educational waveform">
          <polyline
            points="0,110 45,110 55,96 65,124 78,110 130,110 145,65 160,154 176,110 230,110 250,102 270,118 290,110 350,110 365,75 380,150 396,110 455,110 470,98 490,120 512,110 640,110"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <div className="ct-scan" aria-label="Synthetic chest CT educational placeholder">
          <span className="visual-badge">Synthetic visual</span>
          <span className="lung left" />
          <span className="lung right" />
          <span className="lesion lesion-a" />
          <span className="lesion lesion-b" />
        </div>
      )}
      <div className="visual-toolbar">
        <span>WL 420</span>
        <span>WW 1500</span>
        <span>{hasSourceImage ? 'Source image' : imageStatus === 'placeholder' ? 'Synthetic visual' : 'No image'}</span>
      </div>
      {imageStatus === 'placeholder' && (
        <p className="visual-disclaimer">Synthetic visual. Not a diagnostic image.</p>
      )}
    </div>
  );
}

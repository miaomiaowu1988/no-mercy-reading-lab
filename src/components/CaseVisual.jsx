export default function CaseVisual({ visual, modality }) {
  const isEcg = modality === 'ECG';

  return (
    <div className={`case-visual ${isEcg ? 'ecg-visual' : 'ct-visual'} ${visual || ''}`}>
      {isEcg ? (
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
          <span className="lung left" />
          <span className="lung right" />
          <span className="lesion lesion-a" />
          <span className="lesion lesion-b" />
        </div>
      )}
      <div className="visual-toolbar">
        <span>WL 420</span>
        <span>WW 1500</span>
        <span>Slice 18/42</span>
      </div>
    </div>
  );
}

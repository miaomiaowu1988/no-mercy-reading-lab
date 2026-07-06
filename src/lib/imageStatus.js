const IMAGE_STATUS_LABELS = {
  real: 'Real source image',
  placeholder: 'Demo placeholder',
  missing: 'Image missing',
  failed_load: 'Image failed to load'
};

const EMPTY_COUNTS = {
  real: 0,
  placeholder: 0,
  missing: 0,
  failed_load: 0
};

export function getImageStatus(caseItem, imageLoadFailed = false) {
  if (imageLoadFailed) return 'failed_load';

  if (caseItem?.image_status && IMAGE_STATUS_LABELS[caseItem.image_status]) {
    return caseItem.image_status;
  }

  const hasImage = Boolean(caseItem?.image?.src);
  if (hasImage && caseItem?.image_license !== 'placeholder') return 'real';

  if (caseItem?.content_type === 'synthetic_demo' || caseItem?.image_license === 'placeholder') {
    return 'placeholder';
  }

  if (!hasImage) return 'missing';

  return 'failed_load';
}

export function hasMissingImage(caseItem, imageLoadFailed = false) {
  const status = getImageStatus(caseItem, imageLoadFailed);
  return caseItem?.image_missing === true || status === 'placeholder' || status === 'missing' || status === 'failed_load';
}

export function getImageStatusLabel(status) {
  return IMAGE_STATUS_LABELS[status] || IMAGE_STATUS_LABELS.missing;
}

export function getImageStatusCounts(cases) {
  return cases.reduce(
    (counts, caseItem) => {
      const status = getImageStatus(caseItem);
      counts[status] += 1;
      return counts;
    },
    { ...EMPTY_COUNTS }
  );
}

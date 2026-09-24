// Shared formatting helpers — single source of truth for number/percent formatting.

const isNil = (value) => value === null || value === undefined || Number.isNaN(value);

export const formatPrice = (price, digits = 2) => {
  if (isNil(price)) return 'N/A';
  return price.toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
};

export const formatNumber = (num) => {
  if (isNil(num)) return 'N/A';
  return num.toLocaleString('en-US');
};

export const formatCompact = (num) => {
  if (isNil(num)) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(num);
};

export const formatUsd = (num, digits = 2) => {
  if (isNil(num)) return 'N/A';
  return `$${formatPrice(num, digits)}`;
};

export const formatPercent = (num, digits = 2) => {
  if (isNil(num)) return 'N/A';
  const sign = num >= 0 ? '+' : '';
  return `${sign}${num.toFixed(digits)}%`;
};

// Returns the tailwind text color class for a numeric change (keeps the site's emerald/red scheme).
export const percentClass = (num) => (num >= 0 ? 'text-emerald-500' : 'text-red-500');

import PropTypes from 'prop-types';

// Rounded percentage pill — emerald for gains, red for losses.
const ChangeBadge = ({ value, suffix = '%', className = '' }) => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 ${className}`}>
        N/A
      </span>
    );
  }
  const positive = value >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold tabular-nums ${
        positive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-50 text-red-600'
      } ${className}`}
    >
      {positive ? '▲' : '▼'} {Math.abs(value).toFixed(2)}{suffix}
    </span>
  );
};

ChangeBadge.propTypes = {
  value: PropTypes.number,
  suffix: PropTypes.string,
  className: PropTypes.string,
};

export default ChangeBadge;

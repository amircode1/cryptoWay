import PropTypes from 'prop-types';

// Statistic block used in coin / NFT detail sections.
const StatCard = ({ label, value, change, changeClass = 'text-emerald-500', children }) => {
  return (
    <div className="p-4 rounded-lg border-2 border-emerald-300 bg-gradient-to-b from-white to-emerald-50/60">
      <div className="text-sm text-emerald-600 font-medium">{label}</div>
      <div className="text-lg font-semibold text-gray-900 tabular-nums">{value}</div>
      {change !== undefined && change !== null && (
        <div className={`text-sm font-semibold ${changeClass}`}>{change}</div>
      )}
      {children}
    </div>
  );
};

StatCard.propTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.node,
  change: PropTypes.node,
  changeClass: PropTypes.string,
  children: PropTypes.node,
};

export default StatCard;

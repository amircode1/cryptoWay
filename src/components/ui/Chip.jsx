import PropTypes from 'prop-types';

// Small pill/tag used for categories and labels.
const Chip = ({ children, className = '' }) => {
  return (
    <span className={`px-2 py-1 text-xs bg-emerald-100 text-emerald-800 rounded-full ${className}`}>
      {children}
    </span>
  );
};

Chip.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Chip;

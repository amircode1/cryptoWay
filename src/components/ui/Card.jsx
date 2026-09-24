import PropTypes from 'prop-types';

// Shared card shell — keeps the site's emerald border/white background look.
// Pass hover to get a soft lift + deeper shadow on hover.
const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div
      className={`bg-white rounded-xl border-2 border-emerald-300 shadow-card transition-all duration-300 ${
        hover ? 'hover:shadow-card-hover hover:-translate-y-0.5' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hover: PropTypes.bool,
};

export default Card;

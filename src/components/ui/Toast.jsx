import PropTypes from 'prop-types';

// Fixed-position notification toast.
const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white animate-[fadeIn_0.2s_ease-in]"
      style={{
        background: type === 'error' ? '#dc2626' : '#10b981',
      }}
    >
      <span className="text-sm font-medium">{message}</span>
      {onClose && (
        <button onClick={onClose} className="text-white/80 hover:text-white text-lg leading-none">
          &times;
        </button>
      )}
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.node,
  type: PropTypes.oneOf(['success', 'error']),
  onClose: PropTypes.func,
};

export default Toast;

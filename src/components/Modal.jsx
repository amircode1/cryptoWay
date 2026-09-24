import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl leading-none"
        >
          &times;
        </button>

        <div className="mb-4">
          <h1 className="text-lg md:text-xl font-bold text-center text-emerald-800">
            API rate limit reached
          </h1>
          <p className="text-center text-gray-600 text-sm mt-2">
            This API has a request limit per minute — please wait a minute and try again.
            The probability of encountering a problem is high.
          </p>
        </div>

        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;

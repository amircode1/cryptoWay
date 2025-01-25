import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 md:p-6 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 max-w-2xl">
        <h1 className='text-center text-xl md:text-2xl lg:text-3xl mb-2'>this api have limit request per minute please wait a minute </h1>
        <h1 className='text-center text-xl md:text-2xl lg:text-3xl'>The probability of encountering a problem is high.</h1>
        <button onClick={onClose} className="float-right text-gray-600 hover:text-gray-800 text-2xl md:text-3xl">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
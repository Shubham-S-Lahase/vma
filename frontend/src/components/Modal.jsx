import React from 'react';

const Modal = ({ toggleModal, children }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={toggleModal}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 focus:outline-none"
          onClick={toggleModal}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
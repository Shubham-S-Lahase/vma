import React from 'react';
import './Modal.css';

const Modal = ({ toggleModal, children }) => {
  return (
    <div className="modal-overlay" onClick={toggleModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={toggleModal}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

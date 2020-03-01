import React from 'react';
import './modal.scss';

const Modal = ({ show, setOpen, title }) => {
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <div className={`modal__container ${show ? 'modal__show' : 'modal__fade'}`}>
      <div className="modal">
        <div className="modal__head">
            <span>{title}</span>
        </div>
        <div className="modal__body">
          <textarea name="" id="" cols="30" rows="10" />
        </div>
        <div className="modal__foot">
          <button>Postularme</button>
          <button onClick={closeModal}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

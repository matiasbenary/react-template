import React from "react";
import "./modal.scss";

const UnapplyModal = ({ closeModal, title, send }) => {
  const save = () => {
    send();
    closeModal();
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">{`Despotularme de para ${title}`}</h5>
        <button
          type="button"
          className="close"
          onClick={closeModal}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        Desea cancelar la participacion en la iniciativa Que te parece
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={closeModal}
          data-dismiss="modal"
        >
          Cancelar
        </button>
        <button type="button" className="btn btn-primary" onClick={save}>
          No deseo participar
        </button>
      </div>
    </div>
  );
};

export default UnapplyModal;

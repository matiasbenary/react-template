import React from 'react';
import Form from './AddHours/Form';

const AddHoursModal = ({ closeModal }) => (
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title">Agregar Hora</h5>
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
      <Form closeModal={closeModal} />
    </div>
  </div>
);

export default AddHoursModal;

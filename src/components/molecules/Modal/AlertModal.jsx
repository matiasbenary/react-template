import React from 'react';
import './modal.scss';

const AlertModal = ({ closeModal, title, message }) => (
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLongTitle">
        {title}
      </h5>
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
      <p>{message}</p>
    </div>
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-secondary"
        onClick={closeModal}
        data-dismiss="modal"
      >
        Close
      </button>
      <button type="button" className="btn btn-primary">
        Save changes
      </button>
    </div>
  </div>
);

export default AlertModal;

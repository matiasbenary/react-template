import React, { useState } from 'react';
import './modal.scss';

const ApplyModal = ({ closeModal, title, send }) => {
  const [commentary, setCommentary] = useState('');
  const onChange = (e) => {
    setCommentary(e.target.value);
  };

  const save = () => {
    send(commentary);
    closeModal();
  };

  return (
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title">
        {`Postularme para ${title}`}
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
      <div className="form-group">
        <label htmlFor="message-text" className="col-form-label">
          Comentarios:
        </label>
        <textarea className="form-control" id="message-text" value={commentary} onChange={onChange} />
      </div>
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
        Quiero participar
      </button>
    </div>
  </div>
);
};

export default ApplyModal;

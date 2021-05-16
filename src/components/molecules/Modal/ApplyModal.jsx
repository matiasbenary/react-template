import React, { useState } from 'react';
import Form from './applyModal/Forms';
import './modal.scss';

const ApplyModal = ({ closeModal, title, send,forms}) => {
  const [commentary, setCommentary] = useState('');
  const [formsSend, setFormsSend] = useState([]);
  const onChange = (e) => {
    setCommentary(e.target.value);
  };

  const save = () => {
    const aux = [];
    for (const form in formsSend) {
      aux.push({id:form,value:typeof formsSend[form] === "object"?formsSend[form].value:formsSend[form]})
    }

    send(commentary,aux);
    closeModal();
  };

  const setAnswers = (name) => (value)=>{
    setFormsSend({ ...formsSend, [name]: value });
  }

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">{`Postularme para ${title}`}</h5>
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
            Ingrese un comentario para participar:
          </label>
          <textarea
            style={{ border: commentary.length ? '' : '1px solid #dc3545' }}
            className="form-control"
            id="message-text"
            value={commentary}
            onChange={onChange}
          />
        </div>
        {forms && forms.map(form=><Form key={`formApply${form.id}`} form={form} setAnswers={setAnswers}/>)}
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
        <button
          type="button"
          className="btn btn-primary"
          onClick={save}
          disabled={!commentary.length}
        >
          Quiero participar
        </button>
      </div>
    </div>
  );
};

export default ApplyModal;

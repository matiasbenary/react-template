import React, { useState } from 'react';
import './modal.scss';
import StepOne from './commentaryModal/StepOne';
import StepTwo from './commentaryModal/StepTwo';

const CommentaryModal = ({ closeModal, url, activity_id }) => {
  const [commentary, setCommentary] = useState('');

  const [step, setStep] = useState(0);

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Comentario final de la experiencia</h5>
        <button
          type="button"
          className="close"
          onClick={closeModal}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      {!step ? (
        <StepOne
          commentary={commentary}
          setCommentary={setCommentary}
          closeModal={closeModal}
          setStep={setStep}
        />
      ) : (
        <StepTwo
          commentary={commentary}
          setStep={setStep}
          url={url}
          activity_id={activity_id}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default CommentaryModal;

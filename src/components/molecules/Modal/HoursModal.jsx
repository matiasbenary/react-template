import React from "react";
import HoursForm from "../Forms/HoursForm";
import "./modal.scss";

const HoursModal = ({ closeModal, title, activity_id }) => (
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title">{title}</h5>
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
      <HoursForm closeModal={closeModal} activity_id={activity_id} />
    </div>
  </div>
);

export default HoursModal;

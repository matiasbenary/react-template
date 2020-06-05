import React from 'react';
import ReactModal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../../store/ducks/modal.duck';
import modalTypes from '.';

const MODAL_TYPES = {
  alert: modalTypes.AlertModal,
  apply: modalTypes.ApplyModal,
  unapply: modalTypes.UnapplyModal,
  hoursLoad: modalTypes.HoursModal,
};

const ModalRoot = () => {
  const { modalType, modalProps } = useSelector((state) => state.modal);
  const dispatch = useDispatch();


  if (!modalType) {
    return null;
  }

  const SpecifiedModal = MODAL_TYPES[modalType];

  const closeModal = () => {
    dispatch(actions.modalHide());
  };

  return (
    <ReactModal
      isOpen={modalProps.open}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      ariaHideApp={false}
      bodyOpenClassName="modal-open"
      className="modal-dialog"
    >
      <SpecifiedModal closeModal={closeModal} {...modalProps} />
    </ReactModal>
  );
};

export default ModalRoot;

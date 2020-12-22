import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import Form from '../../../../molecules/Form';
import Input from '../../../../molecules/Form/components/Input';
import SubmitButton from '../../../../molecules/Form/components/SubmitButton';
import TextArea from '../../../../molecules/Form/components/TextArea';
import Hours from '../../../../molecules/Form/components/Hours';
import { apiCall } from '../../../../../crud/api.crud';

const EditModal = ({ data }) => {
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => setIsOpen(true), [data]);

  const closeModal = () => setIsOpen(false);

  const save = async (values) => {
    await apiCall(`activityHours/${data.id}`, values, 'POST');
    closeModal();
  };

  if (!data) return null;
  return (
    <ReactModal
      isOpen={!!data && isOpen}
      contentLabel="Example Modal"
      ariaHideApp={false}
      bodyOpenClassName="modal-open"
      className="modal-dialog"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Editar Hora</h5>
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
          <Form
            className="form"
            submit={save}
            defaultValue={{
              hours: data.horas,
              activity_day: data.fecha,
              commentary: data.commentary,
            }}
          >
            <div className="row">
              <div className="col-md-6  mb-4">
                <Hours
                  label="Horas"
                  name="hours"
                  validations={[
                    { key: 'required', val: true },
                  ]}
                />
              </div>
              <div className="col-md-6  mb-4">
                <Input
                  label="Fecha"
                  name="activity_day"
                  type="date"
                  validations={[
                    { key: 'required', val: true },
                    { key: 'only_numbers', val: true },
                  ]}
                />
              </div>
              <div className="col-md-12 mb-4">
                <TextArea
                  label="Cuéntanos qué tareas realizaste"
                  name="commentary"
                  type="date"
                  validations={[
                    { key: 'required', val: true },
                  ]}
                />
              </div>
            </div>
            <SubmitButton />
          </Form>
        </div>
      </div>

    </ReactModal>
  );
};

export default EditModal;

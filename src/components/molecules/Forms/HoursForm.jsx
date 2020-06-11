import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { CustomDateInput, CustomTextarea } from './CustomInputs';
import { actions } from '../../../store/ducks/hours/loadHours.duck';
import './forms.scss';

const HoursForm = ({ closeModal, activity_id }) => {
  const [count, setCount] = useState(0);
  const [initialValues, setInitialValues] = useState({
    hours: 0,
    minutes: 0,
    createdOn: null,
    commentary: null,
  });

  const dispatch = useDispatch();

  const { user_id, loading } = useSelector((state) => ({
    user_id: state.auth.user.id,
    loading: state.loadHours.loadingAdd,
  }));

  const increment = () => {
    setCount(count + 1);
    setInitialValues({ ...initialValues, hours: count + 1 });
  };

  const decrement = () => {
    if (count <= 0) {
      return;
    }
    setCount(count - 1);
    setInitialValues({ ...initialValues, hours: count - 1 });
  };

  const validationForm = Yup.object({
    hours: Yup.number().required('Requerido'),
    minutes: Yup.number()
      .oneOf([0, 15, 30, 45], 'Opción invalida')
      .required('Requerido'),
    createdOn: Yup.date('Debe ingresar una fecha válida')
      .required('Requerido')
      .nullable(),
    commentary: Yup.string('')
      .min(3, 'Agregar comentario')
      .max(300, 'Comentario demasiado extenso')
      .required('Requerido')
      .nullable(),
  });

  const createPayload = (values) => ({
    user_id,
    activity_id,
    hours: values.hours + values.minutes / 60,
    activity_day: values.createdOn,
    upload_type: process.env.REACT_APP_ID_ENTITY,
    commentary: values.commentary,
  });

  // const hoursOptions = [0, 15, 30, 45];
  // const options = hoursOptions.map((o, i) => <option key={i}>{o}</option>);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationForm}
      onSubmit={(values, { setSubmitting }) => {
        const payload = createPayload(values);
        setTimeout(() => {
          dispatch(actions.addHours(payload));
          setSubmitting(loading);
          closeModal();
        }, 2000);
      }}
      enableReinitialize
    >
      {({
 values, handleSubmit, handleChange, isSubmitting,
}) => (
        <Form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-row">
              <div className="col col-md-4">
                <label htmlFor="horas">Horas:</label>
                <div className="form-row">
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary form_buttons"
                      onClick={decrement}
                    >
                      -
                    </button>
                  </div>
                  <div className="col-sm-5">
                    <Field
                      type="number"
                      name="hours"
                      className="form-control"
                      value={values.hours}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary form_buttons"
                      onClick={increment}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* <div className="col col-md-2">
                            <label htmlFor="minutes">Minutos:</label>
                            <Field
                                as="select"
                                className="form-control"
                                name="minutes"
                                onChange={handleChange}
                            >
                                {options}
                            </Field>
                        </div> */}

              <Field
                label="Fecha:"
                name="createdOn"
                component={CustomDateInput}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <Field
              label="Comentarios:"
              name="commentary"
              component={CustomTextarea}
              onChange={handleChange}
            />
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
            <button type="submit" className="btn btn-primary">
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default HoursForm;

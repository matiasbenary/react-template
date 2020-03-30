import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { createSelector } from 'reselect';
import Loader from 'react-spinners/PropagateLoader';
import Loading from '../../molecules/Loading';
import { actions } from '../../../store/ducks/auth.duck';
import WarningSpan from '../../molecules/WarningSpan';

const Img = styled.img`
  width: ${(props) => props.width || '100%'};
  margin-bottom: 3rem;
  display: block;
`;

const loadingReset = (state) => state.auth.loadingReset;
const msjReset = (state) => state.auth.msjReset;
const errorReset = (state) => state.auth.errorReset;

const loadingSelector = () => createSelector(loadingReset, (loading) => loading);

const msjSelector = () => createSelector(msjReset, (msj) => msj);

const errorSelector = () => createSelector(errorReset, (error) => error);

const Reset = () => {
  const loading = useSelector(loadingSelector());
  const msj = useSelector(msjSelector());
  const error = useSelector(errorSelector());

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email Invalido')
        .required('Requerido'),
    }),
    onSubmit: (values) => {
      dispatch(actions.resetSendMail(values));
    },
  });

  useEffect(() => {
    if (error) {
      formik.setErrors({
        ...formik.errors,
        message: 'Usuario o Clave incorrecta',
      });
    }
  }, [error]);
  console.log('hey', loading);
  return (
    <form onSubmit={formik.handleSubmit}>
      <span className="login__label">
        Introduce la dirección de correo electrónico asociada a tu cuenta y te
        enviaremos un vínculo para restablecer tu contraseña.
      </span>
      <br />
      <div className="login__inputs">
        <div className="login__input_group">
          <label htmlFor="username" className="login__label">
            Correo electrónico
          </label>
          <input
            id="username"
            type="email"
            name="email"
            className="login__input"
            {...formik.getFieldProps('email')}
          />
          {formik.errors.message ? (
            <WarningSpan msj={formik.errors.message} />
          ) : null}
          {formik.touched.email && formik.errors.email ? (
            <WarningSpan msj={formik.errors.email} />
          ) : null}
        </div>
      </div>
      <div className="login__buttons">
        {loading ? (
          <div
    className="mt-5"
    style={{
      height: '38px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    }}
          >
    <Loader size={15} color="#007bff" loading />
          </div>
        )

        : (
<button
            className={`btn btn-primary btn__login ${
              loading ? 'btn-disable' : ''
            }`}
            type="submit"
>
            Continuar
</button>
)}
      </div>
    </form>
  );
};

Reset.propTypes = {};

export default Reset;

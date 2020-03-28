import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { actions } from '../../../store/ducks/auth.duck';
import WarningSpan from '../../molecules/WarningSpan';

const Img = styled.img`
  width: ${(props) => props.width || '100%'};
  margin-bottom: 3rem;
  display: block;
`;

const Login = () => {
  const { loading, error } = useSelector((state) => ({
    loading: state.auth.loading,
    error: state.auth.error,
  }));

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email Invalido')
        .required('Requerido'),
      password: Yup.string().required('Requerido'),
    }),
    onSubmit: (values) => {
      dispatch(actions.login(values));
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

  return (
    <form onSubmit={formik.handleSubmit}>
    <span className="login__label">Introduce la dirección de correo electrónico asociada a tu cuenta y te enviaremos un vínculo para restablecer tu contraseña.</span>
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
        <button
          className={`btn btn-primary btn__login ${
            loading ? 'btn-disable' : ''
          }`}
          type="submit"
        >
          Continuar
        </button>
      </div>
    </form>
  );
};

Login.propTypes = {};

export default Login;

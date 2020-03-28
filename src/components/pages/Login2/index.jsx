import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email Invalido')
        .required('Requerido'),
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
    <span className="login__title_text">Inicia sesión en tu cuenta</span>
      {formik.errors.message ? (
        <WarningSpan msj={formik.errors.message} />
      ) : null}
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
          {formik.touched.email && formik.errors.email ? (
            <WarningSpan msj={formik.errors.email} />
          ) : null}
        </div>
        <div className="login__input_group">
          <label htmlFor="password" className="login__label">
            <span>Contraseña </span>
            <Link to="/">¿No recuerdas la contraseña?</Link>
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="login__input"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <WarningSpan msj={formik.errors.password} />
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

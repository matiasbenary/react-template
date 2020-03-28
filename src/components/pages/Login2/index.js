import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { actions } from '../../../store/ducks/auth.duck';
import './login.scss';
import WarningSpan from '../../molecules/WarningSpan';

import config from '../../../config/index';
import styled from 'styled-components';

const Img = styled.img`
  width: ${(props) => props.width || '100%'};
  margin-bottom: 3rem;
  display:block;
`;

const Login = () => {
  const { user, loading, error } = useSelector((state) => ({
    loading: state.auth.loading,
    error: state.auth.error,
    user: state.auth.user,
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

  if (user) {
    return <Redirect to="/" />;
  }
  return (
    <div className="body">
      <form className="login" onSubmit={formik.handleSubmit}>
        <div className="login__title">
          <Img src={config.logo} width={config.logo_width} alt="logo" />
          <span className="login__title_text">Inicia sesión en tu cuenta</span>
        </div>
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
              <a href="">¿No recuerdas la contraseña?</a>
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
        <br />
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
    </div>
  );
};

Login.propTypes = {};

export default Login;

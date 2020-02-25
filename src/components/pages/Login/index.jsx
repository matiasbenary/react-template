import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { actions } from '../../../store/ducks/auth.duck';
import './login.scss';


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
      password: Yup.string()
        .required('Requerido'),
    }),
    onSubmit: (values) => {
      dispatch(actions.login(values));
    },
  });

  useEffect(() => {
    if (error) {
      formik.setErrors({ ...formik.errors, message: 'Usuario o Clave incorrecta' });
    }
  }, [error]);

  if (user) {
    return <Redirect to="/" />;
  }
  return (
  <div className="body">
    <form className="login" onSubmit={formik.handleSubmit}>
      <h1 className="login__title">Login</h1>
      {formik.errors.message ? (
        <div>{formik.errors.message}</div>
        ) : null}
      <div className="login__inputs">
        <label htmlFor="username" className="login__label">
          Usuario
          <input
            type="email"
            name="email"
            {...formik.getFieldProps('email')}
            className="login__input"
            autoComplete="username"
          />
        </label>
        {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}
      </div>
      <div className="login__inputs">
        <label htmlFor="password" className="login__label">
          Password
          <input
            type="password"
            name="password"
            className="login__input"
            {...formik.getFieldProps('password')}
            autoComplete="current-password"
          />
        </label>
        {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}
      </div>
      <div className="login__buttons">
        <button className={`btn btn-primary ${loading ? 'btn-disable' : ''}`} type="submit">
          iniciar sesion
        </button>
        <button className="btn btn-tertiary"> olvide mi clave</button>
      </div>
    </form>
  </div>
  );
};

Login.propTypes = {};

export default Login;

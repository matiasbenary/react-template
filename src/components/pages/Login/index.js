import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actions } from '../../../store/ducks/auth.duck';
import './login.scss';


const Login = () => {
  const { user } = useSelector((state) => ({
    loading: state.auth.loading,
    error: state.auth.error,
    user: state.auth.user,
  }));

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();


  const login = () => {
    dispatch(actions.login({ email, password }));
  };

  if (user) {
    return <Redirect to="/" />;
  }
  return (
  <div className="body">
    <div className="login">
      <h1 className="login__title">Login</h1>
      <div className="login__inputs">
        <label htmlFor="username" className="login__label">
          Usuario
          <input
            type="email"
            name="email"
            className="login__input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div className="login__inputs">
        <label htmlFor="password" className="login__label">
          Password
          <input
            type="password"
            name="password"
            className="login__input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div className="login__buttons">
        <button className="btn btn-primary" onClick={login}>
          {' '}
          iniciar sesion
{' '}
        </button>
        <button className="login__buttons__lost"> olvide mi clave</button>
      </div>
    </div>
  </div>
  );
};

Login.propTypes = {};

export default Login;

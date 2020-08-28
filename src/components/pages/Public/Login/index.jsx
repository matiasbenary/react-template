import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "react-spinners/PropagateLoader";
import { Link } from "react-router-dom";
import { actions } from "../../../../store/ducks/auth.duck";
import WarningSpan from "../../../molecules/WarningSpan";

const Login = () => {
  const { loading, error } = useSelector(state => ({
    loading: state.auth.loading,
    error: state.auth.error
  }));

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email Invalido")
        .required("Requerido"),
      password: Yup.string().required("Requerido")
    }),
    onSubmit: values => {
      dispatch(actions.login(values));
    }
  });

  useEffect(() => {
    if (error) {
      formik.setErrors({
        ...formik.errors,
        message: "Usuario o Clave incorrecta"
      });
    }
  }, [error, formik]);

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
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <WarningSpan msj={formik.errors.email} />
          ) : null}
        </div>
        <div className="login__input_group">
          <label htmlFor="password" className="login__label">
            <span>Contraseña </span>
            <Link to="reset">¿No recuerdas la contraseña?</Link>
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="login__input"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <WarningSpan msj={formik.errors.password} />
          ) : null}
          <div className="login__label">
            <Link to="register">¿Todavía no tenés cuenta? Registrarme</Link>
          </div>
        </div>
      </div>
      <div className="login__buttons">
        {loading ? (
          <div
            style={{
              height: "38px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Loader size={15} color="#007bff" loading />
          </div>
        ) : (
          <button className="btn btn-primary btn__login" type="submit">
            Continuar
          </button>
        )}
      </div>
    </form>
  );
};

Login.propTypes = {};

export default Login;

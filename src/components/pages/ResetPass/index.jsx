import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createSelector } from "reselect";
import Loader from "react-spinners/PropagateLoader";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { actions } from "../../../store/ducks/auth.duck";
import WarningSpan from "../../molecules/WarningSpan";
import SuccessSpan from "../../molecules/SuccessSpan";

const Schema = Yup.object({
  email: Yup.string()
    .email("Email Invalido")
    .required("Requerido"),
  password: Yup.string()
    .required("Requerido")
    .min(8, "Debe contener al menos 8 caracteres."),
  password_confirmation: Yup.string()
    .required("Requerido")
    .when("password", {
      is: val => !!(val && val.length > 0),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Debe coincidir con la contraseña"
      )
    })
});

const loadingReset = state => state.auth.loadingReset;
const msjReset = state => state.auth.msjReset;
const errorReset = state => state.auth.errorReset;

const loadingSelector = () => createSelector(loadingReset, loading => loading);

const msjSelector = () => createSelector(msjReset, msj => msj);

const errorSelector = () => createSelector(errorReset, error => error);

const ResetPass = () => {
  const { id } = useParams();
  const loading = useSelector(loadingSelector());
  const msj = useSelector(msjSelector());
  const error = useSelector(errorSelector());

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password_confirmation: ""
    },
    validationSchema: Schema,
    onSubmit: values => {
      const payload = { ...values, token: id };
      dispatch(actions.reset(payload));
    }
  });

  useEffect(() => {
    if (error) {
      formik.setErrors({
        ...formik.errors,
        message: "Email o url invalido"
      });
    }
  }, [error, formik]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <span className="login__title_text">Restablecer Contraseña</span>
      <div className="login__inputs">
        {formik.errors.message ? (
          <WarningSpan msj={formik.errors.message} />
        ) : null}

        {!error && msj ? (
          <SuccessSpan msj="¡Se ha restablecido tu contraseña con exito!" />
        ) : null}
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
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="login__input"
            {...formik.getFieldProps("password")}
            autoComplete="new-password"
          />
          {formik.touched.password && formik.errors.password ? (
            <WarningSpan msj={formik.errors.password} />
          ) : null}
        </div>
        <div className="login__input_group">
          <label htmlFor="password_confirmation" className="login__label">
            <span>Confirmar Contraseña </span>
          </label>
          <input
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            className="login__input"
            {...formik.getFieldProps("password_confirmation")}
            autoComplete="new-password"
          />
          {formik.touched.password_confirmation &&
          formik.errors.password_confirmation ? (
            <WarningSpan msj={formik.errors.password_confirmation} />
          ) : null}
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
        ) : !error && msj ? (
          <Link className="btn btn-primary btn__login" to="/">
            Ir a iniciar Sesión
          </Link>
        ) : (
          <button className="btn btn-primary btn__login" type="submit">
            Continuar
          </button>
        )}
      </div>
    </form>
  );
};

export default ResetPass;

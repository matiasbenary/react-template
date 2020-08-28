import React, { useEffect } from "react";
import SuccessSpan from "../../../molecules/SuccessSpan";
import WarningSpan from "../../../molecules/WarningSpan";
import { useFormik } from "formik";
import * as Yup from "yup";
import { actions } from "../../../../store/ducks/security/index.duck";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const Schema = Yup.object({
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

const loading = state => state.security.loading;
const error = state => state.security.error;
const status = state => state.security.status;

const loadingSelector = () => createSelector(loading, loading => loading);

const statusSelector = () => createSelector(status, status => status);

const errorSelector = () => createSelector(error, error => error);

const Security = () => {
  const { user_id } = useSelector(state => ({
    user_id: state.auth.user.id
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("hola");
    dispatch(actions.clear());
  }, []);

  const loading = useSelector(loadingSelector());
  const status = useSelector(statusSelector());
  const error = useSelector(errorSelector());

  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: ""
    },
    validationSchema: Schema,
    onSubmit: values => {
      const payload = { ...values, user_id };
      dispatch(actions.changePass(payload));
    }
  });

  return (
    <div className="container mt-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow  bg-white rounded">
          <div className="card-header">Cambiar contraseña</div>
          <div className="card-block">
            <div className="card-body">
              <div className="login__inputs">
                {formik.errors.message ? (
                  <WarningSpan msj={formik.errors.message} />
                ) : null}

                {!error && status ? (
                  <SuccessSpan msj="¡Se ha cambiado tu contraseña con exito!" />
                ) : null}
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
                  <label
                    htmlFor="password_confirmation"
                    className="login__label"
                  >
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
            </div>
          </div>
          <div className="card-footer">
            {loading ? (
              <button className="btn btn-info" disabled>
                Enviando ...
              </button>
            ) : (
              <button className="btn btn-info" type="submit">
                Guardar
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Security;

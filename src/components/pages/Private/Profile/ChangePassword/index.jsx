import React, { useEffect } from "react";
import SuccessSpan from "../../../../molecules/SuccessSpan";
import WarningSpan from "../../../../molecules/WarningSpan";
import { useFormik } from "formik";
import * as Yup from "yup";
import { actions } from "../../../../../store/ducks/security/index.duck";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const Schema = Yup.object({
  password: Yup.string()
    .required("Requerido")
    .min(8, "Debe contener al menos 8 caracteres."),
  password_confirmation: Yup.string()
    .required("Requerido")
    .when("password", {
      is: (val) => !!(val && val.length > 0),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Debe coincidir con la contraseña"
      ),
    }),
});

const loading = (state) => state.security.loading;
const error = (state) => state.security.error;
const status = (state) => state.security.status;

const loadingSelector = () => createSelector(loading, (loading) => loading);

const statusSelector = () => createSelector(status, (status) => status);

const errorSelector = () => createSelector(error, (error) => error);

const ChangePassword = () => {
  const { user_id } = useSelector((state) => ({
    user_id: state.auth.user.id,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.clear());
  }, []);

  const loading = useSelector(loadingSelector());
  const status = useSelector(statusSelector());
  const error = useSelector(errorSelector());

  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      const payload = { ...values, user_id };
      dispatch(actions.changePass(payload));
    },
  });

  return (
    <div className="container mt-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow  bg-white rounded">
          <div className="card-header">Cambiar contraseña</div>
          <div className="card-block">
            <div className="card-body">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label htmlFor="password" className="login__label">
                    <span>Contraseña </span>
                  </label>
                  {formik.errors.message ? (
                    <WarningSpan msj={formik.errors.message} />
                  ) : null}

                  {!error && status ? (
                    <SuccessSpan msj="¡Se ha cambiado tu contraseña con exito!" />
                  ) : null}
                  <div className="login__input_group">
                    <input
                      id="password"
                      type="password"
                      name="password"
                      className="form-control"
                      {...formik.getFieldProps("password")}
                      autoComplete="new-password"
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <WarningSpan msj={formik.errors.password} />
                    ) : null}
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label
                    htmlFor="password_confirmation"
                    className="login__label"
                  >
                    <span>Confirmar Contraseña </span>
                  </label>
                  <div className="login__input_group">
                    <input
                      id="password_confirmation"
                      type="password"
                      name="password_confirmation"
                      className="form-control"
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

export default ChangePassword;

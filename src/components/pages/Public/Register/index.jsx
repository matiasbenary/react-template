import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import Loader from "react-spinners/PropagateLoader";
import { actions } from "../../../../store/ducks/auth.duck";
import WarningSpan from "../../../molecules/WarningSpan";
import SuccessSpan from "../../../molecules/SuccessSpan";

const Schema = Yup.object({
  email: Yup.string()
    .email("Email Invalido")
    .required("Requerido"),
  name: Yup.string().required("Requerido")
});

const Register = () => {
  const { loading, error, msj } = useSelector(state => ({
    loading: state.auth.loadingRegister,
    error: state.auth.errorRegister,
    msj: state.auth.msjRegister
  }));
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      bussiness_name: ""
      // type: 'persona',
    },
    validationSchema: Schema,
    onSubmit: values => {
      dispatch(actions.register(values));
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <span className="login__label">
        Introduce la dirección de correo electrónico asociada a tu cuenta y te
        enviaremos un vínculo para restablecer tu contraseña.
      </span>
      {!error && msj ? (
        <SuccessSpan msj="¡Se ha enviado un caso,en breve te enviaremos un email para confirmar el usuario" />
      ) : null}
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
            {...formik.getFieldProps("email")}
          />
        </div>
      </div>
      {formik.touched.email && formik.errors.email ? (
        <WarningSpan msj={formik.errors.email} />
      ) : null}
      <div className="login__input_group">
        <label htmlFor="name" className="login__label">
          Nombre completo
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="login__input"
          {...formik.getFieldProps("name")}
        />
      </div>
      {formik.touched.name && formik.errors.name ? (
        <WarningSpan msj={formik.errors.name} />
      ) : null}

      <div className="login__input_group">
        <label htmlFor="name" className="login__label">
          Nombre organización (Opcional)
        </label>
        <input
          id="bussiness_name"
          type="text"
          name="bussiness_name"
          className="login__input"
          {...formik.getFieldProps("bussiness_name")}
        />
      </div>

      {/* <div className="login__input_group">
        <div className="form-group">
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            name="type"
            {...formik.getFieldProps('type')}
          >
            <option value="persona">Soy una persona</option>
            <option value="organizacion">Soy una organización</option>
          </select>
        </div>
      </div> */}

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
        <div className="login__buttons">
          <button className="btn btn-primary btn__login" type="submit">
            Continuar
          </button>
        </div>
      )}
    </form>
  );
};

export default Register;

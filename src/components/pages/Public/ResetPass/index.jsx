import React, { useState } from "react";
import * as Yup from "yup";
import { apiCall } from "../../../../crud/api.crud";
import { Link, useParams } from "react-router-dom";
import {
  FaAsterisk,
  FaCheck,
  FaExclamationCircle,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email invalido")
    .required("Es requerido"),
  password: Yup.string().required("Es requerido"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), "las contraseñas no coiciden"])
    .required("Es requerido")
});

const stateError = {
  email: false,
  password: false,
  confirmations: false,
  server: false
};

const ResetUser = () => {
  const [email, setEmail] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(stateError);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const { id } = useParams();

  const changeShowPass = () => {
    setShowPass(!showPass);
  };

  const resetPassword = async () => {
    setLoading(true);
    setError(stateError);
    setStatus(false);

    try {
      await schema.validate(
        { email, password, passwordConfirmation },
        { abortEarly: false }
      );
    } catch (err) {
      let errorList = {};
      err.inner.forEach(e => {
        if (e.path === "email") {
          errorList = { ...errorList, email: e.message };
        } else if (e.path === "password") {
          errorList = { ...errorList, password: e.message };
        } else if (e.path === "passwordConfirmation") {
          errorList = {
            ...errorList,
            confirmations: "Tus contraseñas deben coincidir"
          };
        }
      });
      setError(errorList);
      setLoading(false);
      return;
    }

    const payload = {
      email,
      password,
      password_confirmation: passwordConfirmation,
      token: id
    };

    try {
      const response = await apiCall("reset", payload, "POST");
      setStatus(true);
      setError(stateError);
    } catch (err) {
      setError({ ...stateError, server: true });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h5 className="mt-2 mb-4">Restablecer contraseña</h5>
      <div className="col-12 p-0">
        <div className={`d-flex mb-2 ${!status && "mb-4"}`}>
          <FaAsterisk className="icon-required"></FaAsterisk>
          <span className="span span--error">Campos obligatorios</span>
        </div>
        <label className="pl-2 d-flex justify-content-between align-items-end">
          Correo electrónico <FaAsterisk className="icon-required"></FaAsterisk>
        </label>
        <input
          type="text"
          className={`input-text ${error.email && "input-text--danger"}`}
          placeholder="usuario@email.com"
          onChange={e => setEmail(e.target.value)}
          value={email}
          name="email"
        />
        {error.email && <span className="span span--error">{error.email}</span>}

        <label className="pl-2 d-flex justify-content-between align-items-end mt-3">
          Contraseñas <FaAsterisk className="icon-required"></FaAsterisk>
        </label>
        <div className="password-wrapper">
          <input
            type={showPass ? "text" : "password"}
            className={`input-text ${error.password && "input-text--danger"}`}
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            onChange={e => setPassword(e.target.value)}
            value={password}
            name="password"
          />
          {showPass ? (
            <FaEyeSlash
              className="password-eye"
              onClick={changeShowPass}
            ></FaEyeSlash>
          ) : (
            <FaEye className="password-eye" onClick={changeShowPass}></FaEye>
          )}
        </div>
        {error.password && (
          <span className="span span--error pt-1">{error.password}</span>
        )}

        <label className="pl-2 d-flex justify-content-between align-items-end mt-1">
          Confirmar contraseña{" "}
          <FaAsterisk className="icon-required"></FaAsterisk>
        </label>

        <div className="password-wrapper">
          <input
            type={showPass ? "text" : "password"}
            className={`input-text ${error.confirmations &&
              "input-text--danger"}`}
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            onChange={e => setPasswordConfirmation(e.target.value)}
            value={passwordConfirmation}
            name="passwordConfirmation"
          />
          {showPass ? (
            <FaEyeSlash
              className="password-eye"
              onClick={changeShowPass}
            ></FaEyeSlash>
          ) : (
            <FaEye className="password-eye" onClick={changeShowPass}></FaEye>
          )}
        </div>
        {error.confirmations && (
          <span className="span span--error pt-1">{error.confirmations}</span>
        )}

        {status && (
          <div className="d-flex mt-2">
            <FaCheck className="mr-2 icon icon--ok"></FaCheck>
            <span className="msj msj--ok">Se restablecio tu contraseña!</span>
          </div>
        )}

        {error.server && (
          <div className="d-flex mt-2">
            <FaExclamationCircle className="mr-2 icon icon--error"></FaExclamationCircle>
            <span className="msj msj--error">Error</span>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-around w-100 mt-4">
        <Link to="/" className="button button--white">
          Ir al login
        </Link>
        <button className="button" onClick={resetPassword}>
          {loading ? "Validando..." : "Siguiente"}
        </button>
      </div>
    </>
  );
};

export default ResetUser;

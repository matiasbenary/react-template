import React, { useState } from "react";
import * as Yup from "yup";
import { apiCall } from "../../../../crud/api.crud";
import { Link } from "react-router-dom";
import { FaAsterisk, FaCheck, FaExclamationCircle } from "react-icons/fa";

const schema = Yup.object().shape({
  email: Yup.string().email("Email Invalido").required("Requerido"),
  name: Yup.string().required("Requerido"),
});

const stateError = {
  email: false,
  name: false,
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [error, setError] = useState(stateError);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const resetPassword = async () => {
    setLoading(true);
    setError(stateError);
    setStatus(false);

    try {
      await schema.validate({ email, name }, { abortEarly: false });
    } catch (err) {
      let errorList = {};
      err.inner.forEach((e) => {
        if (e.path === "email") {
          errorList = { ...errorList, email: e.message };
        } else if (e.path === "name") {
          errorList = { ...errorList, password: e.message };
        }
      });
      setError(errorList);
      setLoading(false);
      return;
    }

    const payload = {
      email,
      name,
      bussiness_name: business,
    };
    try {
      await apiCall("sendMailResgister", payload, "POST");
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
      <h5 className="mt-2 mb-4">Creá tu cuenta</h5>
      <div className="col-12 p-0">
        <label className="pl-2 d-flex justify-content-between align-items-end">
        Completá tus datos por favor
        </label>
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
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
        />
        {error.email && <span className="span span--error">{error.email}</span>}

        <label className="pl-2 d-flex justify-content-between align-items-end mt-3">
          Nombre y Apellido <FaAsterisk className="icon-required"></FaAsterisk>
        </label>
        <input
          type="text"
          className={`input-text ${error.name && "input-text--danger"}`}
          placeholder="Ej: Juan Peréz"
          onChange={(e) => setName(e.target.value)}
          value={name}
          name="name"
        />
        {error.email && <span className="span span--error">{error.email}</span>}

        <label className="pl-2 d-flex justify-content-between align-items-end mt-3">
          Nombre organización (Opcional)
        </label>
        <input
          type="text"
          className="input-text"
          placeholder="Ej: Civic House"
          onChange={(e) => setBusiness(e.target.value)}
          value={business}
          name="business"
        />

        {status && (
          <div className="d-flex mt-2">
            <FaCheck className="mr-2 icon icon--ok"></FaCheck>
            <span className="msj msj--ok">
              Un administrador revisará tu registro y te enviaremos un mail para
              confirmar tu usuario.
            </span>
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

export default Register;

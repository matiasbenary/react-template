import React, { useState } from 'react'
import * as Yup from "yup";
import { apiCall } from "../../../../crud/api.crud";
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

const schema = Yup.string()
  .email()
  .required();

const ResetUser = () => {
  const [email,setEmail]= useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const handleOnKeyDown = e => {
    if (e.keyCode === 13) {
      sendEmailReset();
    }
  };

  const sendEmailReset = async () => {
    setLoading(true);
    setError(false);
    const valid = await schema.isValid(email);
    if (!valid) {
      setLoading(false);
      setError(true);
      return;
    }

    const payload = {
      email
    }
    try{
      await apiCall(`sendResetLinkEmail`, payload, "POST");
      setStatus(true);
    }catch(err){
      setError(true);
    }finally{
      setLoading(false);
    }


  };
  return (
    <>
      <h5 className="mt-2 mb-4">Introduce tu correo electrónico y te enviaremos un vínculo para restablecer tu contraseña</h5>
      <div className="mb-5 col-12 p-0">
        <label className="pl-2">Correo electrónico </label>
        <input
          type="text"
          className={`input-text ${error && "input-text--danger"}`}
          placeholder="usuario@email.com"
          onChange={e => setEmail(e.target.value)}
          onKeyDown={handleOnKeyDown}
          value={email}
        />

        {error && (
          <span className="span span--error">Revisa tu correo</span>
        )}
        {status && (
          <div className="d-flex mt-2">
            <FaCheck className="mr-2 icon icon--ok"></FaCheck>
<span className="msj msj--ok">Se ha enviado un link a tu correo para
          restablecer tu contraseña!</span>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-around w-100">
        <Link
          to="/"
          className="button button--white mt-3 mb-5"
        >
          Volver
        </Link>
        <button className="button mt-3 mb-5" onClick={sendEmailReset}>
        {loading ? "Validando..." : "Siguiente"}
        </button>
      </div>

    </>
  )
}

export default ResetUser

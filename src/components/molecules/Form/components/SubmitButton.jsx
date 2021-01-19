import React from 'react';

const SubmitButton = ({ isloading = false }) => (
  <button className="button" type="submit">
    {isloading ? 'Cargando' : 'Enviar'}
  </button>
);

export default SubmitButton;

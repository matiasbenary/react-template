import React from 'react';

const Description = ({ data }) => (

  <div className="card shadow  bg-white rounded">
    <div className="card-block">
      <div className="card-body">
        <h4>Tareas a realizar:</h4>
        {data.terms_description ? data.terms_description : 'Sin Especificar'}
      </div>
    </div>
  </div>
);

export default Description;

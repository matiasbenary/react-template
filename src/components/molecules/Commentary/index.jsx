import React from 'react';

const Commentary = ({ data }) => (
    <div className="card rounded">
        <div className="card-header">
            <h6 className="m-0">Comentarios:</h6>
        </div>
        <div className="card-body">
            {data.commentary}
        </div>
    </div>
);

export default Commentary;

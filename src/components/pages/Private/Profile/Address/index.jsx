import React, { useState } from 'react';
import GooglePlaceAutocomplete from '../../../../molecules/GooglePlaceAutocomplete';

const Address = () => {
  const [query, setQuery] = useState();
  console.log(query);
  return (
    <div className="container mt-4">
      <div className="card shadow  bg-white rounded">
        <div className="card-header">Mis direcciones</div>
        <div className="card-block">
          <div className="card-body">
            <GooglePlaceAutocomplete className="form-control" query={query} setQuery={setQuery} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;

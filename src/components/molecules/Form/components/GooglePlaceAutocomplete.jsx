import React, { useState, useEffect, useRef } from 'react';

import { useFormContext } from '../FormContext';
import useInputValidations from '../hooks/useInputValidations';

let autoComplete;

const formatQuery = (addressObject) => {
  const parseAddress = {};
  const diccionario = [
    'administrative_area_level_1',
    'administrative_area_level_2',
    'postal_code',
    'country',
    'locality',
    'sublocality_level_1',
  ];

  addressObject.address_components.forEach((address) => {
    const type = address.types[0];

    if (!diccionario.includes(type)) return;
    if (type === 'country') {
      parseAddress.country_long = address.long_name;
      parseAddress.country_short = address.short_name;
    } else {
      parseAddress[type] = address.long_name;
    }
  });

  parseAddress.location_lat = addressObject.geometry.location.lat();
  parseAddress.location_lng = addressObject.geometry.location.lng();
  parseAddress.address = addressObject.formatted_address;

  return parseAddress;
};

const handlePlaceSelect = async (updateQuery) => {
  const addressObject = autoComplete.getPlace();
  const query = formatQuery(addressObject);
  updateQuery(query);
};

const handleScriptLoad = (updateQuery, autoCompleteRef) => {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    {
      types: ['geocode'],
    },
  );
  autoComplete.addListener('place_changed', () => {
    handlePlaceSelect(updateQuery);
  });
};

const GooglePlaceAutocomplete = ({
  label, name, validations,
}) => {
  const [value, setValue] = useState('');
  const [query, setQuery] = useState();

  const autoCompleteRef = useRef(null);
  useEffect(() => {
    handleScriptLoad(setQuery, autoCompleteRef);
  }, []);

  console.log(value);
  useEffect(() => {
    if (query && query.address) {
      setValue(query.address || value);
    }
  }, [query]);

  const formContext = useFormContext();

  // custom hook: useInputValidations
  const { setIsValid, triggerValidations, isValid } = useInputValidations({
    formContext,
    validations,
    name,
    value,
    setValue,
  });

  const handleBlur = () => {
    setIsValid(triggerValidations());
  };

  useEffect(() => {
    if (name === formContext.focus && autoCompleteRef.current) {
      autoCompleteRef.current.focus();
    }
  }, [formContext.focus, name]);

  return (
    <div className="input-container">
      <div>
        <label className="input-label" onClick={() => autoCompleteRef.current.focus()}>
          {label}
        </label>
      </div>

      <input
        onChange={(event) => setValue(event.target.value)}
        onBlur={handleBlur}
        ref={autoCompleteRef}
        name={name}
        className="form-control"
        value={value}
        placeholder=""
      />
      {!isValid.valid && (
      <div>
        <span className="error_message">{isValid.error_message}</span>
      </div>
      )}
    </div>
  );
};

export default GooglePlaceAutocomplete;

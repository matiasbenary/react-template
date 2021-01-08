import React, { useState, useReducer } from 'react';
import { FormContext } from './FormContext';
import validatorReducer from './reducer';
import './form.scss';

const Form = ({ children, defaultValue = {}, submit }) => {
  const [values, setValues] = useState(defaultValue);
  /* States que manejan el foco del input
  y disparan validaciones al intentar submittear */
  const [inputToFocus, setInputFocus] = useState();
  const [checkSubmit, setCheckSubmit] = useState(false);
  /* Reducer para manejo de inputs invalidos desde el Form */
  const [invalidInputs, dispatch] = useReducer(validatorReducer, { names: [] });

  const updateValue = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const getDefaultValue = (name) => values[name];

  const handleSubmit = (e) => {
    e.preventDefault();
    setCheckSubmit(true);
    setInputFocus(invalidInputs.names.length ? invalidInputs.names[0] : null);
    if (invalidInputs.names.length === 0) {
      submit(values);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* Context que orquesta validaciones y foco de los inputs */}
      <FormContext.Provider
        value={{
          focus: inputToFocus,
          checkSubmit,
          setCheckSubmit,
          onValidate: dispatch,
          values,
          setValues,
          updateValue,
          getDefaultValue,
        }}
      >
        {children}
      </FormContext.Provider>
    </form>
  );
};

export default Form;

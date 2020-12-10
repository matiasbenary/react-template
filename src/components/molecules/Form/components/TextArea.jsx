import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useFormContext } from '../FormContext';
import useInputValidations from '../hooks/useInputValidations';

const Input = styled.textarea`width:100%;`;

const TextArea = ({
  label, name, validations,
}) => {
  const [field, setField] = useState();
  const [value, setValue] = useState();

  const formContext = useFormContext();

  // custom hook: useInputValidations
  const { setIsValid, triggerValidations, isValid } = useInputValidations({
    formContext,
    validations,
    name,
    value,
  });

  const handleBlur = () => {
    setIsValid(triggerValidations());
  };

  useEffect(() => {
    if (name === formContext.focus && field) {
      field.focus();
    }
  }, [formContext.focus, name, field]);

  return (
    <div className="input-container">
      <div>
        <label className="input-label" onClick={() => field.focus()}>
          {label}
        </label>
      </div>

      <Input
        onChange={(event) => setValue(event.target.value)}
        onBlur={handleBlur}
        ref={setField}
        name={name}
        className="input"
      />
      {!isValid.valid && (
        <div>
          <span className="error_message">{isValid.error_message}</span>
        </div>
      )}
    </div>
  );
};

export default TextArea;

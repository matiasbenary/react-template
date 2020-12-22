import React, { useState, useEffect } from 'react';
import { useFormContext } from '../FormContext';
import useInputValidations from '../hooks/useInputValidations';

const Input = ({
  label, name, validations, type = 'text',
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
    setValue,
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

      <input
        onChange={(event) => setValue(event.target.value)}
        onBlur={handleBlur}
        ref={setField}
        type={type}
        name={name}
        className="input"
        value={value}
      />
      {!isValid.valid && (
        <div>
          <span className="error_message">{isValid.error_message}</span>
        </div>
      )}
    </div>
  );
};

export default Input;

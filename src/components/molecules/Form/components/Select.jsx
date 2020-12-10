import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useFormContext } from '../FormContext';
import useInputValidations from '../hooks/useInputValidations';

const Input = ({
  label, name, validations, options, defaultValue = null,
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

  const addValue = (t) => {
    setValue(t.value);
  };

  return (
    <div className="input-container">
      <label className="input-label" onClick={() => field.focus()}>
        {label}
      </label>
      {options
        ? (
          <Select
            defaultValue={defaultValue}
            options={options}
            onChange={addValue}
            onBlur={handleBlur}
            ref={setField}
            name={name}
          />
        )
        : <Select isDisabled />}

      {!isValid.valid && (
        <div>
          <span className="error_message">{isValid.error_message}</span>
        </div>
      )}
    </div>
  );
};

export default Input;

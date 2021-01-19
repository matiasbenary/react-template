import React, { useState, useEffect } from 'react';
import { default as ReactSelect } from 'react-select';
import { useFormContext } from '../FormContext';
import useInputValidations from '../hooks/useInputValidations';

const getDefaultOptions = (options, value) => {
  if (!value) return null;
  const defaultOptions = options.find((option) => option.value === value);

  return defaultOptions;
};

const Select = ({
  label, name, validations, options, placeholder = 'Seleccione una opcion',
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
          <ReactSelect
            value={getDefaultOptions(options, value)}
            placeholder={placeholder}
            defaultValue
            options={options}
            onChange={addValue}
            onBlur={handleBlur}
            ref={setField}
            name={name}
          />
        )
        : <ReactSelect isDisabled />}

      {!isValid.valid && (
        <div>
          <span className="error_message">{isValid.error_message}</span>
        </div>
      )}
    </div>
  );
};

export default Select;

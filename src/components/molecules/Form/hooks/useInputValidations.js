import { useState, useEffect } from 'react';
import validationsConstraints from '../validations';

const useInputValidations = ({
  formContext, validations, name, value, setValue = false,
}) => {
  // manejo de estado
  const [isValid, setIsValid] = useState({
    error_message: '',
    valid: true,
  });

  // devuelve el resultado de la validación por campo
  const triggerValidations = () => {
    let validationResult = {
      error_message: '',
      valid: true,
    };
    validations.forEach(({ key, val, optional }) => {
      if (validationResult.valid) {
        validationResult = validationsConstraints(key, val, value, formContext.values, optional);
      }
    });
    return validationResult;
  };

  // ejecuta el dispatch con la validación del input
  const dispatchValidationsResult = (validationResult) => {
    if (validationResult.valid) {
      formContext.onValidate({ type: 'valid_input', inputName: name });
    } else {
      formContext.onValidate({ type: 'invalid_input', inputName: name });
    }
  };

  // ejecuta el dispatch cada vez que haya cambios de validación del input
  useEffect(() => {
    dispatchValidationsResult(isValid);
  }, [isValid]);

  useEffect(() => {
    formContext.updateValue(name, value);
  }, [value]);

  useEffect(() => {
    const defaultValue = formContext.getDefaultValue(name);

    if (defaultValue !== undefined) {
      setValue(defaultValue);
    }
  }, []);

  // escucha cuando se ejecuta el submit para disparar las validaciones
  useEffect(() => {
    if (formContext.checkSubmit) {
      setIsValid(triggerValidations(value));
      formContext.setCheckSubmit(false);
    }
    dispatchValidationsResult(triggerValidations(value));
  }, [formContext.checkSubmit, value]);

  return {
    triggerValidations,
    isValid,
    setIsValid,
  };
};

export default useInputValidations;

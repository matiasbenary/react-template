import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styled from 'styled-components';
import Button, { ButtonPrimary } from '../../Button';
import { useFormContext } from '../FormContext';
import useInputValidations from '../hooks/useInputValidations';

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ButtonOk = styled(ButtonPrimary)`
  padding: 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
`;
const ButtonNoOk = styled(Button)`
  padding: 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
`;

const Input = styled.input`
  width: 40px;
  text-align:center;
`;

const Hours = ({
  label, name, validations,
}) => {
  const [field, setField] = useState();
  const [value, setValue] = useState(0);

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

  const setInput = (number) => {
    if (number < 0) setValue(0);
    else setValue(number);
  };

  return (
    <label className="input-label" onClick={() => field.focus()}>
      {label}
      <Container>
        {value ? (
          <ButtonOk type="button" onClick={() => setInput(value - 1)}>
            <FaMinus />
          </ButtonOk>
        ) : (
          <ButtonNoOk type="button">
            <FaMinus />
          </ButtonNoOk>
        )}
        <Input
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          onBlur={handleBlur}
          ref={setField}
          type="number"
          name={name}
          className="input"
        />
        <ButtonOk type="button" onClick={() => setInput(value + 1)}>
          <FaPlus />
        </ButtonOk>
      </Container>
      {!isValid.valid && (
        <div>
          <span className="error_message">{isValid.error_message}</span>
        </div>
      )}
    </label>
  );
};

export default Hours;

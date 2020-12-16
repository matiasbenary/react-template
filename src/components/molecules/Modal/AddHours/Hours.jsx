import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styled from 'styled-components';
import Button, { ButtonPrimary } from '../../Button';

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

const Hours = ({ isSummit, setIsInvalid }) => {
  const [hours, setHours] = useState(0);

  const setInput = (number) => {
    if (number < 0) setHours(0);
    else setHours(number);
  };

  if (isSummit && hours >= 0) {
    setIsInvalid(false);
  }

  return (
    <>
      Horas
      <Container>
        {hours ? (
          <ButtonOk onClick={() => setInput(hours - 1)}>
            <FaMinus />
          </ButtonOk>
        ) : (
          <ButtonNoOk>
            <FaMinus />
          </ButtonNoOk>
        )}
        <Input
          type="number"
          onChange={(e) => setInput(e.value)}
          value={hours}
        />
        <ButtonOk onClick={() => setInput(hours + 1)}>
          <FaPlus />
        </ButtonOk>
      </Container>
    </>
  );
};

export default Hours;

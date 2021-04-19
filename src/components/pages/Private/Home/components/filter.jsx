import React, { useState } from "react";
import { FiFilter, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import styled from "styled-components";

import { ButtonPrimary } from "../../../../molecules/Button";

import { FaFilter } from "react-icons/fa";

const Container = styled.div`
  padding: 10px 10px;
  border: 2px solid #e7e7e7;
  border-radius: 15px;
  background-color: #ffffff;
  border: none;
  box-shadow: 0px 4.90798px 6.13497px rgba(0, 0, 0, 0.14),
    0px 1.84049px 8.58896px rgba(0, 0, 0, 0.12),
    0px 3.06748px 3.06748px rgba(0, 0, 0, 0.2);
  width: ${(props) => (props.isClose ? "70px;" : "100%")};
  transition: all 0.3s ease 0s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  p {
    margin: 0;
  }
`;

const IconFilter = styled(FiFilter)`
  color: #3f86f6;
  font-size: 24px;
`;

const Filter = ({ setIsOpen }) => {
  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <Container>
      <p>TExto de rellenos</p>
      <ButtonPrimary onClick={openModal}>
        <FaFilter />
        Filtro
      </ButtonPrimary>
    </Container>
  );
};

export default Filter;

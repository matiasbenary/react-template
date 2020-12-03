import React, { useState } from "react";
import { FiFilter, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import styled from "styled-components";

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

  .arrow{
    color: #C4C4C4
  font-size: 18px;
  margin-left:5px;
  &:hover{
    color: #3f86f6;
  }
  cursor:pointer;
  }
`;

const IconFilter = styled(FiFilter)`
  color: #3f86f6;
  font-size: 24px;
`;


const Filter = () => {
  const [isClose, setIsClose] = useState(true);
  const toogleStatus = () => {
    setIsClose(!isClose);
  };
  return (
    <Container isClose={isClose}>
      <IconFilter />
      {isClose ? (
        <FiChevronRight className="arrow" onClick={toogleStatus} />
      ) : (

        <FiChevronLeft className="arrow" onClick={toogleStatus} />
      )}
    </Container>
  );
};

export default Filter;

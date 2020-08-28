import React from "react";
import { TiTickOutline } from "react-icons/ti";
import styled from "styled-components";
import PropTypes from "prop-types";

const Div = styled.div`
  color: hsl(134, 61%, 41%);
  fill: hsl(134, 61%, 41%);
  margin: 0.75rem 0 0.75rem 0;
  & .msj {
    margin-left: 5px;
  }
  & .icon {
    width: 1.5rem;
    height: auto;
  }
`;

const SuccessSpan = ({ msj }) => (
  <Div>
    <TiTickOutline className="icon" />
    <span className="msj">{msj}</span>
  </Div>
);

SuccessSpan.propTypes = {
  msj: PropTypes.string
};

export default SuccessSpan;

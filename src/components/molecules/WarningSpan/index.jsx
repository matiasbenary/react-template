import React from 'react';
import { TiWarningOutline } from 'react-icons/ti';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Div = styled.div`
  color: hsl(344, 59%, 52%);
  fill: hsl(344, 59%, 52%);
  margin: 0.75rem 0 0.75rem 0;
  & .msj {
    margin-left: 5px;
  }
  & .icon {
    width: 1.5rem;
    height: auto;
  }
`;

const index = ({ msj }) => (
  <Div>
    <TiWarningOutline className="icon" />
    <span className="msj">{msj}</span>
  </Div>
);

index.propTypes = {
  msj: PropTypes.string,
};

export default index;

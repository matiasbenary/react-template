import React from 'react';
import styled from 'styled-components';
import { ods } from './ods/icons/index';

const Img = styled.img`
  height: 85px;
`;

const OnlyOds = ({ id }) => (
  <Img src={ods[id - 1]} />

);
export default OnlyOds;

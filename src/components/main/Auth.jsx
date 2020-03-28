import React from 'react';
import { Route } from 'react-router-dom';
import ResetUser from '../pages/ResetUser';
import Login2 from '../pages/Login2';
import './auth.scss';
import config from '../../config';
import styled from 'styled-components';

const Img = styled.img`
  width: ${(props) => props.width || '100%'};
  margin-bottom: 3rem;
  display: block;
`;

const Main = () => (
  <div className="body">
      <div className="login">
        <div className="login__title">
          <Img src={config.logo} width={config.logo_width} alt="logo" />
        </div>
        <Route exact path="/reset" component={ResetUser} />
        <Route exact path="/" component={Login2} />
      </div>
  </div>
);

export default Main;

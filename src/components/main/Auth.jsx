import React from 'react';
import { Route, Link } from 'react-router-dom';
import './auth.scss';
import styled from 'styled-components';
import config from '../../config';

import ResetUser from '../pages/ResetUser';
import Login2 from '../pages/Login2';


const Img = styled.img`
  width: ${(props) => props.width || '100%'};
  margin-bottom: 3rem;
  display: block;
`;

const Main = ({ children }) => (
  <div className="body">
    <div className="login">
      <div className="login__title">
        <Link to="/">
          <Img src={config.logo} width={config.logo_width} alt="logo" />
        </Link>
      </div>
      <Route exact path="/reset" component={ResetUser} />
      <Route exact path="/" component={Login2} />
      {children}
    </div>
  </div>
);

export default Main;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './auth.scss';
import styled from 'styled-components';
import config from '../../config';

import ResetUser from '../pages/Public/ResetUser/index.jsx';
import Login from '../pages/Public/Login';
import Register from '../pages/Public/Register';
import ResetPass from '../pages/Public/ResetPass/index.jsx';

const Img = styled.img`
  width: ${(props) => props.width || '300px'};
  margin-bottom: 3rem;
  display: block;
`;

const Main = () => (
  <div className="body row">
    <div className="col-xs-12 col-md-6 left">
      <div className="login">
        <Img src={config.logo} alt="logo" />
        <Switch>
          <Route exact path="/reset" component={ResetUser} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/password/reset/:id" component={ResetPass} />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </div>

    <div className="col-xs-12 col-md-6 right hidden-xs" />
  </div>
);

export default Main;

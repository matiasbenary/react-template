import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./auth.scss";
import styled from "styled-components";
import config from "../../config";

import ResetUser from "../pages/ResetUser";
import Login2 from "../pages/Login2";
import Register from "../pages/Register";
import ResetPass from "../pages/ResetPass";

const Img = styled.img`
  width: ${props => props.width || "100%"};
  margin-bottom: 3rem;
  display: block;
`;

const Main = () => (
  <div className="body">
    <div className="login">
      <div className="login__title">
        <Link to="/">
          <Img src={config.logo} width={config.logo_width} alt="logo" />
        </Link>
      </div>
      <Switch>
        <Route exact path="/reset" component={ResetUser} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/password/reset/:id" component={ResetPass} />
        <Route path="/" component={Login2} />
      </Switch>
    </div>
  </div>
);

export default Main;

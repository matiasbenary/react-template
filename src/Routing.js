import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login2 from './components/pages/Login2';
import Main from './components/Main';

const Routing = () => {
  const { user } = useSelector((state) => ({
    user: state.auth.user,
  }));

  return (
    <BrowserRouter>
      <Switch>{!user ? <Route component={Login2} /> : <Main />}</Switch>
    </BrowserRouter>
  );
};

export default Routing;

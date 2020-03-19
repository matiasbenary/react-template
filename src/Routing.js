import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Main from './components/Main';

const Routing = () => {
  const { user } = useSelector((state) => ({
    user: state.auth.user,
  }));

  return <Switch>{!user ? <Route component={Login} /> : <Main />}</Switch>;
};

export default Routing;

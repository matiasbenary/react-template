import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/main/Layout';
import Auth from './components/main/Auth';

const Routing = () => {
  const { user } = useSelector((state) => ({
    user: state.auth.user,
  }));

  return (
    <BrowserRouter>
      <Switch>{!user ? <Auth /> : <Layout />}</Switch>
    </BrowserRouter>
  );
};

export default Routing;

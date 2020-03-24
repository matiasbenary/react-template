import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import Navbar from './organisms/Navbar';
import CardConstainer from './organisms/CardContainer';

import ModalRoot from './molecules/Modal/ModalRoot';
import DetailActivity from './organisms/DetailActivity';
import Map from './molecules/Map';
import Card from './molecules/Card';

const Main = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      <Navbar email={user.email} />
      <Route exact path="/detail/:id" component={DetailActivity} />
      <Route exact path="/" component={CardConstainer} />
      <ModalRoot />
    </div>
  );
};

export default Main;

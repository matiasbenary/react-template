import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import CardConstainer from '../organisms/CardContainer';
import Activities from '../organisms/Activities';
import Hours from '../organisms/Hours';
import ModalRoot from '../molecules/Modal/ModalRoot';
import DetailActivity from '../organisms/DetailActivity';

const Main = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      <Navbar email={user.email} />
      <Route exact path="/detail/:id" component={DetailActivity} />
      <Route exact path="/" component={CardConstainer} />
      <Route exact path="/actividad" component={Activities} />
      <Route exact path="/horas" component={Hours} />
      <ModalRoot />
    </div>
  );
};

export default Main;

import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import Navbar from "../organisms/Navbar";
import CardConstainer from "../pages/Private/CardContainer";
import Activities from "../pages/Private/Activities";
import Hours from "../pages/Private/Hours";
import ModalRoot from "../molecules/Modal/ModalRoot";
import DetailActivity from "../pages/Private/DetailActivity";
import Security from "../pages/Private/Security";

const Main = () => {
  const user = useSelector(state => state.auth.user);
  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      <Navbar email={user.email} name={user.name} />
      <Route exact path="/detail/:id" component={DetailActivity} />
      <Route exact path="/" component={CardConstainer} />
      <Route exact path="/actividad" component={Activities} />
      <Route exact path="/horas" component={Hours} />
      <Route exact path="/security" component={Security} />
      <ModalRoot />
    </div>
  );
};

export default Main;

import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './organisms/Navbar';
import CardConstainer from './organisms/CardContainer';

import ModalRoot from './molecules/Modal/ModalRoot';

const Main = () => {
  const user = useSelector((state) => state.auth.user);

return (
    <>
      <Navbar email={user.email} />
      <CardConstainer />
      <ModalRoot />
    </>
  );
};

export default Main;

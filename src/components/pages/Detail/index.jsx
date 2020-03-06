import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../organisms/Navbar';
import ModalRoot from '../../molecules/Modal/ModalRoot';
import DetailActivity from '../../organisms/DetailActivity';

const Detail = () => {
  const user = useSelector((state) => state.auth.user);


  return (
    <>
      <Navbar email={user.email} />
      <DetailActivity />
      <ModalRoot />
    </>
  );
};

export default Detail;

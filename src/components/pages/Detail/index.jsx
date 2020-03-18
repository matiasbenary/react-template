import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../organisms/Navbar';
import ModalRoot from '../../molecules/Modal/ModalRoot';
import DetailActivity from '../../organisms/DetailActivity';

const Detail = () => {
  const user = useSelector((state) => state.auth.user);


  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
    <Navbar email={user.email} />
      <DetailActivity />
      <ModalRoot />
    </div>
  );
};

export default Detail;

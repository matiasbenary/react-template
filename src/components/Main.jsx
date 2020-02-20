import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navbar from './organisms/Navbar';

const Main = () => {
  const { user } = useSelector((state) => ({
    user: state.auth.user,
  }));

  console.log(user);
  if (!user) {
    return <Redirect to="/login" />;
  }

  return <Navbar email={user.email} />;
};

export default Main;

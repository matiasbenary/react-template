import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navbar from './organisms/Navbar';
import CardConstainer from './organisms/CardContainer';
import { actions as activitiesAction } from '../store/ducks/activities.duck';

import ModalRoot from './molecules/Modal/ModalRoot';

const Main = () => {
  const { user, activities, activitiesLoading } = useSelector((state) => ({
    user: state.auth.user,
    // activities: state.activities.activities,
    // activitiesLoading: state.activities.loading,
  }));
  const dispatch = useDispatch();

  // useEffect(() => {
  //   //   // props.getUsers();as
  //   if (!activities) {
  //     dispatch(activitiesAction.getActivities());
  //   }
  // }, []);

  if (!user) {
    return <Redirect to="/login" />;
  }

return (
    <>
      <Navbar email={user.email} />
      {/* {renderCards()} */}
      <CardConstainer />
      <ModalRoot />
    </>
  );
};

export default Main;

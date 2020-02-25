import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navbar from './organisms/Navbar';
import CardConstainer from './organisms/CardContainer';
import { actions } from '../store/ducks/activities.duck';

const Main = () => {
  const { user, activities, activitiesLoading } = useSelector((state) => ({
    user: state.auth.user,
    activities: state.activities.activities,
    activitiesLoading: state.activities.loading,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    //   // props.getUsers();as
    if (!activities) {
      dispatch(actions.getActivities());
    }
  }, []);

  if (!user) {
    return <Redirect to="/login" />;
  }

  const renderCards = () => {
    if (activities) {
      return <CardConstainer cards={activities.data} />;
    }
      if (activitiesLoading) {
        return <div>cargando</div>;
      }
      return null;
  };

  return (
    <>
      <Navbar email={user.email} />
      {renderCards()}
    </>
  );
};

export default Main;

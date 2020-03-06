import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../molecules/Card';
import { actions as userActivitiesAction } from '../../../store/ducks/user/activities.duck';
import { actions as activitiesAction } from '../../../store/ducks/activities.duck';
import ActivitiesButtons from './ActivitiesButtons';

const CardsContainer = () => {
  const {
    user_id,
    applyActivities,
    activities,
    activitiesLoading,
    userActivities,
  } = useSelector((state) => ({
    user_id: state.auth.user.id,
    applyActivities: state.auth.user.activities,
    userActivities: state.userActivities.activities,
    activities: state.activities.activities,
    activitiesLoading: state.activities.loading,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userActivities) {
      dispatch(userActivitiesAction.getActivities(user_id));
    }
  }, []);

  useEffect(() => {
    //   // props.getUsers();as
    if (!activities) {
      dispatch(activitiesAction.getActivities());
    }
  }, []);

  if (userActivities && activities) {
    return (
      <div className="container">
        <div className="card-columns">
          {activities.data.map((card) => {
            const isApply = userActivities.data.find((activity) => activity.id === card.id)
              === undefined;
            return (
              <Card
                key={`cardactivity${card.id}`}
                title={card.title}
                description={card.short_description}
                img={card.description_image}

              >
                <ActivitiesButtons
                    isApply={isApply}
                    activity_id={card.id}
                    user_id={user_id}
                    title={card.title}
                    description={card.short_description}
                    withLink
                />
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

export default CardsContainer;

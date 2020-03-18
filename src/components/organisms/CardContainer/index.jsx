import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTransition, animated } from 'react-spring';
import Card from '../../molecules/Card';
import { actions as userActivitiesAction } from '../../../store/ducks/user/activities.duck';
import { actions as activitiesAction } from '../../../store/ducks/activities.duck';
import ActivitiesButtons from './ActivitiesButtons';

const CardsContainer = () => {
  const {
    user_id,
    activities,
    activitiesLoading,
    userActivities,
  } = useSelector((state) => ({
    user_id: state.auth.user.id,
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

  const acts = activities ? activities.data : [];

  const transitions = useTransition(acts, (act) => act.id, {
    from: { transform: 'translate3d(0,-40px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,-40px,0)', opacity: 0 },
    trail: 55,
    config: { mass: 1, tension: 210, friction: 20 },
  });

  if (activitiesLoading) {
    return <div>Cargando...</div>;
  }

  const getDetail = (activity) => ([
    { title: 'Tipo de Actividad', value: activity.alternative_type },
    { title: 'Estado de la actividad', value: activity.status_alias },
    { title: 'Límite de postulación', value: activity.deadline },
    { title: 'Fecha de la actividad', value: activity.activity_to },
    ]);

  if (userActivities && activities) {
    return (
      <div className="container">
        <div className="card-columns">
          {transitions.map(({ item, props, key }) => {
            const isApply = userActivities.data.find((activity) => activity.id === item.id) === undefined;
            return (
              <animated.div key={key} style={props}>
                <Card
                  key={`cardactivity${item.id}`}
                  title={item.title}
                  description={item.short_description}
                  img={item.description_image}
                  detail={getDetail(item)}
                >
                  <ActivitiesButtons
                    isApply={isApply}
                    activity_id={item.id}
                    user_id={user_id}
                    title={item.title}
                    description={item.short_description}
                    withLink

                  />
                </Card>
              </animated.div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

export default CardsContainer;
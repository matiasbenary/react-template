import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTransition, animated } from "react-spring";
import moment from "moment";
import Card from "../../molecules/Card";
import { actions as userActivitiesAction } from "../../../store/ducks/user/activities.duck";
import { actions as activitiesAction } from "../../../store/ducks/activities.duck";
import ActivitiesButtons from "../../molecules/ActivitiesButton";
import Loading from "../../molecules/Loading";
import Detail from "../../molecules/Detail";
import Map from "../../molecules/Map";

const CardsContainer = () => {
  const {
    user_id,
    activities,
    activitiesLoading,
    userActivities
  } = useSelector(state => ({
    user_id: state.auth.user.id,
    userActivities: state.userActivities.activities,
    activities: state.activities.activities,
    activitiesLoading: state.activities.loading
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

  const transitions = useTransition(acts, act => act.id, {
    from: { transform: "translate3d(0,-40px,0)", opacity: 0 },
    enter: { transform: "translate3d(0,0px,0)", opacity: 1 },
    leave: { transform: "translate3d(0,-40px,0)", opacity: 0 },
    trail: 55,
    config: { mass: 1, tension: 210, friction: 20 }
  });

  if (activitiesLoading) {
    return <Loading />;
  }

  if (userActivities && activities) {
    const now = moment();
    return (
      <div className="container mt-4">
        <Card
          description={<Map activities={activities} />}
          title="Actividades de voluntariado"
        />
        <div className="card-columns">
          {transitions.map(({ item, props, key }) => {
            const isApply =
              userActivities.data.find(activity => activity.id === item.id) ===
              undefined;

            const deadline = moment(item.deadline);
            const isEnable = now <= deadline;
            return (
              <animated.div key={key} style={props}>
                <Card
                  key={`cardactivity${item.id}`}
                  title={item.title}
                  description={
                    <>
                      {item.short_description} <hr />
                      <Detail activity={item} />
                    </>
                  }
                  img={item.description_image}
                >
                  <ActivitiesButtons
                    isEnable={isEnable}
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

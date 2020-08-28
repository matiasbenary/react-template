import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Card from "../../molecules/Card";
import { actions as userActivitiesAction } from "../../../store/ducks/user/activities.duck";
import { actions as activitiesAction } from "../../../store/ducks/activities.duck";
import ActivitiesButtons from "../../molecules/ActivitiesButton";
import Loading from "../../molecules/Loading";
import Detail from "../../molecules/Detail";
import Map from "../../molecules/Map";
import VolunteerExperiences from "../../molecules/VolunteerExperiences";
import "./cardContainer.scss";
import { useBreackpoint } from "../../../utils/hooks/useBreackpoin";

const invercionMatriz = (data, columns) => {
  if (data.length < columns) return data;

  const row = Math.ceil(data.length / columns);

  console.log(row);
  const aux = [];
  const auxFinal = [];
  let acts = [];
  let indice = 0;

  for (let i = 0; row > i; i++) {
    indice = i * columns;
    aux.push(data.slice(indice, indice + columns));
  }

  for (let x = 0; x < aux.length; x++) {
    for (let y = 0; y < aux[x].length; y++) {
      if (!auxFinal[y]) auxFinal[y] = [];
      auxFinal[y][x] = aux[x][y];
    }
  }

  for (let x = 0; x < auxFinal.length; x++) {
    acts = [...acts, ...auxFinal[x]];
  }

  return acts;
};

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
  }, [user_id, dispatch, userActivities]);

  useEffect(() => {
    //   // props.getUsers();as
    if (!activities) {
      dispatch(activitiesAction.getActivities());
    }
  }, [dispatch, activities]);
  const colums = useBreackpoint();

  if (activitiesLoading) {
    return <Loading />;
  }

  if (userActivities && activities) {
    const now = moment().subtract(1, "days");

    /* Invercion de matriz */

    const acts = invercionMatriz(activities.data, colums);

    return (
      <div className="container mt-4">
        <div className="card-deck">
          <Card
            description={<Map activities={activities} />}
            title="Actividades de voluntariado"
            style={{ flexGrow: 200 }}
          />
          <VolunteerExperiences />
        </div>

        <div className="card-columns">
          {acts.map(item => {
            const isApply =
              userActivities.data.find(activity => activity.id === item.id) ===
              undefined;

            const deadline = moment(item.deadline);
            const isEnable = now <= deadline;
            return (
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
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

export default CardsContainer;

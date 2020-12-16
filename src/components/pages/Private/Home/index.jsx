import React, { useEffect, useState } from "react";
import Card from "../../../molecules/Card";
import Loading from "../../../molecules/Loading";
import Map from "../../../molecules/Map";

import VolunteerExperiences from "../../../molecules/VolunteerExperiences";
import "./cardContainer.scss";
import { useBreackpoint } from "../../../../utils/hooks/useBreackpoint";
import ActivitiesCard from "../../../molecules/ActivitiesCard";
import { apiCall } from "../../../../crud/api.crud";
import Pagination from "../../../molecules/Pagination";
import { useSelector } from "react-redux";
import moment from "moment";

const invercionMatriz = (data, columns) => {
  const row = Math.ceil(data.length / columns);

  let aux = [];
  const auxFinal = [];
  let acts = [];
  let indice = 0;
  let limit = 0;

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

  aux = [];
  indice = 0;

  for (let i = 0; columns > i; i++) {
    limit = indice + row;
    aux.push(acts.slice(indice, limit));
    indice = limit;
  }
  return aux;
};

const CardsContainer = () => {
  const [activities, setActivities] = useState(null);
  const [activitiesUser, setActivitiesUser] = useState(null);
  const [page, setPage] = useState(null);

  const { user_id } = useSelector((state) => ({
    user_id: state.auth.user.id,
  }));
  useEffect(() => {
    const pageApi = page ? `page[number]=${page}` : "";
    apiCall(
      `activity/?${pageApi}&filter[entity_origin_id]=${process.env.REACT_APP_ID_ENTITY}&filter[status]=1,2&include=locations`,
      null,
      "GET"
    ).then((response) => setActivities(response.data));
  }, [page]);

  useEffect(() => {
    apiCall(`user/${user_id}/activities`, null, "GET").then((response) =>
      setActivitiesUser(response.data)
    );
  }, []);

  const colums = useBreackpoint();

  if (!activities || !activitiesUser) return <Loading></Loading>;
  const activitiesColumns = invercionMatriz(activities.data, colums);
  const activitiesUserOnlyId = activitiesUser.data.map((ac) => ac.id);

  const now = moment().subtract(1, "days");

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
      <Pagination
        meta={activities.meta}
        action={setPage}
        withRedux={false}
        className="d-flex justify-content-end mt-5"
      />
      <div className="card__container">
        {activitiesColumns.map((activitiesColumn) => (
          <div className="card__container__columns">
            {activitiesColumn.map((activity) => (
              <ActivitiesCard
                activity={activity}
                userId={user_id}
                isApply={activitiesUserOnlyId.includes(activity.id)}
                isEnable={now <= moment(activity.deadline)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsContainer;
/* <ActivitiesCard activity={data}></ActivitiesCard> */

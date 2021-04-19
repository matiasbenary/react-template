import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Card from "../../../molecules/Card";
import Loading from "../../../molecules/Loading";
import Map from "../../../molecules/Map";

import VolunteerExperiences from "../../../molecules/VolunteerExperiences";
import "./cardContainer.scss";
import { useBreackpoint } from "../../../../utils/hooks/useBreackpoint";
import ActivitiesCard from "../../../molecules/ActivitiesCard";
import { apiCall } from "../../../../crud/api.crud";
import Pagination from "../../../molecules/Pagination";
import { invercionMatriz } from "../../../../utils/helper";
import Toast from "../../../molecules/Toast";
import config from "../../../../config";
// import Filter from "./components/Filter";
import Modal from "./components/Modal";

const converFilterToUrl = (filters) => {
  let aux = "";
  for (const filter in filters) {
    const filterData = filters[filter];
    if(!filterData) continue;
    const data = Array.isArray(filterData)
      ? filterData.map((v) => v.value).join()
      : filters[filter];
    aux += `&filter[${filter}]=${data}`;
  }
  return aux;
};

const CardsContainer = () => {
  const [activities, setActivities] = useState(null);
  const [activitiesUser, setActivitiesUser] = useState(null);
  const [page, setPage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState({});

  const { user_id } = useSelector((state) => ({
    user_id: state.auth.user.id,
  }));
  useEffect(() => {
    const pageApi = page ? `page[number]=${page}` : "";
    apiCall(
      `activity/?${pageApi}&filter[entity_origin_id]=${
        process.env.REACT_APP_ID_ENTITY
      }${converFilterToUrl(filter)}&filter[status]=1,2&include=locations`,
      null,
      "GET"
    ).then((response) => setActivities(response.data));
  }, [page, filter]);

  useEffect(() => {
    apiCall(`user/${user_id}/activities`, null, "GET").then((response) =>
      setActivitiesUser(response.data)
    );
  }, []);

  const colums = useBreackpoint();

  if (!activities || !activitiesUser) return <Loading />;
  const activitiesColumns = invercionMatriz(activities.data, colums);
  const activitiesUserOnlyId = activitiesUser.data.map((ac) => ac.id);

  const now = moment().subtract(1, "days");

  return (
    <>
      <Toast />
      <Modal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        setFilter={setFilter}
        filter={filter}
      />
      <div className="container mt-4">
        <div className="card-deck">
          {config.banner ? (
            <div className="card">
              <img src={config.banner} alt="banner" />
            </div>
          ) : (
            <>
              <Card
                description={<Map activities={activities} />}
                title="Actividades de voluntariado"
                style={{ flexGrow: 200 }}
              />
              <VolunteerExperiences />
            </>
          )}
        </div>
        <Pagination
          meta={activities.meta}
          action={setPage}
          withRedux={false}
          className="d-flex justify-content-end mt-5"
        />
        {/* <Filter setIsOpen={setIsOpen}></Filter> */}
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
    </>
  );
};

export default CardsContainer;

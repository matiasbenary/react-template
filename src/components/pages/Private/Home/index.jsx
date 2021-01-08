import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Card from '../../../molecules/Card';
import Loading from '../../../molecules/Loading';
import Map from '../../../molecules/Map';

import VolunteerExperiences from '../../../molecules/VolunteerExperiences';
import './cardContainer.scss';
import { useBreackpoint } from '../../../../utils/hooks/useBreackpoint';
import ActivitiesCard from '../../../molecules/ActivitiesCard';
import { apiCall } from '../../../../crud/api.crud';
import Pagination from '../../../molecules/Pagination';
import { invercionMatriz } from '../../../../utils/helper';

const CardsContainer = () => {
  const [activities, setActivities] = useState(null);
  const [activitiesUser, setActivitiesUser] = useState(null);
  const [page, setPage] = useState(null);

  const { user_id } = useSelector((state) => ({
    user_id: state.auth.user.id,
  }));
  useEffect(() => {
    const pageApi = page ? `page[number]=${page}` : '';
    apiCall(
      `activity/?${pageApi}&filter[entity_origin_id]=${process.env.REACT_APP_ID_ENTITY}&filter[status]=1,2&include=locations`,
      null,
      'GET',
    ).then((response) => setActivities(response.data));
  }, [page]);

  useEffect(() => {
    apiCall(`user/${user_id}/activities`, null, 'GET').then((response) => setActivitiesUser(response.data));
  }, []);

  const colums = useBreackpoint();

  if (!activities || !activitiesUser) return <Loading />;
  const activitiesColumns = invercionMatriz(activities.data, colums);
  const activitiesUserOnlyId = activitiesUser.data.map((ac) => ac.id);

  const now = moment().subtract(1, 'days');

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

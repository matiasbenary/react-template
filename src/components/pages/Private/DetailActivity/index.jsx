import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { apiCall } from '../../../../crud/api.crud';
import useGetUserId from '../../../../hooks/api/useGetUserId';
import ActivitiesButtons from '../../../molecules/ActivitiesButtons';

import Loading from '../../../molecules/Loading';
import Button from '../../../molecules/Button';
import Detail from '../../../molecules/Detail';
import OnlyOds from '../../../molecules/Ods/OnlyOds';

const Img = styled.img`
  width: 100%;
  border-radius: 15px;
  margin-bottom: 40px;
`;

const Container = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  display: inline-block;
  width: 30%;
  margin-right: 40px;

  .strong {
    font-weight: bold;
    margin: 0 5px 5px 0;
  }
`;
const RigthContainer = styled.div`
  display: inline-block;
  width: 60%;

  hr {
    border: 2px solid #c4c4c4;
    border-radius: 5px;
  }
`;

const Buttons = styled.div`
display:flex;
justify-content:flex-end;
align-items: center;
`;

const createMarkup = (setHtml) => ({ __html: setHtml });

const setHtml = (html) => (
  <div dangerouslySetInnerHTML={createMarkup(html)} />
);

const DetailActivity = () => {
  const { id } = useParams();
  const userId = useGetUserId();
  const [activity, setActivity] = useState(null);
  const [activitiesUser, setActivitiesUser] = useState(null);

  useEffect(() => {
    apiCall(`activity/${id}?include=locations,sdg`, null, 'GET').then((response) => setActivity(response.data.data[0]));
  }, []);

  useEffect(() => {
    apiCall(`user/${userId}/activities`, null, 'GET').then((response) => setActivitiesUser(response.data));
  }, []);

  const history = useHistory();

  if (!activity || !activitiesUser) return <Loading />;

  const goBack = () => {
    history.goBack();
  };
  const activitiesUserOnlyId = activitiesUser.data.map((ac) => ac.id);
  console.log('🚀 ~ file: index.jsx ~ line 77 ~ DetailActivity ~ activity', activity);

  const now = moment().subtract(1, 'days');

  return (
    <div className="container mt-4">
      <Buttons>
        <Button onClick={goBack} className="mr-4">Atrás</Button>
        <ActivitiesButtons
          activity={activity}
          userId={userId}
          isApply={activitiesUserOnlyId.includes(activity.id)}
          isEnable={now <= moment(activity.deadline)}
        />
      </Buttons>
      <Container>
        <LeftContainer>
          {activity.description_image && (
            <Img
              className="card-img-top"
              alt="img de actividad"
              src={`https://app.fonselp.com/storage/${activity.description_image}`}
            />
          )}
          <Detail activity={activity} showLocation />
          <hr />
          <div>
            <span className="strong">Objetivos de desarrollo sostenible:</span>
            <OnlyOds id={activity.sdg_id} />
          </div>
        </LeftContainer>
        <RigthContainer>
          <h2>{activity.title}</h2>
          <p>{setHtml(activity.description)}</p>
          <hr />
          <h2> Terminos y condiciones </h2>
          <p>{setHtml(activity.terms_and_conditions)}</p>
          <hr />
        </RigthContainer>
      </Container>
      <Buttons>
        <Button onClick={goBack} className="mr-4">Atrás</Button>
        <ActivitiesButtons
          activity={activity}
          userId={userId}
          isApply={activitiesUserOnlyId.includes(activity.id)}
          isEnable={now <= moment(activity.deadline)}
        />
      </Buttons>
    </div>
  );
};

export default DetailActivity;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { apiCall } from "../../../../crud/api.crud";
import useGetUserId from "../../../../hooks/api/useGetUserId";
import ActivitiesButtons from "../../../molecules/ActivitiesButtons";
import { useHistory } from "react-router-dom";

import Loading from "../../../molecules/Loading";
import Button from "../../../molecules/Button";
import moment from "moment";

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
`

const createMarkup = (setHtml) => ({ __html: setHtml });

const setHtml = (setHtml) => (
  <div dangerouslySetInnerHTML={createMarkup(setHtml)} />
);

const DetailActivity = () => {
  const { id } = useParams();
  const userId = useGetUserId();
  const [activity, setActivity] = useState(null);
  const [activitiesUser, setActivitiesUser] = useState(null);

  useEffect(() => {
    apiCall(`activity/${id}?include=locations`, null, "GET").then((response) =>
      setActivity(response.data.data[0])
    );
  }, []);

  useEffect(() => {
    apiCall(`user/${userId}/activities`, null, "GET").then((response) =>
      setActivitiesUser(response.data)
    );
  }, []);

  const history = useHistory();

  if (!activity || !activitiesUser) return <Loading></Loading>;

  const getLocation = () => {
    if (activity.locations.length) {
      return activity.locations && activity.locations.length === 1
        ? activity.locations[0].address
        : "Multiple";
    }
    return "Sin asignar";
  };

  const goBack = () =>{
    history.goBack();
  }
  const activitiesUserOnlyId = activitiesUser.data.map((ac) => ac.id);

  const now = moment().subtract(1, "days");

  return (
    <div className="container mt-4">
      <Buttons>
      <Button onClick={goBack}  className="mr-4">Atrás</Button>
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
          <div>
            <div>
              <span className="strong">Estado:</span> {activity.status_alias}
            </div>
            <div>
              <span className="strong">Comenzamos el:</span>
              {activity.activity_to}
            </div>
            <div>
              <span className="strong">Postúlate hasta:</span>
              {activity.deadline.slice(0, 10)}
            </div>
            {!!activity.quota && (
              <div>
                <span className="strong">Cupos:</span>
                {activity.quota}
              </div>
            )}
            <div>
              <span className="strong">Estamos en:</span>
              {getLocation()}
            </div>
          </div>
        </LeftContainer>
        <RigthContainer>
          <h2>{activity.title}</h2>
          <p>{setHtml(activity.description)}</p>
          <hr />
          <h2> Terminos y condiciones </h2>
          <p>{setHtml(activity.terms_and_conditions)}</p>
        </RigthContainer>
      </Container>
      <Buttons>
      <Button onClick={goBack}  className="mr-4">Atrás</Button>
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

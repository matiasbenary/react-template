import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ActivitiesButtons from "../ActivitiesButtons";

const Card = styled.div`
  background-color: #ffffff;
  border: 2px solid #e7e7e7;
  border-radius: 15px;
  margin-bottom: 10px;

  hr {
    border: 2px solid #c4c4c4;
    border-radius: 5px;
  }

  .strong {
    font-weight: bold;
    margin: 0 5px 5px 0;
  }
`;
const Container = styled.div`
  padding: 25px;
`;
const Img = styled.img`
  width: 100%;
  border-radius: 15px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;

const Footer = styled.div`
  background-color: #f7f7f7;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 15px 15px;
`;

const ActivitiesCard = ({ activity, userId, isApply, isEnable }) => {
  const getLocation = () => {
    if (activity.locations.length) {
      return activity.locations && activity.locations.length === 1
        ? activity.locations[0].address
        : "Multiple";
    }
    return "Sin asignar";
  };

  return (
    <Card>
      {activity.description_image && (
        <Img
          className="card-img-top"
          alt="img de actividad"
          src={`https://app.fonselp.com/storage/${activity.description_image}`}
        />
      )}
      <Container>
        <Info>
          <h3>{activity.title}</h3>
          <p>{activity.short_description}</p>
          <Link to={`detail/${activity.id}`} style={{ alignSelf: "flex-end" }}>
            + Ver más
          </Link>
        </Info>
        <hr />
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
      </Container>
      <Footer>
        <ActivitiesButtons
          activity={activity}
          userId={userId}
          isEnable={isEnable}
          isApply={isApply}
        />
      </Footer>
    </Card>
  );
};

export default ActivitiesCard;

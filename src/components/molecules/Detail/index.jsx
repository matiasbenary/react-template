import React from 'react';
import styled from 'styled-components';

const getColors = (color)=>{
  switch(color){
    case "success":
      return { color:"#fff", backgroundColor:"#34bfa3"}
      case "secondary":
      return { color:"#212529", backgroundColor:"#ebedf2"}
      case "brand":
      return { color:"#fff", backgroundColor:"#716aca"}
      case "info":
      return { color:"#fff", backgroundColor:"#36a3f7"}
      case "primary":
      return { color:"#fff", backgroundColor:"#5867dd"}
      case "warning":
      return { color:"#fff", backgroundColor:"#ffb822"}
      case "accent":
      return { color:"#fff", backgroundColor:"#00c5dc"}
      case "metal":
      return { color:"#fff", backgroundColor:"#c4c5d6"}
      case "danger":
      return { color:"#fff", backgroundColor:"#f4516c"}
      default:
      return { color:"#fff", backgroundColor:"#34bfa3"}
  }
}

const Span = styled.span`
  padding: 5px 15px;
  background-color: ${props=>getColors(props.color).backgroundColor};
  color: ${props=>getColors(props.color).color};
  display: block;
  border-radius: 15px;
  text-align: center;
  margin-bottom: 5px;
`

const Container = styled.div`
 display: flex;
 flex-direction: column;
`


const Detail = ({ activity, showLocation = false }) => {
  const getLocation = () => {
    if (activity.locations.length) {
      if (showLocation) {
        return activity.locations.map((loc) => <div>{loc.address}</div>);
      }
      return activity.locations && activity.locations.length === 1
        ? activity.locations[0].address
        : 'Multiple';
    }
    return 'Sin asignar';
  };

  return (
    <Container>
        <Span color={activity.color_alternative_type}>{activity.alternative_type}</Span>
      <div>
        <span className="strong">Estado:</span>
        {activity.status_alias}
      </div>
      <div>
        <span className="strong">Comenzamos el:</span>
        {(activity.activity_from=== activity.activity_to)?activity.activity_from:`${activity.activity_from} al ${activity.activity_to}`}
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
    </Container>
  );
};
export default Detail;

import React from 'react';

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
    <div>
      <div>
        <span className="strong">Tipo:</span>
        {activity.alternative_type}
      </div>
      <div>
        <span className="strong">Estado:</span>
        {activity.status_alias}
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
  );
};
export default Detail;

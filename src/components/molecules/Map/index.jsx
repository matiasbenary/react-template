import React from "react";
import { withGoogleMap, GoogleMap } from "react-google-maps";

import Marker from "./Marker";

const { google } = window;

const MyMapComponent = withGoogleMap(({ activities }) => (
  <GoogleMap
    defaultZoom={3}
    defaultCenter={{ lat: -31.4200832, lng: -64.18877609999998 }}
  >
    {activities &&
      activities.map((activity) =>
        activity.locations.map((location) => (
          <Marker location={location} activity={activity} />
        ))
      )}
  </GoogleMap>
));

const Map = ({ activities }) => {
  if (activities && activities.data) {
    return (
      <MyMapComponent
        activities={activities.data}
        containerElement={<div style={{ height: "250px" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    );
  }

  return null;
};

export default Map;

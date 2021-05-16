import React from "react";
import { withGoogleMap, GoogleMap } from "react-google-maps";

import Marker from "./Marker";
import config from "../../../config";

const { google } = window;

const MyMapComponent = withGoogleMap(({ activities }) => (
  <GoogleMap

    defaultZoom={config.location_zoom}
    defaultCenter={{ lat: config.location_lat, lng: config.location_lng }}
  >
    {activities &&
      activities.map((activity) =>
        activity.locations.map((location) => (
          <Marker key={`markerGoogleMaps${activity.id}`} location={location} activity={activity} />
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

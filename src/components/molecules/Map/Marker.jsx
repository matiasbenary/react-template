import React, { useState } from 'react';

import {
  Marker as MarkerNpm,
  InfoWindow,
} from 'react-google-maps';
import { Link } from 'react-router-dom';

const Marker = ({ location, activity }) => {
  const [open, setOpen] = useState(false);
  const openInfo = () => {
    setOpen(true);
  };

  return (
          <MarkerNpm
            key={location.id}
            position={{
              lat: parseInt(location.location_lat),
              lng: parseInt(location.location_lng),
            }}
            defaultTitle={location.address}
            onClick={openInfo}
          >
            {open && (
              <InfoWindow>
              <div id="content">
                <div id="siteNotice" />
                <h1
                  id="firstHeading"
                  className="firstHeading"
                  style={{ fontSize: '1.2rem' }}
                >
                  {activity.title}
                </h1>
                <div id="bodyContent">
                  <p>
                    <Link to={`/detail/${activity.id}`}>Ver mas</Link>
                  </p>
                </div>
              </div>
              </InfoWindow>
            ) }
          </MarkerNpm>
  );
};

export default Marker;

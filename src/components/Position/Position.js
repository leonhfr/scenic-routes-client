import React from 'react';
import PropTypes from 'prop-types';

import './Position.css';

function Position (props) {
  // <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
  return (
    <div className="position">
      {`Longitude: ${props.lng.toFixed(4)} Latitude: ${props.lat.toFixed(4)} Zoom: ${props.zoom.toFixed(2)}`}
    </div>
  );
}

Position.propTypes = {
  lng: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired
};

export default Position;

import React from 'react';
import PropTypes from 'prop-types';

function Position (props) {
  return (
    <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
      {`Longitude: ${props.lng.toFixed(6)} Latitude: ${props.lat.toFixed(6)} Zoom: ${props.zoom.toFixed(3)}`}
    </div>
  );
}

Position.propTypes = {
  lng: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired
};

export default Position;
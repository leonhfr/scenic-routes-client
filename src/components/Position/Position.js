import React from 'react';
import PropTypes from 'prop-types';

function Position (props) {
  return (
    <div style={{marginTop: '92px', marginLeft: '12px'}} className="inline-block absolute top bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
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

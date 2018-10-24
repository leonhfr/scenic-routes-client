import React from 'react';
import PropTypes from 'prop-types';

function Position (props) {
  if (props.active.id === 'heatmap') {
    return (
      <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-bold txt-s wmax360">
        <p><b>Scenic Routes</b></p>
        <p>
          You are new to a city. You want to go from A to B. However, the route
          between those two points is always the same: the shortest one. Taking
          the same route everyday is boring; I wanted new routes that make me
          see interesting stuff. Scenic Routes is a web application written in
          JavaScript that provides just that.
        </p>
        <p>Play around with the two views! Menu in the top right!</p>
        <p>{`Longitude: ${props.lng.toFixed(6)} Latitude: ${props.lat.toFixed(
          6
        )} Zoom: ${props.zoom.toFixed(3)}`}</p>
      </div>
    );
  } else return null;
}

Position.propTypes = {
  lng: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  active: PropTypes.object.isRequired
};

export default Position;

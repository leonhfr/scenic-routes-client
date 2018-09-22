import React from 'react';
import PropTypes from 'prop-types';

import Loader from 'react-loaders';

import 'loaders.css';
import './GeoJSONLoader.css';

function GeoJSONLoader (props) {
  return (
    <div className="loader-container">
      <Loader type="pacman" active={props.active} />
    </div>
  );
}

GeoJSONLoader.propTypes = {
  active: PropTypes.bool.isRequired
};

export default GeoJSONLoader;

import React from 'react';

import Loader from 'react-loaders';

import 'loaders.css';
import './GeoJSONLoader.css';

function GeoJSONLoader () {
  return (
    <div className="loader-container">
      <Loader type="pacman" active={true} />
      <h2 className="loading-data">Loading data...</h2>
    </div>
  );
}

export default GeoJSONLoader;

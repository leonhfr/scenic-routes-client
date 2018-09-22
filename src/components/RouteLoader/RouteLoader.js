import React from 'react';
import PropTypes from 'prop-types';

import './RouteLoader.css';

function RouteLoader (props) {
  return (
    <header className="header">
      <h1 className="header__title">{props.title}</h1>
    </header>
  );
}

RouteLoader.propTypes = {
  title: PropTypes.string.isRequired
};

export default RouteLoader;

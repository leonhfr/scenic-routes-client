import React from 'react';
import PropTypes from 'prop-types';

function Route (props) {
  return (
    <header className="header">
      <h1 className="header__title">{props.title}</h1>
    </header>
  );
}

Route.propTypes = {
  title: PropTypes.string.isRequired
};

export default Route;

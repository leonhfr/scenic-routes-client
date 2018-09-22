import React from 'react';
import PropTypes from 'prop-types';

import './Position.css';

function Position (props) {
  return (
    <header className="header">
      <h1 className="header__title">{props.title}</h1>
    </header>
  );
}

Position.propTypes = {
  title: PropTypes.string.isRequired
};

export default Position;

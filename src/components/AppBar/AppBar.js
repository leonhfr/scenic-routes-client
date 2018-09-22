import React from 'react';
import PropTypes from 'prop-types';

import './AppBar.css';

function AppBar (props) {
  return (
    <header className="header">
      <h1 className="header__title">{props.title}</h1>
    </header>
  );
}

AppBar.propTypes = {
  title: PropTypes.string.isRequired
};

export default AppBar;

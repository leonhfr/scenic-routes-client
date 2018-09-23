import React from 'react';
import PropTypes from 'prop-types';

import './AppBar.css';

function AppBar (props) {
  return (
    <div className="header">
      <h2 className="header__title">{props.title}</h2>
    </div>
  );
}

AppBar.propTypes = {
  title: PropTypes.string.isRequired
};

export default AppBar;

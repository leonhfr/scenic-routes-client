import React from 'react';
import PropTypes from 'prop-types';

import './Menu.css';

function Menu (props) {
  return (
    <header className="header">
      <h1 className="header__title">{props.title}</h1>
    </header>
  );
}

Menu.propTypes = {
  title: PropTypes.string.isRequired
};

export default Menu;

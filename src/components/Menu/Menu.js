import React from 'react';
import PropTypes from 'prop-types';

function Menu (props) {

  const { options, active } = props;

  const renderOptions = (option, i) => {
    return (
      <label key={i} className="toggle-container">
        <input onChange={() => props.onChange(option)} checked={option.property === active.property} name="toggle" type="radio" />
        <div className="toggle txt-s py3 toggle--active-white">{option.name}</div>
      </label>
    );
  };

  return (
    <div style={{marginTop: '92px', marginRight: '12px'}} className="toggle-group absolute top right border border--2 border--white bg-white shadow-darken10 z1">
      { options.map(renderOptions) }
    </div>
  );
}

Menu.propTypes = {
  options: PropTypes.array.isRequired,
  active: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Menu;

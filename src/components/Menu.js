import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

function Menu (props) {
  const { options, active } = props;

  const renderOptions = (option, i) => {
    return (
      <label key={i} className="toggle-container">
        <input
          checked={option.id === active.id}
          onChange={() => props.onChange(option)}
          name="toggle"
          type="radio"
        />
        <div className="toggle txt-s py3 toggle--active-white">
          <a data-tip data-for={`tooltip${i}`}>
            {option.name}
          </a>
        </div>
        <ReactTooltip id={`tooltip${i}`} place="bottom" type="light" effect="solid">
          <div style={{maxWidth:'300px',textAlign:'left',textSize:'10px',lineHeight:'20px'}}>{option.tooltip}</div>
        </ReactTooltip>
      </label>
    );
  };

  return (
    <div className="toggle-group absolute top right mt12 mr12 border border--2 border--white bg-white shadow-darken10 z1">
      {options.map(renderOptions)}
    </div>
  );
}

Menu.propTypes = {
  options: PropTypes.array.isRequired,
  active: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Menu;

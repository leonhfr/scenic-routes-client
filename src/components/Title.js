import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { drawerWidth } from '../constants/style.js';

const styles = theme => ({
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: drawerWidth
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  }
});

function Title (props) {

  return (
    <AppBar
      className={classNames(props.classes.appBar, {
        [props.classes.appBarShift]: props.menuOpen
      })}
    >
      <Toolbar disableGutters={!props.menuOpen}>
        <IconButton
          color="inherit"
          aria-label="Open menu"
          onClick={props.handleMenuOpen}
          className={classNames(props.classes.menuButton,
            props.menuOpen && props.classes.hide
          )}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" noWrap>
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

Title.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  menuOpen: PropTypes.bool,
  title: PropTypes.string,
  handleMenuOpen: PropTypes.func.isRequired
};

Title.defaultProps = {
  menuOpen: false
};

export default withStyles(styles, { withTheme: true })(Title);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';

import { drawerWidth } from '../constants/style.js';

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  }
});

function Title (props) {

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={props.menuOpen}
      classes={{
        paper: props.classes.drawerPaper
      }}
    >
      <div className={props.classes.drawerHeader}>
        <IconButton onClick={props.handleMenuClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Starred" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Send mail" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItem>
    </Drawer>
  );
}

Title.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  menuOpen: PropTypes.bool,
  handleMenuClose: PropTypes.func.isRequired
};

Title.defaultProps = {
  menuOpen: false
};

export default withStyles(styles, { withTheme: true })(Title);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';

import Switch from '@material-ui/core/Switch';
import LayersIcon from '@material-ui/icons/LayersOutlined';
import GPSNotFixedIcon from '@material-ui/icons/GpsNotFixedOutlined';
import MyLocationIcon from '@material-ui/icons/MyLocationOutlined';
import PinDropIcon from '@material-ui/icons/PinDropOutlined';
import WalkIcon from '@material-ui/icons/DirectionsWalkOutlined';
import NetworkIcon from '@material-ui/icons/DeviceHubOutlined';
import PhotoCameraIcon from '@material-ui/icons/PhotoCameraOutlined';

import { drawerWidth } from '../constants/constants.js';

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

function Menu (props) {

  // Heatmap switch
  // Coordinates
  // Point A Coordinates
  // Point B Coordinates
  //

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
      <List subheader={<ListSubheader>Coordinates</ListSubheader>} dense={true}>
        <ListItem>
          <ListItemText primary="42.8456 N | 2.8456 E | Zoom 16.3" />
        </ListItem>
      </List>
      <Divider />
      <List subheader={<ListSubheader>Routing</ListSubheader>} dense={true}>
        <ListItem button>
          <ListItemIcon>
            <MyLocationIcon />
          </ListItemIcon>
          <ListItemText primary="Point A" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <WalkIcon />
          </ListItemIcon>
          <ListItemText primary="ETA: 23min" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PhotoCameraIcon />
          </ListItemIcon>
          <ListItemText primary="17 interesting places on the way" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PinDropIcon />
          </ListItemIcon>
          <ListItemText primary="Point B" />
        </ListItem>
      </List>
      <Divider />
      <List subheader={<ListSubheader>Settings</ListSubheader>} dense={true}>
        <ListItem button>
          <ListItemIcon>
            <GPSNotFixedIcon />
          </ListItemIcon>
          <ListItemText primary="Center" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Heatmap" />
          <ListItemSecondaryAction>
            <Switch

            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <NetworkIcon />
          </ListItemIcon>
          <ListItemText primary="Delaunay Trigangulation" />
          <ListItemSecondaryAction>
            <Switch

            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Drawer>
  );
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  menuOpen: PropTypes.bool,
  handleMenuClose: PropTypes.func.isRequired
};

Menu.defaultProps = {
  menuOpen: false
};

export default withStyles(styles, { withTheme: true })(Menu);

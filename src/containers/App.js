import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';

import { connect } from 'react-redux';
import  { getChuck }  from '../actions/mocks.actions';

import { withStyles } from '@material-ui/core/styles';

import Title from '../components/Title';
import Menu from '../components/Menu';
import Map from '../containers/Map';

import { drawerWidth, title } from '../constants/constants.js';

const styles = theme => ({
  appFrame: {
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }
});

class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      menuOpen: false
    };
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  componentDidMount () {
    this.props.getQuote();
  }

  handleMenuOpen () {
    this.setState({ menuOpen: true });
  }

  handleMenuClose () {
    this.setState({ menuOpen: false });
  }
  // <Typography>{this.props.quote}</Typography>
  render () {
    return (
      <div className={this.props.classes.appFrame}>
        <Title
          menuOpen={this.state.menuOpen}
          title={title}
          handleMenuOpen={this.handleMenuOpen}
        />
        <Menu
          menuOpen={this.state.menuOpen}
          handleMenuClose={this.handleMenuClose}
        />
        <main
          className={classNames(
            this.props.classes.content, {
              [this.props.classes.contentShift]: this.state.menuOpen
            })}
        >
          <div className={this.props.classes.drawerHeader} />
          <Map />
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  quote: PropTypes.string,
  getQuote: PropTypes.func
};

const mapStateToProps = (state) => ({
  quote: state.mock.quote
});

const mapDispatchToProps = (dispatch) => ({
  getQuote: () => dispatch(getChuck())
});

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(App);

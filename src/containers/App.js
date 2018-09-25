import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getBounds, getHeatmap, getInterests }  from '../actions/geojson.actions';

import Map from './Map';
import GeoJSONLoader from '../components/GeoJSONLoader';
import LoadingBar from 'react-redux-loading-bar';

class App extends React.Component {

  componentDidMount () {
    this.props.getBounds();
    this.props.getHeatmap();
    this.props.getInterests();
  }

  render () {
    if (this.props.boundsLoaded &&
        this.props.heatmapLoaded &&
        this.props.interestsLoaded) {
      return (
        <div>
          <LoadingBar style={{ zIndex: 100, backgroundColor: '#3bb2d0', height: '6px' }} />
          <Map />
        </div>
      );
    } else {
      return <GeoJSONLoader />;
    }
  }
}

App.propTypes = {
  boundsLoaded: PropTypes.bool,
  heatmapLoaded: PropTypes.bool,
  interestsLoaded: PropTypes.bool
};

const mapStateToProps = (state) => ({
  boundsLoaded: state.geojson.boundsLoaded,
  heatmapLoaded: state.geojson.heatmapLoaded,
  interestsLoaded: state.geojson.interestsLoaded
});

const mapDispatchToProps = (dispatch) => ({
  getBounds: () => dispatch(getBounds()),
  getHeatmap: () => dispatch(getHeatmap()),
  getInterests: () => dispatch(getInterests())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

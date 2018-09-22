import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getBounds, getHeatmap, getInterests }  from '../../actions/geojson.actions';

import Map from '../Map/Map';
import AppBar from '../../components/AppBar/AppBar';
import GeoJSONLoader from '../../components/GeoJSONLoader/GeoJSONLoader';

const title = 'Scenic Routes';

class App extends React.Component {

  componentDidMount () {
    this.props.getHeatmap();
    this.props.getInterests();
  }

  renderContent () {
    if (this.props.heatmapLoaded && this.props.interestsLoaded) {
      return (
        <Map className="map" />
      );
    } else {
      return <GeoJSONLoader />;
    }
  }

  render () {
    return (
      <div>
        <AppBar title={title} />
        {this.renderContent()}
      </div>
    );
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

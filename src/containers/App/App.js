import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getHeatmap, getInterests }  from '../../actions/geojson.actions';

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
        <Map />
      );
    } else {
      return <GeoJSONLoader active={true} />;
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
  heatmapLoaded: PropTypes.bool,
  interestsLoaded: PropTypes.bool
};

const mapStateToProps = (state) => ({
  heatmapLoaded: state.heatmapLoaded,
  interestsLoaded: state.interestsLoaded
});

const mapDispatchToProps = (dispatch) => ({
  getHeatmap: () => dispatch(getHeatmap()),
  getInterests: () => dispatch(getInterests())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

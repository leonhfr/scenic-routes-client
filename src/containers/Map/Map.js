import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

import { geo } from '../../constants/constants.js';

const lat = geo.GEO_BBOX_BOTTOM + Math.abs(geo.GEO_BBOX_BOTTOM - geo.GEO_BBOX_TOP) / 2;
const lng = geo.GEO_BBOX_LEFT + Math.abs(geo.GEO_BBOX_LEFT - geo.GEO_BBOX_RIGHT) / 2;

mapboxgl.accessToken = 'pk.eyJ1IjoibGVvbmhmciIsImEiOiJjam1icjllY3cxbG03M3BudGQzaWs1Zjk5In0.5u5qyMk6oy4MkkZKW3pbGQ';

class Map extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      lng,
      lat,
      zoom: 14
    };
  }

  componentDidMount () {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [lng, lat],
      zoom
    });

    // disable map rotation using right click + drag
    map.dragRotate.disable();
    // disable map rotation using touch rotation gesture
    map.touchZoomRotate.disableRotation();

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    map.on('load', () => {
      map.addSource('interests', {
        type: 'geojson',
        data: 'http://localhost:3000/data/data-long.json'
      });

      map.addLayer({
        id: 'interests-heat',
        type: 'heatmap',
        source: 'interests',
        maxzoom: 16,
        paint: {
          // Increase the heatmap weight based on frequency and property magnitude
          'heatmap-weight': [
            'interpolate',
            [ 'linear' ],
            [ 'get', 'score' ],
            0, 0,
            6, 1
          ],
          // Increase the heatmap color weight weight by zoom level
          // heatmap-intensity is a multiplier on top of heatmap-weight
          'heatmap-intensity': [
            'interpolate',
            [ 'linear' ],
            [ 'zoom' ],
            0, 1,
            16, 3
          ],
          // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
          // Begin color ramp at 0-stop with a 0-transparancy color
          // to create a blur-like effect.
          'heatmap-color': [
            'interpolate',
            [ 'linear' ],
            [ 'heatmap-density' ],
            0, 'rgba(33,102,172,0)',
            0.2, 'rgb(103,169,207)',
            0.4, 'rgb(209,229,240)',
            0.6, 'rgb(253,219,199)',
            0.8, 'rgb(239,138,98)',
            1, 'rgb(178,24,43)'
          ],
          // Adjust the heatmap radius by zoom level
          'heatmap-radius': [
            'interpolate',
            [ 'linear' ],
            [ 'zoom' ],
            0, 2,
            16, 20
          ],
          // Transition from heatmap to circle layer by zoom level
          'heatmap-opacity': [
            'interpolate',
            [ 'linear' ],
            [ 'zoom' ],
            7, 1,
            16, 0
          ]
        }
      }, 'waterway-label');
    });
  }

  render () {
    const { lng, lat, zoom } = this.state;

    return (
      <div>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
      </div>
    );
  }
}

Map.propTypes = {
  heatmap: PropTypes.object.isRequired,
  interests: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  heatmap: state.heatmap,
  interests: state.interests
});

// const mapDispatchToProps = (dispatch) => ({
//   getHeatmap: () => dispatch(getHeatmap()),
//   getInterests: () => dispatch(getInterests())
// });

export default connect(mapStateToProps)(Map);
// export default connect(mapStateToProps, mapDispatchToProps)(Map);

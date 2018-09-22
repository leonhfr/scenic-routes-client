import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

import { geo } from '../../constants/constants.js';

import Position from '../../components/Position/Position';

const lat = geo.GEO_BBOX_BOTTOM + Math.abs(geo.GEO_BBOX_BOTTOM - geo.GEO_BBOX_TOP) / 2;
const lng = geo.GEO_BBOX_LEFT + Math.abs(geo.GEO_BBOX_LEFT - geo.GEO_BBOX_RIGHT) / 2;

const maxBounds = [
  [geo.GEO_BBOX_LEFT, geo.GEO_BBOX_BOTTOM],
  [geo.GEO_BBOX_RIGHT, geo.GEO_BBOX_TOP]
];

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
      zoom,
      // maxBounds
    });

    // disable map rotation using right click + drag
    map.dragRotate.disable();
    // disable map rotation using touch rotation gesture
    map.touchZoomRotate.disableRotation();

    map.on('mousemove', (e) => {
      const { lng, lat } = e.lngLat;

      this.setState({
        lng: Number(lng),
        lat: Number(lat),
        zoom: map.getZoom()
      });
    });

    map.on('load', () => {
      map.addSource('interests', {
        type: 'geojson',
        data: this.props.heatmap
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
      <div className="map-container">
        <Position lng={lng} lat={lat} zoom={zoom} />
        <div ref={el => this.mapContainer = el} style={{marginTop: '80px'}} className="fixed top right left bottom" />
      </div>
    );
  }
}

Map.propTypes = {
  heatmap: PropTypes.object.isRequired,
  interests: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  heatmap: state.geojson.heatmap,
  interests: state.geojson.interests
});

// const mapDispatchToProps = (dispatch) => ({
//   getHeatmap: () => dispatch(getHeatmap()),
//   getInterests: () => dispatch(getInterests())
// });

export default connect(mapStateToProps)(Map);
// export default connect(mapStateToProps, mapDispatchToProps)(Map);

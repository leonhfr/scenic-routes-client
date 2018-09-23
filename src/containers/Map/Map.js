import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

import { setActiveOption } from '../../actions/options.actions';

import Position from '../../components/Position/Position';
import Menu from '../../components/Menu/Menu';

mapboxgl.accessToken = 'pk.eyJ1IjoibGVvbmhmciIsImEiOiJjam1icjllY3cxbG03M3BudGQzaWs1Zjk5In0.5u5qyMk6oy4MkkZKW3pbGQ';

class Map extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      zoom: 14
    };
  }

  componentDidMount () {

    const { zoom } = this.state;

    const points = this.props.bounds.map(Number);
    const bottomLeft = points.slice(0, 2);
    const topRight = points.slice(2);
    const center = [
      bottomLeft[0] + Math.abs(bottomLeft[0] - topRight[0]) / 2,
      bottomLeft[1] + Math.abs(bottomLeft[1] - topRight[1]) / 2
    ];
    const extension = 1.2;
    const width  = Math.abs(topRight[0] - bottomLeft[0]);
    const height = Math.abs(topRight[1] - bottomLeft[1]);
    const offsetWidth  = width  * (extension - 1) / 2;
    const offsetHeight = height * (extension - 1) / 2;
    const maxBounds = [
      [
        bottomLeft[0] - offsetWidth,
        bottomLeft[1] - offsetHeight
      ],
      [
        topRight[0] + offsetWidth,
        topRight[1] + offsetHeight
      ]
    ];

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/dark-v9',
      center,
      zoom,
      maxBounds
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
            9, 3
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
            8, 24
          ],
          // Transition from heatmap to circle layer by zoom level
          'heatmap-opacity': [
            'interpolate',
            [ 'linear' ],
            [ 'zoom' ],
            7, 1,
            20, 0
          ]
        }
      }, 'waterway-label');
    });
  }

  render () {
    // const { lng, lat, zoom } = this.state;
    const { zoom } = this.state;

    return (
      <div className="map-container">
        <Position lng={0} lat={0} zoom={zoom} />
        <Menu
          options={this.props.options}
          active={this.props.active}
          onChange={this.props.setActiveOption}
        />
        <div ref={el => this.mapContainer = el} style={{marginTop: '80px'}} className="fixed top right left bottom" />
      </div>
    );
  }
}

Map.propTypes = {
  bounds: PropTypes.array.isRequired,
  heatmap: PropTypes.object.isRequired,
  interests: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  active: PropTypes.object.isRequired,
  setActiveOption: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  bounds: state.geojson.bounds,
  heatmap: state.geojson.heatmap,
  interests: state.geojson.interests,
  options: state.options.options,
  active: state.options.active
});

const mapDispatchToProps = (dispatch) => ({
  setActiveOption: (option) => dispatch(setActiveOption(option))
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

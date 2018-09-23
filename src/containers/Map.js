import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

import { setActiveOption } from '../actions/options.actions';

import Directions from '../components/Directions';
import Position from '../components/Position';
import Menu from '../components/Menu';

mapboxgl.accessToken = 'pk.eyJ1IjoibGVvbmhmciIsImEiOiJjam1icjllY3cxbG03M3BudGQzaWs1Zjk5In0.5u5qyMk6oy4MkkZKW3pbGQ';

class Map extends React.Component {

  constructor (props) {
    super(props);
    this.map;
    this.state = {
      zoom: 14
    };
  }

  componentWillMount () {
    const p = this.props.bounds.map(Number);
    const o = 0.1;
    const w = p[2] - p[0];
    const h = p[3] - p[1];
    const lng = p[0] + w / 2;
    const lat = p[1] + h / 2;
    const maxBounds = [
      [p[0] -o*w, p[1] -o*h],
      [p[2] +o*w, p[3] +o*h]
    ];
    this.setState({
      lng,
      lat,
      center: [lng, lat],
      maxBounds
    });
  }

  componentDidMount () {

    const minzoom = 15;
    const maxzoom = 16;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: this.state.center,
      zoom: this.state.zoom,
      maxBounds: this.state.maxBounds
    });

    this.map.dragRotate.disable();
    this.map.touchZoomRotate.disableRotation();

    this.map.on('mousemove', (e) => {
      const { lng, lat } = e.lngLat;
      this.setState({
        lng: Number(lng),
        lat: Number(lat)
      });
    });

    this.map.on('wheel', (e) => {
      this.setState({
        zoom: this.map.getZoom()
      });
    });

    this.map.on('load', () => {

      this.map.addSource('heatmap', {
        type: 'geojson',
        data: this.props.heatmap
      });
      this.map.addSource('interests', {
        type: 'geojson',
        data: this.props.interests
      });

      this.map.addLayer({
        id: 'interests',
        type: 'circle',
        source: 'interests',
        visibility: 'visible',
        minzoom,
        paint: {
          'circle-radius': 15,
          'circle-color': 'rgb(178,24,43)',
          'circle-blur': 0.8,
          'circle-opacity': 0.8
        }
      });

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

      this.map.on('mouseenter', 'interests', (e) => {
        this.map.getCanvas().style.cursor = 'pointer';
        const coordinates = e.features[0].geometry.coordinates.slice();
        const pics = e.features[0].properties.pics; // TODO: change this
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        popup.setLngLat(coordinates)
          .setHTML(pics)
          .addTo(this.map);
      });

      this.map.on('mouseleave', 'interests', () => {
        this.map.getCanvas().style.cursor = '';
        popup.remove();
      });

      this.map.addLayer({
        id: 'heatmap',
        type: 'heatmap',
        source: 'heatmap',
        visibility: 'visible',
        maxzoom,
        paint: {
          // Increase the heatmap weight based on frequency and property magnitude
          'heatmap-weight': [
            'interpolate',
            [ 'linear' ],
            [ 'get', 'pics' ],
            0, 0,
            10, 1
          ],
          // Increase the heatmap color weight weight by zoom level
          // heatm    ap-intensity is a multiplier on top of heatmap-weight
          'heatmap-intensity': [
            'interpolate',
            [ 'linear' ],
            [ 'zoom' ],
            0, 1,
            maxzoom, 3
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
            maxzoom, 20
          ],
          // Transition from heatmap to circle layer by zoom level
          'heatmap-opacity': [
            'interpolate',
            [ 'linear' ],
            [ 'zoom' ],
            minzoom, 1,
            maxzoom, 0
          ]
        }
      });
    });
  }

  componentDidUpdate () {

  }

  render () {
    const { lng, lat, zoom } = this.state;

    return (
      <div className="map-container">
        <Position lng={lng} lat={lat} zoom={zoom} />
        <Menu
          options={this.props.options}
          active={this.props.active}
          onChange={this.props.setActiveOption}
        />
        <div ref={el => this.mapContainer = el} className="fixed top right left bottom" />
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

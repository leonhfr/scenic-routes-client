import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

import { setActiveOption } from '../actions/options.actions';

import Directions from '../components/Directions';
import Position from '../components/Position';
import Menu from '../components/Menu';

import { computeBounds } from './Map.config';
import { heatmapLayer } from './Map.config';
import { interestsLayer } from './Map.config';
import { routesLayer } from './Map.config';

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
    const p = computeBounds(this.props.bounds.map(Number));
    const { lng, lat, maxBounds } = p;
    this.setState({
      lng,
      lat,
      center: [lng, lat],
      maxBounds
    });
  }

  componentDidMount () {

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

      this.map.addLayer(heatmapLayer);
      this.map.addLayer(interestsLayer);
      this.map.addLayer(routesLayer);

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

      this.setVisibility();
    });
  }

  componentDidUpdate () {
    this.setVisibility();
  }

  setVisibility () {
    for (let option of this.props.options) {
      for (let layer of this.props.layers[option.id]) {
        if (option.id === this.props.active.id) {
          this.map.setLayoutProperty(layer, 'visibility', 'visible');
        } else {
          this.map.setLayoutProperty(layer, 'visibility', 'none');
        }
      }
    }
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
  layers: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  active: PropTypes.object.isRequired,
  setActiveOption: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  bounds: state.geojson.bounds,
  heatmap: state.geojson.heatmap,
  interests: state.geojson.interests,
  layers: state.options.layers,
  options: state.options.options,
  active: state.options.active
});

const mapDispatchToProps = (dispatch) => ({
  setActiveOption: (option) => dispatch(setActiveOption(option))
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

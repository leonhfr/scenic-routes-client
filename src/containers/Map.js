import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

import { setActiveOption } from '../actions/options.actions';
import { getRoutes, delRoutes }  from '../actions/routes.actions';

// import Directions from '../components/Directions';
import Position from '../components/Position';
import Menu from '../components/Menu';

import { computeBounds } from './Map.config';
import { wrapFeatures } from './Map.config';
import { heatmapLayer } from './Map.config';
import { interestsLayer } from './Map.config';
import { routesStartEndLayer } from './Map.config';
import { routesInputLayer } from './Map.config';
import { routesLineLayer } from './Map.config';

mapboxgl.accessToken = 'pk.eyJ1IjoibGVvbmhmciIsImEiOiJjam1icjllY3cxbG03M3BudGQzaWs1Zjk5In0.5u5qyMk6oy4MkkZKW3pbGQ';

class Map extends React.Component {

  constructor (props) {
    super(props);
    this.map = {};
    this.state = {
      zoom: 14,
      points: []
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

    this.map.on('load', () => {

      this.map.addSource('heatmap', {
        type: 'geojson',
        data: this.props.heatmap
      });
      this.map.addSource('interests', {
        type: 'geojson',
        data: this.props.interests
      });
      this.map.addSource('scenic-routes-request', wrapFeatures([]));
      this.map.addSource('scenic-routes-response', wrapFeatures([]));

      this.map.addLayer(heatmapLayer);
      this.map.addLayer(interestsLayer);
      this.map.addLayer(routesInputLayer);
      this.map.addLayer(routesStartEndLayer);
      this.map.addLayer(routesLineLayer);

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

      this.map.on('click', (e) => {
        if (this.props.active.id !== 'scenicRoutes') return;
        const len = this.state.points.length;
        // Draw A
        if (len === 0) {
          this.setState({
            points: [this.drawPoint(e.lngLat)]
          });
          this.map
            .getSource('scenic-routes-request')
            .setData({
              type: 'FeatureCollection',
              features: this.state.points
            });
        }
        // Draw B and make request
        else if (len === 1) {
          this.setState({
            points: [
              ...this.state.points,
              this.drawPoint(e.lngLat)
            ]
          });
          this.map
            .getSource('scenic-routes-request')
            .setData({
              type: 'FeatureCollection',
              features: this.state.points
            });
          this.props.getRoutes(this.getEndpoint(this.state.points));
          // TODO: make req
          // TODO: draw route
        }
        else {
          this.setState({
            points: []
          });
          this.map
            .getSource('scenic-routes-request')
            .setData({
              type: 'FeatureCollection',
              features: []
            });
          this.props.delRoutes();
          // TODO: remove pts
          // TODO: remove routes
        }
      });

      this.setVisibility();
    });
  }

  componentDidUpdate () {
    this.setVisibility();
  }

  getEndpoint (data) {
    const endpoint = [];
    for (let point of data) {
      for (let coord of point.geometry.coordinates) {
        endpoint.push(coord.toFixed(5));
      }
    }
    return endpoint.join('/');
  }

  drawPoint (coords) {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          coords.lng,
          coords.lat
        ]
      }
    };
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
  route: PropTypes.object.isRequired,
  routeDisplay: PropTypes.bool.isRequired,
  setActiveOption: PropTypes.func.isRequired,
  getRoutes: PropTypes.func.isRequired,
  delRoutes: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  bounds: state.geojson.bounds,
  heatmap: state.geojson.heatmap,
  interests: state.geojson.interests,
  layers: state.options.layers,
  options: state.options.options,
  active: state.options.active,
  route: state.routes.route,
  routeDisplay: state.routes.routeDisplay
});

const mapDispatchToProps = (dispatch) => ({
  setActiveOption: (option) => dispatch(setActiveOption(option)),
  getRoutes: (data) => dispatch(getRoutes(data)),
  delRoutes: () => dispatch(delRoutes())
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

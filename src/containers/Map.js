import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

import { setActiveOption } from '../actions/options.actions';
import { getRoutes, delRoutes, addWaypoint, delWaypoints }  from '../actions/routes.actions';

import Route from '../components/Route';
import Position from '../components/Position';
import Menu from '../components/Menu';

import {
  computeBounds,
  getEndpoint,
  heatmapLayer,
  interestsLayer,
  routesStartEndLayer,
  routesInputLayer,
  routesLineLayer,
  routesInterestsLayer
} from './Map.config';

mapboxgl.accessToken = 'pk.eyJ1IjoibGVvbmhmciIsImEiOiJjam1icjllY3cxbG03M3BudGQzaWs1Zjk5In0.5u5qyMk6oy4MkkZKW3pbGQ';

class Map extends React.Component {

  constructor (props) {
    super(props);
    this.map = {};
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

    this.map.on('load', () => {

      this.map.addSource('heatmap', {
        type: 'geojson',
        data: this.props.heatmap
      });
      this.map.addSource('interests', {
        type: 'geojson',
        data: this.props.interests
      });
      this.map.addSource('scenic-routes-request', {
        type: 'geojson',
        data: this.props.request
      });
      this.map.addSource('scenic-routes-response', {
        type: 'geojson',
        data: this.props.response.geometry
      });

      this.map.addLayer(heatmapLayer);
      this.map.addLayer(interestsLayer);
      this.map.addLayer(routesInputLayer);
      this.map.addLayer(routesStartEndLayer);
      this.map.addLayer(routesLineLayer);
      this.map.addLayer(routesInterestsLayer);

      this.map.on('mousemove', (e) => {
        if (this.props.active.id === 'scenicRoutes') return;
        const { lng, lat } = e.lngLat;
        this.setState({
          lng: Number(lng),
          lat: Number(lat)
        });
      });

      this.map.on('wheel', (e) => {
        if (this.props.active.id === 'scenicRoutes') return;
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
        let url = '';
        if (e.features[0].properties.urlm) {
          url = e.features[0].properties.urlm;
        } else {
          url = e.features[0].properties.urlc;
        }
        const max = 200;
        const content = `<img src="${url}" style="display:block;max-width:${max}px;max-height:${max}px;width:auto;height:auto;" alt="Could not fetch image" />${e.features[0].properties.pics} picture(s) here`;
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        popup.setLngLat(coordinates)
          .setHTML(content)
          .addTo(this.map);
      });

      this.map.on('mouseenter', 'scenic-routes-interests', (e) => {
        this.map.getCanvas().style.cursor = 'pointer';
        const coordinates = e.features[0].geometry.coordinates.slice();
        let url = '';
        if (e.features[0].properties.urlm) {
          url = e.features[0].properties.urlm;
        } else {
          url = e.features[0].properties.urlc;
        }
        const max = 200;
        const content = [];
        const imgStyle = `display:block;max-width:${max}px;max-height:${max}px;width:auto;height:auto;`;
        content.push(`<img src="${url}" style="${imgStyle}" alt="Could not fetch image" />`);
        if (e.features[0].properties.name) content.push(`<b>${e.features[0].properties.name}</b><br />`);
        content.push(`${e.features[0].properties.pics} picture(s) here`);
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        popup.setLngLat(coordinates)
          .setHTML(content.join(''))
          .addTo(this.map);
      });

      this.map.on('mouseleave', 'interests', () => {
        this.map.getCanvas().style.cursor = '';
        popup.remove();
      });

      this.map.on('mouseleave', 'scenic-routes-interests', () => {
        this.map.getCanvas().style.cursor = '';
        popup.remove();
      });

      this.map.on('click', (e) => {
        if (this.props.active.id !== 'scenicRoutes') return;
        const len = this.props.request.features.length;
        // Draw A and empty previous response object
        if (len === 0) {
          this.props.addWaypoint(e.lngLat);
          this.props.delRoutes();
        }
        // Draw B and make request, then empty request
        else {
          this.props.addWaypoint(e.lngLat);
          this.props.getRoutes(getEndpoint(this.props.request));
          this.props.delWaypoints();
        }
      });

      this.setVisibility();
    });
  }

  componentDidUpdate () {
    this.setVisibility();
    this.map
      .getSource('scenic-routes-request')
      .setData(this.props.request);
    this.map
      .getSource('scenic-routes-response')
      .setData(this.props.response.geometry);
    if (!this.props.request.features.length &&
        this.props.response.geometry.features.length &&
        this.props.active.id !=='heatmap') {
      const routeCoords = this.props.response.geometry.features[0].geometry.coordinates;
      const bounds = routeCoords.reduce((bounds, coords) => {
        return bounds.extend(coords);
      }, new mapboxgl.LngLatBounds(routeCoords[0], routeCoords[0]));
      this.map.fitBounds(bounds, {
        padding: 60
      });
    }

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

    // TODO: display route stats
    return (
      <div className="map-container">
        <Position lng={lng} lat={lat} zoom={zoom} active={this.props.active} />
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
  setActiveOption: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired,
  response: PropTypes.object.isRequired,
  getRoutes: PropTypes.func.isRequired,
  delRoutes: PropTypes.func.isRequired,
  addWaypoint: PropTypes.func.isRequired,
  delWaypoints: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  bounds: state.geojson.bounds,
  heatmap: state.geojson.heatmap,
  interests: state.geojson.interests,
  layers: state.options.layers,
  options: state.options.options,
  active: state.options.active,
  request: state.routes.request,
  response: state.routes.response
});

const mapDispatchToProps = (dispatch) => ({
  setActiveOption: (option) => dispatch(setActiveOption(option)),
  getRoutes: (data) => dispatch(getRoutes(data)),
  delRoutes: () => dispatch(delRoutes()),
  addWaypoint: (waypoint) => dispatch(addWaypoint(waypoint)),
  delWaypoints: () => dispatch(delWaypoints())
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

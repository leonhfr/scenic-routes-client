# Scenic Routes

## What is it?

You are new to a city. You want to go from A to B. However, the route between those two points is always the same: the shortest one. Taking the same route everyday is boring; I wanted new routes that make me see interesting stuff. Scenic Routes is a web application written in JavaScript that provides just that.

## Tech stack

Front-end:
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Mapbox](https://www.mapbox.com/)

Back-end:
- [Koa](https://koajs.com/)
- [Redis](https://redis.io/)
- [Turf.js](http://turfjs.org/)
- [OPTICS (density clustering)](https://github.com/uhho/density-clustering)

APIs:
- [Flickr](https://www.flickr.com/services/api/)
- [Mapbox](https://www.mapbox.com/)

## Screenshots and details

<p align="center">
  <img style="max-width:600px;" src="./docs/heatmap.png" />
</p>

In the first view, you start with a heatmap of Barcelona representing the locations of the 10,000 most interesting Flickr pictures taken in that area.

---

<p align="center">
  <img style="max-width:600px;" src="./docs/clusters.png" />
</p>

Zoom in, and the photos are clustered into interesting points. The more pictures have been taken at a point, the more interesting it is.

---

<p align="center">
  <img style="max-width:600px;" src="./docs/route.png" />
</p>

In the second view, you can get routed through those points. The routing algorithm enforces some rules:
- The more interesting a point is, the more likely you will get routed through it.
- The longer the route, the wider the search radius is and the more interesting points you will be routed through.
- Detours are allowed, but the commute is still kept to a reasonable amount of time.

## Getting started

### Prerequisite

You will need the [Scenic Routes backend](https://github.com/leonhfr/scenic-routes) if you want any sort of useful interaction with the application.

### Installation

Clone the repository, change to the directory of the client, install dependencies and run the React application:
```shell
git clone https://github.com/leonhfr/scenic-routes-client.git
cd scenic-routes-client
npm install
npm start
```

You might consider to change the Mapbox token in `/containers/Map.js` to your own.

## Author

Léon Hollender / [Github](https://github.com/leonhfr) / [LinkedIn](https://www.linkedin.com/in/leonhollender/)

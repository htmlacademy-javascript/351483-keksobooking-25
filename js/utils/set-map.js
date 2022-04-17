import { setAddress } from './form.js';
import { createAd } from './create-card.js';

const ADS_COUNT = 10;

const mapOption = {
  DEFAULT_COORDS: {
    lat: 35.66306,
    lng: 139.72699,
  },
  TILE: {
    URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    ATTR: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  MARKER: {
    MAIN_IMG: 'main-pin.svg',
    DEFAULT_IMG: 'pin.svg',
  },
  PIN_SIZE: {
    MAIN: 52,
    DEFAULT: 40,
  },
  ZOOM: {
    DEFAULT_ZOOM: 13,
  }
};

const mapCanvas = document.querySelector('#map-canvas');

const map = L.map(mapCanvas);
const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: `./img/${mapOption.MARKER.MAIN_IMG}`,
  iconSize: [mapOption.PIN_SIZE.MAIN, mapOption.PIN_SIZE.MAIN],
  iconAnchor: [mapOption.PIN_SIZE.MAIN / 2, mapOption.PIN_SIZE.MAIN],
});

const pinIcon = L.icon({
  iconUrl: `./img/${mapOption.MARKER.DEFAULT_IMG}`,
  iconSize: [mapOption.PIN_SIZE.DEFAULT, mapOption.PIN_SIZE.DEFAULT],
  iconAnchor: [mapOption.PIN_SIZE.DEFAULT / 2, mapOption.PIN_SIZE.DEFAULT],
});

const createPinMarker = () => L.marker(
  mapOption.DEFAULT_COORDS,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const createMarkers = (items) => {
  const slicePins = items.slice(0, ADS_COUNT);
  markerGroup.clearLayers();
  slicePins.forEach((ad) => {
    const iconPin = L.marker(ad.location, { icon: pinIcon });
    iconPin
      .addTo(markerGroup)
      .bindPopup(createAd(ad));
  });
};

const onMainPinMove = (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  setAddress(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
};

const mainPinMarker = createPinMarker();

const addPinMarker = () => {
  mainPinMarker.addTo(map);
  mainPinMarker.on('move', onMainPinMove);
  setAddress(`${mapOption.DEFAULT_COORDS.lat}, ${mapOption.DEFAULT_COORDS.lng}`);
};

const initMap = (cb) => {
  map.on('load', () => {
    // enableAdForm();
    cb();
  })
    .setView(mapOption.DEFAULT_COORDS, mapOption.ZOOM.DEFAULT_ZOOM);

  L.tileLayer(
    mapOption.TILE.URL,
    {
      attribution: mapOption.TILE.ATTR,
    },
  ).addTo(map);

  addPinMarker();
};

const resetMap = () => {
  map.setView(mapOption.DEFAULT_COORDS, mapOption.ZOOM.DEFAULT_ZOOM);
  mainPinMarker.setLatLng(new L.LatLng(mapOption.DEFAULT_COORDS.lat, mapOption.DEFAULT_COORDS.lng));
  setAddress(`${mapOption.DEFAULT_COORDS.lat}, ${mapOption.DEFAULT_COORDS.lng}`);
};

export {initMap, resetMap, createMarkers,};

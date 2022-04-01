import { setAddress } from './validate-form.js';
import { createAd } from './create-card.js';
import { enableForm } from './start-page.js';

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
};

const mapCanvas = document.querySelector('#map-canvas');
const resetButton = document.querySelector('.ad-form__reset');

const map = L.map(mapCanvas);

const initMap = () => {
  map.on('load', () => {
    enableForm();
    setAddress(mapOption.DEFAULT_COORDS);
  })
    .setView({
      lat: mapOption.DEFAULT_COORDS.lat,
      lng: mapOption.DEFAULT_COORDS.lng,
    }, 13);
};

L.tileLayer(
  mapOption.TILE.URL,
  {
    attribution: mapOption.TILE.ATTR,
  },
).addTo(map);

const mainMarkerIcon = L.icon({
  iconUrl: `../../img/${mapOption.MARKER.MAIN_IMG}`,
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: mapOption.DEFAULT_COORDS.lat,
    lng: mapOption.DEFAULT_COORDS.lng,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  }
);

mainMarker.addTo(map);
mainMarker.on('moveend', (evt) => {
  setAddress(evt.target.getLatLng());
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (offerCard) => {
  const { lat, lng } = offerCard.location;
  const icon = L.icon(
    {
      iconUrl: `../../img/${mapOption.MARKER.DEFAULT_IMG}`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    },
  );
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker.addTo(markerGroup)
    .bindPopup(createAd(offerCard));
};

const createMarkersGroup = (similarAds) => {
  similarAds.forEach((offerCard) => {
    createMarker(offerCard);
  });
};

// Reset

resetButton.addEventListener('click', () => {
  setAddress(mapOption.DEFAULT_COORDS);
  mainMarker.setLatLng(
    {
      lat: mapOption.DEFAULT_COORDS.lat,
      lng: mapOption.DEFAULT_COORDS.lng,
    },
  );

  map.setView(
    {
      lat: mapOption.DEFAULT_COORDS.lat,
      lng: mapOption.DEFAULT_COORDS.lng,
    }, 15);
});

export { initMap, createMarkersGroup };

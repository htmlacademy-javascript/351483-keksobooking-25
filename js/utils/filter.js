import { debounce } from './tools.js';
import { createMarkers } from './set-map.js';

const RENDER_PINS_AMOUNT = 10;

const filterMap = document.querySelector('.map__filters');

const typeFilter = filterMap.querySelector('#housing-type');
const priceFilter = filterMap.querySelector('#housing-price');
const roomFilter = filterMap.querySelector('#housing-rooms');
const guestFilter = filterMap.querySelector('#housing-guests');
const featureFilter = filterMap.querySelector('#housing-features');

const ANY_RANGE = 'any';

const PRICE_RANGE = {
  LOW: 10000,
  HIGH: 50000,
};

const checkTypeValue = (item) => typeFilter.value === ANY_RANGE || typeFilter.value === item.offer.type;
const checkRoomsValue = (item) => roomFilter.value === ANY_RANGE || roomFilter.value === item.offer.rooms.toString();
const checkGuestsValue = (item) => guestFilter.value === ANY_RANGE || guestFilter.value === item.offer.guests.toString();

const checkPriceValue = (item) => {
  switch (priceFilter.value) {
    case 'middle':
      return (item.offer.price >= PRICE_RANGE.LOW && item.offer.price <= PRICE_RANGE.HIGH);
    case 'low':
      return (item.offer.price  < PRICE_RANGE.LOW);
    case 'high':
      return  (item.offer.price  > PRICE_RANGE.HIGH);
    case 'any':
      return true;
  }
};

const checkFeatureValue = ({ offer }) => {
  const featuresChecked = Array.from(featureFilter.querySelectorAll('.map__checkbox:checked'));
  if (!offer.features || featuresChecked.length > offer.features.length) {
    return false;
  }
  if (featuresChecked.length === 0 || featuresChecked.every((feature) => offer.features.includes(feature.value))) {
    return true;
  }
};

const filterAds = (ads, setPins) => {
  const filteredAds = ads
    .slice()
    .filter((item) => checkPriceValue(item) &&
        checkGuestsValue(item) &&
        checkFeatureValue(item) &&
        checkRoomsValue(item) &&
        checkTypeValue(item));

  setPins(filteredAds.slice(0, RENDER_PINS_AMOUNT));
};

const setFiltersListeners = (ads) => {
  filterMap.addEventListener('change', debounce(() => filterAds(ads, createMarkers)));
  filterMap.addEventListener('reset', debounce(() => createMarkers(ads)));
};

export { setFiltersListeners };

import { getRandomNumber } from './get-random-number.js';
import { getFloatingPointNumber } from './get-random-floating-point.js';
import { getNumberAvatar } from './get-number-avatar.js';
import { getRandomFeatures } from './get-random-features.js';
import { getRandomPhotos } from './get-random-photos.js';
import { TITLES, TYPES, TIMES, DESCRIPTIONS, minLat, maxLat, minLng, maxLng } from '../data.js';

// out add

const createOutAdd = () => {
  const location = {
    'lat': getFloatingPointNumber(minLat, maxLat, 5),
    'lng': getFloatingPointNumber(minLng, maxLng, 5),
  };

  const author = {
    'avatar': `img/avatars/user${getNumberAvatar()}.png`,
  };

  const offer = {
    'title': TITLES[getRandomNumber(0, TITLES.length - 1)],
    'adress': `${location.lat}.lat, ${location.lng}.lng`,
    'price': getRandomNumber(1000, 40000),
    'type': TYPES[getRandomNumber(0, TYPES.length - 1)],
    'rooms': getRandomNumber(1, 5),
    'guests': getRandomNumber(1, 10),
    'checkin': TIMES[getRandomNumber(0, TIMES.length -1)],
    'checkout': TIMES[getRandomNumber(0, TIMES.length - 1)],
    'features': getRandomFeatures(),
    'description': DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
    'photos': getRandomPhotos(),
  };

  return {
    author,
    offer,
    location,
  };
};

export { createOutAdd };

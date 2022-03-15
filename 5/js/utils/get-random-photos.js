import { getRandomNumber } from './get-random-number.js';
import { PHOTOLINKS } from '../data.js';

// get random photo hotels

const getRandomPhotos = () => {
  const randomNumberPhotos = getRandomNumber(0, PHOTOLINKS.length);
  const photoHotels = [];

  for (let i = 0; i < randomNumberPhotos; i++) {
    photoHotels.push(`https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/${PHOTOLINKS[i]}`);
  }

  return photoHotels;
};

export { getRandomPhotos };

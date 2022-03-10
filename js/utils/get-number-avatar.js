import { getRandomNumber } from './get-random-number.js';

// get random avatar number

const getNumberAvatar = () => {
  const numberPhoto = String(getRandomNumber(1, 10));
  return (numberPhoto.length === 1) ? `0${numberPhoto}` : numberPhoto;
};

export {getNumberAvatar};

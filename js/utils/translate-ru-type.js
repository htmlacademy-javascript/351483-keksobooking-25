import { RUTYPES } from '../data.js';

const translateRuType = (item) => {
  const typeRoom = item.offer.type;
  const ruTypeRoom = RUTYPES[typeRoom];
  return ruTypeRoom;
};

export { translateRuType };

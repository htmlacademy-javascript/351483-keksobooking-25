const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const RUTYPES = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const MIN_PRICE_TYPES = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const ROOMOPTIONS = {
  1: ['1'],
  2: ['1','2'],
  3: ['1','2','3'],
  100: ['0'],
};

const MAX_PRICE = 100000;

export {
  TYPES,
  MIN_PRICE_TYPES,
  RUTYPES,
  ROOMOPTIONS,
  MAX_PRICE,
};


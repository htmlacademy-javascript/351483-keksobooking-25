import { getRandomNumber } from './utils/get-random-number.js';
import { getFloatingPointNumber } from './utils/get-random-floating-point.js';
import { getNumberAvatar } from './utils/get-number-avatar.js';
import { getRandomFeatures } from './utils/get-random-features.js';
import { getRandomPhotos } from './utils/get-random-photos.js';

// DATA HOTELS

const TITLES = [
  'Midtown Luxury Apartments by Sweet Inn',
  'Room Mate Carla',
  'Suite Home Sagrada Familia',
  'Hotel Paxton Barcelona',
  'Hotel Soho',
  'Castro Exclusive Residences Sant Pau',
  'Hostal Orleans',
];

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const TIMES = ['12:00', '13:00', '14:00'];

const FEATURES = ['wifi', 'dishwasher','parking','washer', 'elevator', 'conditioner'];

const DESCRIPTIONS = [
  'До пляжа можно дойти всего за 1 минуту. Построенный в виде паруса восхитительный отель расположен рядом с пляжем Барселонета. Гости по достоинству оценят потрясающий дизайн отеля и фантастический вид на Барселону. К услугам гостей спа-центр, пейзажный бассейн, бар на крыше и роскошные номера.',
  'В оформлении номеров использованы красочные принты. В числе удобств кондиционер, телевизор с плоским экраном, мини-бар, сейф и собственная ванная комната.',
  'Апартаменты расположены на зеленом проспекте Гауди, всего в 250 метрах от собора Святого Семейства. Из окон некоторых апартаментов открывается вид на знаменитую достопримечательность Барселоны. Все апартаменты полностью оборудованы и оснащены кондиционером. Предоставляется бесплатный Wi-Fi.',
  'Стильный отель расположен на улице Гран-Виа в центре Барселоны. К услугам гостей сезонный бассейн на крыше и терраса для загара с панорамным видом. Прогулка от отеля до площади Каталонии и бульвара Пасео-де-Грасиа занимает 10 минут.',
  'В распоряжении гостей номера с рабочим столом, кондиционером, телевизором с плоским экраном, сейфом и собственной ванной комнатой с душем. Гостям предоставляются полотенца и постельное белье.',
];

const PHOTOLINKS = [
  'duonguyen-8LrGtIxxa4w.jpg',
  'brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'claire-rendall-b6kAwr1i0Iw.jpg',
];

const minLat = 35.65000;
const maxLat = 35.70000;
const minLng = 139.70000;
const maxLng = 139.80000;

const QUANTITYADS = 10;

// out add

const createOutAdd = () => {
  const location = {
    lat: getFloatingPointNumber(minLat, maxLat, 5),
    lng: getFloatingPointNumber(minLng, maxLng, 5),
  };

  const author = {
    avatar: `img/avatars/user${getNumberAvatar()}.png`,
  };

  const offer = {
    title: TITLES[getRandomNumber(0, TITLES.length - 1)],
    adress: `${location.lat}.lat, ${location.lng}.lng`,
    price: getRandomNumber(1000, 40000),
    type: TYPES[getRandomNumber(0, TYPES.length - 1)],
    rooms: getRandomNumber(1, 5),
    guests: getRandomNumber(1, 10),
    checkin: TIMES[getRandomNumber(0, TIMES.length -1)],
    checkout: TIMES[getRandomNumber(0, TIMES.length - 1)],
    features: getRandomFeatures(),
    description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
    photos: getRandomPhotos(),
  };

  return {
    author,
    offer,
    location,
  };
};

const createSimilarAdd = () => Array.from({length: QUANTITYADS}, createOutAdd);

export { FEATURES, PHOTOLINKS, createSimilarAdd };


import { PRICETYPES, ROOMOPTIONS, MAXPRICE } from '../data.js';

const adForm = document.querySelector('.ad-form');

const CONFIGADFORM = {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error',
};

const pristine = new Pristine(adForm, CONFIGADFORM, true);

const titleAdForm = adForm.querySelector('#title');
const adressAdForm = document.querySelector('#address');
const typeFieldAdForm = adForm.querySelector('#type');
const typeAdForm = adForm.querySelectorAll('[name = "type"]');
const priceAdForm = adForm.querySelector('#price');
const fieldTimeIn = adForm.querySelector('#timein');
const fieldTimeOut = adForm.querySelector('#timeout');
const countRoom = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const timeInAdForm = adForm.querySelectorAll('[name = "timein"]');
const timeOutAdForm = adForm.querySelectorAll('[name = "timeout"]');


// Title

const validateTitle = (value) =>  value.length >= 30 && value.length <= 100;
pristine.addValidator(titleAdForm, validateTitle, 'Количество символов от 30 до 100');

// Adress

const setAddress = ({lat, lng}) => {
  adressAdForm.value = `${Number(lat.toFixed(5))}, ${Number(lng.toFixed(5))}`;
};

// Price

const validatePrice = function (value) {
  if (this.value > MAXPRICE) {
    this.value = this.value.slice(0,5);
  } else if (this.value.length > 6) {
    this.value = this.value.slice(0, 6);
  }
  return value >= PRICETYPES[priceAdForm.value] && value <= MAXPRICE;
};

const getErrorPrice = () => `Минимальная цена ${PRICETYPES[typeFieldAdForm.value]}`;

pristine.addValidator(priceAdForm, validatePrice, getErrorPrice);

// Checkin - Checkout

const alignTime = (elemFix, elemBase) => {
  elemFix.value = elemBase.value;
};

timeInAdForm.forEach((item) => {
  item.addEventListener('change', () => {
    alignTime(fieldTimeOut, item);
  });
});

timeOutAdForm.forEach((item) => {
  item.addEventListener('change', () => {
    alignTime(fieldTimeIn, item);
  });
});

// Capacity

const validateRoom = () => ROOMOPTIONS[countRoom.value].includes(capacity.value);

const getErrorRoom = () => {
  switch (countRoom.value) {
    case '1':
      return 'Только для 1 гостя';

    case '2':
      return 'Только для 1 или 2 гостей';

    case '3':
      return 'Только для гостей';

    case '100':
      return 'Не для гостей';
  }
};

pristine.addValidator(countRoom, validateRoom, getErrorRoom);
pristine.addValidator(capacity, validateRoom, getErrorRoom);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  return isValid ? evt.target.submit : false;
});

export { priceAdForm, typeAdForm, setAddress };

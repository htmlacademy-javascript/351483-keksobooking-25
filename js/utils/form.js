import { ROOMOPTIONS, MIN_PRICE_TYPES, MAX_PRICE } from '../data.js';
import { sendData } from './api.js';
import { onPhotoLoad, resetPhoto } from './avatar-photo.js';
import { showPopup } from './popup.js';
import { createSlider, updateSlider, resetSlider } from './slider.js';
import { resetMap } from './set-map.js';
import { mapFilter } from './start-page.js';

const CONFIGADFORM = {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error',
};

const adForm = document.querySelector('.ad-form');

const titleAdForm = adForm.querySelector('#title');
const adressAdForm = adForm.querySelector('#address');

const typeFieldAdForm = adForm.querySelector('#type');
const typeAdItems = adForm.querySelectorAll('[name = "type"]');

const priceAdForm = adForm.querySelector('#price');
const sliderPriceAdForm = document.querySelector('.ad-form__slider');
const capacity = adForm.querySelector('#capacity');
const countRoom = adForm.querySelector('#room_number');

const fieldTimeIn = adForm.querySelector('#timein');
const fieldTimeOut = adForm.querySelector('#timeout');
const timeInAdForm = adForm.querySelectorAll('[name = "timein"]');
const timeOutAdForm = adForm.querySelectorAll('[name = "timeout"]');

const avatarChooser = document.querySelector('#avatar');
const photoChooser = document.querySelector('#images');

const submitButtonAdForm = document.querySelector('.ad-form__submit');
const resetButtonAdForm = adForm.querySelector('.ad-form__reset');

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const validateErrorTemplate = document.querySelector('#validate-error').content.querySelector('.validate-error');

const pristine = new Pristine(adForm, CONFIGADFORM, true);

// Title

const validateTitle = (value) =>  value.length >= 30 && value.length <= 100;
pristine.addValidator(titleAdForm, validateTitle, 'Количество символов от 30 до 100');

// Adress

const setAddress = (value) => {
  adressAdForm.value = value;
};

// Price

function validatePrice (value) {
  return value.length && parseInt(value, 10) >= MIN_PRICE_TYPES[typeFieldAdForm.value] && parseInt(value, 10) <= MAX_PRICE;
}

const getPriceErrorMessage = () => `Цена от ${MIN_PRICE_TYPES[typeFieldAdForm.value]} до ${MAX_PRICE}`;

const setDefaultPrice = () => {
  priceAdForm.placeholder = MIN_PRICE_TYPES[typeFieldAdForm.value];
  priceAdForm.min = MIN_PRICE_TYPES[typeFieldAdForm.value];
};

pristine.addValidator(priceAdForm, validatePrice, getPriceErrorMessage);

// Slider Price

const priceSlider = createSlider(
  sliderPriceAdForm,
  parseInt(priceAdForm.min, 10),
  () => {
    priceAdForm.value = priceSlider.get();
    pristine.validate(priceAdForm);
  }
);

typeAdItems.forEach((item) => {
  item.addEventListener('change', () => {
    priceAdForm.placeholder = MIN_PRICE_TYPES[item.value];
    priceAdForm.min = priceAdForm.placeholder;
    priceAdForm.value = '';

    updateSlider(priceSlider, MIN_PRICE_TYPES[item.value]);
  });
});

priceAdForm.addEventListener('input', () => {
  priceSlider.set(priceAdForm.value);
});

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

//Capacity

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

// Avatar preview

avatarChooser.addEventListener('change', onPhotoLoad);

// Photo preview

photoChooser.addEventListener('change', onPhotoLoad);

// Block reset

const resetForms = () => {
  adForm.reset();
  mapFilter.reset();
  setDefaultPrice();
  resetSlider(sliderPriceAdForm);
  resetPhoto();
  resetMap();
};

resetButtonAdForm.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForms();
});

// Block submit

const blockSubmitButton = () => {
  submitButtonAdForm.textContent = 'Публикую...';
  submitButtonAdForm.disabled = true;
};

const unblockSubmitButton = () => {
  submitButtonAdForm.textContent = 'Опубликовать';
  submitButtonAdForm.disabled = false;
};

const setAdFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          showPopup(successTemplate);
          unblockSubmitButton();
          resetForms();
        },
        () => {
          showPopup(errorTemplate);
          unblockSubmitButton();

        },
        new FormData(evt.target)
      );
    } else {
      showPopup(validateErrorTemplate);
    }
  });
};

setAdFormSubmit();

export {
  adForm,
  priceAdForm,
  sliderPriceAdForm,
  typeAdItems,
  dataErrorTemplate,
  setAddress,
  setDefaultPrice,
};

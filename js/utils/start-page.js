import { enableSlider, disableSlider } from './slider.js';
import { sliderPriceAdForm } from './form.js';

const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');

const disablePage = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');
  [...adForm.elements].forEach((elem) => elem.setAttribute('disabled', ''));
  [...mapFilter.elements].forEach((elem) => elem.setAttribute('disabled', ''));

  disableSlider(sliderPriceAdForm);
};

const enableFilterForm = () => {
  mapFilter.classList.remove('map__filters--disabled');
  [...mapFilter.elements].forEach((elem) => elem.removeAttribute('disabled'));

  enableSlider(sliderPriceAdForm);
};

const enableAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  [...adForm.elements].forEach((elem) => elem.removeAttribute('disabled'));
};

export {
  mapFilter,
  disablePage,
  enableAdForm,
  enableFilterForm
};

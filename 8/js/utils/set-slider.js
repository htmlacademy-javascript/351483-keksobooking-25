import { priceAdForm, typeAdForm } from './validate-form.js';
import { PRICETYPES } from '../data.js';

const priceSlider = document.querySelector('.ad-form__slider');

noUiSlider.create(priceSlider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 1000,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

priceSlider.noUiSlider.on('update', () => {
  priceAdForm.value = priceSlider.noUiSlider.get();
});

typeAdForm.forEach((item) => {
  item.addEventListener('change', () => {
    priceAdForm.placeholder = PRICETYPES[item.value];
    priceAdForm.min = priceAdForm.placeholder;

    priceSlider.noUiSlider.updateOptions({
      range: {
        min: PRICETYPES[item.value],
        max: 100000,
      },
      start: PRICETYPES[item.value],
      step: 1000,
      connect: 'lower',
      format: {
        to: function (value) {
          return value.toFixed(0);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
    });

  });
});

priceAdForm.addEventListener('click', () => {
  priceAdForm.value = '';
});

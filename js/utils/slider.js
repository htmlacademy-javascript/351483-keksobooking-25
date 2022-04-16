import { MAX_PRICE } from '../data.js';

const createSlider = (element, min, sliderChange ) => {

  noUiSlider.create(element, {
    range: {
      min: min,
      max: MAX_PRICE,
    },
    start: 1000,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  element.noUiSlider.on('slide', sliderChange);

  return element.noUiSlider;
};

const updateSlider = (slider, min) => {
  slider.updateOptions({
    range: {
      min: 0,
      max: MAX_PRICE,
    },
    start: min,
    step: 1,
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
};

const resetSlider = (slider) => {
  slider.noUiSlider.reset();
};

const disableSlider = (element) => {
  element.setAttribute('disabled', true);
};

const enableSlider = (element) => {
  element.removeAttribute('disabled', true);
};

export { createSlider, updateSlider, resetSlider, disableSlider, enableSlider };

// import { priceAdForm, typeAdItems } from './form.js';
// import { MIN_PRICE_TYPES, MAX_PRICE } from '../data.js';

// noUiSlider.create(priceSlider, {
//   range: {
//     min: 0,
//     max: MAX_PRICE,
//   },
//   start: 1000,
//   step: 1,
//   connect: 'lower',
//   format: {
//     to: function (value) {
//       if (Number.isInteger(value)) {
//         return value.toFixed(0);
//       }
//       return value.toFixed(0);
//     },
//     from: function (value) {
//       return parseFloat(value);
//     },
//   },
// });

// typeAdItems.forEach((item) => {
//   item.addEventListener('change', () => {
//     priceAdForm.placeholder = MIN_PRICE_TYPES[item.value];
//     priceAdForm.min = priceAdForm.placeholder;
//     priceAdForm.value = '';

//     priceSlider.noUiSlider.updateOptions({
//       range: {
//         min: 0,
//         max: MAX_PRICE,
//       },
//       start: MIN_PRICE_TYPES[item.value],
//       step: 1,
//       connect: 'lower',
//       format: {
//         to: function (value) {
//           return value.toFixed(0);
//         },
//         from: function (value) {
//           return parseFloat(value);
//         },
//       },
//     });

//   });
// });

// priceSlider.noUiSlider.on('slide', () => {
//   priceAdForm.value = priceSlider.noUiSlider.get();
// });

// priceAdForm.addEventListener('input', () => {
//   priceSlider.noUiSlider.set(priceAdForm.value);
// });



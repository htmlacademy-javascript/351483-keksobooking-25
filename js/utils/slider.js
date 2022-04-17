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
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(0);
      },
      from: (value) => parseFloat(value),
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
      to: (value) => value.toFixed(0),
      from: (value) => parseFloat(value),
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

export {
  createSlider,
  updateSlider,
  resetSlider,
  disableSlider,
  enableSlider
};

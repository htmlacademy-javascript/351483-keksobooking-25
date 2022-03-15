import { getRandomNumber } from './get-random-number.js';
import { shuffleArray } from './shuffle-array.js';
import { FEATURES } from '../data.js';

// random features number

const getNumberFeatures = () => {
  const quatityFeatures = getRandomNumber(0, FEATURES.length - 1);
  return quatityFeatures;
};
// get array random features

const getRandomFeatures = () => {
  const shuffleFeaturesArray = shuffleArray(FEATURES);
  const rundomNumberFeatures = getNumberFeatures();
  const rundomArrayFeatures = shuffleFeaturesArray.slice(rundomNumberFeatures);
  return rundomArrayFeatures;
};

export { getRandomFeatures };

import { createOutAdd } from './utils/create-out-add.js';
import { QUANTITYADS } from './data.js';

const similarOutAdd = Array.from({length: QUANTITYADS}, createOutAdd);

export { similarOutAdd };
// console.log(similarOutAdd);

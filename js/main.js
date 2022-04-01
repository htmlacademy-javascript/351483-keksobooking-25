import { disablePage } from './utils/start-page.js';
import { initMap, createMarkersGroup } from './utils/set-map.js';
import { createSimilarAdd } from './data.js';

const similarAds = createSimilarAdd();

disablePage();
initMap();
createMarkersGroup(similarAds);

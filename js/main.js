import { disablePage, enableAdForm, enableFilterForm} from './utils/start-page.js';
import { getData } from './utils/api.js';
import { showPopup } from './utils/popup.js';
import { dataErrorTemplate } from  './utils/form.js';
import { setFiltersListeners } from './utils/filter.js';
import {initMap, createMarkers} from './utils/set-map.js';


disablePage();

const getSimilarAds = () => {
  getData((data) => {
    createMarkers(data);
    setFiltersListeners(data);
    enableFilterForm();
    enableAdForm();
  },
  () => showPopup(dataErrorTemplate));
};

initMap(getSimilarAds);

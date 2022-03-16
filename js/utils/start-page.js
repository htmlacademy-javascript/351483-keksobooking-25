const adsForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');

const disablePage = () => {
  adsForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('ad-form--disabled');

  [...adsForm.elements].forEach((element) => element.setAttribute('disabled', ''));
  [...mapFilter.elements].forEach((element) => element.setAttribute('disabled', ''));
};

const enablePage = () => {
  adsForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('ad-form--disabled');

  [...adsForm.elements].forEach((element) => element.removeAttribute('disabled'));
  [...mapFilter.elements].forEach((element) => element.removeAttribute('disabled'));
};

disablePage();

export { enablePage };


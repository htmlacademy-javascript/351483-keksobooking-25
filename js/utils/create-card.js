import { translateRuType } from './translate-ru-type.js';

const templateCard = document.querySelector('#card').content.querySelector('.popup');

const createFeatureList = (item, elem) => {
  const featureData = item.offer.features || [];
  const featureContainer = elem.querySelector('.popup__features');
  const featureList = featureContainer.querySelectorAll('.popup__feature');

  const modifires = featureData.map((feature) => `popup__feature--${feature}`);

  featureList.forEach((feature) => {
    const modifire = feature.classList[1];

    if (!modifires.includes(modifire)) {
      feature.remove();
    }
  });
};

const createPhotoList = (item, elem) => {
  const photoData = item.offer.photos || [];
  const photoContainer = elem.querySelector('.popup__photos');
  const photoContainerItem = photoContainer.querySelector('.popup__photo');
  photoContainer.textContent = '';
  photoData.forEach((photoPath) => {
    const photoItem = photoContainerItem.cloneNode(true);
    photoItem.src = photoPath;
    photoContainer.append(photoItem);
  });

  if (!photoData.length) {
    photoContainer.remove();
  }
};

const isValue = (value, elem) => value ? value : elem.remove();

const createAd = (card) => {
  const cardElement = templateCard.cloneNode(true);
  const cardTitle = cardElement.querySelector('.popup__title');
  const cardAdress = cardElement.querySelector('.popup__text--address');
  const cardPrice = cardElement.querySelector('.popup__text--price');
  const cardType = cardElement.querySelector('.popup__type');
  const cardCapacity = cardElement.querySelector('.popup__text--capacity');
  const cardTime = cardElement.querySelector('.popup__text--time');
  const cardDescription = cardElement.querySelector('.popup__description');
  const cardAvatar = cardElement.querySelector('.popup__avatar');

  cardTitle.textContent = isValue(card.offer.title, cardTitle);
  cardAdress.textContent = isValue(card.offer.adress, cardAdress);
  cardPrice.textContent = `${isValue(card.offer.price, cardPrice)}₽/ночь`;
  cardType.textContent = isValue(translateRuType(card), cardType);
  cardCapacity.textContent = `${isValue(card.offer.rooms, cardCapacity)} комнаты для ${isValue(card.offer.guests, cardCapacity)} гостей`;
  cardTime.textContent = `Заезд после ${isValue(card.offer.checkin, cardTime)}, выезд до ${isValue(card.offer.checkout, cardTime)}`;
  cardDescription.textContent = isValue(card.offer.description, cardDescription);
  cardAvatar.src = isValue(card.author.avatar, cardAvatar);

  createFeatureList(card, cardElement);
  createPhotoList(card, cardElement);

  return cardElement;
};

export { createAd };

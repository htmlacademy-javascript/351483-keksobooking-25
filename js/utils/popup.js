import { isEscKey } from './tools.js';

const TIME_POPUP = 3000;

const onPopupClick = (popup) => () => {
  popup.remove();
};

const onPopupEscKeydown = (popup) => (evt) => {
  if (isEscKey(evt)) {
    popup.remove();
  }
};

const closePopupListener = (popup) => {
  const closePopup = popup;
  document.addEventListener('keydown', onPopupEscKeydown(closePopup), { once: true });
  closePopup.addEventListener('click', onPopupClick(closePopup));
};

const showPopup = (template) => {
  const popup = template.cloneNode(true);
  document.body.append(popup);

  closePopupListener(popup);

  setTimeout(() => {
    popup.remove();
  }, TIME_POPUP);

  return popup;
};

export { showPopup };


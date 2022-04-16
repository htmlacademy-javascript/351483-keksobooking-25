import { unblockSubmitButton } from './form.js';
import { isEscKey } from './tools.js';

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

  unblockSubmitButton();

  closePopupListener(popup);

  setTimeout(() => {
    popup.remove();
  }, 3000);

  return popup;
};

export { showPopup };


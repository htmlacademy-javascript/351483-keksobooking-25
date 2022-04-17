const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

function debounce(callback, timeout = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeout);
  };
}

export { isEscKey, debounce };

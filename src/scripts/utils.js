export function debounce(callback, wait = 500, immediate = true) {
  let timeout;

  return function (...args) {
    const context = this;

    function later() {
      timeout = null;

      if (!immediate) {
        callback.apply(context, args);
      }
    }

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) {
      callback.apply(context, args);
    }
  };
}

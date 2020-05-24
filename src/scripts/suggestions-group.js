const suggestionsGroup = () => {
  const list = document.querySelector(".suggestions-group__list");
  const toggleButton = document.querySelector(
    ".suggestions-group__toggle-button"
  );

  const listHeight = list.clientHeight;

  let isShowed = true;

  const toggleBoxView = () => {
    isShowed = !isShowed;

    list.style.marginBottom = isShowed ? 0 : `${-listHeight}px`;

    toggleButton.firstElementChild.classList.toggle("closed");
  };

  setTimeout(toggleBoxView, 3000);

  toggleButton.addEventListener("click", toggleBoxView);
};

export default suggestionsGroup;

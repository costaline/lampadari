import { debounce } from "@/scripts/utils";

const suggestionsGroup = () => {
  const list = document.querySelector(".suggestions-group__list");
  const toggleButton = document.querySelector(
    ".suggestions-group__toggle-button"
  );

  let isShowed = true;

  let listHeight = list.clientHeight;

  const debouncedCalcHeight = debounce(() => {
    listHeight = list.clientHeight;

    list.style.marginBottom = isShowed ? 0 : `${-listHeight}px`;
  }, 10);

  const toggleBoxView = () => {
    isShowed = !isShowed;

    list.style.marginBottom = isShowed ? 0 : `${-listHeight}px`;

    toggleButton.firstElementChild.classList.toggle("closed");
  };

  setTimeout(() => isShowed && toggleBoxView(), 3000);

  toggleButton.addEventListener("click", toggleBoxView);

  window.addEventListener("resize", debouncedCalcHeight);
};

export default suggestionsGroup;

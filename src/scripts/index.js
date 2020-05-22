import sliders from "./sliders";

window.addEventListener("DOMContentLoaded", () => {
  sliders(
    ".home-slider",
    ".home-slider__slide",
    ".home-slider__button--prev",
    ".home-slider__button--next",
    ".home-slider__dots"
  );
});

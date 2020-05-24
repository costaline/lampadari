import slider from "./slider";
import suggestionsGroup from "./suggestions-group";
import modal from "./modal";

window.addEventListener("DOMContentLoaded", () => {
  slider({
    sliderContainer: "home-slider",
    slideItem: "home-slider__slide",
    dotsContainer: "home-slider__dots",
    dot: "home-slider__dot",
  });

  suggestionsGroup();

  modal("#modal-auth", "#show-modal", ".modal-auth__close");
});

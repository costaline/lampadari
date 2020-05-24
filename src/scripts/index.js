import slider from "./slider";
import suggestionsGroup from "./suggestions-group";

window.addEventListener("DOMContentLoaded", () => {
  slider({
    sliderContainer: "home-slider",
    slideItem: "home-slider__slide",
    dotsContainer: "home-slider__dots",
    dot: "home-slider__dot",
  });

  suggestionsGroup();
});

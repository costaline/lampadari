import Slider, { slider } from "./slider";
import suggestionsGroup from "./suggestions-group";
import modal from "./modal";
import form from "./form";

window.addEventListener("DOMContentLoaded", () => {
  /*  slider({
    sliderContainer: "home-slider",
    slideItem: "home-slider__slide",
    dotsContainer: "home-slider__dots",
    dot: "home-slider__dot",
    time: 5000,
  });*/

  new Slider({
    sliderContainer: "home-slider",
    slideItem: "home-slider__slide",
    dotsContainer: "home-slider__dots",
    dot: "home-slider__dot",
    time: 5000,
  }).init();

  suggestionsGroup();

  modal("#modal-auth", "#show-modal", ".modal-auth__close");

  form();
});

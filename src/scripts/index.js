import slider from "./slider";
import suggestionsGroup from "./suggestions-group";
import modal from "./modal";
import form from "./form";
import SliderClass from "./slider-class";

window.addEventListener("DOMContentLoaded", () => {
  /*  slider({
    sliderContainer: "home-slider",
    slideItem: "home-slider__slide",
    dotsContainer: "home-slider__dots",
    dot: "home-slider__dot",
  });*/

  new SliderClass({
    sliderContainer: "home-slider",
    slideItem: "home-slider__slide",
    dotsContainer: "home-slider__dots",
    dot: "home-slider__dot",
  }).init();

  suggestionsGroup();

  modal("#modal-auth", "#show-modal", ".modal-auth__close");

  form();
});

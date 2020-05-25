/**
 * function slider
 *
 * @param {string} sliderContainer
 * @param {string} slideItem
 * @param {string} dotsContainer
 * @param {string} dot
 * @param {number} time
 */
export const slider = ({
  sliderContainer,
  slideItem,
  dotsContainer = "",
  dot,
  time = 1000,
}) => {
  const slider = document.querySelector(`.${sliderContainer}`);
  const slides = slider.querySelectorAll(`.${slideItem}`);
  const dotsWrapper = slider.querySelector(`.${dotsContainer}`);

  const createSliderDots = () => {
    for (let i = 0; i < slides.length; i++) {
      const dotItem = document.createElement("span");

      dotItem.classList.add(dot);

      dotsWrapper.appendChild(dotItem);
    }

    return document.querySelectorAll(`.${dot}`);
  };

  const dots = createSliderDots();

  let showedSlideIndex = 1;

  const showSlide = (slideIdx = 0) => {
    if (slideIdx > slides.length - 1) {
      showedSlideIndex = 0;
    } else if (slideIdx < 0) {
      showedSlideIndex = slides.length - 1;
    } else {
      showedSlideIndex = slideIdx;
    }

    slides.forEach((s) => {
      s.classList.remove(`${slideItem}--active`);
    });

    dots.forEach((d) => {
      d.classList.remove(`${dot}--active`);
    });

    slides[showedSlideIndex].classList.add(`${slideItem}--active`);
    dots[showedSlideIndex].classList.add(`${dot}--active`);
  };

  showSlide();

  dots.forEach((d, index) =>
    d.addEventListener("click", () => showSlide(index))
  );

  const changeSlide = (n = 1) => showSlide(showedSlideIndex + n);

  let paused = false;

  const activateAuto = () => {
    paused = setInterval(() => changeSlide(), time);
  };

  activateAuto();

  slider.addEventListener("mouseenter", () => clearInterval(paused));

  slider.addEventListener("mouseleave", () => activateAuto());
};

/**
 * class slider
 */
export default class Slider {
  constructor({ sliderContainer, slideItem, dotsContainer, dot, time = 1000 }) {
    this.slider = document.querySelector(`.${sliderContainer}`);
    this.slides = this.slider.querySelectorAll(`.${slideItem}`);
    this.dotsWrapper = this.slider.querySelector(`.${dotsContainer}`);
    this.showedSlideIndex = 1;
    this.paused = false;
    this.slideItem = slideItem;
    this.dot = dot;
    this.time = time;
    this.dots = this.createSliderDots();
  }

  createSliderDots() {
    for (let i = 0; i < this.slides.length; i++) {
      const dot = document.createElement("span");

      dot.classList.add(this.dot);

      this.dotsWrapper.appendChild(dot);
    }

    return document.querySelectorAll(`.${this.dot}`);
  }

  showSlide(slideIdx = 0) {
    if (slideIdx > this.slides.length - 1) {
      this.showedSlideIndex = 0;
    } else if (slideIdx < 0) {
      this.showedSlideIndex = this.slides.length - 1;
    } else {
      this.showedSlideIndex = slideIdx;
    }

    this.slides.forEach((s) => {
      s.classList.remove(`${this.slideItem}--active`);
    });

    this.dots.forEach((d) => {
      d.classList.remove(`${this.dot}--active`);
    });

    this.slides[this.showedSlideIndex].classList.add(
      `${this.slideItem}--active`
    );
    this.dots[this.showedSlideIndex].classList.add(`${this.dot}--active`);
  }

  changeSlide(n = 1) {
    this.showSlide(this.showedSlideIndex + n);
  }

  activateAuto() {
    this.paused = setInterval(() => this.changeSlide(), this.time);
  }

  listeners() {
    this.slider.addEventListener("mouseenter", () =>
      clearInterval(this.paused)
    );
    this.slider.addEventListener("mouseleave", () => this.activateAuto());

    this.dots.forEach((d, index) =>
      d.addEventListener("click", () => this.showSlide(index))
    );
  }

  init() {
    this.showSlide();
    this.activateAuto();
    this.listeners();
  }
}

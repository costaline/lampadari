export default class SliderClass {
  constructor({ sliderContainer, slideItem, dotsContainer, dot }) {
    this.slider = document.querySelector(`.${sliderContainer}`);
    this.slides = this.slider.querySelectorAll(`.${slideItem}`);
    this.dotsWrapper = this.slider.querySelector(`.${dotsContainer}`);
    this.showedSlideIndex = 1;
    this.paused = false;
    this.slideItem = slideItem;
    this.dot = dot;
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
    this.paused = setInterval(() => this.changeSlide(), 5000);
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

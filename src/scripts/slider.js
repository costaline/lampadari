/**
 * @param {number} count
 * @param {string} className
 * @param {Element} container
 * @returns {NodeListOf<Element>}
 */
const createSliderDots = (count, className, container) => {
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("span");

    dot.classList.add(className);

    container.appendChild(dot);
  }

  return document.querySelectorAll(`.${className}`);
};

/**
 * @param {string} sliderContainer
 * @param {string} slideItem
 * @param {string} dotsContainer
 * @param {string} dot
 */
const slider = ({ sliderContainer, slideItem, dotsContainer = "", dot }) => {
  const slider = document.querySelector(`.${sliderContainer}`);
  const slides = slider.querySelectorAll(`.${slideItem}`);
  const dotsWrapper = slider.querySelector(`.${dotsContainer}`);

  const dots = createSliderDots(slides.length, dot, dotsWrapper);

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
    paused = setInterval(() => changeSlide(), 5000);
  };

  activateAuto();

  slider.addEventListener("mouseenter", () => clearInterval(paused));

  slider.addEventListener("mouseleave", () => activateAuto());
};

export default slider;

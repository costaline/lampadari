const createSliderDots = (count, container) => {
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("span");

    dot.classList.add("slider-dot");

    container.appendChild(dot);
  }

  return document.querySelectorAll(".slider-dot");
};

const sliders = (slidesWrapper, slideItem, prev, next, dotsWrapper) => {
  let slideIndex = 0;
  let paused = false;

  const wrapper = document.querySelector(slidesWrapper);
  const items = document.querySelectorAll(slideItem);
  const dotsContainer = document.querySelector(dotsWrapper);
  const slide = document.querySelector(slideItem);

  const dots = createSliderDots(items.length, dotsContainer);

  slide.parentNode.style.position = "relative";
  slide.parentNode.style.height = slide.clientHeight + "px";

  const showSlides = (n) => {
    if (n > items.length - 1) {
      slideIndex = 0;
    }

    if (n < 0) {
      slideIndex = items.length;
    }

    items.forEach((item) => item.classList.add("slider__slide"));
    items.forEach((item) => item.classList.remove("slider__slide--showed"));
    dots.forEach((dot) => dot.classList.remove("slider-dot--active"));

    items[slideIndex].classList.add("slider__slide--showed");
    dots[slideIndex].classList.add("slider-dot--active");
  };

  showSlides(slideIndex);

  dots.forEach((dot, idx) =>
    dot.addEventListener("click", () => showSlides((slideIndex = idx)))
  );

  const changeSlide = (n = 1) => showSlides((slideIndex += n));

  try {
    const prevBtn = document.querySelector(prev);
    const nextBtn = document.querySelector(next);

    prevBtn.addEventListener("click", () => changeSlide(-1));
    nextBtn.addEventListener("click", () => changeSlide(1));
  } catch (error) {
    console.error(error);
  }

  function activateAuto() {
    paused = setInterval(() => changeSlide(), 5000);
  }

  activateAuto();

  wrapper.addEventListener("mouseenter", () => clearInterval(paused));

  wrapper.addEventListener("mouseleave", () => activateAuto());
};

export default sliders;

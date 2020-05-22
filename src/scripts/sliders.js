const sliders = (slidesWrapper, slides, prev, next, dotsWrapper) => {
  let slideIndex = 0;
  let paused = false;

  const wrapper = document.querySelector(slidesWrapper);
  const items = document.querySelectorAll(slides);
  const dotsContainer = document.querySelector(dotsWrapper);

  const createSliderDots = () => {
    for (let i = 0; i < items.length; i++) {
      const dot = document.createElement("span");
      dot.classList.add("slider-dot");
      dot.textContent = i;

      dotsContainer.appendChild(dot);
    }
  };

  createSliderDots();

  const dots = document.querySelectorAll(".slider-dot");

  const showSlides = (n) => {
    if (n > items.length - 1) {
      slideIndex = 0;
    }

    if (n < 0) {
      slideIndex = items.length;
    }

    items.forEach((item) => (item.style.display = "none"));
    dots.forEach((dot) => dot.classList.remove("slide-dot--active"));

    items[slideIndex].style.display = "block";
    dots[slideIndex].classList.add("slide-dot--active");
  };

  showSlides(slideIndex);

  dots.forEach((dot, idx) =>
    dot.addEventListener("click", () => showSlides((slideIndex = idx)))
  );

  const changeSlide = (n) => showSlides((slideIndex += n));

  try {
    const prevBtn = document.querySelector(prev);
    const nextBtn = document.querySelector(next);

    prevBtn.addEventListener("click", () => changeSlide(-1));
    nextBtn.addEventListener("click", () => changeSlide(1));
  } catch (error) {
    console.error(error);
  }

  function activateAuto() {
    paused = setInterval(() => changeSlide(1), 3000);
  }

  activateAuto();

  wrapper.addEventListener("mouseenter", () => clearInterval(paused));

  wrapper.addEventListener("mouseleave", () => activateAuto());
};

export default sliders;

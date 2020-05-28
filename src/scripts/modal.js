const calcScrollWidth = () => {
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  if (scrollBarWidth > 0) {
    return scrollBarWidth;
  }

  return 0;
};

const modal = (selector, trigger, closeSelector) => {
  const wrapper = document.querySelector(selector);
  const btnShow = document.querySelector(trigger);
  const btnClose = wrapper.querySelector(closeSelector);

  const scrollWidth = calcScrollWidth();

  const togglePopup = () => {
    if (wrapper.classList.contains("showed")) {
      const confirmation = window.confirm("Close modal?");

      if (confirmation) {
        document.body.style.overflow = "";
        document.body.style.marginRight = "0px";

        document.removeEventListener("keydown", toggleByKey);

        wrapper.classList.remove("showed");
      }
    } else {
      document.body.style.overflow = "hidden";
      document.body.style.marginRight = `${scrollWidth}px`;

      document.addEventListener("keydown", toggleByKey);

      wrapper.classList.add("showed");
    }
  };

  const toggleByKey = (event) => {
    if (event.keyCode === 27) {
      togglePopup();
    }
  };

  btnShow.addEventListener("click", togglePopup);

  wrapper.addEventListener("click", (event) => {
    if (event.target.classList.contains("showed")) {
      togglePopup();
    }
  });

  btnClose.addEventListener("click", togglePopup);
};

export default modal;

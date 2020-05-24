const form = () => {
  const forms = document.querySelectorAll("form");

  console.log(forms);

  forms.forEach((f) =>
    f.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = new FormData(f);

      window.alert(JSON.stringify([...data]));

      f.reset();
    })
  );
};

export default form;

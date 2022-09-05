import { form } from "./form_script.js";

function setRequiredLabels() {
  const labels = document.querySelectorAll("label");

  for (const label of labels) {
    const labelFor = label.for;
    if (labelFor) {
      const field = document.querySelector(`#${labelFor}`);
      if (field.hasAttribute("required") && field.type != "radio") {
        label.classList.add("required");
      }
    }
  }
}

function applyValidation(inputs) {
  inputs.forEach((input) =>
    input.addEventListener("input", function (e) {
      e.target.setCustomValidity("");
    })
  );
  inputs.forEach((input) =>
    input.addEventListener("blur", function (e) {
      e.target.classList = "validation";
      if (!e.target.checkValidity()) {
        e.target.setCustomValidity("Field is invalid");
        e.target.reportValidity();
      }
    })
  );

  // move focus to next field on enter
  inputs.forEach((input) =>
    input.addEventListener("keydown", function (e) {
      if (e.key == "Enter") {
        e.preventDefault();
        const index = Array.prototype.indexOf.call(form, e.target);
        form.elements[index + 1].focus();
      }
    })
  );

  // enable complete button when all required fields are filled
  setRequiredLabels();
  const requiredInputs = document.querySelectorAll("input:required");
  for (const field of requiredInputs) {
    field.addEventListener("input", buttonState);
  }

  function buttonState() {
    const completeBtn = document.querySelector(".complete");
    completeBtn.disabled = Array.from(requiredInputs).some(
      (x) => x.value === ""
    );
  }
}
export { applyValidation };

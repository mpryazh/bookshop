import { createElement } from "./basic_functions.js";
import { fillForm } from "./fill_form.js";
import { applyValidation } from "./validation.js";
import { popupOrder } from "./popup_order.js";

const fragment = new DocumentFragment();
const header = document.createElement("header");
const main = document.createElement("main");
const h1 = createElement("h1", "", "Order form");
header.append(h1);
fragment.append(header, main);

const form = document.createElement("form");
form.noValidate = true;
main.append(form);
fillForm(form);

document.body.append(fragment);

const inputs = document.querySelectorAll("input");
applyValidation(inputs);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  popupOrder(e);
  form.className += " hidden";
});

export { form };

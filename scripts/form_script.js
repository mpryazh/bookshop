import { createElem } from "./basic_functions.js";
import { fillForm } from "./fill_form.js";
import { applyValidation } from "./validation.js";
import { popupOrder } from "./popup_order.js";

const fragment = new DocumentFragment();
const header = document.createElement("header");
const main = document.createElement("main");
const h1 = createElem("h1", "", "Order form");
header.append(h1);
fragment.append(header, main);

const form = document.createElement("form");
main.append(form);
fillForm(form);

document.body.append(fragment);

applyValidation(form);
form.addEventListener("submit", (e) => submit(e));

function submit(e) {
  e.preventDefault();
  popupOrder(form);
  form.classList.add("hidden");
}

export { submit };

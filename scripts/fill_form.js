import {
  createElement,
  createInput,
  createLabel,
} from "/scripts/basic_functions.js";

function fillForm(form) {
  const name_label = createLabel("name");
  const name_input = createInput("name", "text", "^[a-zA-Z]{4,20}");
  name_label.append(name_input);

  const surname_label = createLabel("surname");
  const surname_input = createInput("surname", "text", "^[a-zA-Z]{5,25}");
  surname_label.append(surname_input);

  const delivery_label = createLabel("delivery");
  const delivery_input = createInput("delivery", "date");
  delivery_label.append(delivery_input);

  // min delivery date = tomorrow
  const today = new Date();
  today.setDate(today.getDate() + 1);
  let tomorrow = today.toLocaleDateString();
  tomorrow = tomorrow.split(".").reverse().join("-");
  delivery_input.value = tomorrow;
  delivery_input.min = tomorrow;

  const street_label = createLabel("street");
  const street_input = createInput("street", "text", "^[ a-zA-Z0-9]{5,25}");
  street_label.append(street_input);

  const house_label = createLabel("house");
  const house_input = createInput("house", "number", "^[0-9]");
  house_input.min = 1;
  house_label.append(house_input);

  const flat_label = createLabel("flat");
  const flat_input = createInput("flat", "text", "[1-9]([0-9]+)?(-[0-9]+)?");
  flat_label.append(flat_input);

  const paymentMethod = createElement("p", "", "Payment method");
  const payment_labels = createElement("div", "payment-space");

  const cash_label = createLabel("cash");
  cash_label.className = "payment";
  const cash_input = createInput("cash", "radio", "", "payment");
  cash_label.prepend(cash_input);

  const card_label = createLabel("card");
  card_label.className = "payment";
  const card_input = createInput("card", "radio", "", "payment");
  card_input.checked = true;
  card_label.prepend(card_input);

  payment_labels.append(cash_label, card_label);

  const giftMess = createElement("p", "", "Pick 2 gifts");
  const giftSpace = createElement("div", "gift-space");

  const packAsGift_label = createLabel("gift");
  packAsGift_label.textContent = "Pack as a gift";
  const packAsGift_input = createInput("gift", "checkbox", "");
  packAsGift_input.required = false;

  packAsGift_label.prepend(packAsGift_input);

  const postcard_label = createLabel("postcard");
  postcard_label.textContent = "Add a postcard";
  const postcard_input = createInput("postcard", "checkbox");
  postcard_input.required = false;
  postcard_label.prepend(postcard_input);

  const discount_label = createLabel("discount");
  discount_label.textContent = "Get a 2% off your next order";
  const discount_input = createInput("discount", "checkbox");
  discount_input.required = false;
  discount_label.prepend(discount_input);

  const pen_label = document.createElement("label");
  pen_label.textContent = "Add a branded pen";
  pen_label.for = "pen";
  const pen_input = createInput("pen", "checkbox");
  pen_input.required = false;
  pen_label.prepend(pen_input);

  giftSpace.append(packAsGift_label, postcard_label, pen_label, discount_label);

  form.append(
    name_label,
    surname_label,
    delivery_label,
    street_label,
    house_label,
    flat_label,
    paymentMethod,
    payment_labels,
    giftMess,
    giftSpace
  );

  // limit gift checkboxes by 2
  const limit = 2;
  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  checkboxes.forEach((checkbox) =>
    checkbox.addEventListener("click", (event) => {
      const checked = document.querySelectorAll(
        'input[type="checkbox"]:checked'
      ).length;
      if (event.currentTarget.checked && checked > limit) {
        event.preventDefault();
      }
    })
  );

  const completeBtn = createElement(
    "button",
    "confirm-order complete green-btn",
    "Complete"
  );
  completeBtn.type = "submit";
  completeBtn.disabled = true;

  form.append(completeBtn);
}

export { fillForm };

import { createElem, createInputShort, createLabelShort } from "./basic_functions.js";

function fillForm(form) {
  const name_label = createLabelShort("name");
  const name_input = createInputShort("name", "text", "^[a-zA-Z]{4,20}");
  name_label.append(name_input);

  const surname_label = createLabelShort("surname");
  const surname_input = createInputShort("surname", "text", "^[a-zA-Z]{5,25}");
  surname_label.append(surname_input);

  const delivery_label = createLabelShort("delivery");
  const delivery_input = createInputShort("delivery", "date");
  delivery_label.append(delivery_input);

  // min delivery date = tomorrow
  const today = new Date();
  today.setDate(today.getDate() + 1);
  let tomorrow = today.toLocaleDateString();
  tomorrow = tomorrow.split(".").reverse().join("-");
  delivery_input.value = tomorrow;
  delivery_input.min = tomorrow;

  const street_label = createLabelShort("street");
  const street_input = createInputShort("street", "text", "^[ a-zA-Z0-9]{5,25}");
  street_label.append(street_input);

  const house_label = createLabelShort("house");
  const house_input = createInputShort("house", "number", "^[0-9]");
  house_input.min = 1;
  house_label.append(house_input);

  const flat_label = createLabelShort("flat");
  const flat_input = createInputShort("flat", "text", "[1-9]([0-9]+)?(-[0-9]+)?");
  flat_label.append(flat_input);

  const paymentMethod = createElem("p", "", "Payment method");
  const payment_labels = createElem("div", "payment-space");

  const cash_label = createLabelShort("cash");
  cash_label.className = "payment";
  const cash_input = createInputShort("cash", "radio", "", "payment");
  cash_label.prepend(cash_input);

  const card_label = createLabelShort("card");
  card_label.className = "payment";
  const card_input = createInputShort("card", "radio", "", "payment");
  card_input.checked = true;
  card_label.prepend(card_input);

  payment_labels.append(cash_label, card_label);

  const giftMess = createElem("p", "", "Pick 2 gifts");
  const giftSpace = createElem("div", "gift-space");

  const packAsGift_label = createLabelShort("gift");
  packAsGift_label.textContent = "Pack as a gift";
  const packAsGift_input = createInputShort("gift", "checkbox", "");
  packAsGift_input.required = false;

  packAsGift_label.prepend(packAsGift_input);

  const postcard_label = createLabelShort("postcard");
  postcard_label.textContent = "Add a postcard";
  const postcard_input = createInputShort("postcard", "checkbox");
  postcard_input.required = false;
  postcard_label.prepend(postcard_input);

  const discount_label = createLabelShort("discount");
  discount_label.textContent = "Get a 2% off your next order";
  const discount_input = createInputShort("discount", "checkbox");
  discount_input.required = false;
  discount_label.prepend(discount_input);

  const pen_label = document.createElement("label");
  pen_label.textContent = "Add a branded pen";
  pen_label.for = "pen";
  const pen_input = createInputShort("pen", "checkbox");
  pen_input.required = false;
  pen_label.prepend(pen_input);

  giftSpace.append(packAsGift_label, postcard_label, pen_label, discount_label);

  const completeBtn = createElem(
    "button",
    "confirm-order complete green-btn",
    "Complete"
  );
  completeBtn.type = "submit";
  completeBtn.disabled = true;

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
    giftSpace,
    completeBtn
  );

  // limit gift checkboxes by 2
  const limit = 2;
  const checkboxes = form.querySelectorAll("input[type='checkbox']");

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
}

export { fillForm };

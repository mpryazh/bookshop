import { createElem } from "./basic_functions.js";

function popupOrder(form) {
  const orderInfo = document.createElement("div");
  orderInfo.id = "order-info";

  const info = document.createElement("pre");
  info.textContent = `
      ${form.elements.name.value} ${form.elements.surname.value},
      your order is created \n 
      The delivery address is: 
      ${form.elements.street.value} street, ${form.elements.house.value}, apt ${form.elements.flat.value} \n
      `;

  const homeBtn = createElem(
    "button",
    "home-btn confirm-order green-btn",
    "Back to shop"
  );
  homeBtn.addEventListener("click", () => (location.href = "../main/index.html"));

  orderInfo.append(info, homeBtn);
  document.body.append(orderInfo);
}

export { popupOrder };

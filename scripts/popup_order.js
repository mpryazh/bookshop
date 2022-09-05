import { createElement } from "/scripts/basic_functions.js";

function popupOrder(e) {
  const orderInfo = document.createElement("div");
  orderInfo.id = "order-info";

  const info = document.createElement("pre");
  info.textContent = `
      ${e.target.elements.name.value} ${e.target.elements.surname.value},
      your order is created \n 
      The delivery address is: 
      ${e.target.elements.street.value} street, ${e.target.elements.house.value}, apt ${e.target.elements.flat.value} \n
      `;

  const homeBtn = createElement(
    "button",
    "home-btn confirm-order green-btn",
    "Back to shop"
  );
  homeBtn.addEventListener("click", () => (location.href = "index.html"));

  orderInfo.append(info, homeBtn);
  document.body.append(orderInfo);
}

export { popupOrder };

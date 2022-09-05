import { createElement, removeParent } from "/scripts/basic_functions.js";
import { confirmOrderBtn, emptyOrderMessage } from "/scripts/script.js";

function addBookToCart(target) {
  const card = getOrderCard(target);
  const orderContainer = document.querySelector("#order-container");
  orderContainer.append(card);

  calculateSum();
  unhide(sum);
  unhide(confirmOrderBtn);
  hide(emptyOrderMessage);
}

function hide(element) {
  element.className += " hidden";
}

function unhide(element) {
  element.classList.remove("hidden");
}

function getOrderCard(target) {
  const figure = target.closest("figure");
  const orderCard = figure.cloneNode(true);
  orderCard.className += " order-book-card";
  addDeleteButton(orderCard);

  return orderCard;
}

function addDeleteButton(card) {
  const deleteButton = createElement("button", "delete-button");
  const deleteIcon = createElement(
    "span",
    "material-symbols-outlined",
    "delete"
  );
  deleteButton.append(deleteIcon);

  deleteButton.addEventListener("click", (event) =>
    removeParent(event.target, "figure")
  );
  deleteButton.addEventListener("click", calculateSum);

  card.append(deleteButton);
}

function calculateSum() {
  const prices = document.querySelectorAll(".order-book-card .book-price");
  let total_sum = 0;
  prices.forEach((price) => (total_sum += +price.textContent.slice(1)));
  sum.textContent = `Total: $${total_sum}`;

  if (total_sum == 0) {
    hide(sum);
    hide(confirmOrderBtn);
    unhide(emptyOrderMessage);
  }
}

export { addBookToCart };

import { createElem } from "./basic_functions.js";
import {
  confirmOrderBtn,
  emptyOrderMessage,
  orderContainer,
} from "./script.js";

function addBookToCart(target) {
  const orderCard = createOrderCard(target);
  orderContainer.append(orderCard);
  updateOrderInfo();
}

function updateOrderInfo() {
  const sum = document.querySelector("#sum");
  const totalSum = calculateSum(sum);

  if (totalSum == 0) {
    hide(sum);
    hide(confirmOrderBtn);
    unhide(emptyOrderMessage);
  } else {
    unhide(sum);
    unhide(confirmOrderBtn);
    hide(emptyOrderMessage);
  }
}

function hide(element) {
  element.classList.add("hidden");
}

function unhide(element) {
  element.classList.remove("hidden");
}

function createOrderCard(target) {
  const orderCard = target.closest(".book-card").cloneNode(true);
  orderCard.classList.add("order-book-card");

  const deleteBtn = createDeleteButton();

  orderCard.append(deleteBtn);

  return orderCard;
}

function createDeleteButton() {
  const deleteButton = createElem("button", "delete-button");
  const deleteIcon = createElem("span", "material-symbols-outlined", "delete");
  deleteButton.append(deleteIcon);

  deleteButton.addEventListener("click", (event) => {
    event.target.closest(".order-book-card").remove();
    updateOrderInfo();
  });
  return deleteButton;
}

function calculateSum(sum) {
  const prices = document.querySelectorAll(".order-book-card .book-price");

  const totalSum = Array.from(prices).reduce(
    (acc, curr) => acc + +curr.textContent.slice(1), 0);

  sum.textContent = `Total: $${totalSum}`;
  return totalSum;
}

export { addBookToCart };

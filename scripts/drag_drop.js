import { addBookToCart } from "./order_books.js";

let dragged;

function addDragEvents() {
  const orderContainer = document.querySelector("#order-container");
  orderContainer.addEventListener("dragover", dragOver);
  orderContainer.addEventListener("dragleave", dragLeave);
  orderContainer.addEventListener("drop", dragDrop);
}

function dragStart(e) {
  dragged = e.target;
}

function dragOver(e) {
  e.preventDefault();
  this.classList.add("hovered");
}

function dragLeave(e) {
  e.preventDefault;
  if (e.target.matches("div#order-container")) {
    this.classList.remove("hovered");
  }
}

function dragDrop() {
  this.classList.remove("hovered");
  addBookToCart(dragged);
}

export { dragStart, addDragEvents };

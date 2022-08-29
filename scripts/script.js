"use strict";
let header = document.createElement('header');
let main = document.createElement('main');
document.body.append(header, main);

let bookCatalog = document.createElement('div');
bookCatalog.id = "book-catalog";
let orderBooks = document.createElement('div');
main.append(bookCatalog, orderBooks);

header.innerHTML = "<h1>Bookshop</h1>";

let df = new DocumentFragment();

fetch('assets/books.json')
  .then(response => response.json())
  .then(processData)

function processData(data) {
  for (const book of data) {
    // book card
    let bookCard = document.createElement('figure');
    bookCard.className = "book-card";
    bookCard.draggable = "true";
    df.append(bookCard);

    // drag and drop a card
    bookCard.addEventListener('dragstart', dragStart);

    // image and info div
    let imgContent = `<img src=${book.imageLink} alt=''>`;
    bookCard.insertAdjacentHTML("afterbegin", imgContent);

    let bookInfo = document.createElement('div');
    let bookContent = `<p class = 'book-info'>${book.author}</p><h3 class='book-info'>${book.title}</h3>`
    bookInfo.insertAdjacentHTML("afterbegin", bookContent);
    bookCard.append(bookInfo);

    // learn more button
    let learnMore = document.createElement("button");
    learnMore.textContent = "Learn more";
    learnMore.id = "learn-more";
    learnMore.addEventListener('click', (event) => popupDescription(event.target, book));

    // price
    let bookPrice = document.createElement('h3');
    bookPrice.textContent = `$${book.price}`;
    bookPrice.className = 'book-price book-info';

    // add to cart button
    let addToCart = document.createElement('button');
    addToCart.textContent = 'Add to cart';
    addToCart.className = "add-to-cart green-btn";
    addToCart.addEventListener("click", (event) => addBookToCart(event.target));

    let priceAndButton = document.createElement("div");
    priceAndButton.append(bookPrice, addToCart);
    bookInfo.append(learnMore, priceAndButton);
  } 
bookCatalog.append(df);
}

function removeElement(target, parent) {
  target.closest(parent).remove();
}

// orderBooks section
orderBooks.innerHTML = "<h2>Your order</h2>";
orderBooks.id = "your-order";

let orderContainer = document.createElement("div");
orderContainer.id = "order-container";
let sum = document.createElement("div");
sum.id = "sum";
let totalPrice = 0;

let confirmOrderBtn = document.createElement("button");
confirmOrderBtn.textContent = "Confirm order";
confirmOrderBtn.className = "hidden green-btn confirm-order";
confirmOrderBtn.addEventListener("click", () => document.location.href = "order_page.html");

orderBooks.append(orderContainer, sum, confirmOrderBtn);

// calcualte total price
function calculateSum() {
  sum.hidden = false;
  let prices = document.querySelectorAll(".order-book-card .book-price");
  let total = 0;
  prices.forEach(price => total += +price.innerHTML.slice(1));
  let elem = document.getElementById("sum");  
  elem.innerHTML =  `<div>Total: &nbsp&nbsp$${total}</div>`
  if (total == 0) {
    sum.hidden = true;
    confirmOrderBtn.className += " hidden";
  }
}

// create book card in order
function addBookToCart(target) {
  let card = addBookInfo(target);
  orderContainer.insertAdjacentElement('beforeend', card);
  calculateSum();
  confirmOrderBtn.classList.remove("hidden");
}

// order book info
function addBookInfo(target) {
  target = target.closest("figure");
  const bookCover = target.querySelector("img").cloneNode(true);
  const bookInfoList = target.querySelectorAll(".book-info");

  let bookInfo = document.createElement("div");
  bookInfoList.forEach((line) => bookInfo.append(line.cloneNode(true)));

  let bookAndCover = document.createElement("div");
  bookAndCover.className = "order-book-card";
  bookAndCover.append(bookCover, bookInfo);

  let card = document.createElement("figure");
  card.append(bookAndCover, document.createElement("hr"));
  card = addDeleteButton(card);

  return card;
}

// delete button in order book card
function addDeleteButton(card) {
  let deleteButton = document.createElement("button");
  let deleteIcon = document.createElement("span");
  deleteIcon.className = "material-symbols-outlined";
  deleteIcon.textContent = "delete";
  deleteButton.append(deleteIcon);

  deleteButton.className = "delete-button";

  deleteButton.addEventListener("click", (event) => removeElement(event.target, "figure"));
  deleteButton.addEventListener("click", () => calculateSum());

  card.querySelector(".order-book-card").insertAdjacentElement("beforeend", deleteButton);

  return card;
}

// drag and drop
let dragged;
orderContainer.addEventListener("dragover", dragOver);
orderContainer.addEventListener("dragleave", dragLeave);
orderContainer.addEventListener("drop", dragDrop);

function dragStart(e) {
  dragged = e.target;
}
function dragOver(e) {
  this.className = "hovered";
  e.preventDefault();
}
function dragLeave() {
  this.className = "";
}
function dragDrop() {
  this.className = "";
  addBookToCart(dragged);
}

// book description popup
function getCoords(target) {
  let box = target.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}
function popupDescription(target, book) {
  let message = document.createElement('div');

  let coords = getCoords(target);
  message.style.position = "absolute";

  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";

  message.append(makeDescriptionDiv(book.description, book.title));
  document.body.append(message);
}
// div to popup: h3, p, button
function makeDescriptionDiv(description, title) {
    let bookDescription = document.createElement('div');
    bookDescription.className = "book-description";
    let descriptionContent = document.createElement('p');
    descriptionContent.textContent = description;
    let descriptionTitle = document.createElement('h3');
    descriptionTitle.textContent = `${title}`;
    let closeButton = document.createElement('button');
    closeButton.textContent = "Close";
    closeButton.className = "close-btn green-btn";
    closeButton.addEventListener("click", (event) => removeElement(event.target,".book-description"));
    
    bookDescription.append(descriptionTitle, descriptionContent, closeButton);
    return bookDescription;
}

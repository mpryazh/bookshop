"use strict";
let header = document.createElement('header');
let main = document.createElement('main');
document.body.append(header, main);

let bookCatalog = document.createElement('div');
bookCatalog.id = "bookCatalog";
let orderBooks = document.createElement('div');
main.append(bookCatalog, orderBooks);

header.innerHTML = "<h1>Welcome to Bookshop!</h1>";

let df = new DocumentFragment();

fetch('assets/books.json')
  .then(response => response.json())
  .then(processData)

function processData(data) {
  for (const book of data) {
    // book card
    let bookCard = document.createElement('figure');
    bookCard.className = "bookCard";
    bookCard.draggable = "true";
    df.append(bookCard);

    // drag and drop a card
    bookCard.addEventListener('dragstart', dragStart);

    // image and info div
    let imgContent = `<img src=${book.imageLink} alt=''>`;
    bookCard.insertAdjacentHTML("afterbegin", imgContent);

    let bookInfo = document.createElement('div');
    let bookContent = `<p class = 'bookInfo'>${book.author}</p><h2 class='bookInfo'>${book.title}</h2>`
    bookInfo.insertAdjacentHTML("afterbegin", bookContent);
    bookCard.append(bookInfo);

    // learn more button
    let learnMore = document.createElement("button");
    learnMore.innerHTML = "Learn more";
    learnMore.id = "learnMore";
    learnMore.addEventListener('click', (event) => popupDescription(event.target, book));

    // price
    let bookPrice = document.createElement('h3');
    bookPrice.textContent = `$${book.price}`;
    bookPrice.className = 'bookPrice bookInfo';

    // add to cart button
    let addToCart = document.createElement('button');
    addToCart.innerHTML = '<span class="material-symbols-outlined">add_shopping_cart</span>';
    addToCart.className = "addToCart";
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
orderBooks.id = "yourOrder";

let orderContainer = document.createElement("div");
orderContainer.id = "orderContainer";
let sum = document.createElement("div");
sum.id = "sum";
let totalPrice = 0;

let confirmOrderBtn = document.createElement("button");
confirmOrderBtn.textContent = "Confirm order";
confirmOrderBtn.className = "hidden";
confirmOrderBtn.addEventListener("click", () => document.location.href = "order_page.html");

orderBooks.append(orderContainer, sum, confirmOrderBtn);

// calcualte total price
function calculateSum() {
  sum.hidden = false;
  let prices = document.querySelectorAll(".orderBookCard .bookPrice");
  let total = 0;
  prices.forEach(price => total += +price.innerHTML.slice(1));
  let elem = document.getElementById("sum");  
  elem.innerHTML =  `<pre>Total:  $${total}</pre>`
  if (total == 0) {
    sum.hidden = true;
    confirmOrderBtn.className = "hidden";
  }
}

// create book card in order
function addBookToCart(target) {
  let card = addBookInfo(target);
  orderContainer.insertAdjacentElement('beforeend', card);
  calculateSum();
  confirmOrderBtn.className = "confirmOrderBtn";
}

// order book info
function addBookInfo(target) {
  target = target.closest("figure");
  const bookCover = target.querySelector("img").cloneNode(true);
  const bookInfoList = target.querySelectorAll(".bookInfo");

  let bookInfo = document.createElement("div");
  bookInfoList.forEach((line) => bookInfo.append(line.cloneNode(true)));

  let bookAndCover = document.createElement("div");
  bookAndCover.className = "orderBookCard";
  bookAndCover.append(bookCover, bookInfo);

  let card = document.createElement("figure");
  card.append(bookAndCover, document.createElement("hr"));

  return addDeleteButton(card);
}

// delete button in order book card
function addDeleteButton(card) {
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<span class="material-symbols-outlined">delete</span>';
  deleteButton.className = "deleteButton";

  deleteButton.addEventListener("click", (event) => removeElement(event.target, "figure"));
  deleteButton.addEventListener("click", () => calculateSum());

  card.querySelector(".orderBookCard").insertAdjacentElement("beforeend", deleteButton);

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
    bookDescription.className = "bookDescription";
    let descriptionContent = document.createElement('p');
    descriptionContent.textContent = description;
    let descriptionTitle = document.createElement('h3');
    descriptionTitle.textContent = `${title}`;
    let closeButton = document.createElement('button');
    closeButton.textContent = "Close";
    closeButton.className = "closeBtn";
    closeButton.addEventListener("click", (event) => removeElement(event.target,".bookDescription"));
    
    bookDescription.append(descriptionTitle, descriptionContent, closeButton);
    return bookDescription;
}

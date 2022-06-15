"use strict";
let header = document.createElement('header');
let main = document.createElement('main');

document.body.append(header, main);

let bookCatalog = document.createElement('div');
let orderBooks = document.createElement('div');
main.append(bookCatalog, orderBooks);
bookCatalog.id = "bookCatalog";

header.innerHTML = "<h1>Welcome to Bookshop!</h1>";


function processData(data) {
  for (const book of data) {
    // create card
    let bookCard = document.createElement('figure');
    bookCard.className = "bookCard";
    bookCatalog.append(bookCard);

    // image and info div
    let imgContent = `<img src=${book.imageLink} alt=&quot;book cover&quot;>`;
    bookCard.insertAdjacentHTML("afterbegin", imgContent);

    let bookInfo = document.createElement('div');
    let bookContent = `<p>${book.author}</p><h2>${book.title}</h2><h3 class='bookPrice'>$${book.price}</h3>`
    bookInfo.innerHTML = bookContent;

    let bookImgContent = imgContent +"<div>" + bookContent + "</div>";

    // add to cart button
    let addToCart = document.createElement('div');
    addToCart.innerHTML =  `<button class="addToCart" onclick="addBookToCart(\`${bookImgContent}\`)">
        <span class="material-symbols-outlined">
          add_shopping_cart
        </span>
        </button>`;

    bookInfo.append(addToCart);
    bookCard.append(bookInfo);

    // create description div: h3, p, button
    let bookDescription = document.createElement('div');
    bookDescription.className = "bookDescription";
    let descriptionContent = document.createElement('p');
    descriptionContent.innerHTML = book.description;
    let title = document.createElement('h3');
    title.innerHTML = `${book.title}`;
    let closeButton = document.createElement('button');
    closeButton.innerHTML = "Close";
    closeButton.className = "closeBtn";
    closeButton.addEventListener("click", (event) => removeElement(event.target,".bookDescription"));
    
    bookDescription.append(title, descriptionContent, closeButton);

    // learn more button
    let learnMore = document.createElement("button");
    learnMore.innerHTML = "Learn more";
    learnMore.id = "learnMore";
    learnMore.addEventListener('click', (event) => popupDescription(event.target, bookDescription));
    let bookTitle = bookInfo.querySelector('h2');
    bookTitle.after(learnMore);
} 
}

function removeElement(target, parentToBeRemovedCSS) {
  target.closest(parentToBeRemovedCSS).remove();
}

fetch('assets/books.json')
  .then(response => response.json())
  .then(processData)

// orderBooks
orderBooks.innerHTML = "<h2 id='orderH2'>Your order</h2>";
orderBooks.id = "yourOrder";

let orderContainer = document.createElement("div");
orderContainer.id = "orderContainer";
let sum = document.createElement("div")
sum.id = "sum";
let totalPrice = 0;

sum.innerHTML = "<p id='nothingHere'>Nothing here yet...</p>"

orderBooks.append(orderContainer);
orderBooks.append(sum);

function addBookToCart(book) {
  let orderBookPlusHr = document.createElement("figure");

  let orderBookCard = document.createElement("div");
  orderBookCard.className = "orderBookCard";
  orderBookCard.innerHTML = `${book}`;

  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<span class="material-symbols-outlined">delete</span>';
  deleteButton.className = "deleteButton";

  deleteButton.addEventListener("click", (event) => removeElement(event.target, "figure"));
  deleteButton.addEventListener("click", () => calculateSum());

  orderBookCard.appendChild(deleteButton);

  orderBookPlusHr.appendChild(orderBookCard);
  orderBookPlusHr.appendChild(document.createElement("hr"));

  orderContainer.appendChild(orderBookPlusHr);
  calculateSum();
}
function calculateSum() {
  let prices = document.querySelectorAll(".orderBookCard .bookPrice");//.forEach(price => price.innerHTML.slice(1));
  let total = 0;
  prices.forEach(price => total += +price.innerHTML.slice(1));
  let elem = document.getElementById("sum");  
  elem.innerHTML =  `<pre>Total:  $${total}</pre>`
}
function getCoords(elem) {
  let box = elem.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}
function popupDescription(elem, description) {
  let message = document.createElement('div');

  let coords = getCoords(elem);
  message.style.position = "absolute";

  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";

  message.append(description);
  document.body.append(message);
}



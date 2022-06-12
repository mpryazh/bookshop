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
    // console.log((book.title));
    let bookCard = document.createElement('figure');
    bookCard.className = "bookCard";

    bookCard.title = "Show more";


    let imgContent = `<img src=${book.imageLink} alt=&quot;book cover&quot;>`;
    bookCard.insertAdjacentHTML("afterbegin", imgContent);

    let bookInfo = document.createElement('div');
    let bookContent = `<p>${book.author}</p><h2>${book.title}</h2><a>Learn more</a><h3>$${book.price}</h3>`
    bookInfo.innerHTML = bookContent;

    let bookImgContent = imgContent +"<div>" + bookContent + "</div>";


    let bookButtons = document.createElement('div');
    bookButtons.innerHTML =  `<button class="addToCart" onclick="addBookToCart(\`${bookImgContent}\`)">
                              <span class="material-symbols-outlined">
                              add_shopping_cart
                              </span>
                              </button>`;

    bookInfo.append(bookButtons);
    bookCard.append(bookInfo);
    bookCatalog.append(bookCard);    

    let bookDescription = document.createElement('div');
    bookDescription.className = "bookDescription";
    let descriptionContent = document.createElement('p');
    descriptionContent.innerHTML = book.description;
    let title = document.createElement('h3');
    title.innerHTML = `${book.title}`;
    let closeButton = document.createElement('button');
    closeButton.innerHTML = "Close";
    

    bookDescription.append(title, descriptionContent, closeButton);

    // let price = document.getElementById("price");
    let learnMore = bookInfo.querySelector('.bookCard a');
    learnMore.onclick = function() {bookCatalog.append(bookDescription)};

  }
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
  orderContainer.innerHTML += `<figure>${book}<button class="xButton">X</button></figure>  <hr>`;
  changeSum(book.substr(-13, 2));
}
function changeSum(num) {
  totalPrice += +num;
  let elem = document.getElementById("sum");
  elem.innerHTML =  `<pre>Total:  $${totalPrice}</pre>`
}






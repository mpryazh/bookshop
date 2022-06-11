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

    let imgContent = `<img src=${book.imageLink} alt=&quot;book cover&quot;>`;
    bookCard.insertAdjacentHTML("afterbegin", imgContent);

    let bookInfo = document.createElement('div');
    let bookContent = `<p>${book.author}</p><h2>${book.title}</h2><h3>$${book.price}</h3>`
    bookInfo.innerHTML = bookContent;

    let bookImgContent = imgContent +"<div>" + bookContent + "</div>";


    let bookButtons = document.createElement('div');
    bookButtons.innerHTML =  `<button id="showMore">Show more</button>
                              <button id="addToCart" onclick="addBookToCart(\'${bookImgContent}\')">Add to cart</button>`;

    bookInfo.append(bookButtons);
    bookCard.append(bookInfo);
    bookCatalog.append(bookCard);    
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
  orderContainer.innerHTML += `<figure>${book}</figure>  <hr>`;
  changeSum(book.substr(-13, 2));
  console.log(book.substr(-13, 2))
}
function changeSum(num) {
  totalPrice += +num;
  console.log(totalPrice);
  let elem = document.getElementById("sum");
  elem.innerHTML =  `<p>Total: $${totalPrice}</p>`
}



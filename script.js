"use strict";
let header = document.createElement('header');
let main = document.createElement('main');


document.body.append(header, main);


let bookCatalog = document.createElement('div');
let orderBooks = document.createElement('div');
////////////////////////////
// let fragment = document.createDocumentFragment();
// fragment.append(bookCatalog);
////////////////////////////
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
    let bookContent = `<p>${book.author}</p><h2>${book.title}</h2><h3>${book.price} $</h3></p>`
    bookInfo.innerHTML = bookContent;

    let bookImgContent = bookContent + imgContent;


    let bookButtons = document.createElement('div');
    bookButtons.innerHTML =  `<button id="showMore">Show more</button>
                              <button id="addToCart" onclick="addBookToCart(\'${bookImgContent}\')">Add to cart</button>`;  // onclick="clickHndl(\'${bookImgContent}\'

    bookInfo.append(bookButtons);
    bookCard.append(bookInfo);
    bookCatalog.append(bookCard);


    // event listener
    // let addButton = document.getElementsByClassName("addToCart");
    // addButton.addEventListener('click', event => {
    //   orderContainer.innerHTML += `<div>${bookImgContent}</div>`;
    // });



    
  }
}
fetch('assets/books.json')
  .then(response => response.json())
  .then(processData)

// orderBooks
orderBooks.innerHTML = "<h2>Your order</h2>";
orderBooks.id = "yourOrder";

let orderContainer = document.createElement("div");
// orderContainer.innerHTML = "<p>Nothing here yet...</p>"

orderBooks.append(orderContainer);

function addBookToCart(book) {
  orderContainer.innerHTML += `<p>${book}</p>`;
}


    // // event listener
    // let addButton = document.getElementById("addToCart");
    // addButton.addEventListener('click', event => {
    //   orderContainer.innerHTML += `<div>${bookImgContent}</div>`;
    // });


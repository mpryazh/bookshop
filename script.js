"use strict";
let header = document.createElement('header');
let bookCatalog = document.createElement('div');
let orderBooks = document.createElement('div');

document.body.append(header, bookCatalog, orderBooks);

header.innerHTML = "<h1>Welcome to Bookshop!</h1>";



function processData(data) {
  console.log(data[0])
  for (const book of data) {
    let bookCard = document.createElement('figure');
    bookCard.className = "bookCard";

    bookCard.insertAdjacentHTML("afterbegin", `<img src=${book.imageLink} alt='book cover'>`);

    let bookInfo = document.createElement('div');
    bookInfo.innerHTML = "<p>Author</p><h2>Title</h2><h3>Price</h3>";
    bookCard.append(bookInfo)

    bookCatalog.append(bookCard);
  }
}
fetch('assets/books.json')
  .then(response => response.json())
  .then(processData)

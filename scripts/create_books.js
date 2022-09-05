import { createElement } from "./basic_functions.js";
import { popupDescription } from "./popup_description.js";
import { dragStart } from "./drag_drop.js";
import { addBookToCart } from "./order_books.js";
import { bookCatalog } from "./script.js";

let books;
async function getData() {
  const response = await fetch("../../assets/books.json");
  books = await response.json();
}
await getData();

function createBooks() {
  for (const book of books) {
    const bookCard = createElement("figure", "book-card");
    bookCard.draggable = "true";
    bookCard.addEventListener("dragstart", dragStart);

    const image = createElement("img");
    image.setAttribute("src", `../../${book.imageLink}`);
    image.setAttribute("alt", book.title);
    const bookInfo = createElement("div", "book-info");
    const author = createElement("p", "", `${book.author}`);
    const title = createElement("h3", "", `${book.title}`);

    const learnMore = createElement("button", "learn-more", "Learn more");
    learnMore.addEventListener("click", (event) =>
      popupDescription(event.target, book)
    );

    const bookPrice = createElement("h3", "book-price", `$${book.price}`);

    const addToCart = createElement(
      "button",
      "add-to-cart green-btn",
      "Add to cart"
    );
    addToCart.addEventListener("click", (event) => addBookToCart(event.target));

    const priceAndButton = document.createElement("div");
    priceAndButton.append(bookPrice, addToCart);

    bookInfo.append(author, title, learnMore, priceAndButton);
    bookCard.append(image, bookInfo);

    bookCatalog.append(bookCard);
  }
}

export { createBooks };

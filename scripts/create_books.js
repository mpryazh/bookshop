import { createElem } from "./basic_functions.js";
import { popupDescription } from "./popup_description.js";
import { dragStart } from "./drag_drop.js";
import { addBookToCart } from "./order_books.js";
import { bookCatalog } from "./script.js";

async function getBooksData() {
  const response = await fetch("../../assets/books.json");
  let books = await response.json();
  createBooks(books);
}

function createBooks(books) {
  for (const book of books) {
    const bookCard = createElem("figure", "book-card");
    bookCard.draggable = "true";
    bookCard.addEventListener("dragstart", dragStart);

    const image = createElem("img");
    image.draggable = false;
    image.setAttribute("src", `../../${book.imageLink}`);
    image.setAttribute("alt", book.title);
    const bookInfo = createElem("div", "book-info");
    const author = createElem("p", "", `${book.author}`);
    const title = createElem("h3", "", `${book.title}`);

    const learnMore = createElem("button", "learn-more", "Learn more");
    learnMore.addEventListener("click", (event) =>
      popupDescription(event.target, book)
    );

    const bookPrice = createElem("h3", "book-price", `$${book.price}`);

    const addToCart = createElem(
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

export { getBooksData };

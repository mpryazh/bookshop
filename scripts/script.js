import { createElement } from "./basic_functions.js";
import { createBooks } from "./create_books.js";
import { addDragEvents } from "./drag_drop.js";

const fragment = new DocumentFragment();
const header = createElement("header");
const h1 = createElement("h1", "", "Bookshop");
const main = createElement("main");
header.append(h1);
fragment.append(header, main);

const bookCatalog = document.createElement("div");
bookCatalog.id = "book-catalog";
const orderBooks = createElement("div", "order-books");
orderBooks.id = "your-order";
main.append(bookCatalog, orderBooks);

createBooks();

const yourOrder = createElement("h2", "", "Your order");
orderBooks.append(yourOrder);

const orderContainer = createElement("div");
orderContainer.id = "order-container";

const emptyOrderMessage = createElement("p", "", "Nothing here yet");
emptyOrderMessage.id = "empty-order";

const sum = createElement("div");
sum.id = "sum";

const confirmOrderBtn = createElement(
  "button",
  "hidden green-btn confirm-order",
  "Confirm order"
);
confirmOrderBtn.addEventListener(
  "click",
  () => (document.location.href = "../form/form_page.html")
);

orderContainer.append(emptyOrderMessage);
orderBooks.append(orderContainer, sum, confirmOrderBtn);
document.body.append(fragment);

addDragEvents();

export { confirmOrderBtn, emptyOrderMessage, bookCatalog };

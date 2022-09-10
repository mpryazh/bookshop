import { createElem } from "./basic_functions.js";
import { getBooksData } from "./create_books.js";
import { addDragEvents } from "./drag_drop.js";

function init() {
  const fragment = new DocumentFragment();
  const header = createElem("header");
  const h1 = createElem("h1", "", "Bookshop");
  const main = createElem("main");
  header.append(h1);
  fragment.append(header, main);

  const bookCatalog = document.createElement("div");
  bookCatalog.id = "book-catalog";
  const orderBooks = createElem("div", "order-books");
  orderBooks.id = "your-order";
  main.append(bookCatalog, orderBooks);

  const yourOrder = createElem("h2", "", "Your order");
  orderBooks.append(yourOrder);

  const orderContainer = createElem("div");
  orderContainer.id = "order-container";

  const emptyOrderMessage = createElem("p", "", "Nothing here yet");
  emptyOrderMessage.id = "empty-order";

  const sum = createElem("div");
  sum.id = "sum";

  const confirmOrderBtn = createElem(
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

  return { confirmOrderBtn, emptyOrderMessage, bookCatalog, orderContainer };
}

const { confirmOrderBtn, emptyOrderMessage, bookCatalog, orderContainer } = init();

addDragEvents();

getBooksData();

export { confirmOrderBtn, emptyOrderMessage, bookCatalog, orderContainer };

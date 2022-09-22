import { createElem } from "./basic_functions.js";

function getCoordinates(target) {
  let box = target.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
}

function popupDescription(target, book) {
  const popup = document.createElement("div");

  const coords = getCoordinates(target);
  popup.style.position = "absolute";
  popup.style.left = coords.left + "px";
  popup.style.top = coords.bottom + "px";

  popup.append(createDescriptionDiv(book.description, book.title));
  document.body.append(popup);
}

function createDescriptionDiv(description, title) {
  const bookDescription = createElem("div", "book-description");
  const descriptionContent = createElem("p", "", `${description}`);
  const descriptionTitle = createElem("h3", "", `${title}`);
  const closeButton = createElem("button", "close-btn");
  const closeIcon = createElem("span", "material-symbols-outlined", "close");
  closeButton.append(closeIcon);

  closeButton.addEventListener("click", (event) =>
    event.target.closest(".book-description").remove()
  );

  bookDescription.append(closeButton, descriptionTitle, descriptionContent);
  return bookDescription;
}

export { popupDescription };

import { createElement, removeParent } from "/scripts/basic_functions.js";

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
  const bookDescription = createElement("div", "book-description");
  const descriptionContent = createElement("p", "", `${description}`);
  const descriptionTitle = createElement("h3", "", `${title}`);
  const closeButton = createElement("button", "close-btn");
  const closeIcon = createElement("span", "material-symbols-outlined", "close");
  closeButton.append(closeIcon);

  closeButton.addEventListener("click", (event) =>
    removeParent(event.target, ".book-description")
  );

  bookDescription.append(closeButton, descriptionTitle, descriptionContent);
  return bookDescription;
}

export { popupDescription };

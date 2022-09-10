function createElem(tag, classes = "", content = "") {
  let element = document.createElement(tag);
  element.className = classes;
  element.textContent = content;

  return element;
}

function createInputShort(id, type, pattern = "", name = id) {
  const input = document.createElement("input");
  input.id = id;
  input.name = name;
  input.type = type;
  input.pattern = pattern;
  input.required = true;

  return input;
}

function createLabelShort(id) {
  let label = document.createElement("label");
  label.for = id;
  label.textContent = id[0].toUpperCase() + id.slice(1);

  return label;
}

export { createElem, createInputShort, createLabelShort };

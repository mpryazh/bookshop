"use strict";
let header = document.createElement('header');
let main = document.createElement('main');
main.id = "order";
header.innerHTML = "<h1>Order form</h1>";

document.body.append(header, main);

let form = document.createElement("form");
form.noValidate = true;
main.append(form);

// name
let name_label = document.createElement("label");
name_label.textContent = "Name";
name_label.for = "name";
let name_input = document.createElement("input");
name_input.id = "name";
name_input.name = "name"; //////////////////////////////////////// !!!!
name_input.type = "text";
name_input.required = true;
name_input.pattern = "^[a-zA-Z]{4,20}";
name_label.append(name_input);

//surname
let surname_label = document.createElement("label");
surname_label.textContent = "Surname";
surname_label.for = "surname";
let surname_input = document.createElement("input");
surname_input.id = "surname";
surname_input.name = "surname";
surname_input.type = "text";
surname_input.required = true;
surname_input.pattern = "^[a-zA-Z]{5,25}";
surname_label.append(surname_input);

// delivery date
let delivery_label = document.createElement("label");
delivery_label.textContent = "Delivery date";
delivery_label.for = "delivery";
let delivery_input = document.createElement("input");
delivery_input.id = "delivery";
delivery_input.name = "delivery";
delivery_input.type = "date";
delivery_input.required = true;
delivery_label.append(delivery_input);

// min delivery date = tomorrow
let today = new Date()
today.setDate(today.getDate() + 1);
let tomorrow = today.toLocaleDateString();
tomorrow = tomorrow.split(".").reverse().join("-");
delivery_input.value = tomorrow;
delivery_input.min = tomorrow;

// street
let street_label = document.createElement("label");
street_label.textContent = "Street";
street_label.for = "street";
let street_input = document.createElement("input");
street_input.id = "street";
street_input.type = "text";
street_input.name = "street"
street_input.required = true;
street_input.pattern = "^[ a-zA-Z0-9]{5,25}";
street_label.append(street_input);

// house number
let house_label = document.createElement("label");
house_label.textContent = "House number";
house_label.for = "house";
let house_input = document.createElement("input");
house_input.id = "house";
house_input.type = "number";
house_input.name = "house";
house_input.required = true;
house_input.pattern = "^[0-9]";
house_input.min = 1;
house_label.append(house_input);

// flat number
let flat_label = document.createElement("label");
flat_label.textContent = "Flat number";
flat_label.for = "flat";
let flat_input = document.createElement("input");
flat_input.id = "flat";
flat_input.type = "text";
flat_input.name = "flat";
flat_input.required = true;
flat_input.pattern = "[1-9]([0-9]+)?(-[0-9]+)?";
flat_label.append(flat_input);

// cash or card
let paymentMethod = document.createElement("p");
let payment_labels = document.createElement("div");
payment_labels.className = "paymentSpace"

paymentMethod.textContent = "Payment method";
let cash_label = document.createElement("label");
cash_label.textContent = "Cash";
cash_label.for = "cash";
cash_label.className = "payment";
let cash_input = document.createElement("input");
cash_input.name = "payment";
cash_input.id = "cash";
cash_input.type = "radio";

cash_label.prepend(cash_input);

let card_label = document.createElement("label");
card_label.textContent = "Card";
card_label.for = "card";
card_label.className = "payment";
let card_input = document.createElement("input");
card_input.name = "payment";
card_input.id = "card";
card_input.type = "radio";
card_input.checked = true;

card_label.prepend(card_input);

payment_labels.append(cash_label, card_label);

// 2 gifts
let giftMess = document.createElement("p");
giftMess.textContent = "Pick 2 gifts";

let giftspace = document.createElement("div");
giftspace.className = "giftSpace";

let packAsGift_label = document.createElement("label");
packAsGift_label.textContent = "Pack as a gift";
packAsGift_label.for = "gift";
let packAsGift_input = document.createElement("input");
packAsGift_input.id = "gift";
packAsGift_input.name = "free_gift";
packAsGift_input.type = "checkbox";

packAsGift_label.prepend(packAsGift_input);

let postcard_label = document.createElement("label");
postcard_label.textContent = "Add a postcard";
postcard_label.for = "postcard";
let postcard_input = document.createElement("input");
postcard_input.id = "postcard";
postcard_input.name = "free_postcard";
postcard_input.type = "checkbox";

postcard_label.prepend(postcard_input);

let discount_label = document.createElement("label");
discount_label.textContent = "Get a 2% off your next order";
discount_label.for = "discount";
let discount_input = document.createElement("input");
discount_input.id = "discount";
discount_input.name = "free_discount";
discount_input.type = "checkbox";

discount_label.prepend(discount_input);

let pen_label = document.createElement("label");
pen_label.textContent = "Add a branded pen or a pencil";
pen_label.for = "pen";
let pen_input = document.createElement("input");
pen_input.id = "pen";
pen_input.name = "free_pen";
pen_input.type = "checkbox";

pen_label.prepend(pen_input);


giftspace.append(packAsGift_label,
                postcard_label,
                pen_label,
                discount_label);

form.append(name_label, 
            surname_label,
            delivery_label,
            street_label,
            house_label,
            flat_label,
            paymentMethod, 
            payment_labels,
            giftMess,
            giftspace);


// limit gift checkboxes by 2
const limit = 2;
const checkboxes = document.querySelectorAll("input[type='checkbox']");
checkboxes.forEach(checkbox => checkbox.addEventListener('click', (event) => {
    let checked = document.querySelectorAll('input[type="checkbox"]:checked').length;
    if (event.currentTarget.checked && checked > limit) {
        event.preventDefault();
    } 
  })
)

// complete button
let completeBtn = document.createElement("input");
completeBtn.type = "submit";
completeBtn.value = "Complete";
completeBtn.className = "confirmOrderBtn complete";
form.append(completeBtn);

// set required fields
setRequiredLabels();

function setRequiredLabels() {
    let labels = document.querySelectorAll("label");

    for (let label of labels) {
        let labelfor = label.for;
        if (labelfor) {
            let field = document.querySelector(`#${labelfor}`);
            if (field && field.hasAttribute("required") && field.type != "radio") {
                label.classList.add("required");
            }
        }
    }
}

// add validation
let inputs = document.querySelectorAll("input");

inputs.forEach(input => input.addEventListener('input', function(e) {
    e.target.setCustomValidity('');
    e.target.classList = "validation";
}));
inputs.forEach(input => input.addEventListener('blur', function(e) {
    if (!e.target.checkValidity()) {
        e.target.setCustomValidity('Field is invalid');  
        e.target.reportValidity(); 
    }
}));

// move focus to next field on enter
inputs.forEach(input => input.addEventListener('keydown', function(e) {
    if (e.key == 'Enter') {
        e.preventDefault();
        const index = Array.prototype.indexOf.call(form, e.target);
        form.elements[index + 1].focus();
    }
}));

// enable complete button when all required fields are filled
completeBtn.disabled = true;

const requiredInputs = document.querySelectorAll("input:required");
for(const field of requiredInputs){
    field.addEventListener("input", buttonState);
};

function buttonState() {
    completeBtn.disabled = Array.from(requiredInputs).some(x => x.value === '');
}

// popup order info after submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    popup();
    //make form uneditable
    form.ariaReadOnly = true;
    completeBtn.disabled = true;
    document.querySelectorAll("input").forEach(input => input.setAttribute("disabled", ""));
});

function popup() {
    let orderInfo = document.createElement('div');
    orderInfo.id = "orderInfo";

    let info = document.createElement('pre');
    info.textContent = `
    Order is created! \n 
    The delivery address is: 
    ${street_input.value} street, ${house_input.value}, apt ${flat_input.value} \n
    Customer ${name_input.value} ${surname_input.value}`;

    let homeBtn = document.createElement('button');
    homeBtn.textContent = 'Back to shop';
    homeBtn.classList = 'homeBtn confirmOrderBtn';
    homeBtn.addEventListener('click', () => location.href = 'index.html');

    orderInfo.append(info, homeBtn);
    form.className += " blurred";

    main.append(orderInfo);
}
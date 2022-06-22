let header = document.createElement('header');
let main = document.createElement('main');
main.id = "order";
header.innerHTML = "<h1>Order form</h1>";

document.body.append(header, main);

let form = document.createElement("fieldset");
main.append(form);

let name_label = document.createElement("label");
name_label.textContent = "Name";
name_label.for = "name";
let name_input = document.createElement("input");
name_input.id = "name";
name_input.type = "text";
name_input.required = true;
name_input.pattern = "^[a-zA-Z]{4,20}";

let surname_label = document.createElement("label");
surname_label.textContent = "Surname";
surname_label.for = "surname";
let surname_input = document.createElement("input");
surname_input.id = "surname";
surname_input.type = "text";
surname_input.required = true;
surname_input.pattern = "^[a-zA-Z]{5,25}";

let delivery_label = document.createElement("label");
delivery_label.textContent = "Delivery date";
delivery_label.for = "delivery";
let delivery_input = document.createElement("input");
delivery_input.id = "delivery";
delivery_input.type = "date";
delivery_input.required = true;

// set min date = tomorrow
let today = new Date()
today.setDate(today.getDate() + 1);
let tomorrowTmp = today.toLocaleDateString();
tomorrowTmp = tomorrowTmp.split(".");
let tomorrow = [];
tomorrow.push(tomorrowTmp[2],tomorrowTmp[1],tomorrowTmp[0]);
tomorrow = tomorrow.join("-");
delivery_input.value = tomorrow;
delivery_input.min = tomorrow;

let street_label = document.createElement("label");
street_label.textContent = "Street";
street_label.for = "street";
let street_input = document.createElement("input");
street_input.id = "street";
street_input.type = "text";
street_input.required = true;
street_input.pattern = "^[ a-zA-Z0-9]{5,25}";

let house_label = document.createElement("label");
house_label.textContent = "House number";
house_label.for = "house";
let house_input = document.createElement("input");
house_input.id = "house";
house_input.type = "number";
house_input.required = true;
house_input.pattern = "^[0-9]";
house_input.min = 1;

let flat_label = document.createElement("label");
flat_label.textContent = "Flat number";
flat_label.for = "flat";
let flat_input = document.createElement("input");
flat_input.id = "flat";
flat_input.type = "text";
flat_input.required = true;
flat_input.pattern = "[1-9]([0-9]+)?(-[0-9]+)?";
// flat_input.min = 1;

let paymentMethod = document.createElement("p");
paymentMethod.textContent = "Choose your payment method:*";
let cash_label = document.createElement("label");
cash_label.textContent = "Cash";
cash_label.for = "cash";
let cash_input = document.createElement("input");
cash_input.name = "payment";
cash_input.id = "cash";
cash_input.type = "radio";
cash_input.required = true;

let card_label = document.createElement("label");
card_label.textContent = "Card";
card_label.for = "card";
let card_input = document.createElement("input");
card_input.name = "payment";
card_input.id = "card";
card_input.type = "radio";

let giftspace = document.createElement("div");
let gift = document.createElement("p");
gift.textContent = "You can choose up to 2 gifts: ";
giftspace.append(gift);

let packAsGift_label = document.createElement("label");
packAsGift_label.textContent = "Pack as a gift";
packAsGift_label.for = "gift";
let packAsGift_input = document.createElement("input");
packAsGift_input.id = "gift";
packAsGift_input.type = "checkbox";

let postcard_label = document.createElement("label");
postcard_label.textContent = "Add a postcard";
postcard_label.for = "postcard";
let postcard_input = document.createElement("input");
postcard_input.id = "postcard";
postcard_input.type = "checkbox";

let discount_label = document.createElement("label");
discount_label.textContent = "Get a 2% discount for yout next order";
discount_label.for = "discount";
let discount_input = document.createElement("input");
discount_input.id = "discount";
discount_input.type = "checkbox";

let pen_label = document.createElement("label");
pen_label.textContent = "Add a branded pen or a pencil";
pen_label.for = "pen";
let pen_input = document.createElement("input");
pen_input.id = "pen";
pen_input.type = "checkbox";


giftspace.append(packAsGift_label, packAsGift_input,
                postcard_label, postcard_input,
                pen_label, pen_input,
                discount_label, discount_input);

form.append(name_label, name_input, 
            surname_label, surname_input,
            delivery_label, delivery_input,
            street_label, street_input,
            house_label, house_input,
            flat_label, flat_input,
            paymentMethod, 
            cash_label, cash_input,
            card_label, card_input,
            giftspace);


const limit = 2;

checkboxes = document.querySelectorAll("input[type='checkbox']");
checkboxes.forEach(checkbox => checkbox.addEventListener('click', (event) => {
    let checked = document.querySelectorAll('input[type="checkbox"]:checked').length;
    if (event.currentTarget.checked && checked > limit) {
        console.log(checked); 
        event.preventDefault();

    } 
  })
)


let completeBtn = document.createElement("button");
completeBtn.textContent = "Complete";
completeBtn.className = "confirmOrderBtn";
completeBtn.type = "submit";
main.append(completeBtn);

decorateRequiredLabels();


function decorateRequiredLabels() {
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
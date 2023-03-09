let itemArray = [];
let newNumberFlag = false;

const equationArray = [];
const currentValueElem = document.querySelector(".currentvalue");
const previousValueElem = document.querySelector(".previousvalue");
const operatorButtons = document.querySelectorAll(".opt");
const NumberButtons = document.querySelectorAll(".num");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".remove");

NumberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", addNumberIntoScreen);
});

clearButton.addEventListener("click", clearScreen);
deleteButton.addEventListener("click", DeleteLatestInput);

function addNumberIntoScreen(event) {
  const newInput = event.target.textContent;

  if (newNumberFlag) {
    currentValueElem.textContent = newInput;
    newNumberFlag = false;
  } else {
    currentValueElem.textContent =
      currentValueElem.textContent == 0
        ? newInput
        : `${currentValueElem.textContent}${newInput}`;
  }
}

function clearScreen() {
  currentValueElem.textContent = "0";
  previousValueElem.textContent = "";
  itemArray = [];
}

function DeleteLatestInput() {
  currentValueElem.textContent = currentValueElem.textContent.slice(0, -1);
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(opt, a, b) {
  a = Number(a);
  b = Number(b);

  if (opt === "+") return add(a, b);
  if (opt === "-") return subtract(a, b);
  if (opt === "×") return multiply(a, b);
  if (opt === "÷" && b === 0) return null;
  if (opt === "÷") return divide(a, b);

  return null;
}

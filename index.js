let itemArray = [];
let newNumberFlag = false;

const equationArray = [];
const currentValueElem = document.querySelector(".currentvalue");
const previousValueElem = document.querySelector(".previousvalue");
const NumberButtons = document.querySelectorAll(".num");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".remove");

NumberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", updateCurrentValue);
});

clearButton.addEventListener("click", clear);

function updateCurrentValue(event) {
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

function clear(event) {
  currentValueElem.textContent = "0";
  previousValueElem.textContent = "";
  itemArray = [];
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

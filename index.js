let firstOperand = "";
let operator = "";
let secondOperand = "";
let resetFlag = false;

const currentValueElem = document.querySelector(".currentvalue");
const previousValueElem = document.querySelector(".previousvalue");
const operatorButtons = document.querySelectorAll(".opt");
const NumberButtons = document.querySelectorAll(".num");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".remove");
const equalButton = document.querySelector(".equal");
const pointButton = document.querySelector(".point");

NumberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", addNumberIntoScreen);
});

operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", addOperatorIntoScreen);
});

clearButton.addEventListener("click", clearScreen);
deleteButton.addEventListener("click", DeleteLatestInput);
equalButton.addEventListener("click", evaluate);
pointButton.addEventListener("click", addDecimalIntoScreen);

function addDecimalIntoScreen(e) {
  const newDecimal = e.target.textContent;
  if (!currentValueElem.textContent.includes(".")) {
    currentValueElem.textContent += newDecimal;
  }
}

function evaluate() {
  if (operator === "") return null;
  secondOperand = currentValueElem.textContent;
  previousValueElem.textContent = `${firstOperand} ${operator} ${secondOperand} ${equalButton.textContent}`;
  let result = operate(operator, firstOperand, secondOperand);
  currentValueElem.textContent = result;
  resetFlag = true;
}

function addNumberIntoScreen(event) {
  if (previousValueElem.textContent.includes("=")) {
    previousValueElem.textContent = "";
    resetCurrentValueElem();
  }

  const newInput = event.target.textContent;

  if (currentValueElem.textContent === "0" || resetFlag)
    resetCurrentValueElem();
  currentValueElem.textContent += newInput;
}

function addOperatorIntoScreen(event) {
  const newOperator = event.target.textContent;
  firstOperand = currentValueElem.textContent;
  operator = newOperator;
  previousValueElem.textContent = `${firstOperand} ${newOperator}`;
  resetFlag = true;
}

function resetCurrentValueElem() {
  currentValueElem.textContent = "";
  resetFlag = false;
}

function clearScreen() {
  firstOperand = "";
  secondOperand = "";
  operator = "";
  currentValueElem.textContent = "0";
  previousValueElem.textContent = "";
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

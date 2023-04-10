/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
let firstOperand = '';
let operator = '';
let secondOperand = '';
let resetFlag = false;

const currentValueElem = document.querySelector('.currentvalue');
const previousValueElem = document.querySelector('.previousvalue');
const operatorButtons = document.querySelectorAll('.opt');
const numberButtons = document.querySelectorAll('.num');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.remove');
const equalButton = document.querySelector('.equal');
const pointButton = document.querySelector('.point');

function addDecimalIntoScreen(e) {
  const newDecimal = e.target.textContent;
  resetFlag = false;

  if (!currentValueElem.textContent.includes('.')) {
    currentValueElem.textContent += newDecimal;
    resetFlag = false;
  }
}

function resetCurrentValueElem() {
  currentValueElem.textContent = '';
  resetFlag = false;
}

function clearScreen() {
  firstOperand = '';
  secondOperand = '';
  operator = '';
  currentValueElem.textContent = '0';
  previousValueElem.textContent = '';
}

function deleteLatestInput() {
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

  if (opt === '+') return add(a, b);
  if (opt === '-') return subtract(a, b);
  if (opt === '×') return multiply(a, b);
  if (opt === '÷' && b === 0) return null;
  if (opt === '÷') return divide(a, b);

  return null;
}

function evaluate() {
  if (operator === '') return null;
  if (operator === '÷' && currentValueElem.textContent === '0')
    alert('cant divide by zero');

  secondOperand = currentValueElem.textContent;
  previousValueElem.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
  currentValueElem.textContent = operate(operator, firstOperand, secondOperand);

  resetFlag = true;
  operator = '';

  return null;
}

function addOperatorIntoScreen(event) {
  if (operator !== '') evaluate();

  const newOperator = event.target.textContent;
  firstOperand = currentValueElem.textContent;
  operator = newOperator;

  previousValueElem.textContent = `${firstOperand} ${newOperator}`;

  resetFlag = true;
}

function addNumberIntoScreen(event) {
  if (previousValueElem.textContent.includes('=')) {
    previousValueElem.textContent = '';
  }

  const newInput = event.target.textContent;

  if (currentValueElem.textContent === '0' || resetFlag)
    resetCurrentValueElem();
  currentValueElem.textContent += newInput;
}

function handleKeyDown(event) {
  // Map keyboard keys to calculator functions
  const numberButton = document.querySelector(
    `.num[data-value="${event.key}"]`
  );
  const operatorButton = document.querySelector(
    `.opt[data-value="${event.key}"]`
  );

  switch (event.key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      // If a number key is pressed, add the number to the screen
      if (numberButton) {
        addNumberIntoScreen({ target: numberButton });
      }
      break;

    case '+':
    case '-':
    case '*':
    case '/':
      // If an operator key is pressed, add the operator to the screen
      if (operatorButton) {
        addOperatorIntoScreen({ target: operatorButton });
      }
      break;

    case '.':
      // If the dot key is pressed, add the decimal point to the screen

      addDecimalIntoScreen({ target: pointButton });
      break;

    case 'Backspace':
      // If the backspace key is pressed, delete the latest input
      deleteLatestInput();
      break;

    case 'Escape':
      // If the escape key is pressed, clear the screen
      clearScreen();
      break;

    case 'Enter':
      // If the enter key is pressed, evaluate the expression
      evaluate();
      break;

    default:
      // Ignore other keys
      break;
  }
}

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener('click', addNumberIntoScreen);
});

operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener('click', addOperatorIntoScreen);
});

clearButton.addEventListener('click', clearScreen);
deleteButton.addEventListener('click', deleteLatestInput);
equalButton.addEventListener('click', evaluate);
pointButton.addEventListener('click', addDecimalIntoScreen);
document.addEventListener('keydown', handleKeyDown);

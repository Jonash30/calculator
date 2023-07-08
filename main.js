
const buttons = document.querySelectorAll("button");

const calculator = {
  displayOutput: '0',
  displayValue: '0',
  firstOperand: null,
  secondOperand: false,
  operator: null,
  isResultDisplayed: false,
}

function updateDisplay(){
  const output = document.querySelector('.output')
  const display = document.getElementById('display');

  const formatttedOutput = numberWithCommas(calculator.displayOutput);
  output.innerHTML = `Ans = ${formatttedOutput}`;
  display.value = calculator.displayValue;
}
updateDisplay();

function numberWithCommas(number){
  const parts = number.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join('.');
}

function inputDigit(digit){
  const { displayValue, secondOperand } = calculator;
  if(secondOperand === true){
    calculator.displayValue = digit;
    calculator.secondOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
  
}


function inputDecimal(dot){
  if(calculator.secondOperand === true){
    calculator.displayValue = '0.'
    calculator.secondOperand = false;
    return;
  }
  if(!calculator.displayValue.includes(dot)){
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator){
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if(operator && calculator.secondOperand){
    calculator.operator = nextOperator;
    return;
  }

  if(firstOperand === null && !isNaN(inputValue)){
    calculator.firstOperand = inputValue;
  } else if(operator){
    const result = operate(firstOperand, inputValue, operator);

    calculator.firstOperand = result;
  }

  calculator.secondOperand = true;
  calculator.operator = nextOperator;

  
}


function resetCalculator(){
  calculator.displayOutput = '0';
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.secondOperand = false;
  calculator.operator = null;
  
}

function clearEntry(){
  const { displayValue } = calculator;

  if(displayValue !== '0' && displayValue.length > 1){
    calculator.displayValue = displayValue.slice(0, -1);
  } else {
    calculator.displayValue = '0';
  }
}  

function operate(firstOperand, secondOperand, operator) {
  let result = null;
  if (operator === '+') {
    result = add(firstOperand, secondOperand);
  } else if (operator === '-') {
    result = subtract(firstOperand, secondOperand);
  } else if (operator === '*') {
    result = multiply(firstOperand, secondOperand);
  } else if (operator === '/') {
    result = divide(firstOperand, secondOperand);
  } else if (operator === '%'){
    result = percentage(firstOperand, secondOperand);
  } else {
    result = secondOperand;
  }

  calculator.displayOutput = String(result);
  return result;
}

buttons.forEach(button => {
  button.addEventListener('click', (event) =>{
    const { target } = event;
    const { value } = target;
    button.focus();

    if(!target.matches('button')){
      return;
    }

    switch(value){

      case '+':
      case '-':
      case '*':
      case '/':
      case '%':
      case '=':
        handleOperator(value);
        calculator.isResultDisplayed = true;
        break;
      
      case '.':
        inputDecimal(value);
        break;

      case 'AC':
        resetCalculator(value);
        break;

      case 'CE':
        if(!calculator.isResultDisplayed){
          clearEntry(value);
        }
        break;

      default:
        if(Number.isInteger(parseFloat(value))) {
          inputDigit(value);
        }
    }
    setTimeout(function(){
        button.blur();
    }, 100)
    updateDisplay();
  })
})

document.addEventListener('keydown', (event) =>{
  const { key } = event;
  if(key === 'Enter'){
    handleOperator('=');
    calculator.isResultDisplayed = true;
    updateDisplay();
  } else if (key === 'Backspace'){
    if(!calculator.isResultDisplayed){
      clearEntry();
      updateDisplay();
    }
  } else if (key === '.'){
    inputDecimal('.')
    updateDisplay();
  } else if (/[0-9]/.test(key)) {
    inputDigit(key);
    updateDisplay();
  }else if (['+','-','*','/','%'].includes(key)){
    handleOperator(key);
    calculator.isResultDisplayed = true;
    updateDisplay();
  }
})

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

function percentage(a,b){
  return (a * b) / 100;
}

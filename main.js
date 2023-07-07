// const display = document.getElementById('display');
// const output = document.querySelector('.output')
// const buttons = document.querySelectorAll("button");

// buttons.forEach(button => {
//   button.addEventListener('click', () => {
//     const buttonValue = button.dataset.value;
//     const currentValue = display.value;
//     const isOperator = button.classList.contains('operator');
//     const endsWithOperator = /[\+\-\*\/]$/.test(currentValue);

//     if (buttonValue === '=') {
//       const expression = currentValue.split(' ');
//       const num1 = parseFloat(expression[0]);
//       const operator = expression[1];
//       const num2 = parseFloat(expression[2]);

//       if (!isNaN(num1) && !isNaN(num2) && operator) {
//         const result = operate(num1, num2, operator);
//         display.value = result !== null ? result : '';
//         output.textContent = display.value;
//       }
//     } else {
//         if (isOperator && endsWithOperator) {
//           display.value = currentValue.slice(0, -1);
//         }
//         display.value += isOperator ? ` ${buttonValue} ` : buttonValue;
//       }
//   });
// });





const buttons = document.querySelectorAll("button");


const calculator = {
  displayOutput: '',
  displayValue: '0',
  firstOperand: null,
  secondOperand: false,
  operator: null,
}

function updateDisplay(){
  const output = document.querySelector('.output')
  const display = document.getElementById('display');
  display.value = calculator.displayValue;
}
updateDisplay();

function inputDigit(digit){
  const { displayValue, secondOperand } = calculator;
  if(secondOperand === true){
    calculator.displayValue = digit;
    calculator.secondOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
  
  console.log(calculator);
}


function inputDecimal(dot){
  if(!calculator.displayValue.includes(dot)){
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator){
  const { firstOperand, displayValue, operator} = calculator;
  const inputValue = parseFloat(displayValue);

  if(firstOperand === null && !isNaN(inputValue)){
    calculator.firstOperand = inputValue;
  } else if(operator){
    const result = operate(firstOperand, inputValue, operator);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.secondOperand = true;
  calculator.operator = nextOperator;

  console.log(calculator);
}

function operate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return add(firstOperand, secondOperand);
  } else if (operator === '-') {
    return subtract(firstOperand, secondOperand);
  } else if (operator === '×') {
    return multiply(firstOperand, secondOperand);
  } else if (operator === '÷') {
    return divide(firstOperand, secondOperand);
  }

  return secondOperand;
}

buttons.forEach(button => {
  button.addEventListener('click', (event) =>{
    const { target } = event;
    
    if(!target.matches('button')){
      return
    }
    if(target.classList.contains('operator')){
      handleOperator(target.value);
      updateDisplay();
      return;
    }
    if(target.classList.contains('all-clear')){
      console.log('all-clear', target.value)
      return;
    }
    if(target.classList.contains('clear')){
      console.log('clear', target.value)
      return;
    }
    if(target.classList.contains('decimal')){
      inputDecimal(target.value)
      updateDisplay();
      return
    }
    inputDigit(target.value);
    updateDisplay();
  })
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


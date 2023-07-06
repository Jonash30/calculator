let num1 = 4;
let num2 = 4;
let operator;

function add(a,b) {
    return a + b;
}
console.log(add(num1,num2));

function subtract(a,b) {
    return a - b;
}
console.log(subtract(num1,num2));

function multiply(a,b) {
    return a * b;
}
console.log(multiply(num1,num2));

function divide(a,b) {
    return a / b;
}
console.log(divide(num1, num2));

function operate(num1,num2,operator){
    if(operator === '+'){
        add();
    } else if(operator === '-'){
        subtract();
    } else if(operator === '*'){
        multiply();
    } else if(operator === '/'){
        divide();
    }
}
// Get all button elements and the display
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

// Initialize variables for storing values and operator
let currentInput = '';
let operator = '';
let previousInput = '';
let result = '';  // To store the result of the calculations
let isResultDisplayed = false;

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            // Clear display
            currentInput = '';
            previousInput = '';
            operator = '';
            result = '';
            isResultDisplayed = false;
            display.textContent = '0';
        } else if (value === '=') {
            // Perform the final calculation when "=" is pressed
            if (previousInput !== '' && operator !== '' && currentInput !== '') {
                result = calculate(previousInput, currentInput, operator);
                display.textContent = result;
                previousInput = result;
                operator = '';
                currentInput = '';
                isResultDisplayed = true;
            }
        } else if (['+', '-', '×', '÷'].includes(value)) {
            // When an operator is clicked, perform the calculation if there's a previous result
            if (previousInput !== '') {
                result = calculate(previousInput, currentInput, operator);
                display.textContent = result;
                previousInput = result;
                currentInput = '';
            } else {
                // Store the current input as previousInput and wait for the next number
                previousInput = currentInput;
                currentInput = '';
            }
            operator = value;
            display.textContent = previousInput + ' ' + operator; // Show operator with previous number
        } else {
            // Handle numbers and decimal
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else {
                currentInput += value;
            }
            display.textContent = previousInput + ' ' + operator + ' ' + currentInput;  // Show the full expression
        }
    });
});

// Perform the calculation based on the operator
function calculate(a, b, operator) {
    let result;
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '×':
            result = num1 * num2;
            break;
        case '÷':
            result = num1 / num2;
            break;
        default:
            return;
    }

    return result.toString();
}


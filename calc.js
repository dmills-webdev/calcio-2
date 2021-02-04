// Main calculation stack that operators(plus, divide, etc..) and operands(2, 9, etc...) are added to before a calculation is performed on them.
let stack = []

// Add operator/operand onto the stack and update display.
function addToStack(x) {
  stack.push(x)
  updateDisplay()
}

// Clear stack entirely and update display.
function clearStack() {
  stack.length = 0
  updateDisplay()
}

// Remove last keystroke from stack and update display.
function backspace() {
  stack.pop()
  updateDisplay()
}

// Attempt to perform calculation on stack, reducing it to a single value and update the display.
function calculate() {
  stack = stack.join('').split(/([+\-*\/])/)

  // Operators in order of operations.
  let operators = ['*','/','+','-']

  // Arrow functions for each of the 4 arithmatic calculations.
  const operations = {
    '*' : (a,b) => a*b,
    '/' : (a,b) => a/b,
    '+' : (a,b) => a+b,
    '-' : (a,b) => a-b,
  }

  while (stack.length>1) { // Calculation is finished when length is reduced to one.
    while (stack.includes(operators[0])) { // Perform calculations progressively, in line with order of operations.
      let i = stack.indexOf(operators[0]) // Index of operator.
      let result = Number(operations[operators[0]](+stack[i-1],+stack[i+1]).toFixed(10)) // Result of subcalculation. toFixed to trim floating point decimal oddities. Number to clear trailing zeros.
      stack.splice(i-1, 3, result) // Reduce 2 operands and 1 operator, leaving result of the subcalculation.
    }
    operators.shift() // Move onto next operator once all operations needed with current operator have been handled.
  }

  updateDisplay()
}

// Update the calculator visual display with a presentable version of the current stack.
function updateDisplay() {
  document.getElementById('display').textContent = stack.join('').replace(/\*/g, 'x')
}

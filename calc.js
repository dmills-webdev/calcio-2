// Main calculation stack that operators(plus, divide, etc..) and operands(2, 9, etc...) are added to before a calculation is performed on them.
let stack = []
let virtualStack = []

// Add operator/operand onto the stack and update display.
function addToStack(x) {
  if (virtualStack.length>0) clearVirtualStack()
  stack.push(x)
  updateDisplay()
}

// Clear stack entirely and update display.
function clearStack() {
  stack.length = 0
  updateDisplay()
}

// Clears virtual stack entirely.
function clearVirtualStack() {
  virtualStack.length = 0
}

// Remove last keystroke from stack and update display.
function backspace() {
  stack.pop()
  updateDisplay()
}

// Attempt to perform calculation on stack, reducing it to a single value and update the display.
function calculate() {
  // Double press of equals sets stack value to result of calculation
  if (virtualStack.length>0) {
    stack = [...virtualStack]
    clearVirtualStack()
    return
  }
  virtualStack = stack.join('').split(/([+\-*\/])/) // Split virtualStack on operands.

  let operators = ['*','/','+','-'] // Operators in order of operations.
  const operations = { // Arrow functions for each of the 4 arithmatic calculations.
    '*' : (a,b) => a*b,
    '/' : (a,b) => a/b,
    '+' : (a,b) => a+b,
    '-' : (a,b) => a-b,
  }
  while (virtualStack.length>1) { // Calculation is finished when length is reduced to one.
    while (virtualStack.includes(operators[0])) { // Perform calculations progressively, in line with order of operations.
      let i = virtualStack.indexOf(operators[0]) // Index of operator.
      let result = Number(operations[operators[0]](+virtualStack[i-1],+virtualStack[i+1]).toFixed(10)) // Result of subcalculation. toFixed to address floating point decimal oddities. Number to clear trailing zeros.
      virtualStack.splice(i-1, 3, result) // Reduce 2 operands and 1 operator, leaving result of the subcalculation.
    }
    operators.shift() // Move onto next operator once all operations needed with current operator have been handled.
  }

  updateDisplay(virtualStack)
}

// Update the calculator visual display with a presentable version of the current stack.
function updateDisplay(supplied) {
  document.getElementById('display').textContent = supplied || stack.join('').replace(/\*/g, 'x') // Replace * with x for readability.
}

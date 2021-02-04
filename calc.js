// Main calculation operator and operand stack
let stack = []

function addToStack(x) {
  stack.push(x)
  updateDisplay()
}

function clearStack() {
  stack.length = 0
  updateDisplay()
}

function updateDisplay() {
  document.getElementById('display').textContent = stack.join('').replace(/\*/g, 'x')
}



function calculate() {
  stack = stack.join('').split(/([+\-*\/])/)

  while (stack.includes('*')) {
    let i = stack.indexOf('*')
    stack.splice(i-1, 3, +stack[i-1] * +stack[i+1])
  }
  while (stack.includes('/')) {
    let i = stack.indexOf('/')
    stack.splice(i-1, 3, +stack[i-1] / +stack[i+1])
  }
  while (stack.includes('+')) {
    let i = stack.indexOf('+')
    stack.splice(i-1, 3, +stack[i-1] + +stack[i+1])
  }
  while (stack.includes('-')) {
    let i = stack.indexOf('-')
    stack.splice(i-1, 3, +stack[i-1] - +stack[i+1])
  }

  console.log(stack)
  updateDisplay()
}

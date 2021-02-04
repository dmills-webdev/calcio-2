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

function backspace() {
  stack.pop()
  updateDisplay()
}

function calculate() {
  stack = stack.join('').split(/([+\-*\/])/)

  let operators = ['*','/','+','-']
  const operations = {
    '*' : (a,b) => a*b,
    '/' : (a,b) => a/b,
    '+' : (a,b) => a+b,
    '-' : (a,b) => a-b,
  }

  while (stack.length>1) {
    while (stack.includes(operators[0])) {
      let i = stack.indexOf(operators[0])
      let sum = Number(operations[operators[0]](+stack[i-1],+stack[i+1]).toFixed(10))
      stack.splice(i-1, 3, sum)
    }
    operators.shift()
  }

  updateDisplay()
}

function updateDisplay() {
  document.getElementById('display').textContent = stack.join('').replace(/\*/g, 'x')
}

// Global variables

let oaoStack = []; // Initialises Operator and Operand stack
let n = 1;
    x = 0;

// MAIN FUNCTION

function operate() { // Performs full calculation on oao stack, BIDMAS order of operations followed
  clearLeadingOperator()
  joinNumbers();
  negativeHandling();
  plusHandling();
  leadingMinus();

  let i = 1;

  for  (i = 1; i<=oaoStack.length; i++) {
    if (oaoStack[i] == "/") {
      divide(i);
      i -= 1;
    }
  }

  for  (i = 1; i<=oaoStack.length; i++) {
    if (oaoStack[i] == "x") {
      multiply(i);
      i -= 1;
    }
  }

  for  (i = 1; i<=oaoStack.length; i++) {
    if (oaoStack[i] == "+") {
      add(i);
      i -= 1;
    }
  }

  for  (i = 1; i<=oaoStack.length; i++) {
    if (oaoStack[i] == "-") {
      subtract(i);
      i -= 1;
    }
  }
}

// Main 4 arithmatic operators

function divide(index) { // Find number before and after add in OaO array and divide first by last and shrink array 3to1
  if (oaoStack[index+1]==0) { // Checks if user is diving my something other than zero
    clearStack();
    oaoStack[0] = "Impossible!";
    updateDisplay(1);
    oaoStack.splice(0, oaoStack.length);
  }
  else {
    let answer = oaoStack[index-1] / oaoStack[index+1];
    oaoStack[index+1] = answer;
    oaoStack.splice((index-1), 2);
    updateDisplay(1);
  }
}

function multiply(index) { // Find number before and after add in OaO array and multiply them and shrink array 3to1
  let answer = oaoStack[index-1] * oaoStack[index+1];
  oaoStack[index+1] = answer;
  oaoStack.splice((index-1), 2);
  updateDisplay(1);
}

function add(index) { // Find number before and after add in OaO array and add them and shrink array 3to1
  let answer = oaoStack[index-1] + oaoStack[index+1];
  oaoStack[index-1] = answer;
  oaoStack.splice((index), 2);
  updateDisplay(1);
}

function subtract(index) { // Find number before and after add in OaO array and subtract them and shrink array 3to1
  let answer = oaoStack[index-1] - oaoStack[index+1];
  oaoStack[index+1] = answer;
  oaoStack.splice((index-1), 2);
  updateDisplay(1);
}


// Other calculation operators

function addToStack(buttonInput) { // Add value of button pressed into the OaO array
  oaoStack[oaoStack.length] = buttonInput;
  updateDisplay(oaoStack.length);
}

function joinNumbers() { // Join together concurrent digits in oaoStack to form actual number
  let sum = "";
  let digitCount = 0;
  let numCheck = /[0-9]/;
  let z = oaoStack.length;

  for (x==0; x<=z; x++) {
    z = oaoStack.length;

    if (numCheck.test(oaoStack[x]) || oaoStack[x] == ".") { // Check if a numerical digit or decimal point
      sum += oaoStack[x].toString();
      digitCount += 1;
    }
    else {
      if (digitCount>1) { // If a numerical operator then finalise the digits into a multiple digit number and continues
        oaoStack[x-1] = parseFloat(sum);
        oaoStack.splice((x-digitCount), digitCount-1);
        x = x - (digitCount-1); // Adjusts stepper for how many digits have been combined when comparing to array length
    }
    sum = ""; // Reset sum and digit counter
    digitCount = 0;
   }
  }
  x = 0; // Reset stepper
}

function clearStack() { // Clears display and current OaO stack
  oaoStack.splice(0, oaoStack.length);
  updateDisplay(1);
}

function backspace() { // Removes previous number key or operator entry from display and oao stack
  oaoStack.splice((oaoStack.length-1), 2 );
  updateDisplay(1);
}

function clearLeadingOperator() { // Removes erroneous or non viable operators from the start of a calculation
  let reg = /[x+\/]/; // Excludes minus operator
  while (reg.test(oaoStack[0])) {
    oaoStack.shift();
  }
}

function leadingMinus() { // Ensures negative numbers at start of calculation are properly stored in oao stack
  if (oaoStack[0] == "-") {
    oaoStack[1] = (oaoStack[1] * -1);
    oaoStack.shift();
  }
}

function negativeHandling() {
  let z = oaoStack.length - 1;
  let reg = /[x+-\/]/;

  for (z = oaoStack.length - 2; z > 0; z--) {
    if (reg.test(oaoStack[z-1]) && (oaoStack[z] == "-") && (!isNaN(oaoStack[z+1]))) {
      oaoStack[z+1] = (oaoStack[z+1] * -1);
      oaoStack.splice(z, 1);
      z = oaoStack.length - 1;
    }
  }
}

function plusHandling() {
  let z = oaoStack.length - 1;
  let reg = /[x+-\/]/;

  for (z = oaoStack.length - 2; z > 0; z--) {
    if (reg.test(oaoStack[z-1]) && (oaoStack[z] == "+") && (!isNaN(oaoStack[z+1]))) {
      oaoStack[z+1] = (oaoStack[z+1] * 1);
      oaoStack.splice(z, 1);
      z = oaoStack.length - 1;
    }
  }
}

// Display functions

function updateDisplay(isItIntial) { // Called on any calculation update to output current OaO array
  const container = document.querySelector(".display"); // Locating where the out put is going to be on the page
  let child = document.getElementsByClassName("child");
  let i = 0;

  let output = oaoStack.join("");

  if (isItIntial == 0) { // Avoids attempting to remove a DOM element that doesn't exist yet
    displayOutput = document.createElement("p");
    displayOutput.classList.add("child");
    displayOutput.textContent = output;
    container.appendChild(displayOutput);
  }
  else {
    while(child[0]) { // Loop removes the entirity of the previous display output
      child[0].parentNode.removeChild(child[0]);
    }

    displayOutput = document.createElement('p'); // Displays the current output
    displayOutput.textContent = output;
    displayOutput.classList.add("child");
    container.appendChild(displayOutput);
  }
}

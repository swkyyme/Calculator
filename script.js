var calculator = {
    displayValue: "0",
    leftOperand: null,
    currentOperator: null,
    rightOperand: null,
    waitingSecondOperand: false,
    time: null,
    timeout: null
  };

bindKeyPress();
  
function bindKeyPress() {

  var keys = document.querySelector(".calculator-keys");
  keys.addEventListener("click", function(event) {
    var target = event.target;
    var value = target.value;
  
    removeTime(); 

    if (target.classList.contains("clear")){
      handleClear();
    }
    else if (target.classList.contains("clock")){
      handleClock();
    }
    else if (target.classList.contains("zero")){
      handleZero(value);
    }
    else if (target.classList.contains("decimal")){
      handleDecimal(value);
    }
    else if (target.classList.contains("operator")){
      handleOperator(value);
    }
    else if (target.classList.contains("equal")){
      handleEqual();
    }
    else{
      handleDigit(value);
    }

  });
}

function handleClear() {
  calculator.displayValue ="0";

  updateDisplay();
}

function handleDigit(value) {
  var displayValue= calculator.displayValue;

  if (calculator.rightOperand) {
    displayValue = "0";
    calculator.rightOperand = null;
  }

  if (displayValue === "0") {
    calculator.displayValue = value;
  } else {
    calculator.displayValue = displayValue + value;
  }
  
  updateDisplay();
}

function handleDecimal(value) {
  var displayValue = calculator.displayValue;
  if (displayValue.includes(".")) {
    calculator.displayValue = displayValue;
  } else {
    calculator.displayValue = displayValue + value;
  }

  updateDisplay();
}

function handleZero(value) {
  var displayValue = calculator.displayValue;
  
  if (calculator.rightOperand) {
    displayValue = "0";
  }

  if (displayValue.charAt(0)==="0") {
    calculator.displayValue = displayValue;
  } else {
    calculator.displayValue = displayValue + value;
  }

  updateDisplay();
}

function handleOperator(value) {
  if (calculator.waitingSecondOperand) {
    handleEqual();
  }
  calculator.leftOperand = calculator.displayValue;
  calculator.currentOperator = value;
  calculator.waitingSecondOperand = true;
  calculator.displayValue = "0";

}

function handleEqual() {
  if (!calculator.currentOperator) {
    return;
  }
  var result;
  calculator.waitingSecondOperand = false;
  calculator.rightOperand = calculator.displayValue;

  if (calculator.currentOperator === "+") {
    result = parseFloat(calculator.leftOperand) + parseFloat(calculator.rightOperand);   
  }
  else if (calculator.currentOperator === "-") {
    result = parseFloat(calculator.leftOperand) - parseFloat(calculator.rightOperand); 
  }
  else if (calculator.currentOperator === "*") {
    result = parseFloat(calculator.leftOperand) * parseFloat(calculator.rightOperand); 
  }
  else {
    result = parseFloat(calculator.leftOperand) / parseFloat(calculator.rightOperand); 
  }
  
  calculator.displayValue = "" + result;
  calculator.currentOperator = null;

  updateDisplay();
}

function updateDisplay() {
  var screen = document.querySelector(".calculator-screen");
  // console.dir(screen);
  screen.value = calculator.displayValue;
  // screen.setAttribute("value", value);
}

// function handleClock() {
//   calculator.time = new Date().toLocaleString();
//   calculator.displayValue = calculator.time;
//   updateDisplay();

//   calculator.timeout = setTimeout(function(){
//     handleClear();
//   },3000);

// }

function handleClock() {
  calculator.time = new Date().toLocaleString();
  var display = document.querySelector(".calculator-screen");
  display.classList.add("time-screen");

  var screen = document.querySelector(".calculator-screen");
  screen.value = calculator.time;

  calculator.timeout = setTimeout(function(){
    removeTime();
  },3000);
}

function removeTime(){
  clearTimeout(calculator.timeout);
  // calculator.time = "0";
  var display = document.querySelector(".calculator-screen");
  display.classList.remove("time-screen");

  updateDisplay();
  // var screen = document.querySelector(".calculator-screen");
  // screen.value = calculator.time;
}
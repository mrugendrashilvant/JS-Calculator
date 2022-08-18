class Calculator {
  /*
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;    
    this.operation = null;
    this.equalsLast = false;
    this.lastOperation = null;
    this.clear();
  }
  */
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;  
    this.clear();
  }

  /*
  clear() {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = null;
    this.equalsLast = false;
    this.lastOperation = null;
    this.updateDisplay();
  }
  */

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0,-1);
    this.updateDisplay();
  }

  /*
  appendNumber(number) {
    if (this.equalsLast){
      this.clear();
    }
    if (this.currentOperand === "0" || this.operation) {
      this.currentOperand = number.toString();
    } 
    else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    this.operation = null;
  }
  */
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand += number.toString();
  }


  /*
  chooseOperation(operation) {
    this.equalsLast = false;
    this.updateDisplay();
    if (this.operation === operation) {
      return;
    } 
    else if (this.operation) {
      this.operation = operation;
      this.previousOperand = `${this.previousOperand.slice(0, -1)}${this.operation}`;
    } 
    else {
      this.operation = operation;
      this.previousOperand += `${this.currentOperand}${this.operation}`;
    }
    this.updateDisplay();
  }
  */

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !=="") this.compute();
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.updateDisplay();
  }

  /*
  compute() {

    if (this.equalsLast){
      let toCompute = this.previousOperand + this.lastOperation
      this.previousOperand = toCompute + "=";
      let result = eval (toCompute);
      this.currentOperand = result;
      this.updateDisplay();
      this.previousOperand = result;
      this.currentOperand = "";
      this.equalsLast = true
      this.numberAppendedLast = false;
    }
    else {
      let toCompute = this.previousOperand + this.currentOperand;
      this.lastOperation = toCompute.slice(-2);
      let result = eval(toCompute);
      this.previousOperand = this.previousOperand + this.currentOperand + "=";
      this.currentOperand = result;
      this.updateDisplay();
      this.previousOperand = result;
      this.currentOperand = "";
      this.equalsLast = true;
      this.numberAppendedLast = false;
    }

  }
  */

  compute() {
    let result;
    let prev = parseFloat(this.previousOperand);
    let next = parseFloat(this.currentOperand);
    
    if (isNaN(prev) || isNaN(next))return;
    
    switch (this.operation){
      case "+":
        result = prev + next;
        break;
      case "-":
        result = prev - next;
        break;
      case "*":
        result = prev * next;
        break;
      case "÷":
          result = prev / next;
          break;
      default: return;
    }    
    this.previousOperand = "";
    this.currentOperand = result;    
    this.operation = undefined;
    this.updateDisplay();
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)){
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0})
    }
    if (decimalDigits != null){
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    if (this.operation){
      this.previousOperandTextElement.innerText = this.getDisplayNumber(this.previousOperand) + this.operation;
    }
    else {
      this.previousOperandTextElement.innerText = this.getDisplayNumber(this.previousOperand);
    }

    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
})
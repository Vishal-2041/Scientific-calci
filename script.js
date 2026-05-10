const display = document.getElementById("display");

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Factorial Function
function factorial(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;

  let result = 1;

  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}

function calculate() {
  try {

    let expression = display.value;

    // Convert scientific symbols/functions
    expression = expression
      .replace(/sin\(([^)]+)\)/g, (_, num) =>
        `Math.sin((${num}) * Math.PI / 180)`)

      .replace(/cos\(([^)]+)\)/g, (_, num) =>
        `Math.cos((${num}) * Math.PI / 180)`)

      .replace(/tan\(([^)]+)\)/g, (_, num) =>
        `Math.tan((${num}) * Math.PI / 180)`)

      .replace(/log\(/g, "Math.log10(")
      .replace(/ln\(/g, "Math.log(")
      .replace(/√\(/g, "Math.sqrt(")
      .replace(/\^/g, "**")
      .replace(/π/g, "Math.PI")
      .replace(/\be\b/g, "Math.E");

    // Handle factorial
    expression = expression.replace(/(\d+)!/g, (_, num) =>
      factorial(parseInt(num))
    );

    // Evaluate
    let result = eval(expression);

    // Fix floating-point issues
    display.value = parseFloat(result.toFixed(10));

  } catch (error) {
    display.value = "Error";
  }
}

// Keyboard Support
document.addEventListener("keydown", (event) => {

  const key = event.key;

  if (!isNaN(key) || "+-*/().%^".includes(key)) {
    appendValue(key);
  }

  if (key === "Enter") {
    calculate();
  }

  if (key === "Backspace") {
    deleteLast();
  }

  if (key === "Escape") {
    clearDisplay();
  }
});

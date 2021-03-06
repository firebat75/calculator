function add(x,y) {
    return x + y;
};

function subtract(x, y) {
    return x - y;
};

function multiply(x, y) {
    return x * y;
};

function divide(x, y) {
    if (y != 0) {
        return x/y;
    } else {
        return "Don't divide by 0 lol";
    }
    
};

function operate(operator, x, y) {
    if (operator == "+") {
        return add(x, y);
    } else if (operator == "-") {
        return subtract(x, y);
    } else if (operator == "*") {
        return multiply(x, y);
    } else if (operator == "/") {
        return divide(x, y);
    }
};


var display = " "; //What is shown on the calculator display
var decimal = false; // is there a decimal in curr

var curr = ""; // current value being inputted
var inputs = [] // inputs into the calculator (numbers and operators)
var lastcalc = ""; // last equation inputted

const buttons = document.querySelectorAll('.button');
const displayScreen = document.querySelector('.display');
const last = document.querySelector('.prevcalc');
displayScreen.textContent = display;

var displaySize = window.getComputedStyle(displayScreen, null).getPropertyValue('font-size');
var fs = parseFloat(displaySize);



function calculate(arr) {
    var mult = arr.indexOf("*");
    while (mult != -1) {
        arr.splice(mult-1, 3, operate("*", arr[mult-1], arr[mult+1]));
        console.log(arr);
        mult = arr.indexOf("*");
    }

    var div = arr.indexOf("/");
    while (div != -1) {
        if (arr[div+1] == 0) {
            return ["Don't divide by 0 lol"];
        } else {
            arr.splice(div-1, 3, operate("/", arr[div-1], arr[div+1]));
            console.log(arr);
            div = arr.indexOf("/");
        }
    }

    var add = arr.indexOf("+");
    while (add != -1) {
        arr.splice(add-1, 3, operate("+", arr[add-1], arr[add+1]));
        console.log(arr);
        add = arr.indexOf("+");
    }

    var sub = arr.indexOf("-");
    while (sub != -1) {
        arr.splice(sub-1, 3, operate("-", arr[sub-1], arr[sub+1]));
        console.log(arr);
        sub = arr.indexOf("-");
    }
    return arr;
}


buttons.forEach(button => {
    button.addEventListener('click', (e) => {

        if (button.id == "clear") { // C button input
            displayScreen.style.fontSize = '4rem';
            inputs = [];
            display = "";
            curr = "";
            lastcalc = "";


        } else if (button.id == "=") { // equals input

            displayScreen.style.fontSize = '4rem';
            displayScreen.className += ' glow';

            if (curr != "") {
                if (curr == ".") {
                    inputs.push(0);
                } else {
                    inputs.push(parseFloat(curr));
                }
            }

            if ("+-*/".includes(inputs.slice(-1))) {
                inputs = inputs.slice(0, -1);
            }

            lastcalc = display;

            calculation = calculate(inputs);
            display = calculation.toString();
            curr = display;
            inputs = [];


        } else if ("+-*/".includes(button.id)) { // operator inputs
            if (display.length == 0) {
                

            } else if ("+-*/".includes(display.slice(-1))) {
                decimal = false;
                inputs.pop();
                inputs.push(button.id);
                display = display.slice(0, -1);
                display += button.id;
            
            } else {
                if (curr != "") {
                    if (curr == ".") {
                        inputs.push(0);
                        decimal = false;
                        inputs.push(button.id);
                        curr = "";
                        display += button.id;
                    } else {
                        inputs.push(parseFloat(curr));
                        decimal = false;
                        inputs.push(button.id);
                        curr = "";
                        display += button.id;
                    }
                }
            }


        } else if (button.id == "back") { // backspace button
            if (display.length > 0) {

                if (curr.length > 0 && inputs == []) {
                    if (display.slice(-1) == ".") {
                        decimal = false;
                    }
                    curr = curr.slice(0, -1);
                    display = display.slice(0, -1);
                } else if (display.slice(-1) == inputs.slice(-1).toString().slice(-1)) {
                    dig = inputs.pop().toString();
                    if (dig.slice(-1) == ".") {
                        decimal = false;
                    }
                    display = display.slice(0, -1);
                    if (dig.length > 1) {
                        inputs.push(parseFloat(dig.slice(0, -1)));
                    }
                } else {
                    if (display.slice(-1) == ".") {
                        decimal = false;
                    }
                    display = display.slice(0, -1);
                    curr = curr.slice(0, -1);
                }

            }
      

        } else if (button.id == ".") { // decimal input
            if (!decimal) {
                curr += ".";
                display += ".";
            }
            decimal = true;


        } else { // regular numbers inputs
            curr += button.id;
            display += button.id;

        }    

        last.textContent = lastcalc;
        displayScreen.textContent = display;
        if (curr == "Don't divide by 0 lol") {
            curr = "";
            display = "";
            inputs = [];
        }


        if (displayScreen.clientWidth > 468) {
            displayScreen.style.fontSize = `${920/display.length}px`;
        }

        if (last.clientWidth > 468) {
            last.style.fontSize = `${920/lastcalc.length}px`;
        }
    });
});

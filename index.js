"use strict";
var values = [];
var opperations = [];
var buildingNumber = '';
var equationString = '';
var hasSolved = false;
function updateInputValue(num) {
    const curVal = document.getElementById('current-value');
    if (curVal !== null) {
        if (typeof num === 'number') {
            curVal.innerHTML = String(num);
        }
        else {
            curVal.innerHTML = num;
        }
    }
}
function updateEquationValue(equation) {
    const equationElement = document.getElementById("current-equation");
    if (equationElement !== null) {
        equationElement.innerHTML = equation;
    }
}
function resetEquationValue() {
    equationString = ''; //reset equation string for display
    //set display to empty string
    const equationElement = document.getElementById("current-equation");
    if (equationElement !== null) {
        equationElement.innerHTML = '';
    }
}
function buildNumber(val) {
    if (hasSolved === true) {
        resetEquationValue();
        hasSolved = false;
    }
    buildingNumber += val.toString();
    updateInputValue(buildingNumber);
}
function addOpperand(val) {
    opperations.push(val);
    values.push(parseInt(buildingNumber));
    equationString += (buildingNumber + " " + val + " ");
    buildingNumber = '';
    updateEquationValue(equationString);
}
function solveStep(index) {
    let answer;
    //retrieve values from the arrays
    let operation = opperations[index];
    let vals = [values[index], values[index + 1] || 1];
    //remove the values from the arrays
    opperations.splice(index, 1);
    values.splice(index, 2);
    console.log(values, "values after splice of two values...");
    switch (operation) {
        case ('/'):
            answer = vals[0] / vals[1];
            break;
        case ('*'):
            answer = vals[0] * vals[1];
            break;
        case ('-'):
            answer = vals[0] - vals[1];
            break;
        case ('+'):
            answer = vals[0] + vals[1];
            break;
        default:
            console.error("unknown case of operation occured", operation);
    }
    values.splice(index, 0, answer);
    console.log(values, "?");
}
function calculateValues() {
    values.push(parseInt(buildingNumber));
    equationString += (buildingNumber);
    buildingNumber = '';
    updateEquationValue(equationString);
    let calculationValue = 0;
    let opLength = opperations.length;
    if (values.length > 1) {
        for (let i = 0; i < opLength; i++) {
            //check for division or multiplication operations
            const divFound = opperations.findIndex(op => op === "/");
            const multFound = opperations.findIndex(op => op === "*");
            if (divFound !== -1 && multFound !== -1) {
                //if both operations are found, check which one occurs first in the problem to account for PEMDAS left to right rule.
                if (divFound < multFound) {
                    //if division appears before the multiplication in the equation, solve the division problem first.
                    solveStep(divFound);
                }
                else {
                    //else, mult found before division; solve mult equation.
                    solveStep(multFound);
                }
            }
            else if (multFound === -1 && divFound !== -1) {
                //if div found, but no mult, solve div
                solveStep(divFound);
            }
            else if (divFound === -1 && multFound !== -1) {
                //if mult found, but no div, solve mult
                solveStep(multFound);
            }
            else {
                //move left to right for subtraction / addition
                const subFound = opperations.findIndex(op => op === "-");
                const addFound = opperations.findIndex(op => op === "+");
                if (subFound !== -1 && addFound !== -1) {
                    //if both operations are found, check which one occurs first in the problem to account for PEMDAS left to right rule.
                    if (addFound < subFound) {
                        //if add appears before the sub in the equation, solve the add problem first.
                        solveStep(addFound);
                    }
                    else {
                        //else, sub found before add; solve sub equation.
                        solveStep(subFound);
                    }
                }
                else if (addFound === -1 && subFound !== -1) {
                    //if sub found, but no add, solve sub
                    solveStep(subFound);
                }
                else if (subFound === -1 && addFound !== -1) {
                    //if add found, but no sub, solve add
                    solveStep(addFound);
                }
            }
        }
        calculationValue = (values[0]);
    }
    // let calculationValue: number = values[0];
    // if (values.length > 1) {
    //     for (let i = 1; i < values.length; i++) {
    //         switch(opperations[i - 1]){
    //             case "+":
    //                 console.log("+");
    //                 console.log(calculationValue, values[i]);
    //                 calculationValue += values[i];
    //                 console.log(calculationValue, "AFTER ADDING");
    //                 break;
    //             case "-":
    //                 console.log("-");
    //                 console.log(calculationValue, values[i]);
    //                 calculationValue -= values[i];
    //                 console.log(calculationValue, "AFTER ADDING");
    //                 break;
    //             case "*":
    //                 console.log("*");
    //                 console.log(calculationValue, values[i]);
    //                 calculationValue = calculationValue * values[i];
    //                 console.log(calculationValue, "AFTER ADDING");
    //                 break;
    //             case "/":
    //                 console.log("/");
    //                 console.log(calculationValue, values[i]);
    //                 calculationValue = calculationValue / values[i];
    //                 break;
    //             default:
    //                 console.log("oof");
    //                 break;
    //         }
    //     }
    // } else if (values.length === 1){
    //     console.log(values[0], "length is 1");
    // } else {
    //     console.log("ERR")
    // }
    values = [];
    opperations = [];
    hasSolved = true;
    updateInputValue(calculationValue);
}

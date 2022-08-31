var values: Array<number> = [];
var opperations: Array<string> = [];
var buildingNumber: string = '';
var equationString: string = '';

function updateInputValue(num: string | number) {
    const curVal = document.getElementById('current-value');
    if (curVal !== null){
        if (typeof num === 'number'){
            curVal.innerHTML = String(num);
        } else {
            curVal.innerHTML = num;
        }
    }
}

function updateEquationValue(equation: string) {
    const equationElement = document.getElementById("current-equation");
    if (equationElement !== null){
        equationElement.innerHTML = equation;
    }
}

function buildNumber(val: number) {
    buildingNumber += val.toString();
    updateInputValue(buildingNumber);
}

function addOpperand(val: string) {
    opperations.push(val)
    values.push(parseInt(buildingNumber));
    equationString += (buildingNumber + " " + val + " ")
    buildingNumber = '';

    updateEquationValue(equationString);
}

function calculateValues() {
    values.push(parseInt(buildingNumber));
    equationString += (buildingNumber)
    buildingNumber = '';
    updateEquationValue(equationString);

    let calculationValue: number = values[0];
    if (values.length > 1) {
        for (let i = 1; i < values.length; i++) {
            switch(opperations[i - 1]){
                case "+":
                    console.log("+");
                    console.log(calculationValue, values[i]);
                    calculationValue += values[i];
                    console.log(calculationValue, "AFTER ADDING");
                    break;
                case "-":
                    console.log("-");
                    console.log(calculationValue, values[i]);
                    calculationValue -= values[i];
                    console.log(calculationValue, "AFTER ADDING");
                    break;
                case "*":
                    console.log("*");
                    console.log(calculationValue, values[i]);
                    calculationValue = calculationValue * values[i];
                    console.log(calculationValue, "AFTER ADDING");
                    break;
                case "/":
                    console.log("/");
                    console.log(calculationValue, values[i]);
                    calculationValue = calculationValue / values[i];
                    break;
                default:
                    console.log("oof");
                    break;
            }
        }
    } else if (values.length === 1){
        console.log(values[0], "length is 1");
    } else {
        console.log("ERR")
    }

    values = [];
    opperations = [];

    updateInputValue(calculationValue);
}
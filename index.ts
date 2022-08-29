var values: Array<number> = [];
var opperations: Array<string> = [];
var buildingNumber: string = '';

function buildNumber(val: number) {
    buildingNumber += val.toString();
}

function addOpperand(val: string) {
    opperations.push(val)
    values.push(parseInt(buildingNumber));
    buildingNumber = '';
}

function calculateValues() {
    console.log(values, "Values")
    values.push(parseInt(buildingNumber));
    buildingNumber = '';


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

    console.log(calculationValue);
}

let equation = {
    0 : 0,
    1 : 0,
    2 : 0,
    flag : 0,
    pow : 0
};

initValidation();

function initValidation() {
    if (process.argv.length != 3 || process.argv[2].length == 0) {
        return errors(0);
    }
    // console.log(process.argv);
    const equation = process.argv[2];
    // console.log('\'' + equation + '\'');

    // console.log(equatValid(equation));

    if (equatValid(equation) < 0) {
        return errors(1);
    }


    console.log('equat ', equation);
    const rightPart = (equation.split("="))[0];
    const leftPart = equation.split("=")[1];
    console.log('rightPart ', rightPart);
    console.log('leftPart ', leftPart);
    // console.log(rightPart.split('^'));
    if (checkParams(rightPart) < 0)
        return (-1);

}

function equatValid(equat) {
    let re = /[0-9X*+^=. -]+$/;
    let res = equat.search(re);

    console.log(res);
    return (res >= 0 && equat.includes('=')) ? 1 : -1
}

function numberValid(equat) {
    let re = /^[\d.]+$/;
    let res = equat.search(re);

    console.log(equat);
    console.log(res);
    return (res >= 0) ? 1 : -1
}

function checkParams(part) {
    let koef = 0;
    let equat = part.split(' ');
    console.log(equat);
    if (checkFirstParam(equat[0]) < 0)
        return errors(1);
    for (let i = 0; i < equat.length; i++) {
        let equat1 = equat[i];
        console.log("equat1 " + equat1 + " , i: " + i );

        if (equat1 == '*' && i <= equat.length - 1 && i != 0) {
            if ((koef = (numberValid(equat[i - 1]))) == -1){
                return errors(1);
            } else
                koef = equat[i - 1];
            if (checkAndGetPow(equat[i + 1], koef) < 0) {
                return errors(2, equation.pow);
            }
            // if (checkFirstParam([i - 1]))
        }

    }

}

function checkFirstParam(equat1) {
    return (equat1.includes('*') || equat1.includes('+') ||
        equat1.includes('-')) ? -1 : 1;
}

function checkAndGetPow(equat1, koef) {
    console.log('\n\n' + equat1);
    let pow = equat1.slice(equat1.indexOf('^') + 1, equat1.length);
    equation.pow = (pow > equation.pow) ? pow : equation.pow;
    // if (pow > 2 || pow < 0) {
    //     console.log(pow + " : pow is not good")
    //     return (-1);
    // } else {
        // if (pow == 0) {
        console.log(koef);
        equation[pow] += +koef;
        console.log(equation);

    // }
    console.log('pow: ' + pow);

    return (1);
}

function reducedForm() {

}

function errors(i, j) {
    if (i == 0)
        console.log("Check please your arguments!\n");
    else if (i == 1)
        console.log("Syntax Error!\n");
    else if (i == 2)
        console.log("Polynomial degree: " + j +
            "\nThe polynomial degree iThe polynomial degree is stricly greater than 2, I can't solve.\n");

    return (-1);
}



// equation["3"]


//
// const tmp = () => {return null};
// tmp();
// function tmp2() {
//     return null;
// }
// tmp2();
//
// (() => {
//     return null;
// })();


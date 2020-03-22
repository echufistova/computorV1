
let equation = {
    flag : 0,
    pows : {
    },
    x : {

    }
};

initValidation();

function initValidation() {
    if (process.argv.length != 3 || process.argv[2].length == 0) {
        return errors(0);
    }
    // console.log(process.argv[2]);
    const equat = process.argv[2];
    let res;
    if (equatValid(equat) < 0) {
        return errors(1);
    }

    // console.log('equat ', equat);
    // const rightPart = (equat.split("="))[0];
    // const leftPart = equat.split("=")[1];
    // console.log('rightPart ', rightPart);
    // console.log('leftPart ', leftPart);
    // console.log(rightPart.split('^'));
    if (checkParams(equat) < 0 || reducedForm(equat) < 0)
        return (-1);
    let a = (equation.pows[2]) ? equation.pows[2] : 0;
    let b = (equation.pows[1]) ? equation.pows[1] : 0;
    let c = (equation.pows[0]) ? equation.pows[0] : 0;
    let discrim = b * b - 4 * a * c;
    (discrim === 0 || (a === 0 && discrim >= 0)) ? console.log("The solution is: ") :
        console.log("Discriminant is strictly positive, the two solutions are: ");
    // if ( getRoots(a, b, c, discrim);
    if ((res = getRoots(a, b, c, discrim)) < 0) {
        return (-1);
    } else if (res === 1) {
        console.log(equation.x[0]);
    } else {
        console.log(equation.x[0]);
        console.log(equation.x[1]);
    }

}

function equatValid(equat) {
    // console.log('equat ', equat);
    let re = /[0-9X*+^=. -]+$/;
    let res = equat.search(re);

    // console.log(res);
    return (res >= 0 && equat.includes('=')) ? 1 : -1
}

function numberValid(equat) {
    let re = /^[\d.]+$/;
    let res = equat.search(re);

    // console.log(equat);
    // console.log(res)ты ;
    return (res >= 0) ? 1 : -1
}

function checkParams(part) {
    let koef = 0;
    let equat = part.split(' ');
    // console.log(equat);
    if (checkFirstParam(equat[0]) < 0) {
        console.log("here1");
        return errors(1);
    }
    for (let i = 0; i < equat.length; i++) {
        let equat1 = equat[i];
        // console.log("equat1 " + equat1 + " , i: " + i );
        if (equat1 === '=') {
            equation.flag = 1;
        }
        else if (equat1 === '*' && i <= equat.length - 1 && i !== 0) {
            if ((koef = (numberValid(equat[i - 1]))) === -1){
                console.log("here1");
                return errors(1);
            } else
                koef = equat[i - 1];
            if (i <= equat.length -2 && getPow(equat[i + 1], equat[i -2], koef) < 0) {
                console.log("here2");
                return errors(2, equation.pow);
            }
        }
    }
    return (1);

}

function checkFirstParam(equat1) {
    // console.log(equat1);
    return (equat1.includes('*') || equat1.includes('+')) ? -1 : 1;
}

function getPow(equat1, sign, koef) {
    koef = +koef;
    // console.log('\n\nequat: ' + equat1);
    let pow = equat1.slice(equat1.indexOf('^') + 1, equat1.length);
    // console.log("koef: " + koef);
    // console.log("sign: " + sign);
    if (!equation.pows[pow]) {
        equation.pows[pow] = 0;
    }
    if (sign === '-') {
        koef = -koef;
    }
    (equation.flag === 0) ? equation.pows[pow] += koef : equation.pows[pow] -= koef;
    // console.log(equation);
    return (1);
}

function reducedForm() {
    let res = "Reduced Form: ";
    Object.keys(equation.pows).map((key, index) => {
        // console.log(index);
        const sign = equation.pows[key] >= 0 ? '+' : '-';
        if (index === 0 && sign === '+') {
            res += `${equation.pows[key]} * X^${key} `
        } else {
            res += `${sign} ${Math.abs(equation.pows[key])} * X^${key} `
        }
    });
    res += "= 0";
    console.log(res);
    return (checkPows());
}

function checkPows() {
    let max = 0;
    let res = "Polynomial degree: ";
    Object.keys(equation.pows).map((pow) => {
        max = pow;
        // console.log("pow  " + max);
    });
    res += max;
    console.log(res);
    return ((max > 2) ? errors(2, max) : 1);
}

function getRoots(a, b, c,discrim) {
    // let a = (equation.pows[2]) ? equation.pows[2] : 0;
    // console.log("a: ", a);
    // let b = (equation.pows[1]) ? equation.pows[1] : 0;
    // console.log("b: ", b);
    // let c = (equation.pows[0]) ? equation.pows[0] : 0;
    // console.log("c: ", c);
    // let discrim = b * b - 4 * a * c;
    // console.log(discrim);
    if (discrim < 0) {
        return (errors(3));
    } else {
        if (a === 0 ){
            equation.x[0] = (-c / b);
            return (1);
            // console.log(x);
        } else if (discrim === 0) {
            equation.x[0] = -b / (2 * a);
            return (1);
        } else {
            equation.x[0] = ((-b + Math.pow(discrim, 0.5)) / (2 * a));
            equation.x[1] = ((-b - Math.pow(discrim, 0.5)) / (2 * a));
            return (2);
        }
    }
}


function errors(i) {
    if (i == 0) {
        console.log("Check please your arguments!\n");
    }
    else if (i == 1) {
        console.log("Syntax Error!\n");
    }
    else if (i == 2) {
        console.log("The polynomial degree is stricly greater than 2, I can't solve.");
    }
    else if (i == 3) {
        console.log("Discriminant is strictly negative!");
    }
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


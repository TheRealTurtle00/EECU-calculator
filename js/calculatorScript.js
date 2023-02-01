// -------------------------------------------------Gathering form data starts here
const form = document.getElementById('form');
const formData = new formData(form);

const output = document.getElementById('output');

for (const [key,value] of formData){
    output.textContent += `${key}: ${value}\n`
}
// -------------------------------------------------Gathering form data ends here
const data = require('./EECU-data.js').data;


let GA = 1200;
let GM = GA/12;


function deductionsFromGross(input){
    // ----------------------------------------TODO: MAKE SURE TO GRAB INPUTS FROM WEBSITE----------------------------------------
    let FT = input * 0.12;
    let ST = input * 0.07;
    let SS = input * 0.062;
    let MC = input * 0.0145;
    let SD = input * 0.01;
    let RI = input * 0.05;
    let MI = input * 0.05;
    let TotalDeductions = input - FT - ST - SS - MC - SD - RI - MI;
    return(TotalDeductions);
}

console.log (deductionsFromGross(GM));
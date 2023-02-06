const data = [
    [ 'Accountant', 55650 ],
    [ 'Advance Tractor/Trailer Driver', 53550 ],
    [ 'Agricultural Engineer', 56700 ],
    [ 'Architect', 53550 ],
    [ 'Auto Tech/Mechanic', 49350 ],
    [ 'Aviation Tech. Mechanic', 50400 ],
    [ 'Biologist', 54600 ],
    [ 'Bus Driver', 37800 ],
    [ 'Business Development Officer', 54600 ],
    [ 'Business Manager Hotel etc.', 61950 ],
    [ 'CNC Manufacturing', 80850 ],
    [ 'Carpenter', 47250 ],
    [ 'Chef', 52500 ],
    [ 'Chemist', 56700 ],
    [ 'Civil Engineering Technician', 68250 ],
    [ 'Commercial Driver', 51450 ],
    [ 'ComputerTechnician', 46200 ],
    [ 'Conserv./Environ. Science', 72450 ],
    [ 'Correctional Officer', 48300 ],
    [ 'Cosmetologist', 36750 ],
    [ 'Credit Union/Bank Manager', 61950 ],
    [ 'Daycare Director', 37800 ],
    [ 'Dentist', 115500 ],
    [ 'Detective', 60900 ],
    [ 'Diesel Tech/Mechanic', 55650 ],
    [ 'Doctor/Physician', 147000 ],
    [ 'Electrician', 54600 ],
    [ 'Electronic Engineer', 75600 ],
    [ 'EMT', 34650 ],
    [ 'Energy Management PG&E', 106050 ],
    [ 'Engineer', 72450 ],
    [ 'Fashion Designer', 63000 ],
    [ 'Fire Fighter', 49350 ],
    [ 'Forest Ranger', 52500 ],
    [ 'Graphic/Media Designer', 58800 ],
    [ 'H/C HVAC', 63000 ],
    [ 'Highway Patrol', 84000 ],
    [ 'Home Inspector', 56700 ],
    [ 'Industrial Mechanic', 46200 ],
    [ 'Interior Designer', 49350 ],
    [ 'Investment Analyst', 66150 ],
    [ 'Lab Technician', 42000 ],
    [ 'Landscaper Horticulture', 48300 ],
    [ 'Lawyer', 86100 ],
    [ 'Marketing/Sales Manager', 58800 ],
    [ 'Media/Communications', 45150 ],
    [ 'Medical RepairTech.', 52500 ],
    [ 'Military', 55650 ],
    [ 'Nuse', 66150 ],
    [ 'Nutitionist', 45150 ],
    [ 'Oceanographer', 69300 ],
    [ 'Pastor', 50400 ],
    [ 'PGBEATT Technician', 78750 ],
    [ 'Pharmacist', 105000 ],
    [ 'Photographer', 45150 ],
    [ 'Physical Therapist', 72450 ],
    [ 'Pilot Commercial', 78750 ],
    [ 'Plumber', 52500 ],
    [ 'Police Officer', 53550 ],
    [ 'Principal', 93450 ],
    [ 'Probation Officer', 44100 ],
    [ 'Psychologist', 77700 ],
    [ 'Retail Sales Associate', 34650 ],
    [ 'Social Worker', 50400 ],
    [ 'Solar Energy Tech.', 53550 ],
    [ 'Teacher', 52500 ],
    [ 'UPS/Fed Ex Driver', 68250 ],
    [ 'Veterinarian', 82950 ],
    [ 'Welder/Metal Specialist', 47250 ],
    [ 'Wind Energy Technician', 56700 ]
]

// -------------------------------------------------The janky autofill salary starts here

let datalist = document.getElementById('Careers');
let salary = document.getElementById("Salary");

for(job of data){
    let element = document.createElement('option');
    element.value = job[1];
    element.innerText= job[0];

    datalist.appendChild(element);
}

function populateSalary(value){
    salary.value = value;
    // console.log(value);
}

datalist.addEventListener('change', (e) => populateSalary(e.target.value));

// -------------------------------------------------The janky autofill salary ends here



// -------------------------------------------------The deduction calculations start here
document.getElementById("FT").value = 12;
document.getElementById("ST").value = 7;
document.getElementById("SS").value = 6.2;
document.getElementById("MC").value = 1.45;
document.getElementById("SD").value = 1;
document.getElementById("RI").value = 5;
document.getElementById("MI").value = 180;

let GM;
let FT;
let ST;
let SS;
let MC;
let SD;
let RI;
let MI;
let TotalDeductions = 0;

let netMonthly;

function findNetMonthly(gross, deductions){
    netMonthly = (parseFloat(gross) - parseFloat(deductions)).toFixed(2);
    document.getElementById("netMonthly").value = netMonthly;
    console.log(netMonthly);
    return netMonthly;
}

function runGross(grossAnnual){
    GM = (parseFloat(grossAnnual)/12).toFixed(3);
    document.getElementById("grossMonthly").value = GM;
    return GM;
}

function runDeductions(){
    runGross(salary.value);
    FT = (GM * parseFloat(document.getElementById("FT").value)/100).toFixed(2);
    // console.log(FT);
    ST = (GM * parseFloat(document.getElementById("ST").value)/100).toFixed(2);
    // console.log(ST);
    SS = (GM * parseFloat(document.getElementById("SS").value)/100).toFixed(2);
    // console.log(SS);
    MC = (GM * parseFloat(document.getElementById("MC").value)/100).toFixed(2);
    // console.log(MC);
    SD = (GM * parseFloat(document.getElementById("SD").value)/100).toFixed(2);
    // console.log(SD);
    RI = (GM * parseFloat(document.getElementById("RI").value)/100).toFixed(2);
    // console.log(RI);
    MI = parseFloat(document.getElementById("MI").value);
    // console.log(MI);
    TotalDeductions = parseFloat(FT) + parseFloat(ST) + parseFloat(SS) + parseFloat(MC) + parseFloat(SD) + parseFloat(RI) + parseFloat(MI);
    findNetMonthly(GM,TotalDeductions);
    return TotalDeductions.toFixed(2);
}
runDeductions();

function populateDeduction(deduciton){
    document.getElementById("TD").value = deduciton;
}


datalist.addEventListener('change', (e)=> populateDeduction(runDeductions(e)));
salary.addEventListener('change', (e)=> populateDeduction(runDeductions(e)));
// -------------------------------------------------The deduction calculations ends here
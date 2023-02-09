
const JobPayList = [
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
    [ 'Blectrician', 54600 ],
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
    [ 'lawyer', 86100 ],
    [ 'Marketing/Sales Manager', 58800 ],
    [ 'Media/Communications', 45150 ],
    [ 'Medical RepairTech.', 52500 ],
    [ 'Military', 55650 ],
    [ 'Nurse', 66150 ],
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
    [ 'Wind EnergyTechnician', 56700 ]
]

let JobList = document.getElementById('JobList');
for(job of JobPayList){
//    console.log(`Name:${job[0]} Salary:${job[1]}`); 
    let option = document.createElement('option');
    option.value = job[0];
    option.innerText=job[0]
    option.setAttribute('data--salary', job[1]);

    JobList.appendChild(option);
}

/*
let buttons = document.getElementById('buttons');
for(job of JobPayList){
    let section = document.createElement('section');
    let button = document.createElement('button');
    let par = document.createElement('p');
    button.innerText = job[0];
    par.innerText=job[1]
    section.append(button);
    section.append(par);

    buttons.appendChild(section);
}*/

const PlaningPeriods=[["1 year",1],["6 months",2],["3 months",4],["1 month",12],["2 weeks",365/14],["1 week",365/7],["5 days",365/5],["1 day",365]];

let PeriodList = document.getElementById('PeriodList');
for(period of PlaningPeriods){
//    console.log(`Name:${job[0]} Salary:${job[1]}`); 
    let option = document.createElement('option');
    option.value = period[0];


    PeriodList.appendChild(option);
}

let JobInput = document.getElementById('jobInput');
let PayInput = document.getElementById('payInput');
let inputOptional = document.getElementById('inputOptional');
let PeriodInput =document.getElementById('periodInput');
JobInput.addEventListener('change', (e) => updatePayFromJob());
PayInput.addEventListener('change', (e) => updatePay());
PeriodInput.addEventListener('change', (e) => updateGross());

let Salary = 0;

function updatePayFromJob(){
     PayInput.placeholder = "";
     inputOptional.innerText="Select job or input your salary";
    for(job of JobPayList){
        if(job[0]==JobInput.value){
            PayInput.placeholder = job[1];
            Salary = job[1];
            inputOptional.innerText="";
        }
    }
    PayInput.value="";
    updateGross()
}

function updatePay(){
    inputOptional.innerText="Select job or input your salary";
    if(PayInput.value!=""){
        inputOptional.innerText="";
    }
   updateGross()
}

let GrossInc = document.getElementById("GrossInc");
function updateGross(){
    Salary = 0;
    if(PayInput.value!=""){
        Salary=PayInput.value;
    }else{
        for(job of JobPayList){
            if(job[0]==JobInput.value){
                Salary = job[1];
                inputOptional.innerText="";
            }
        }
    }
    GrossInc.textContent = "$0";
    if(PeriodInput.value!=""){
        for(period of PlaningPeriods){
            if(period[0]==PeriodInput.value){
                GrossInc.textContent = "$".concat((Salary/period[1]).toFixed(2));
            }
        }
    }
    updateMedicare();
    updateTax();
    UpdateHouse()
}

for(let i =0;i<7;i++){
    eval('let ' + "Tax" + i + '= document.getElementById("Tax' + i + '");');
    eval("Tax" + i+".addEventListener('change', (e) => updateTax())");
}
totalTax = document.getElementById("totalTax");

function updateMedicare(){
    for(period of PlaningPeriods){
        if(period[0]==PeriodInput.value){
            Tax6.value = 180*((12/period[1]).toFixed(2));
        }
    }
}

let TaxTotal = 0;
function updateTax(){
    TaxTotal = 0;
    for(let i = 0;i<6;i++){
        eval("TaxTotal" + '+=parseFloat( Tax' + i + '.value *'+"GrossInc.textContent.replace('$', ''))"+'/100;');
    }
    TaxTotal += parseFloat(Tax6.value);
    totalTax.innerText = "$"+parseFloat(TaxTotal).toFixed(2);
    UpdateNet();
    doCalcCheck()
}

let netInc = document.getElementById("NetInc");
function UpdateNet(){
    netInc.innerText= "$"+(parseFloat(GrossInc.textContent.replace('$', ''))-parseFloat(totalTax.textContent.replace('$', ''))).toFixed(2);
    NetCheckPayment();
}
let housePay = document.getElementById("housePay");
function UpdateHouse(){
    housePay.innerText= "$"+(Salary/12/3).toFixed(2);
}

let Checkbook = document.getElementById("Checkbook");
let rows = document.getElementsByClassName("CheckbookBox");
function createNewCheck(){
    rows = document.getElementsByClassName("CheckbookBox");
    let rowNumber = rows.length;
    let row;
    let Description;
    let Withdrawl;
    let Deposit;
    let Balance;
    row = document.createElement('section')
    row.setAttribute('id',`Row${rowNumber}`)
    row.setAttribute('class',`CheckbookBox`)
    Description = document.createElement('input')
    Description.setAttribute('id',`${rowNumber}Col0`)
    //Description.setAttribute('placeholder','Description');
    Description.addEventListener("change", (e) => doCalcCheck());
    Withdrawl = document.createElement('input')
    Withdrawl.setAttribute('id',`${rowNumber}Col1`)
    Withdrawl.setAttribute('type',`number`)
    //Withdrawl.setAttribute('placeholder','Withdrawal');
    Withdrawl.addEventListener("change", (e) => doCalcCheck());
    Deposit = document.createElement('input')
    Deposit.setAttribute('id',`${rowNumber}Col2`)
    Deposit.setAttribute('type',`number`)
    //Deposit.setAttribute('placeholder','Deposit');
    Deposit.addEventListener("change", (e) => doCalcCheck());
    Balance = document.createElement('input')
    Balance.setAttribute('id',`${rowNumber}Col3`)
    Balance.setAttribute('disabled', '')
    //Balance.setAttribute('placeholder','Balance');
    

    row.appendChild(Description);
    row.appendChild(Withdrawl);
    row.appendChild(Deposit);
    row.appendChild(Balance);

    Checkbook.appendChild(row);
}

function doCalcCheck(){
    for(let i = 2;i<rows.length;i++){
        CheckCalc(i)
    }
}

function CheckCalc(row){
    rows = document.getElementsByClassName("CheckbookBox");
    let Description;
    let Withdrawl;
    let Deposit;
    let Balance;
    let prevVal;
    eval(`Description = document.getElementById("${row}Col0");`);
    eval(`Withdrawl = document.getElementById("${row}Col1");`);
    eval(`Deposit = document.getElementById("${row}Col2");`);
    eval(`Balance = document.getElementById("${row}Col3");`);

    let WithdrawlV = Withdrawl.value;
    if(Withdrawl.value==""){
        WithdrawlV = 0;
    }

    let DepositV = Deposit.value;
    if(Deposit.value==""){
        DepositV = 0;
    }

    if(row == 1){
        prevVal = document.getElementById("NetInc").innerText;
    }else{
        eval(`prevVal = document.getElementById("${row-1}Col3").value;`);
    }
    Balance.value = "$".concat((parseFloat(prevVal.replace("$",""))-parseFloat(WithdrawlV)+parseFloat(DepositV)).toFixed(2));

    if(row == rows.length-1){
        if(WithdrawlV!=0 || DepositV!=0 || Description.value!=""){
            createNewCheck();
        }
    }
}

function NetCheckPayment(){
    let Deposit = document.getElementById("1Col2");
    let Balance = document.getElementById("1Col3");
    Deposit.setAttribute("type","text");
    Deposit.value = "$".concat(parseFloat(document.getElementById("NetInc").innerText.replace("$","")))
    Balance.value = "$".concat(parseFloat(document.getElementById("NetInc").innerText.replace("$","")))
}

createNewCheck();
/*
    Check whether values are valid or not
        Check whether input values are > 0 (Automatically make headCount TRUE if so)
            Check whether or not bill value is a float with at-most 2 decimal places
    Check whether or not a button is selected OR if an input is entered into "Custom"
        Check whether or not "Custom" is negative and ensure it has no decimal places.

    If checks all pass, turn RESET button to .active <--- Only check if boxes are filled??

    Calculating values, self-explanatory
*/

let calculatorForm = document.getElementById("calculatorForm");

let billInput = document.getElementById("billInput");
let billInputErrorLabel = document.getElementById("billInputErrorLabel");
let billValue = 0;
let isBillValid = false;

let presetTipBtn = document.querySelectorAll(".presetTipBtn");
let tipBtn;
let tipValue;
let isTipValid = false;
let customTipBtn = document.getElementById("customTipBtn");
let customTipInput = document.getElementById("customTipInput");

let headCountInput = document.getElementById("headCountInput");
let headCountErrorLabel = document.getElementById("headCountErrorLabel");
let headCount = 0;
let isHeadCountValid = false;

let tipPerPersonDisplay = document.getElementById("tipPerPersonDisplay");
let totalPerPersonDisplay = document.getElementById("totalPerPersonDisplay");

let resetBtn = document.getElementById("resetBtn");

function checkBillValidity(){
    billInputErrorLabel.textContent = "";
    calculatorForm.classList.remove("error-state");

    if(billInput.value == ""){
        billInputErrorLabel.textContent = "Required";
        calculatorForm.classList.add("error-state");
        return false;
    }
    if(billInput.value < 0){
        billInputErrorLabel.textContent = "Invalid value";
        calculatorForm.classList.add("error-state");
        return false;
    }
    if(billInput.value == 0){
        billInputErrorLabel.textContent = "It was free...";
        calculatorForm.classList.add("error-state");
        return false;
    }
    return true;
}
function checkTipValue(){
    if(customTipInput.value == ""){
        customTipInputErrorLabel.textContent = "Required";
        calculatorForm.classList.add("error-state");
        return false;
    }
    if(customTipInput.value < 1){
        customTipInputErrorLabel.textContent = "Invalid Tip Value";
        calculatorForm.classList.add("error-state");
        return false;
    }
    if(customTipInput.value % 1 != 0){
        customTipInputErrorLabel.textContent = "Must be a whole number";
        calculatorForm.classList.add("error-state");
        return false;
    }
    return true;
}
function checkHeadCount(){
    headCountErrorLabel.textContent = "";
    calculatorForm.classList.remove("error-state");

    if(headCountInput.value == ""){
        headCountErrorLabel.textContent = "Required";
        calculatorForm.classList.add("error-state");
        return false;
    }
    if(headCountInput.value == 0){
        headCountErrorLabel.textContent = "Can't be zero";
        calculatorForm.classList.add("error-state");
        return false;
    }
    if(headCountInput.value < 0){
        headCountErrorLabel.textContent = "Invalid Value";
        calculatorForm.classList.add("error-state");
        return false;
    }
    return true;
}

function removeTipBtnActiveState(){
    document.querySelectorAll(".selectedBtn").forEach((e) => {
        e.classList.remove("selectedBtn");
    });
}

function calculateCost(){
    let tipPerPerson = (billValue * tipValue) / headCount;
    let tipDisplay = tipPerPerson.toFixed(2);
    let totalPerPerson = (billValue / headCount) + tipPerPerson;
    let totalDisplay = totalPerPerson.toFixed(2);

    tipPerPersonDisplay.textContent = `$${tipDisplay}`;
    totalPerPersonDisplay.textContent = `$${totalDisplay}`;
}

function stateOfResetBtn(){
    if(isBillValid && isTipValid && isHeadCountValid){
        calculateCost();
        resetBtn.classList.add("active");
    }
    else{
        resetBtn.classList.remove("active");
    }
}

customTipBtn.addEventListener("click", (e) => {
    e.preventDefault();

    removeTipBtnActiveState();
    customTipBtn.classList.add("inactive");
    customTipInput.classList.add("active");
});

calculatorForm.addEventListener("change", (e) => {
    let currentInputId = e.target.getAttribute("id");

    billInputErrorLabel.textContent = "";
    customTipInputErrorLabel.textContent = "";
    headCountErrorLabel.textContent = "";

    if(currentInputId == "customTipInput"){
        isTipValid = checkTipValue();
        if(isTipValid){
            tipValue = (e.target.value) / 100.00;
        }
    }

    if(currentInputId == "billInput"){
        isBillValid = checkBillValidity();
        if(isBillValid){
            billValue = e.target.value;
        }
    }
    else if(currentInputId == "headCountInput"){
        isHeadCountValid = checkHeadCount();
        if(isHeadCountValid){
            headCount = e.target.value;
        }
    }

    stateOfResetBtn();
});

presetTipBtn.forEach(selectedBtn => {
    selectedBtn.addEventListener("click", (e) => {
        e.preventDefault();

        customTipBtn.classList.remove("inactive");
        customTipInput.classList.remove("active");
        removeTipBtnActiveState();
        
        let tipBtnId = e.target.getAttribute("id");
        tipBtn = document.getElementById(tipBtnId);
        tipBtn.classList.add("selectedBtn");
        tipValue = tipBtn.value;
        isTipValid = true;

        stateOfResetBtn();
    });
});

calculatorForm.addEventListener("reset", (e) =>{
    removeTipBtnActiveState();
    calculatorForm.classList.remove("error-state");

    tipPerPersonDisplay.textContent = "$0.00";
    totalPerPersonDisplay.textContent = "$0.00";
});
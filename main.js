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
    if(billInput.value == ""){
        billInputErrorLabel.textContent = "Required";
        billInput.classList.add("error-state");
        return false;
    }
    if(billInput.value < 0){
        billInputErrorLabel.textContent = "Invalid value";
        billInput.classList.add("error-state");
        return false;
    }
    if(billInput.value == 0){
        billInputErrorLabel.textContent = "It was free...";
        billInput.classList.add("error-state");
        return false;
    }
    return true;
}
function checkTipValue(){
    if(customTipInput.value == ""){
        customTipInputErrorLabel.textContent = "Required";
        customTipInput.classList.add("error-state");
        return false;
    }
    if(customTipInput.value < 1){
        customTipInputErrorLabel.textContent = "Invalid Tip Value";
        customTipInput.classList.add("error-state");
        return false;
    }
    if(customTipInput.value % 1 != 0){
        customTipInputErrorLabel.textContent = "Must be a whole number";
        customTipInput.classList.add("error-state");
        return false;
    }
    return true;
}
function checkHeadCount(){
    if(headCountInput.value == ""){
        headCountErrorLabel.textContent = "Required";
        headCountInput.classList.add("error-state");
        return false;
    }
    if(headCountInput.value == 0){
        headCountErrorLabel.textContent = "Can't be zero";
        headCountInput.classList.add("error-state");
        return false;
    }
    if(headCountInput.value < 0){
        headCountErrorLabel.textContent = "Invalid Value";
        headCountInput.classList.add("error-state");
        return false;
    }
    return true;
}

function removeTipBtnActiveState(){
    document.querySelectorAll(".selectedBtn").forEach((e) => {
        e.classList.remove("selectedBtn");
    });

    //Also remove "error-state" from potential custom tip
    customTipInputErrorLabel.textContent = "";
    customTipInput.classList.remove("error-state");
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
    else if(isBillValid || isTipValid || isHeadCountValid){
        resetBtn.classList.remove("active");
        return;
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
    if(currentInputId == "customTipInput"){
        isTipValid = checkTipValue();
        if(isTipValid){
            customTipInput.classList.remove("error-state");
            customTipInputErrorLabel.textContent = "";
            tipValue = (e.target.value) / 100.00;
        }
        else{
            isTipValid = false;
        }
    }

    if(currentInputId == "billInput"){
        isBillValid = checkBillValidity();
        if(isBillValid){
            billInputErrorLabel.textContent = "";
            billInput.classList.remove("error-state");
            billValue = e.target.value;
        }
        else{
            isBillValid = false;
        }
    }
    else if(currentInputId == "headCountInput"){
        isHeadCountValid = checkHeadCount();
        if(isHeadCountValid){
            headCountErrorLabel.textContent = "";
            headCountInput.classList.remove("error-state");
            headCount = e.target.value;
        }
        else{
            isHeadCountValid = false;
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
    if(resetBtn.classList.contains("active")){
        removeTipBtnActiveState();
        calculatorForm.classList.remove("error-state");

        tipPerPersonDisplay.textContent = "$0.00";
        totalPerPersonDisplay.textContent = "$0.00";

        billValue = 0;
        tipValue = 0;
        headCount = 0;

        isBillValid = false;
        isTipValid = false;
        isHeadCountValid = false;

        stateOfResetBtn();
    }
    else{
        return;
    }
});
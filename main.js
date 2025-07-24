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

let presetTipBtn = document.querySelectorAll(".presetTipBtn")
let customTipBtn = document.getElementById("customTipBtn");
let customTipInput = document.getElementById("customTipInput");

let headCountInput = document.getElementById("headCountInput");
let headCountErrorLabel = document.getElementById("headCountErrorLabel");

let resetBtn = document.getElementById("resetBtn");

function checkBillValidity(){
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
function checkHeadCount(){
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

calculatorForm.addEventListener("reset", (e) => {
    e.preventDefault();

    let billValue = 0;
    let headCount = 0;
    
    let isBillValid = checkBillValidity();
    let isHeadCountValid = checkHeadCount();

    if(isBillValid && isHeadCountValid){
        billValue = billInput.value;
        headCount = headCountInput.value;
    }
    else{
        return;
    }
});
presetTipBtn.forEach(selectedBtn => {
    selectedBtn.addEventListener("click", (e) => {
        e.preventDefault();

        customTipBtn.classList.remove("inactive");
        customTipInput.classList.remove("active");

        document.querySelectorAll(".selectedBtn").forEach((e) => {
            e.classList.remove("selectedBtn");
        });

        if(selectedBtn.getAttribute("id") == "customTipBtn"){
            customTipBtn.classList.add("inactive");
            customTipInput.classList.add("active");
            return;
        }
        
        let tipBtnId = e.target.getAttribute("id");
        let tipBtn = document.getElementById(tipBtnId);
        tipBtn.classList.add("selectedBtn");
    });
});
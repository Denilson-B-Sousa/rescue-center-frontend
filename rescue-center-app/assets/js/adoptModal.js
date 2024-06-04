"use strict"

const btnAdopt = document.querySelectorAll("#btn-adopt");
const btnCloseAdoptModal = document.getElementById("btn-adoptModal-close");

let adoptModal = document.getElementById("adopt-modal");

btnAdopt.forEach((btnAdopt) => {
    btnAdopt.addEventListener("click", (e) => {
        e.preventDefault();
        adoptModal.showModal();
    })
})

btnCloseAdoptModal.addEventListener("click", () => {
    adoptModal.close();
})

//GERAR OPÇÕES SELECTS
let actualDate = new Date();
let actualYear = actualDate.getFullYear();

const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

function populateSelect(id, options, placeholder) {
    const select = document.getElementById(id);
    const placeholderOption = document.createElement("option");

    placeholder = "";
    placeholder = placeholder;
    

    select.appendChild(placeholderOption);

    options.forEach((optionValue, index) => {
        const option = document.createElement("option");
        option.value = index + 1;
        option.innerHTML = optionValue;
        select.appendChild(option);
    }) 
}

populateSelect("day", Array.from({length: 31}, (_, i) => i + 1), "Day");
populateSelect("month", month, "Month");
populateSelect("year", Array.from({length: actualYear - 1900 + 1}, (_, i) => actualYear - i), "Year");

//Array.from constructor de array para passar valores sequenciais 
//Dias 1 2 3 ...
//Anos 1900, 1901, 1902... ano_atual

// VALIDAÇÃO DO MODAL

let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let nameRegex = /^[a-zA-ZÀ-ÿ\s]{20,100}$/;

function adoptModalValidation() {

    const email = document.getElementById("email-input").value;
    const fullName = document.getElementById("fullName-input").value;

    const emailInput = document.getElementById("email-input");
    const fullNameInput = document.getElementById("fullName-input");

    const errorEmail = document.getElementById("error-email");
    const errorFullName = document.getElementById("error-fullName");

    const day = document.getElementById("day").value;
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;


    const checkSelect = day !== 'false' && month !== 'false' && year !== 'false';
    const errorSelect = document.getElementById("select-error");

    const checkboxInput = document.getElementById("checkbox");
    const errorCheckbox = document.getElementById("checkbox-error");


    //Verificando email


    if(emailRegex.test(email) && nameRegex.test(fullName) && checkboxInput.checked === true && checkSelect) {
        
        errorFullName.innerHTML = '';
        errorEmail.innerHTML = '';
        errorSelect.innerHTML = '';
        errorCheckbox.innerHTML = '';

        fullNameInput.classList.remove('validation-error');
        emailInput.classList.remove('validation-error');

        setTimeout(function() {
            window.location.replace("../../../rescue-center-app/src/sucessPage/index.html");
        }, 1000)

    } else if(email === '' || fullName === '' || checkboxInput.checked === false || checkSelect === false ) {
        errorEmail.innerHTML = "*required!";
        emailInput.classList.add('validation-error');

        errorFullName.innerHTML = "*required!";
        fullNameInput.classList.add('validation-error');

        errorCheckbox.classList.add('error');
        errorCheckbox.innerHTML = "*required!";

        errorSelect.classList.add("error");
        errorSelect.innerHTML = "*required";

    } else if (emailRegex.test(email) === false) {

        errorFullName.innerHTML = '';
        fullNameInput.classList.remove('validation-error');

        errorSelect.innerHTML = '';
        errorCheckbox.innerHTML = '';

        errorEmail.innerHTML = "*Invalid e-mail!";
        emailInput.classList.add('validation-error');

    } else if(nameRegex.test(fullName) === false) {

        errorEmail.innerHTML = '';
        emailInput.classList.remove('validation-error');

        errorSelect.innerHTML = '';
        errorCheckbox.innerHTML = '';

        fullNameInput.classList.add('validation-error');
        errorFullName.innerHTML = "*Please enter with full name!";

    } 
}

const btnSendAdoptModal = document.getElementById("btn-send");

btnSendAdoptModal.addEventListener("click", () => {
    adoptModalValidation();
})



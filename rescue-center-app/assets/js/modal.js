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

    placeholder.value = "";
    placeholder.innerText = placeholder;

    select.appendChild(placeholderOption);

    options.forEach((optionValue, index) => {
        const option = document.createElement("option");
        option.value = index + 1;
        option.innerHTML = optionValue;
        select.appendChild(option);
    }) 
}

populateSelect("day", Array.from({length: 31}, (_, i) => i + 1), 1);
populateSelect("month", month, 1);
populateSelect("year", Array.from({length: actualYear - 1900 + 1}, (_, i) => actualYear - i), actualYear, true);

//Array.from para passar valores sequenciais 
//Dias 1 2 3 ...
//Anos 1900, 1901, 1902... ano_atual

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

    const checkSelect = day === "false" || month === "false" || year === "false";
    const errorSelect = document.getElementById("select-error");

    const checkboxInput = document.getElementById("checkbox");
    const errorCheckbox = document.getElementById("checkbox-error");


    //Verificando email

    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let nameRegex = /^[a-zA-ZÀ-ÿ\s]{3,100}$/;

    if(emailRegex.test(email) && nameRegex.test(fullName) && checkboxInput.checked === true && !checkSelect) {
        
        errorFullName.innerHTML = '';
        errorEmail.innerHTML = '';
        errorSelect.innerHTML = '';
        errorCheckbox.innerHTML = '';

        fullNameInput.classList.remove('validation-error');
        emailInput.classList.remove('validation-error');

        setTimeout(function() {
            window.location.replace("../../src/SucessPage/index.html");
        }, 1000)

    } else if(email === '' || fullName === '' || checkboxInput.checked === false ) {
        errorEmail.innerHTML = "*required field!";
        emailInput.classList.add('validation-error');

        errorFullName.innerHTML = "*required field!";
        fullNameInput.classList.add('validation-error');

        errorCheckbox.classList.add('error');
        errorCheckbox.innerHTML = "*required";

    } else if (emailRegex.test(email) === false) {

        errorEmail.innerHTML = "*Invalid e-mail";
        emailInput.classList.add('validation-error');

    } else if(nameRegex.test(fullName) === false) {

        fullNameInput.classList.add('validation-error');
        errorFullName.innerHTML = "*Invalid name";

    } else if(checkSelect === true) {

        errorSelect.classList.add("error");
        errorSelect.innerHTML = "*required";
    }
}

const btnSendAdoptModal = document.getElementById("btn-send");

btnSendAdoptModal.addEventListener("click", () => {
    adoptModalValidation();
})
"use strict";

const btnDonate = document.querySelectorAll("#btn-donate");
const btnDonateModalClose = document.querySelector("#btn-donateModal-close");
let donateModal = document.getElementById("donate-modal");
const btnSendDonate = document.getElementById("btn-send-donate");

let emailRegexDonate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let moneyRegex = /^(R\$ ?)?\d{1,3}(\.\d{3})*(,\d{2})?$/;

btnDonate.forEach((btnDonate) => {
    btnDonate.addEventListener("click", (e) => {
        e.preventDefault();
        donateModal.showModal();
});
});

btnDonateModalClose.addEventListener("click", (e) => {
    e.preventDefault();
    donateModal.classList.add("closed");

    setTimeout(() => {
        donateModal.close();
        
    })
})

function donateModalValidation() {
    const money = document.getElementById("money-donate").value;
    const email = document.getElementById("email-donate").value;

    const emailInputDonateModal = document.getElementById("email-donate");
    const moneyInputDonateModal = document.getElementById("money-donate");

    const moneyDonateError = document.getElementById("money-donate-error");
    const emailDonateError = document.getElementById("email-donate-error");

    const paymentOptionPix = document.getElementById("pix").checked;
    const paymentOptionCredit = document.getElementById("credit").checked;
    const paymentOptionPaypal = document.getElementById("paypal").checked;

    const paymentOptionPixLabel= document.getElementById("label-pix");
    const paymentOptionCreditLabel = document.getElementById("label-credit");
    const paymentOptionPaypalLabel = document.getElementById("label-paypal");

    const optionPaymentError = document.getElementById("option-payment-error");

    const isPaymentOptionChecked = paymentOptionPix || paymentOptionCredit || paymentOptionPaypal;


    if(emailRegexDonate.test(email) === true && moneyRegex.test(money) === true && isPaymentOptionChecked === true) {

        moneyDonateError.innerHTML = '';
        moneyInputDonateModal.classList.remove('validation-error');

        emailDonateError.innerHTML = '';
        emailInputDonateModal.classList.remove('validation-error');

        optionPaymentError.innerHTML = '';
        optionPaymentError.classList.remove("option-payment-error");

        paymentOptionPixLabel.classList.remove('validation-error');
        paymentOptionCreditLabel.classList.remove('validation-error');
        paymentOptionPaypalLabel.classList.remove('validation-error');


        setTimeout(function() {
            window.location.replace("../../../rescue-center-app/src/sucessPage/index.html");
        }, 1000)

    } else if (email === '' || money === 0 || isPaymentOptionChecked === false) {
        moneyDonateError.innerHTML = "*Required";
        moneyInputDonateModal.classList.add('validation-error');

        emailDonateError.innerHTML = "*Required";
        emailInputDonateModal.classList.add('validation-error');

        paymentOptionPixLabel.classList.add('validation-error');
        paymentOptionCreditLabel.classList.add('validation-error');
        paymentOptionPaypalLabel.classList.add('validation-error');

        optionPaymentError.innerHTML = "*Required";
        optionPaymentError.classList.add("option-payment-error");

    } else if (emailRegexDonate.test(email) === false ) {

        emailDonateError.innerHTML = "*invalid e-mail";
        emailInputDonateModal.classList.add('validation-error');

        paymentOptionPixLabel.classList.remove('validation-error');
        paymentOptionCreditLabel.classList.remove('validation-error');
        paymentOptionPaypalLabel.classList.remove('validation-error');

        optionPaymentError.innerHTML = "";


        moneyDonateError.innerHTML = "";
        moneyInputDonateModal.classList.remove('validation-error');

    } else if (money < 0) {
        moneyDonateError.innerHTML = "*Please enter with positive value";
        moneyInputDonateModal.classList.add('validation-error');
    }

    
}


btnSendDonate.addEventListener("click", (e) => {
    e.preventDefault();
    donateModalValidation();
})

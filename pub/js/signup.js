'use strict';

// Variabler
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email-input');
const username = document.getElementById('username');
const password = document.getElementById('password');
const firstNameError = document.getElementById('first-name-error');
const lastNameError = document.getElementById('last-name-error');
const emailError = document.getElementById('email-error');
const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById('password-error');
const confirm = document.getElementById('confirm');
let submit = url.searchParams.get('submit');

/* If the form has been submitted, error messages will be displayed 
in case any field has not been filled out correctly or at all */
if (submit) {
    if (!firstName.value) {
        firstNameError.style.display = 'block';
    }

    if (!lastName.value) {
        lastNameError.style.display = 'block';
    }

    if (!email.value) {
        emailError.style.display = 'block';
    }

    if (!username.value) {
        usernameError.style.display = 'block';
    }

    if (!password.value) {
        passwordError.style.display = 'block';
    }

    if (confirm.innerHTML) {
        confirm.style.display = 'block';
    }
}
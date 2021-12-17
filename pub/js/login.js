'use strict';

// Variables
const username = document.getElementById('username');
const password = document.getElementById('password');
const userError = document.getElementById('user-error');
const passwordError = document.getElementById('password-error');
let url = new URL(window.location.href);
let submit = url.searchParams.get('submit');

/* If the form has been submitted, error messages will be displayed 
if a username and/or password has not been provided */
if (submit) {
    if (!username.value) {
        userError.style.display = 'block';
    }

    if (! password.value) {
        passwordError.style.display = 'block';
    }
}

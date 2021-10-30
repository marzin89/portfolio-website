'use strict';

// Variables
const arrow = document.getElementById( 'back-to-the-top' );
arrow.addEventListener( 'click', scrollToTop );

/* This function will scroll back to the top of the page when the 
"arrow" is clicked */
function scrollToTop() {

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

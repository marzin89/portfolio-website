'use strict';

// Variables
const arrow = document.getElementById( 'back-to-the-top' );
arrow.addEventListener( 'click', scrollToTop );
const navIcon = document.getElementById( 'nav-icon' );
navIcon.addEventListener( 'click', toggleMenu );
const bar1 = document.getElementById( 'icon-bar1' );
const bar2 = document.getElementById( 'icon-bar2' );
const bar3 = document.getElementById( 'icon-bar3' );
const menu = document.getElementById( 'main-nav-mobile' );
let count  = 0;

/* This function will scroll back to the top of the page when the 
"arrow" is clicked */
function scrollToTop() {

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/* This function toggles the hamburger menu */
function toggleMenu() {

    if ( ! count || count % 2 == 0 ) {

        menu.style.display = 'block';
        navIcon.className  = 'open';

    } else if ( count % 2 ) {
        menu.style.display   = 'none';
        navIcon.className    = '';
    }

    count++;
}

/* This function prevents the hamburger menu from remaining open on desktop, 
i.e. when the hamburger icon is hidden and the desktop menu is displayed */
window.addEventListener('resize', () => {

    if ( window.innerWidth > 768 ) {
        menu.style.display = 'none';
    }
});

'use strict';

// Variabler
let url = new URL(window.location.href);
let siteID = url.searchParams.get('id');

// Kontrollerar att det finns ett ID
if (siteID) {
    const title = document.querySelector('title');
    const site = document.getElementById('site');
    // GET-anrop med ID
    fetch(`https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?cat=site&id=${siteID}`)
    // Konverterar svaret från JSON
    .then(response => response.json())
    // Loopar igenom och skriver ut
    .then(data => {    
            title.innerHTML = data.site_name;
            site.innerHTML +=   
                `<h1>${data.site_name}</h1>
                <img src="${data.site_image_path}">
                <p>${data.site_description}</p>
                <a href="${data.site_url}">Länk till webbplatsen</a>`;
    })
    // Skriver ut felmeddelandet vid misslyckad databasanslutning
    .catch(err => {
        site.innerHTML += `<p class="error">${err}</p>`; 
    })
}

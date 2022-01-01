'use strict';

// Variabler
let id = 0;

// GET-anrop
// Hämtar webbplatser
// Kontrollen förhindrar att fetch-anropet körs på portfoliosidan
if (window.location.href.indexOf('index.html') !== -1) {
    const featured = document.getElementById('featured');
    fetch('https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?cat=site')
        // Konverterar svaret från JSON
        .then(response => response.json())
        .then(data => {
            // Kontrollerar om svaret är en array (annars felmeddelande)
            if (Array.isArray(data)) {
                    // Loopar igenom och skriver ut
                    data.forEach(element => {
                        // Begränsar till tre webbplatser
                        if (id <= 2) {
                            featured.innerHTML += 
                                `<div class="featured">
                                    <h3 class="site-name">${element.site_name}</h3>
                                    <a class="find-out-more" href="website.html?id=${id}">
                                        <img src="${element.site_image_path}">
                                    </a>
                                <div>`;  
                        }
                        id++;   
                    })
            // Skriver ut felmeddelandet vid misslyckad databasanslutning
            } else {
                featured.innerHTML += `<p class="error">${data}</p>`;
            }
        }  
    );
}
'use strict';

// GET-anrop
// Hämtar webbplatser
// Kontrollen förhindrar att fetch-anropet körs på startsidan
if (window.location.href.indexOf('portfolio.html') !== -1) {
    const portfolio = document.getElementById('portfolio');
    fetch('https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?cat=site')
        // Konverterar svaret från JSON
        .then(response => response.json())
        // Loopar igenom och skriver ut
        .then(data => data.forEach(element => {
            portfolio.innerHTML += 
                `<div class="site">
                    <h3 class="site-name">${element.site_name}</h3>
                    <a class="find-out-more" href="website.html?id=${id}">
                        <img src="${element.site_image_path}">
                    </a>
                <div>`;  
            id++;   
        })
    
    )
    // Skriver ut felmeddelandet vid misslyckad databasanslutning
    .catch(error => {
        portfolio.innerHTML += `<p class="error">${error}</p>`;
    })
}

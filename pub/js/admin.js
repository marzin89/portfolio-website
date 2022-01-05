'use strict';

// Variables
// URL-parametrar
let cat = url.searchParams.get('cat'); 
let edit = url.searchParams.get('edit');
let Delete = url.searchParams.get('delete');
let index = url.searchParams.get('id');
// HTML-element
const output = document.getElementById('admin-output');
const select = document.getElementById( 'category' );
const cvInputs = document.getElementById( 'admin-cv-inputs' );
const siteInputs = document.getElementById( 'admin-site-inputs' );
const educationJob = document.getElementById( 'education-job' );
const schoolEmployer = document.getElementById( 'school-employer' );
const outputHeading = document.getElementById('h1-admin-output');
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const siteNameInput = document.getElementById('site-name');
const siteDescriptionInput = document.getElementById('description');
const siteUrlInput = document.getElementById('url');
const inputError = document.getElementsByClassName('error');
const confirm = document.getElementById('confirm');
const error = document.getElementById('error');
const submitBtn = document.getElementById('submit');
// Lagrar värden vid POST och PUT-anrop
let startDate;
let endDate;
let course;
let school;
let siteName;
let imageURL;
let siteDescription;
let siteURL;
let body;
// Används för att ta bort URL-parametrar efter uppdatering och borttagning
let stateObj = { foo: 'bar' };

// Händelsehanterare
select.addEventListener( 'change', () => {
        toggleForm();
        changeParameter();
    }
);

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let validate1 = validateCV();
    let validate2 = validateSite();
    /* För utbildningar och jobb används inmatningsfältens name-attribut 
    för att avgöra vilka funktioner som ska köras. Detta eftersom båda använder
    samma inmatningsfält. Sidan laddas sedan om automatiskt. */
    if (educationJob.name == 'education') {
        addCourse(validate1);
        updateCourse(validate1);
        setTimeout(() => { location.reload() }, 500);
    } else if (educationJob.name == 'job') {
        addJob(validate1);
        updateJob(validate1);
        setTimeout(() => { location.reload() }, 500);
    }

    if (cat == 'site') {
        addSite(validate2);
        updateSite(validate2);
        setTimeout(() => { location.reload() }, 500);
    }
});

window.addEventListener('load', () => {
    // Behåller gränssnittet när man laddar om sidan
    changeInterface();
    // Raderar utbildning, jobb eller webbplats
    if (Delete) {
        if (cat == 'education') {
            deleteCourse();
            setTimeout(() => { location.reload() }, 500);
        } else if (cat == 'experience') {
            deleteJob();
            setTimeout(() => { location.reload() }, 500);
        } else if (cat == 'site') {
            deleteSite();
            setTimeout(() => { location.reload() }, 500);
        }
    }

    // Kontroll av parametrar (förifyllning av formulär)
    if (edit) {
        if (cat == 'education') {
            prefillCourse();
        } else if (cat == 'experience') {
            prefillJob();
        } else if (cat == 'site') {
            prefillSite();
        }
    }
});

// Uppdaterar URL-parametrarna när man byter kategori i dropdown-listan
function changeParameter() {
    if (select.selectedIndex == 0) {
        window.location.href = 'https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbplats/admin.php?cat=education';
    } else if (select.selectedIndex == 1) {
        window.location.href = 'https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbplats/admin.php?cat=experience';
        return true;
    } else if (select.selectedIndex == 2) {
        window.location.href = 'https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbplats/admin.php?cat=site';
    }
}

/* Behåller gränssnittet samt name-attributen i HTML-filen när man 
byter kategori i dropdown-listan */
function toggleForm() {
    if ( select.selectedIndex == 0 ) {

        cvInputs.style.display = 'block';
        siteInputs.style.display = 'none';
        educationJob.name = 'education';
        educationJob.placeholder = 'Kurs/program *';
        schoolEmployer.name = 'school';
        schoolEmployer.placeholder = 'Skola/lärosäte *';
    
    } else if ( select.selectedIndex == 1 ) {
    
        cvInputs.style.display = 'block';
        siteInputs.style.display = 'none';
        educationJob.name = 'job';
        educationJob.placeholder = 'Titel/anställning *';
        schoolEmployer.name = 'employer';
        schoolEmployer.placeholder = 'Arbetsgivare *';
    
    } else if ( select.selectedIndex == 2 ) {
    
        cvInputs.style.display = 'none';
        siteInputs.style.display = 'block';
    }   
}

/* Behåller gränssnittet, rubriker samt name-attributen i HTML-filen
när man laddar om sidan */
function changeInterface() {
    if (cat == 'education') {
        outputHeading.innerHTML = 'Utbildning';
        cvInputs.style.display = 'block';
        siteInputs.style.display = 'none';
        educationJob.name = 'education';
        educationJob.placeholder = 'Kurs/program *';
        schoolEmployer.name = 'school';
        schoolEmployer.placeholder = 'Skola/lärosäte *';
        select.selectedIndex = 0;
    } else if (cat == 'experience') {
        outputHeading.innerHTML = 'Jobb';
        cvInputs.style.display = 'block';
        siteInputs.style.display = 'none';
        educationJob.name = 'job';
        educationJob.placeholder = 'Titel/anställning *';
        schoolEmployer.name = 'employer';
        schoolEmployer.placeholder = 'Arbetsgivare *';
        select.selectedIndex = 1;
    } else if (cat == 'site') {
        outputHeading.innerHTML = 'Webbplatser';
        cvInputs.style.display = 'none';
        siteInputs.style.display = 'block';
        select.selectedIndex = 2;
    }
}

// Hämtar alla utbildningar
if (cat == 'education') {
    // GET-anrop
    fetch('https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?cat=education')   
        // Konverterar svaret från JSON
        .then(response => response.json()) 
        // Loopar igenom och skriver ut 
        // Om inget slutdatum finns (default), returneras en tom sträng 
        .then(data => data.forEach(element => {
            // Kontrollen görs eftersom utbildningar och jobb ligger i samma array
            if (element.education_id) {
                // Skriv ut de första tre utbildningarna utan länk för borttagning
                if (id < 3) {
                    output.innerHTML += 
                    `<div class="row">
                        <div class="left">
                            <p class="start-date">
                                ${ element.education_start_date } -
                            </p>
                            <p class="end-date">
                                ${ element.education_end_date != '1989-06-16' ? element.education_end_date : '' }
                            </p>
                        </div>
                        <div class="right">
                            <p class="education-job"> 
                                ${ element.course }
                            </p>
                            <p class="school-employer">
                                ${ element.school }
                            </p>
                            <p class="edit"><a href="admin.php?cat=education&id=${id}&edit=1">
                                Redigera</a></p>
                        </div>
                    </div>`
                // Skriv ut resten av utbildningarna med länk för borttagning
                } else {
                    output.innerHTML += 
                    `<div class="row">
                        <div class="left">
                            <p class="start-date">
                                ${ element.education_start_date } -
                            </p>
                            <p class="end-date">
                                ${ element.education_end_date != '1989-06-16' ? element.education_end_date : '' }
                            </p>
                        </div>
                        <div class="right">
                            <p class="education-job"> 
                                ${ element.course }
                            </p>
                            <p class="school-employer">
                                ${ element.school }
                            </p>
                            <p class="edit"><a href="admin.php?cat=education&id=${id}&edit=1">
                                Redigera</a></p>
                            <p class="delete"><a href="admin.php?cat=education&id=${id}&delete=1">
                                Radera</a></p>
                        </div>
                    </div>`
                }              
                id++;
            }
        })
    )
    // Skriver ut felmeddelandet vid misslyckad databasanslutning
    .catch(err => {
        error.innerHTML = err;
        error.style.display = 'block';
    })
}

// Hämtar alla jobb
if (cat == 'experience') {
    // GET-anrop
    fetch('https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?cat=experience')
        // Konverterar svaret från JSON
        .then(response => response.json())
        // Loopar igenom och skriver ut
        // Om inget slutdatum finns (default), returneras en tom sträng
        .then(data => data.forEach(element => {
            // Kontrollen görs eftersom utbildningar och jobb ligger i samma array
            if (element.job_id) {
                // Skriv ut de första tre jobben utan länk för borttagning
                if (id < 3) {
                    output.innerHTML += 
                    `<div class="row">
                        <div class="left">
                            <p class="start-date">
                                ${ element.job_start_date } -
                            </p>
                            <p class="end-date">
                                ${ element.job_end_date != '1989-06-16' ? element.job_end_date : '' }
                            </p>
                        </div>
                        <div class="right">
                            <p class="education-job"> 
                                ${ element.job }
                            </p>
                            <p class="school-employer">
                                ${ element.employer }
                            </p>
                            <p class="edit"><a href="admin.php?cat=experience&id=${id}&edit=1">
                                Redigera</a></p>
                        </div>
                    </div>`
                // Skriv ut resten av jobben med länk för borttagning
                } else {
                    output.innerHTML += 
                    `<div class="row">
                        <div class="left">
                            <p class="start-date">
                                ${ element.job_start_date } -
                            </p>
                            <p class="end-date">
                                ${ element.job_end_date != '1989-06-16' ? element.job_end_date : '' }
                            </p>
                        </div>
                        <div class="right">
                            <p class="education-job"> 
                                ${ element.job }
                            </p>
                            <p class="school-employer">
                                ${ element.employer }
                            </p>
                            <p class="edit"><a href="admin.php?cat=experience&id=${id}&edit=1">
                                Redigera</a></p>
                            <p class="delete"><a href="admin.php?cat=experience&id=${id}&delete=1">
                                Radera</a></p>
                        </div>
                    </div>`
                }                  
                id++;
            }      
        })
    )
    // Skriver ut felmeddelandet vid misslyckad databasanslutning
    .catch(err => {
        error.innerHTML = err;
        error.style.display = 'block';
    })
}

// Hämtar alla webbplatser
if (cat == 'site') {
    // GET-anrop
    fetch('https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?cat=site')
        // Konverterar svaret från JSON
        .then(response => response.json())
        // Loopar igenom och skriver ut
        .then(data => data.forEach(element => {
            // Skriv ut de första tre webbplatserna utan länk för borttagning
            if (id < 3) {
                output.innerHTML += 
                `<div class="row">
                    <h2 class="site-name-admin">${element.site_name}</h2>
                    <img class="screenshot" src="${element.site_image_path}">
                    <p class="site-description">${element.site_description}</p>
                    <div class="site-left">
                        <p class="site-url"><a href="${element.site_url}">Länk till webbplatsen</a></p>
                    </div>
                    <div class="site-right">
                        <p class="edit"><a href="admin.php?cat=site&id=${id}&edit=1">
                            Redigera</a></p>
                    </div>
                </div>`
            // Skriver ut resten av webbplatserna med länk för borttagning
            } else {
                output.innerHTML += 
                `<div class="row">
                    <h2 class="site-name-admin">${element.site_name}</h2>
                    <img class="screenshot" src="${element.site_image_path}">
                    <p class="site-description">${element.site_description}</p>
                    <div class="site-left">
                        <p class="site-url"><a href="${element.site_url}">Länk till webbplatsen</a></p>
                    </div>
                    <div class="site-right">
                        <p class="edit"><a href="admin.php?cat=site&id=${id}&edit=1">
                            Redigera</a></p>
                        <p class="delete"><a href="admin.php?cat=site&id=${id}&delete=1">
                            Radera</a></p>
                    </div>                          
                </div>`
            }
            id++;
        }) 
        // Skriver ut felmeddelandet vid misslyckad databasanslutning
        .catch(err => {
            error.innerHTML = err;
            error.style.display = 'block';
        })       
    );
}

// Validerar inmatningsfälten när man lägger till/uppdaterar utbildningar/jobb
function validateCV() {
    // Variablelns värde ökas för varje ifyllt inmatningsfält
    let count = 0;
    
    if (startDateInput.value) {
        ++count;
        startDate = startDateInput.value;
        inputError[0].style.display = 'none';
    } else {
        inputError[0].style.display = 'block';
    }

    /* Slutdatum är inte obligatoriskt, därför genereras inget
    felmeddelande om det saknas */
    if (endDateInput.value) {
        endDate = endDateInput.value;
    } else {
        endDate = '1989-06-16';
    }

    if (educationJob.value) {
        ++count;
        course = educationJob.value;
        inputError[1].style.display = 'none';
    } else {
        inputError[1].style.display = 'block';
    }

    if (schoolEmployer.value) {
        ++count;
        school = schoolEmployer.value;
        inputError[2].style.display = 'none';
    } else {
        inputError[2].style.display = 'block';
    }

    return count;
}

// Validerar inmatningsfälten när man lägger till/uppdaterar webbplatser
function validateSite() {
    // Variablelns värde ökas för varje ifyllt inmatningsfält
    let count = 0;

    if (siteNameInput.value) {
        ++count;
        siteName = siteNameInput.value;
        inputError[3].style.display = 'none';
    } else {
        inputError[3].style.display = 'block';
    }

    if (siteDescriptionInput.value) {
        ++count;
        siteDescription = siteDescriptionInput.value;
        inputError[4].style.display = 'none';
    } else {
        inputError[4].style.display = 'block';
    }

    if (siteUrlInput.value) {
        ++count;
        siteURL = siteUrlInput.value;
        inputError[5].style.display = 'none';
    } else {
        inputError[5].style.display = 'block';
    }

    return count;
}

// Lägger till kurser
function addCourse(validate1) {
    // Kontrollen förhindrar att både POST och PUT körs när formuläret skickas
    if (!edit) {
        // Kontrollerar att alla obligatoriska inmatningsfält är ifyllda
        if (validate1 == 3) {
            // Skapar en body med uppgifter
            body = {
                'course':     course,
                'school':     school,
                'start_date': startDate,
                'end_date':   endDate, 
            }
            // POST-anrop med header och body (JSON)
            fetch('https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?cat=education', {
                method: 'POST', 
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(body),
            })
                // Konverterar svaret från JSON
                .then(response => response.json())
                // Skriver ut ett bekräftelsemeddelande
                .then(data => {
                    confirm.innerHTML = data.message;
                    confirm.style.display = 'block';
                }
            )
            // Skriver ut ett felmeddelande
            .catch(err => {
                error.innerHTML = err;
                error.style.display = 'block';
            })
        }
    }
}

// Uppdaterar kurser
function updateCourse(validate1) {
    // Kontrollen förhindrar att både POST och PUT körs när formuläret skickas
    if (edit) {
        // Kontrollerar att alla obligatoriska inmatningsfält är ifyllda
        if (validate1 == 3) {
            // Skapar en body med uppgifter
            body = {
                'course':     course,
                'school':     school,
                'start_date': startDate,
                'end_date':   endDate, 
            }
            // PUT-anrop med header och body (JSON)
            fetch(`https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?id=${index}&cat=education`,
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(body),
            })
                // Konverterar svaret från JSON
                .then(response => response.json())
                // Skriver ut ett bekräftelsemeddelande
                .then(data => {
                    confirm.innerHTML = data.message;
                    confirm.style.display = 'block';
                }
            )
            // Skriver ut ett felmeddelande
            .catch(err => {
                error.innerHTML = err;
                error.style.display = 'block';
            })
            // Tar bort URL-parametern så att funktionen inte körs igen
            history.replaceState(stateObj, '', 'admin.php?cat=education');
        }
    }
}

// Raderar utbildningar
function deleteCourse() {
    // DELETE-anrop med header
    fetch(`https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?id=${index}&cat=education`, 
    {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
        // Konverterar svaret från JSON
        .then(response => response.json())
        // Skriver ut ett bekräftelsemeddelande
        .then(data => {
            confirm.innerHTML = data.message;
            confirm.style.display = 'block';
        }
    )
    // Skriver ut ett felmeddelande
    .catch(err => {
        error.innerHTML = err;
        error.style.display = 'block';
    })
    // Tar bort URL-parametern så att funktionen inte körs igen
    history.replaceState(stateObj, '', 'admin.php?cat=education');
}

// Lägger till jobb
function addJob(validate1) {
    // Kontrollen förhindrar att både POST och PUT körs när formuläret skickas
    if (!edit) {
        // Kontrollerar att alla obligatoriska inmatningsfält är ifyllda
        if (validate1 == 3) {
            // Skapar en body med uppgifter
            body = {
                'employment': course,
                'employer':   school,
                'start_date': startDate,
                'end_date':   endDate, 
            }
            // POST-anrop med header och body (JSON)
            fetch('https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?cat=experience', {
                method: 'POST', 
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(body),
            })
                // Konverterar svaret från JSON
                .then(response => response.json())
                // Skriver ut ett bekräftelsemeddelande 
                .then(data => {
                    confirm.innerHTML = data.message;
                    confirm.style.display = 'block';
                }
            )
            // Skriver ut ett felmeddelande
            .catch(err => {
                error.innerHTML = err;
                error.style.display = 'block';
            })
        }
    }
}

// Uppdaterar jobb
function updateJob(validate1) {
    // Kontrollen förhindrar att både POST och PUT körs när formuläret skickas
    if (edit) {
        // Kontrollerar att alla obligatoriska inmatningsfält är ifyllda
        if (validate1 == 3) {
            // Skapar en body med uppgifter
            body = {
                'employment': course,
                'employer':   school,
                'start_date': startDate,
                'end_date':   endDate, 
            }
            // PUT-anrop med header och body (JSON)
            fetch(`https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?id=${index}&cat=experience`,
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(body),
            })
                // Konverterar svaret från JSON
                .then(response => response.json())
                // Skriver ut ett bekräftelsemeddelande
                .then(data => {
                    confirm.innerHTML = data.message;
                    confirm.style.display = 'block';
                }
            )
            // Skriver ut ett felmeddelande
            .catch(err => {
                error.innerHTML = err;
                error.style.display = 'block';
            })
            // Tar bort URL-parametern så att funktionen inte körs igen
            history.replaceState(stateObj, '', 'admin.php?cat=experience');
        }
    }
}

// Raderar jobb
function deleteJob() {
    // DELETE-anrop med header
    fetch(`https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?id=${index}&cat=experience`, 
    {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
        // Konverterar svaret från JSON
        .then(response => response.json())
        // Skriver ut ett bekräftelsemeddelande
        .then(data => {
            confirm.innerHTML = data.message;
            confirm.style.display = 'block';
        }
    )
    // Skriver ut ett felmeddelande
    .catch(err => {
        error.innerHTML = err;
        error.style.display = 'block';
    })
    // Tar bort URL-parametern så att funktionen inte körs igen
    history.replaceState(stateObj, '', 'admin.php?cat=experience');
}

// Lägger till webbplatser
function addSite(validate2) {
    // Kontrollen förhindrar att både POST och PUT körs när formuläret skickas
    if (!edit) {
        // Kontrollerar att alla obligatoriska inmatningsfält är ifyllda
        if (validate2 == 3) {
            // Sökväg till en standardbild eftersom det inte går att ladda upp bilder
            imageURL = 'images/standardbild.jpg';
            // Skapar en body med uppgifter
            body = {
                'name':        siteName,
                'img_path':    imageURL,
                'description': siteDescription,
                'url':         siteURL,
            }
            // POST-anrop med header och body (JSON)
            fetch('https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?cat=site', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(body),
            })
                // Konverterar svaret från JSON
                .then(response => response.json())
                // Skriver ut ett bekräftelsemeddelande
                .then(data => {
                    confirm.innerHTML = data.message;
                    confirm.style.display = 'block';
                }
            )
            // Skriver ut ett felmeddelande
            .catch(err => {
                error.innerHTML = err;
                error.style.display = 'block';
            })
        }
    }
}

// Uppdaterar webbplatser
function updateSite(validate2) {
    // Kontrollen förhindrar att både POST och PUT körs när formuläret skickas
    if (edit) {
        // Kontrollerar att alla obligatoriska inmatningsfält är ifyllda
        if (validate2 == 3) {   
            // Skapar en body med uppgifter     
            body = {
                'name':        siteName,
                'description': siteDescription,
                'url':         siteURL,
            }
            // PUT-anrop med header och body (JSON)
            fetch(`https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?id=${index}&cat=site`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(body),
            })
                // Konverterar svaret från JSON
                .then(response => response.json())
                // Skriver ut ett bekräftelsemeddelande
                .then(data => {
                    confirm.innerHTML = data.message;
                    confirm.style.display = 'block';
                }
            )
            // Skriver ut ett felmeddelande
            .catch(err => {
                error.innerHTML = err;
                error.style.display = 'block';
            })
            // Tar bort URL-parametern så att funktionen inte körs igen
            history.replaceState(stateObj, '', 'admin.php?cat=site');
        }
    }
}

// Raderar webbplatser
function deleteSite() {
    // DELETE-anrop med header
    fetch(`https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?id=${index}&cat=site`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',},
    })
        // Konverterar svaret från JSON
        .then(response => response.json())
        // Skriver ut ett bekräftelsemeddelande
        .then(data => {
            confirm.innerHTML = data.message;
            confirm.style.display = 'block';
        }
    )
    // Skriver ut ett felmeddelande
    .catch(err => {
        error.innerHTML = err;
        error.style.display = 'block';
    })
    // Tar bort URL-parametern så att funktionen inte körs igen
    history.replaceState(stateObj, '', 'admin.php?cat=site');
}

// Fyller i formuläret vid redigering av kurser
function prefillCourse() {

    // GET-anrop med utbildningens index
    fetch(`https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?cat=education&id=${index}`)   
        // Konverterar svaret från JSON
        .then(response => response.json()) 
        // Fyller i inmatningsfälten
        .then(data => {
            startDateInput.value = data.education_start_date;
            if (data.education_end_date !== '1989-06-16') {
                endDateInput.value = data.education_end_date;
            }
            educationJob.value = data.course;
            schoolEmployer.value = data.school;
        })
        // Skriver ut felmeddelandet vid misslyckad databasanslutning
        .catch(err => {
            error.innerHTML = err;
            error.style.display = 'block';
        }
    )
}

// Fyller i formuläret vid redigering av jobb
function prefillJob() {

    // GET-anrop med jobbets index
    fetch(`https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?cat=experience&id=${index}`)   
        // Konverterar svaret från JSON
        .then(response => response.json()) 
        // Fyller i inmatningsfälten
        .then(data => {
            startDateInput.value = data.job_start_date;
            if (data.job_end_date !== '1989-06-16') {
                endDateInput.value = data.job_end_date;
            }
            educationJob.value = data.job;
            schoolEmployer.value = data.employer;
        })
        // Skriver ut felmeddelandet vid misslyckad databasanslutning
        .catch(err => {
            error.innerHTML = err;
            error.style.display = 'block';
        }
    )
}

// Fyller i formuläret vid redigering av webbplatser
function prefillSite() {

    // GET-anrop med webbplatsens index
    fetch(`https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?cat=site&id=${index}`)   
        // Konverterar svaret från JSON
        .then(response => response.json()) 
        // Fyller i inmatningsfälten
        .then(data => {
            siteNameInput.value = data.site_name;
            siteDescriptionInput.value = data.site_description;
            siteUrlInput.value = data.site_url;
        })
        // Skriver ut felmeddelandet vid misslyckad databasanslutning
        .catch(err => {
            error.innerHTML = err;
            error.style.display = 'block';
        }
    )
}

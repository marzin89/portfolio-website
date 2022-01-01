'use strict';

// GET-anrop
// Hämtar alla utbildningar
// Kontrollen förhindrar att fetch-anropet körs på någon annan sida
if (window.location.href.indexOf('cv.html') !== -1) {
    const education = document.getElementById('education');
    const experience = document.getElementById('experience');
    fetch('https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?cat=education')   
        // Konverterar svaret från JSON
        .then(response => response.json())    
        // Loopar igenom och skriver ut 
        // Om inget slutdatum finns (default), returneras en tom sträng
        .then(data => data.forEach(element => {
            // Kontrollen görs eftersom utbildningar och jobb ligger i samma array
            if (element.education_id) {
                education.innerHTML += 
                    `<div class="row">
                        <div class="left">
                            <p class="start-date">
                                ${ element.education_start_date } -
                            </p>
                            <p class="end-date">
                                ${ element.education_end_date !== '1989-06-16' ? element.education_end_date : '' }
                            </p>
                        </div>
                        <div class="right">
                            <p class="education-job"> 
                                ${ element.course }
                            </p>
                            <p class="school-employer">
                                ${ element.school }
                            </p>
                        </div>
                    </div>`
                } else if (element.job_id) {
                    experience.innerHTML += 
                    `<div class="row">
                        <div class="left">
                            <p class="start-date">
                                ${ element.job_start_date } -
                            </p>
                            <p class="end-date">
                                ${ element.job_end_date !== '1989-06-16' ? element.job_end_date : '' }
                            </p>
                        </div>
                        <div class="right">
                            <p class="education-job"> 
                                ${ element.job }
                            </p>
                            <p class="school-employer">
                                ${ element.employer }
                            </p>
                        </div>
                    </div>`
                }
            })
        )
        // Skriver ut felmeddelandet vid misslyckad databasanslutning
        .catch(error => {
            education.innerHTML += `<p class="error">${error}</p>`;
        }
    )
}

"use strict";if(-1!==window.location.href.indexOf("cv.html")){var education=document.getElementById("education"),experience=document.getElementById("experience");fetch("https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?cat=education").then((function(n){return n.json()})).then((function(n){return n.forEach((function(n){n.education_id?education.innerHTML+='<div class="row">\n                        <div class="left">\n                            <p class="start-date">\n                                '.concat(n.education_start_date,' -\n                            </p>\n                            <p class="end-date">\n                                ').concat("1989-06-16"!==n.education_end_date?n.education_end_date:"",'\n                            </p>\n                        </div>\n                        <div class="right">\n                            <p class="education-job"> \n                                ').concat(n.course,'\n                            </p>\n                            <p class="school-employer">\n                                ').concat(n.school,"\n                            </p>\n                        </div>\n                    </div>"):n.job_id&&(experience.innerHTML+='<div class="row">\n                        <div class="left">\n                            <p class="start-date">\n                                '.concat(n.job_start_date,' -\n                            </p>\n                            <p class="end-date">\n                                ').concat("1989-06-16"!==n.job_end_date?n.job_end_date:"",'\n                            </p>\n                        </div>\n                        <div class="right">\n                            <p class="education-job"> \n                                ').concat(n.job,'\n                            </p>\n                            <p class="school-employer">\n                                ').concat(n.employer,"\n                            </p>\n                        </div>\n                    </div>"))}))})).catch((function(n){education.innerHTML+='<p class="error">'.concat(n,"</p>"),experience.innerHTML+='<p class="error">'.concat(n,"</p>")}))}var id=0;if(-1!==window.location.href.indexOf("index.html")){var featured=document.getElementById("featured");fetch("https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?cat=site").then((function(n){return n.json()})).then((function(n){return n.forEach((function(n){id<=2&&(featured.innerHTML+='<div class="featured">\n                        <h3 class="site-name">'.concat(n.site_name,'</h3>\n                        <a class="find-out-more" href="website.html?id=').concat(id,'">\n                            <img src="').concat(n.site_image_path,'">\n                        </a>\n                    <div>')),id++}))})).catch((function(n){featured.innerHTML+='<p class="error">'.concat(n,"</p>")}))}var arrow=document.getElementById("back-to-the-top");arrow.addEventListener("click",scrollToTop);var navIcon=document.getElementById("nav-icon");navIcon.addEventListener("click",toggleMenu);var bar1=document.getElementById("icon-bar1"),bar2=document.getElementById("icon-bar2"),bar3=document.getElementById("icon-bar3"),menu=document.getElementById("main-nav-mobile"),count=0;function scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}function toggleMenu(){count&&count%2!=0?count%2&&(menu.style.display="none",navIcon.className=""):(menu.style.display="block",navIcon.className="open"),count++}if(window.addEventListener("resize",(function(){window.innerWidth>768&&(menu.style.display="none")})),-1!==window.location.href.indexOf("portfolio.html")){var portfolio=document.getElementById("portfolio");fetch("https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?cat=site").then((function(n){return n.json()})).then((function(n){return n.forEach((function(n){portfolio.innerHTML+='<div class="site">\n                    <h3 class="site-name">'.concat(n.site_name,'</h3>\n                    <a class="find-out-more" href="website.html?id=').concat(id,'">\n                        <img src="').concat(n.site_image_path,'">\n                    </a>\n                <div>'),id++}))})).catch((function(n){portfolio.innerHTML+='<p class="error">'.concat(n,"</p>")}))}var url=new URL(window.location.href),siteID=url.searchParams.get("id");if(siteID){var title=document.querySelector("title"),site=document.getElementById("site");fetch("https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbtjanst/api/api.php?cat=site&id=".concat(siteID)).then((function(n){return n.json()})).then((function(n){title.innerHTML=n.site_name,site.innerHTML+="<h1>".concat(n.site_name,'</h1>\n                <img src="').concat(n.site_image_path,'">\n                <p>').concat(n.site_description,'</p>\n                <a href="').concat(n.site_url,'">Länk till webbplatsen</a>')})).catch((function(n){site.innerHTML+='<p class="error">'.concat(n,"</p>")}))}
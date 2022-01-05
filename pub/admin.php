<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<?php
    // Inkluderar klasserna
    include_once 'classes/User.php';
    include_once 'classes/Site.php';
    include_once 'classes/Education.php';
    include_once 'classes/Experience.php';

    // Ny session
    session_start();

    // Nya instanser
    $user = new User();

    // Variabler
    $username = $_SESSION['username'];
    $password = $_SESSION['password'];
    $logout = '';

    // Skicka tillbaka användaren till inloggningssidan om användarnamn och/eller lösenord saknas
    if (!$username || !$password) {
        header('Location: https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbplats/login.php');
    }

    // Skicka tillbaka användaren till inloggningssidan
    if (isset($_GET['logout'])) {
        $logout = $_GET['logout'];
        $user->logout($logout);
    }
?>
<body>
    <!-- Header -->
    <header>
        <div id="header-wrapper">
            <!-- Logo -->
            <div id="logo">
                <a href="index.html">
                    <img src="images/logo.png" alt="Logotyp">
                </a>
            </div>
            <div id="header-right">
                <!-- Main desktop navigation -->
                <nav id="main-nav-desktop">
                    <ul>
                        <li><a class="navlink" href="about.html">Om mig</a></li>
                        <li><a class="navlink" href="portfolio.html">Portfolio</a></li>
                        <li><a class="navlink" href="cv.html">CV</a></li>
                        <li><a class="navlink" href="contact.html">Kontakt</a></li>
                    </ul>
                </nav>
                <!-- Search bar and search icon -->
                <div id="search">
                    <input id="search-bar" type="search" value="Sök">
                    <svg id="search-icon" role="button">
                        <circle cx="10" cy="9" r="7" stroke="black" stroke-width="4" fill="white" />
                        <line x1="14" x2="20" y1="14" y2="22" style="stroke:rgb(0,0,0);stroke-width:4" />
                    </svg>
                </div>
                <!-- Hamburger icon -->
                <div id="nav-icon" role="button">
                    <div id="icon-bar1" class="icon-bar"></div>
                    <div id="icon-bar2" class="icon-bar"></div>
                    <div id="icon-bar3" class="icon-bar"></div>
                </div>
            </div>
            <!-- Hamburger menu for smartphone and tablet -->
            <nav id="main-nav-mobile">
                <ul>
                    <li><a class="navlink" href="about.html">Om mig</a></li>
                    <li><a class="navlink" href="portfolio.html">Portfolio</a></li>
                    <li><a class="navlink" href="cv.html">CV</a></li>
                    <li><a class="navlink" href="contact.html">Kontakt</a></li>
                </ul>
            </nav>
        </div>
    </header>
    <!-- Main content -->
    <main>
        <section id="admin">
            <p id="logout"><a href="admin.php?logout=1">Logga ut</a></p>
            <h1 id="h1-admin">Välkommen till admin</h1>
            <p>Här kan du lägga till, redigera eller radera utbildningar, jobb och webbplatser.
                Välj kategori i dropdown-listan nedan så anpassas formuläret. 
                Aktuella poster i den valda visas under formuläret.</p>
            <!-- Form -->
            <form id="admin-form" action="admin.php" method="post" enctype="multipart/form-data">
                <select name="category" id="category" class="text-input">
                    <option value="Utbildning">Utbildning</option>
                    <option value="Jobb">Jobb</option>
                    <option value="Webbplats">Webbplats</option>
                </select>
                <!-- Course/job inputs -->
                <div id="admin-cv-inputs">
                    <div>
                        <input type="text" class="text-input" id="start-date" name="start-date" placeholder="Startdatum (åååå-mm-dd) *">
                        <p id="start-date-error" class="error">Fältet är obligatoriskt.</p>
                    </div>
                    <div>
                        <input type="text" class="text-input" id="end-date" name="end-date" placeholder="Slutdatum (åååå-mm-dd)">
                    </div>
                    <div>
                        <input type="text" class="text-input" id="education-job" name="education" placeholder="Kurs/program *">
                        <p id="education-job-error" class="error">Fältet är obligatoriskt.</p>
                    </div>
                    <div>
                        <input type="text" class="text-input" id="school-employer" name="school" placeholder="Skola/lärosäte *">
                        <p id="school-employer-error" class="error">Fältet är obligatoriskt.</p>
                    </div>
                </div>
                <!-- Website inputs -->
                <div id="admin-site-inputs">
                    <div>
                        <input type="text" class="text-input" id="site-name" placeholder="Namn *">
                        <p id="site-name-error" class="error">Fältet är obligatoriskt.</p>
                    </div>
                    <div>
                        <textarea name="description" id="description" class="text-input" placeholder="Beskrivning *"></textarea>
                        <p id="description-error" class="error">Fältet är obligatoriskt.</p>
                    </div>
                    <div>
                        <input id="url" type="url" class="text-input" name="site-url" placeholder="URL *">
                        <p id="url-error" class="error">Fältet är obligatoriskt.</p>
                    </div>
                </div>
                <input type="reset" class="reset-btn" value="Rensa">
                <input type="submit" class="submit-btn" id="submit" value="Skicka">
                <p id="confirm"></p>
                <p id="error"></p>
            </form>
        </section>
        <!-- Output -->
        <section id="admin-output">
            <h2 id="h1-admin-output">Utbildning</h2>
        </section>
    </main>
    <!-- Footer -->
    <footer>
        <div id="footer-wrapper">
            <!-- Email and GitHub links -->
            <div id="contact">
                <div id="contact-inner-wrap">
                    <p id="email"><a class="navlink" href="mailto:mazi2001@student.miun.se">E-post</a></p>
                    <p id="github"><a class="navlink" href="https://github.com/marzin89">GitHub</a></p>
                </div>
            </div>
            <!-- Footer navigation -->
            <div id="footer-nav">
                <div id="footer-nav-inner-wrap">
                    <p><a class="navlink" href="about.html">Om mig</a></p>
                    <p><a class="navlink" href="portfolio.html">Portfolio</a></p>
                    <p><a class="navlink" href="cv.html">CV</a></p>
                    <p><a class="navlink" href="contact.html">Kontakt</a></p>
                </div>
            </div>
            <!-- Copyright -->
            <div id="copyright-wrapper">
                <p id="copyright">Copyright 2021</p>
            </div>
            <!-- "Back-to-the-top-button" -->
            <svg id="back-to-the-top" role="button">
                <line x1="5" x2="20" y1="17" y2="5" style="stroke:rgb(0,0,0);stroke-width:4" />
                <line x1="20" x2="35" y1="5" y2="17" style="stroke:rgb(0,0,0);stroke-width:4" />
            </svg>       
        </div>
    </footer>
    <script src="js/main.js"></script>
    <script src="js/admin.js"></script>
</body>
</html>
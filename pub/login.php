<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Logga in</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<?php

    // Inkluderar klasserna
    include_once 'classes/Database.php';
    include_once 'classes/User.php';

    // Ny session
    session_start();

    // Variabler
    $username = '';
    $password = '';
    $user_empty = '';
    $pass_empty = '';
    $validation_error = '';

    // Ny instanser
    $database = new Database();
    $user = new User();

    // Lagrar inloggningsuppgifterna eller genererar felmeddelanden om någon uppgift saknas
    if (!empty($_POST['username'])) {
        $_SESSION['username'] = $_POST['username'];
        $username = $_SESSION['username'];
    } else {
        $user_empty = 'Användarnamn måste anges.';
    }

    if (!empty($_POST['password'])) {
        $_SESSION['password'] = $_POST['password'];
        $password = $_SESSION['password'];   
    } else {
        $pass_empty = 'Lösenord måste anges.';
    }

    // Skickar användaren till admin-sidan om användarnamn och lösenord är korrekta
    if ($username && $password) {
        if ($user->login($username, $password)) {
            header('Location: https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbplats/admin.php?cat=education');
        } else {
            $validation_error = 'Fel användarnamn eller lösenord.';
        }
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
        <!-- Login form -->
        <section id="login-form">
            <h1 id="h1-login">Logga in</h1>
            <p><a id="sign-up-link" href="signup.php">Registrera dig</a></p>
            <form action="login.php?submit=1" method="post">
                <div>
                    <input id="username" class="text-input" type="text" placeholder="Användarnamn *" name="username">
                    <p id="user-error" class="error">
                        <?php
                            // Skriver ut eventuellt felmeddelande
                            if ($user_empty) {
                                echo $user_empty;
                            }
                        ?>
                    </p>
                </div>
                <div>
                    <input id="password" class="text-input" type="password" placeholder="Lösenord *" name="password">
                    <p id="password-error" class="error">
                        <?php
                            // Skriver ut eventuellt felmeddelande
                            if ($pass_empty) {
                                echo $pass_empty;
                            }
                        ?>
                    </p>
                </div>
                <input id="submit" class="submit-btn" type="submit" value="Logga in">
                <p id="validation-error">
                    <?php
                        // Skriver ut eventuellt felmeddelande
                        if ($validation_error) {
                            echo $validation_error;
                        }
                    ?>
                </p>
            </form>
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
                    <p><a class="navlink" href="cv.html"></a>CV</p>
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
    <script src="js/login.js"></script>
</body>
</html>
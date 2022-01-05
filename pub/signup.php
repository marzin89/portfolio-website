<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrera dig</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<?php

    // Inkluderar klasserna
    include_once 'classes/Database.php';
    include_once 'classes/User.php';

    // Variabler
    $first_name;
    $last_name;
    $email;
    $username;
    $password;
    $first_name_error;
    $last_name_error;
    $email_error;
    $email_format_error;
    $username_error;
    $password_error;
    $password_length_error;

    // Nya instanser
    $database = new Database();
    $user = new User();

    /* Lagrar användaruppgifterna och genererar felmeddelanden om någon uppgift saknas,
        har fel format eller om användarnamn och/eller lösenord är upptagna */
    if (!empty($_POST['first-name'])) {
        $first_name = $_POST['first-name'];
    } else {
        $first_name_error = 'Förnamn måste anges.';
    }

    if (!empty($_POST['last-name'])) {
        $last_name = $_POST['last-name'];
    } else {
        $last_name_error = 'Efternamn måste anges.';
    }

    if (!empty($_POST['email'])) {
        $email = $_POST['email'];
        if (!strpos($email, '@')) {
            $email_format_error = 'Ogiltig e-postadress.';
            $email = '';
        }
    } else {
        $email_error = 'E-post måste anges.';
    }

    if (!empty($_POST['username'])) {
        $username = $_POST['username'];
        if (!$user->checkUsername($username)) {
            $username_error = 'Användarnamnet är upptaget.';
            $username = '';
        }
    } else {
        $username_error = 'Användarnamn måste anges.';
    }

    if (!empty($_POST['password'])) {
        $password = $_POST['password'];
        if (strlen($password) < 10) {
            $password_length_error = 'Lösenordet är för kort (minst 10 tecken).';
            $password = '';
        }
        if (!$user->checkPassword($password)) {
            $password_error = 'Lösenordet är upptaget.';
            $password = '';
        }
    } else {
        $password_error = 'Lösenord måste anges.';
    }

    // Skapar användarkontot när alla uppgifter finns och är korrekta
    if ($username && $password && $email && $first_name && $last_name) {
        $user->setUsername($username);
        $user->setPassword($password);
        $user->setFirstName($first_name);
        $user->setLastName($last_name);
        $user->setEmail($email);
        $user->createUserAccount();
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
        <!-- Signup form -->
        <section id="login-form">
            <h1 id="h1-login">Registrera dig</h1>
            <p id="login-link"><a href="login.php">Logga in</a></p>
            <form action="signup.php?submit=1" method="post">
                <div>
                    <input id="first-name" class="text-input" type="text" placeholder="Förnamn *" name="first-name">
                    <p id="first-name-error" class="error">
                        <?php
                            // Skriver ut eventuellt felmeddelande
                            if ($first_name_error) {
                                echo $first_name_error;
                            }
                        ?>
                    </p>
                </div>
                <div>
                    <input id="last-name" class="text-input" type="text" placeholder="Efternamn *" name="last-name">
                    <p id="last-name-error" class="error">
                        <?php
                            // Skriver ut eventuellt felmeddelande
                            if ($last_name_error) {
                                echo $last_name_error;
                            }
                        ?>
                    </p>
                </div>
                <div>
                    <input id="email-input" class="text-input" type="text" placeholder="E-post *" name="email">
                    <p id="email-error" class="error">
                        <?php
                            // Skriver ut eventuellt felmeddelande
                            if ($email_error) {
                                echo $email_error;
                            }

                            if ($email_format_error) {
                                echo $email_format_error;
                            }
                        ?>
                    </p>
                </div>
                <div>
                    <input id="username" class="text-input" type="text" placeholder="Användarnamn *" name="username">
                    <p id="username-error" class="error">
                        <?php
                            // Skriver ut eventuellt felmeddelande
                            if ($username_error) {
                                echo $username_error;
                            }
                        ?>
                    </p>
                </div>
                <div>
                    <input id="password" class="text-input" type="password" placeholder="Lösenord (minst 10 tecken) *" 
                        name="password">
                    <p id="password-error" class="error">
                        <?php
                            // Skriver ut eventuellt felmeddelande
                            if ($password_error) {
                                echo $password_error;
                            }

                            if ($password_length_error) {
                                echo $password_length_error;
                            }
                        ?>
                    </p>
                </div>
                <input class="reset-btn" type="reset" value="Rensa">
                <input id="submit" class="submit-btn" type="submit" value="Skicka">
                <p id="confirm">
                    <?php
                        // Skriver ut eventuellt bekräftelsemeddelande
                        if ($user->confirm) {
                            echo $user->confirm;
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
    <script src="js/signup.js"></script>
</body>
</html>

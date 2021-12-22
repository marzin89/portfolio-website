<?php
// Inkluderar databasklassen
include_once 'Database.php';

// Klass som hanterar användare
class User {

    // Properties
    private $username;
    private $password;
    private $first_name;
    private $last_name;
    private $email;
    public $login;
    public $logout;
    public $error;
    public $confirm;
    public $conn;

    // Metoder
    // Konstruerare
    public function __construct() {
        $database = new Database();
        $this->conn = $database->conn;

        if ($database->error) {
            $this->error = $database->error;
        }
    }

    // Inloggning
    public function login($username, $password): bool {
        $query = $this->conn->prepare('SELECT * FROM user_portfolio_2 WHERE username = ? AND `password` = ?');
        $query->bind_param('ss', $username, $password);
        $query->execute();
        $result = $query->get_result();

        if (!$user = $result->fetch_assoc()) {
            $this->error = 'Fel användarnamn eller lösenord.';
            return false;
        } else {
            return true;
        }
    }

    // Utloggning
    public function logout($logout): bool {
        if ($logout) {
            $_SESSION = [];
            session_destroy();
            header('Location: https://studenter.miun.se/~mazi2001/writeable/dt173g/projekt/webbplats/login.php');
            return true;      
        } else {
            return false;
        }
    }

    // Kontrollerar om användarnamnet är upptaget
    public function checkUsername($username): bool {
        $query = $this->conn->prepare('SELECT * FROM user_portfolio_2 WHERE username = ?');
        $query->bind_param('s', $username);
        $query->execute();
        $result = $query->get_result();

        if ($user = $result->fetch_assoc()) {
            return false;
        } else {
            return true;
        }
    }

    // Kontrollerar om lösenordet är upptaget
    public function checkPassword($password): bool {
        $query = $this->conn->prepare('SELECT * FROM user_portfolio_2 WHERE `password` = ?');
        $query->bind_param('s', $password);
        $query->execute();
        $result = $query->get_result();

        if ($user = $result->fetch_assoc()) {
            return false;
        } else {
            return true;
        }
    }

    // Skapar ett nytt användarkonto
    public function createUserAccount(): bool {
        $query = $this->conn->prepare('INSERT INTO user_portfolio_2 (username, `password`, 
            first_name, last_name, email) VALUES (?, ?, ?, ?, ?)');
        $query->bind_param('sssss', $this->username, $this->password, $this->first_name, 
            $this->last_name, $this->email);
        $query->execute();

        if (!$query->connect_error) {
            $this->confirm = 'Du har registrerats.';
            return true;
        } else {
            return false;
        }
    }

    // Setters
    // Användarnamn
    public function setUsername($username) {
        $this->username = $username;
    }

    // Lösenord
    public function setPassword($password) {
        $this->password = $password;
    }

    // Förnamn
    public function setFirstName($first_name) {
        $this->first_name = $first_name;
    }

    // Efternamn
    public function setLastName($last_name) {
        $this->last_name = $last_name;
    }

    // E-post
    public function setEmail($email) {
        $this->email = $email;
    }
}
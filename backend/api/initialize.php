<?php
require_once("config.php");
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

// sql to create table
$sql = "CREATE TABLE IF NOT EXISTS Users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    login VARCHAR(64) UNIQUE NOT NULL,
    password VARCHAR(64) NOT NULL,
    email VARCHAR(64) UNIQUE NOT NULL,
    reference INT(6) UNSIGNED,
    registration_date DATE NOT NULL,
    active INT(1) UNSIGNED NOT NULL,
    activation_code VARCHAR(64),
    token VARCHAR(64),
    FOREIGN KEY (reference) REFERENCES Users(id)
    )";
    
if ($conn->query($sql) === TRUE) {
    echo "Table Books created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

// sql to create table
$sql = "CREATE TABLE IF NOT EXISTS Books (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    author_forename TINYTEXT NOT NULL,
    author_surname TINYTEXT NOT NULL,
    title TINYTEXT NOT NULL,
    isbn TINYTEXT NOT NULL,
    publish_year INT(4) UNSIGNED NOT NULL,
    publishing_house TINYTEXT NOT NULL,
    date_added DATE NOT NULL,
    owner INT(6) UNSIGNED NOT NULL,
    FOREIGN KEY (owner) REFERENCES Users(id)
    )";

if ($conn->query($sql) === TRUE) {
    echo "Table Books created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

// sql to create table
$sql = "CREATE TABLE IF NOT EXISTS Borrowings (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    book INT(6) UNSIGNED NOT NULL,
    borrower INT(6) UNSIGNED,
    borrower_external TINYTEXT,
    date_borrowed DATE NOT NULL,
    date_returned DATE NOT NULL,
    return_confirmed INT(1) UNSIGNED NOT NULL,
    FOREIGN KEY (book) REFERENCES Books(id),
    FOREIGN KEY (borrower) REFERENCES Users(id)
    )";

if ($conn->query($sql) === TRUE) {
    echo "Table Possession created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();
?>

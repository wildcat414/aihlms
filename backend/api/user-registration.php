<?php
require_once("./config.php");

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_errno) {
    printf("Connect failed: %s\n", $conn->connect_error);
    exit();
}

$conn->query("SET collation_connection = utf8_unicode_ci");

$userData = file_get_contents('php://input');
$userDataArr = json_decode($userData, true);

$email = $userDataArr['email'];
$login = $userDataArr['login'];
$password = $userDataArr['password'];
$reference = intval($userDataArr['reference']);
$activation_code = generateRandomSequence();
$today = date("Y-m-d");

if($reference != 0) {
    $query = 'INSERT INTO Users(id, login, password, email, reference, registration_date, active, activation_code) VALUES (\'\', \''. $login .'\', \''. $password .'\', \''. $email .'\', '. $reference .', \''. $today .'\', 0, \''. $activation_code .'\')';
} else {
    $query = 'INSERT INTO Users(id, login, password, email, reference, registration_date, active, activation_code) VALUES (\'\', \''. $login .'\', \''. $password .'\', \''. $email .'\', NULL, \''. $today .'\', 0, \''. $activation_code .'\')';
}

$result = $conn->query($query);
$conn->close();

if($result != FALSE) {
    $dbstatus = TRUE;
} else {
    $dbstatus = FALSE;
}

$to = $email;
$subject = "Potwierdzenie rejestracji";

$message = "
<html>
<h1>HLMS</h1>
<h2>System zarządzania domową biblioteką</h2>
<p>Witaj ". $login ."!</p>
<p>Niniejszy e-mail stanowi potwierdzenie rejestracji w Home Library Mangement System.</p>
<p>Aby aktywować swoje konto, kliknij w poniższy link aktywacyjny:<br>
<a target=\"_blank\" href=\"http://hlmstest.hekko24.pl/#/activate/" . $activation_code ."\">http://hlmstest.hekko24.pl/#/activate/" . $activation_code ."</a></p>
</html>
";

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: Biblioteka <noreply@hlmstest.hekko24.pl>' . "\r\n";

if($dbstatus == TRUE) {
    $mailstatus = mail($to,$subject,$message,$headers);
} else {
    $mailstatus = FALSE;
}


if($dbstatus == TRUE && $mailstatus == TRUE) {
    $return_arr["status"] = "ok";
    $return_arr["details"] = "User has been successfully added to database and confirmation e-mail has been sent.";
} elseif($dbstatus == TRUE && $mailstatus == FALSE) {
    $return_arr["status"] = "error";
    $return_arr["details"] = "User saved to database, but confirmation e-mail could not be sent.";
} else {
    $return_arr["status"] = "error";
    $return_arr["details"] = "Error occurred while creating user. Could not save user to database.";
}

echo json_encode($return_arr, JSON_UNESCAPED_UNICODE);

?>

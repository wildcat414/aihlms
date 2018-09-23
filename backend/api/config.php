<?php
$servername = "localhost";
$username = "database_username";
$password = "database_password";
$dbname = "database_name";

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
header('Content-type: application/json;');

function generateRandomSequence() {
    $seq = "";
    for($i = 0; $i < 64; $i++) {
        $randomNum = rand(0, 15);
        $randomHex = base_convert($randomNum, 10, 16);
        $seq .= $randomHex;
    }
    return $seq;
}
?>

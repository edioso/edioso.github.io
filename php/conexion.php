<?php
$host = "localhost";
$user = "root";
$pass = "4dm1n365";
$dbname = "energia_renovable";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("❌ Error de conexión: " . $conn->connect_error);
}

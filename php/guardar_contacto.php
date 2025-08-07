<?php
$host = "localhost";
$user = "root";
$pass = "4dm1n365";
$dbname = "energia_renovable";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("❌ Error de conexión: " . $conn->connect_error);
}

$stmt = $conn->prepare("INSERT INTO contacto_energia (nombre, email, mensaje) VALUES (?, ?, ?)");
if (!$stmt) {
    die("Error en prepare(): " . $conn->error);
}

$stmt->bind_param("sss", $_POST["nombre"], $_POST["correo"], $_POST["mensaje"]);

if ($stmt->execute()) {
    echo "✅ Contacto guardado correctamente.";
} else {
    echo "❌ Error al guardar: " . $stmt->error;
}

$stmt->close();
$conn->close();

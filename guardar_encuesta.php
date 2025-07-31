<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST['nombre']);
    $correo = htmlspecialchars($_POST['correo']);
    $energia = htmlspecialchars($_POST['energia']);

    $linea = "$nombre, $correo, $energia" . PHP_EOL;

    file_put_contents("respuestas.txt", $linea, FILE_APPEND);

    echo "<h2>Gracias por responder la encuesta.</h2>";
    echo "<a href='encuesta.html'>Volver</a>";
} else {
    echo "Acceso no permitido.";
}
?>

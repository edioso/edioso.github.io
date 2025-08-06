<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Resultado Encuesta</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>

<body class="bg-gray-50 min-h-screen">

    <header class="bg-green-700 w-full shadow-md z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <img src="../assets/solar2-removebg-preview.png" alt="Logo" class="h-20 w-auto">
                </div>
                <nav class="space-x-6">
                    <a href="home.html" class="text-white hover:text-green-200 font-medium text-lg">Inicio</a>
                    <a href="aboutus.html" class="text-white hover:text-green-200 font-medium text-lg">Sobre Nosotros</a>
                    <a href="Calculadora.html" class="text-white hover:text-green-200 font-medium text-lg">Calcular</a>
                    <a href="contact.html" class="text-white hover:text-green-200 font-medium text-lg">Contacto</a>
                </nav>
            </div>
        </div>
    </header>

    <main class="flex items-center justify-center py-10 px-4">
        <?php
        // Incluir conexión
        include("php/conexion.php");

        // Verificar si se enviaron todos los campos esperados
        if (
            isset($_POST['nombre']) && isset($_POST['correo']) &&
            isset($_POST['ciudad']) && isset($_POST['conocidas']) &&
            isset($_POST['energia']) && isset($_POST['usoHogar']) &&
            isset($_POST['nivelEducativo']) && isset($_POST['comentarios'])
        ) {
            // Asignar datos con seguridad
            $nombre = trim($_POST['nombre']);
            $correo = trim($_POST['correo']);
            $ciudad = trim($_POST['ciudad']);
            $conocidas = trim($_POST['conocidas']);
            $energia = trim($_POST['energia']);
            $usoHogar = trim($_POST['usoHogar']);
            $nivelEducativo = trim($_POST['nivelEducativo']);
            $comentarios = trim($_POST['comentarios']);

            // Preparar SQL
            $sql = "INSERT INTO encuesta (nombre, correo, ciudad, conocidas, energia, usoHogar, nivelEducativo, comentarios) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

            if ($stmt = $conn->prepare($sql)) {
                $stmt->bind_param("ssssssss", $nombre, $correo, $ciudad, $conocidas, $energia, $usoHogar, $nivelEducativo, $comentarios);

                if ($stmt->execute()) {
                    echo '
                    <div class="bg-green-100 text-green-800 p-6 rounded shadow-md text-2xl font-semibold text-center w-full max-w-xl">
                        ✅ ¡Gracias por su información!
                    </div>';
                } else {
                    echo '
                    <div class="bg-red-100 text-red-800 p-6 rounded shadow-md text-lg font-semibold text-center w-full max-w-xl">
                        ❌ Error al guardar: ' . htmlspecialchars($stmt->error) . '
                    </div>';
                }

                $stmt->close();
            } else {
                echo '
                <div class="bg-red-100 text-red-800 p-6 rounded shadow-md text-lg font-semibold text-center w-full max-w-xl">
                    ❌ Error en la preparación: ' . htmlspecialchars($conn->error) . '
                </div>';
            }

            $conn->close();
        } else {
            echo '
            <div class="bg-yellow-100 text-yellow-800 p-6 rounded shadow-md text-lg font-semibold text-center w-full max-w-xl">
                ⚠️ Faltan datos en el formulario. Por favor, complete todos los campos.
            </div>';
        }
        ?>
    </main>

</body>

</html>
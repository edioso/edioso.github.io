document.addEventListener("DOMContentLoaded", function () {
  fetch("../datos/participacion_renovables.csv?t=" + new Date().getTime())

    .then(response => response.text())
    .then(csvText => {
      const lines = csvText.trim().split("\n");
      const labels = [];
      const data = [];

      // Saltamos encabezado
      for (let i = 1; i < lines.length; i++) {
        const [energia, participacion] = lines[i].split(",");
        labels.push(energia.trim());
        data.push(parseFloat(participacion.trim()));
      }

      const ctx = document.getElementById("graficoTorta").getContext("2d");

      new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [{
            label: "Participación (%)",
            data: data,
            backgroundColor: [
              "#60a5fa", // azul
              "#facc15", // amarillo
              "#4ade80", // verde
              "#fb923c", // naranja
              "#c084fc"  // morado
            ],
            borderColor: "#ffffff",
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Participación de Energías Renovables en el Consumo Eléctrico",
              font: {
                size: 18
              },
              color: "#1f2937"
            },
            legend: {
              position: "bottom"
            }
          }
        }
      });
    });
});
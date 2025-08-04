document.addEventListener("DOMContentLoaded", function () {
  fetch("../datos/produccion_energia.csv")
    .then(response => response.text())
    .then(data => {
      const filas = data.trim().split("\n").slice(1); // Omitir encabezado
      const labels = [];
      const valores = [];

      filas.forEach(fila => {
        const [fuente, produccion] = fila.split(",");
        labels.push(fuente.trim());
        valores.push(parseFloat(produccion.trim()));
      });

      const ctx = document.getElementById("graficoBarras").getContext("2d");

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [{
            label: "Producción (GWh)",
            data: valores,
            backgroundColor: [
              "#60a5fa", "#facc15", "#4ade80", "#fb923c", "#c084fc"
            ],
            borderRadius: 5
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: "Producción de Energía Renovable por Fuente",
              font: {
                size: 18
              },
              color: "#1f2937"
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "GWh"
              }
            }
          }
        }
      });
    })
    .catch(error => console.error("Error al cargar el CSV:", error));
});

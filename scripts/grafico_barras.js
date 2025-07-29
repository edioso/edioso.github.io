document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("graficoBarras").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "Eólica",
        "Solar",
        "Hidráulica",
        "Biocombustibles",
        "Geotérmica"
      ],
      datasets: [
        {
          label: "Producción (GWh)",
          data: [4200, 3500, 6000, 1800, 900], // Datos simulados
          backgroundColor: [
            "#60a5fa",
            "#facc15",
            "#4ade80",
            "#fb923c",
            "#c084fc"
          ],
          borderRadius: 5
        }
      ]
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
});

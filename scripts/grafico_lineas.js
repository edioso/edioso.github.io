
document.addEventListener("DOMContentLoaded", function () {
  fetch("../datos/capacidad_instalada.csv")
    .then(response => response.text())
    .then(csvText => {
      const lines = csvText.trim().split("\n");
      const headers = lines[0].split(",");
      const años = [];
      const datosEolica = [];
      const datosSolar = [];
      const datosGeotermica = [];

      for (let i = 1; i < lines.length; i++) {
        const [año, eolica, solar, geotermica] = lines[i].split(",");
        años.push(año);
        datosEolica.push(parseFloat(eolica));
        datosSolar.push(parseFloat(solar));
        datosGeotermica.push(parseFloat(geotermica));
      }

      const ctx = document.getElementById("graficoLineas").getContext("2d");

      new Chart(ctx, {
        type: "line",
        data: {
          labels: años,
          datasets: [
            {
              label: "Eólica (GW)",
              data: datosEolica,
              borderColor: "#60a5fa",
              backgroundColor: "#60a5fa33",
              fill: false
            },
            {
              label: "Solar (GW)",
              data: datosSolar,
              borderColor: "#facc15",
              backgroundColor: "#facc1533",
              fill: false
            },
            {
              label: "Geotérmica (GW)",
              data: datosGeotermica,
              borderColor: "#4ade80",
              backgroundColor: "#4ade8033",
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Tendencia de Capacidad Instalada de Energías Renovables (GW)",
              font: {
                size: 18
              }
            },
            legend: {
              position: "bottom"
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Año"
              }
            },
            y: {
              title: {
                display: true,
                text: "Capacidad Instalada (GW)"
              },
              beginAtZero: true
            }
          }
        }
      });
    });
});


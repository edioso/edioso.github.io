
document.addEventListener("DOMContentLoaded", function () {
  fetch("../datos/participacion_renovables.csv")
    .then(response => response.text())
    .then(csvText => {
      const lines = csvText.trim().split("\n");
      const labels = [];
      const data = [];

      // Saltamos la primera línea (encabezados)
      for (let i = 1; i < lines.length; i++) {
        const [tipo, porcentaje] = lines[i].split(",");
        labels.push(tipo);
        data.push(parseFloat(porcentaje));
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
              "#60a5fa",
              "#facc15",
              "#4ade80",
              "#fb923c",
              "#c084fc"
            ],
            borderWidth: 1
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


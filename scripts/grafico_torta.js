document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("graficoTorta");

  if (ctx) {
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Energía Solar", "Energía Eólica", "Hidroeléctrica", "Otras Renovables"],
        datasets: [{
          label: "Participación en consumo eléctrico (%)",
          data: [25, 35, 30, 10], // Reemplaza con tus datos reales si los tienes
          backgroundColor: [
            "#FACC15", // solar
            "#60A5FA", // wind
            "#34D399", // hydro
            "#F87171"  // otras
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Participación de Energías Renovables",
            font: {
              size: 18
            }
          }
        }
      }
    });
  } else {
    console.warn("No se encontró el canvas con id 'graficoTorta'");
  }
});

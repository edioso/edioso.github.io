const ctx = document.getElementById('grafico').getContext('2d');

let chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Solar', 'Eólica', 'Hidro'],
    datasets: [{
      label: 'TWh',
      data: [350, 500, 800],
      backgroundColor: ['#f59e0b', '#3b82f6', '#10b981']
    }]
  },
  options: {
    responsive: true
  }
});

const contenedorGrafico = document.getElementById("contenedorGrafico");
const contenedorTabla = document.getElementById("contenedorTabla");

document.getElementById("btnBar").addEventListener("click", () => {
  chart.config.type = 'bar';
  chart.update();
  contenedorGrafico.classList.remove("hidden");
  contenedorTabla.classList.add("hidden");
});

document.getElementById("btnLinea").addEventListener("click", () => {
  chart.config.type = 'line';
  chart.update();
  contenedorGrafico.classList.remove("hidden");
  contenedorTabla.classList.add("hidden");
});

document.getElementById("btnTabla").addEventListener("click", () => {
  contenedorGrafico.classList.add("hidden");
  contenedorTabla.classList.remove("hidden");
});


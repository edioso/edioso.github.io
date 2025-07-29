document.addEventListener("DOMContentLoaded", () => {
  const barCtx = document.getElementById("barChart").getContext("2d");
  const lineCtx = document.getElementById("lineChart").getContext("2d");
  const pieCtx = document.getElementById("pieChart").getContext("2d");

  new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo'],
      datasets: [{
        label: 'Proyectos',
        data: [5, 8, 3],
        backgroundColor: ['#4ade80', '#22d3ee', '#a78bfa'],
      }]
    }
  });

  new Chart(lineCtx, {
    type: 'line',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo'],
      datasets: [{
        label: 'Innovaciones',
        data: [2, 6, 4],
        borderColor: '#f472b6',
        backgroundColor: '#fce7f3',
        fill: true,
      }]
    }
  });

  new Chart(pieCtx, {
    type: 'pie',
    data: {
      labels: ['Público', 'Privado', 'Mixto'],
      datasets: [{
        data: [40, 30, 30],
        backgroundColor: ['#facc15', '#34d399', '#60a5fa'],
      }]
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const ctx = document.getElementById('areaChart').getContext('2d');

  const areaChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [{
        label: 'Crecimiento de usuarios',
        data: [50, 80, 60, 120, 180, 200],
        fill: true, // Esto genera el "área"
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Área debajo de la línea
        borderColor: 'rgba(75, 192, 192, 1)',       // Línea
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Gráfico de Área - Usuarios por Mes'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});

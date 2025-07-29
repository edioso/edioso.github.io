// 1. Gráfico Comparación Convencional vs Solar
const ctxComparacion = document.getElementById('graficoComparacion').getContext('2d');
new Chart(ctxComparacion, {
  type: 'line',
  data: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Convencional (COP)',
        data: Array(12).fill(180000),
        borderColor: '#dc2626',
        backgroundColor: 'rgba(220, 38, 38, 0.2)',
        fill: true,
        tension: 0.3
      },
      {
        label: 'Con Energía Solar (COP)',
        data: Array(12).fill(180000 * 0.2),
        borderColor: '#16a34a',
        backgroundColor: 'rgba(22, 163, 74, 0.2)',
        fill: true,
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true
  }
});

// 2. Gráfico de Barras
new Chart(document.getElementById('graficoBarras'), {
  type: 'bar',
  data: {
    labels: ['Eólica', 'Solar', 'Hidroeléctrica', 'Biocombustibles', 'Geotérmica'],
    datasets: [{
      label: 'Producción (TWh)',
      data: [650, 480, 1200, 320, 150],
      backgroundColor: [
        '#4ade80', '#facc15', '#38bdf8', '#f97316', '#a855f7'
      ]
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'TWh' }
      }
    }
  }
});

// 3. Gráfico Circular
new Chart(document.getElementById('graficoTorta'), {
  type: 'pie',
  data: {
    labels: ['Solar', 'Eólica', 'Hidro', 'Biomasa'],
    datasets: [{
      label: 'Participación %',
      data: [30, 25, 35, 10],
      backgroundColor: ['#facc15', '#60a5fa', '#4ade80', '#fb923c']
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  }
});

// 4. Gráfico de Líneas
new Chart(document.getElementById('graficoLineas'), {
  type: 'line',
  data: {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
    datasets: [
      {
        label: 'Eólica (GW)',
        data: [350, 400, 450, 500, 560, 620, 700],
        borderColor: '#3b82f6',
        fill: false,
        tension: 0.3
      },
      {
        label: 'Solar (GW)',
        data: [180, 240, 300, 400, 520, 660, 800],
        borderColor: '#fbbf24',
        fill: false,
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Capacidad (GW)' }
      }
    }
  }
});

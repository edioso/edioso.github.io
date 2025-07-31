const form = document.getElementById("formulario");
const resultado = document.getElementById("resultado");
const ahorroEl = document.getElementById("ahorro");
const costoSolarEl = document.getElementById("costoSolar");
const tiempoRetornoEl = document.getElementById("tiempoRetorno");
const panelesEl = document.getElementById("panelesNecesarios");
const ctx = document.getElementById("grafico").getContext("2d");
let grafico;

// 🎯 Evento para procesar el formulario
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const consumoKwh = parseFloat(document.getElementById("kwh").value);
  const pagoMensual = parseFloat(document.getElementById("pago").value);

  const precioKwhColombia = 800; // COP por kWh (valor promedio)
  const costoEstimado = consumoKwh * precioKwhColombia;
  const ahorro = pagoMensual - costoEstimado;

  // Mostrar valor de referencia nacional
  document.getElementById("valorPromedioKwh").textContent =
    `📊 En Colombia, se estima que el costo promedio del kWh es de $${precioKwhColombia.toLocaleString()} COP.`;

  // Validación de datos
  if (
    isNaN(consumoKwh) || isNaN(pagoMensual) ||
    consumoKwh <= 0 || pagoMensual <= 0
  ) {
    alert("Por favor, ingresa valores válidos.");
    return;
  }

  // Parámetros del sistema solar
  const produccionPorPanel = 35; // kWh por mes
  const ahorroPorcentaje = 0.80;
  const costoPorPanel = 1500000;

  // Cálculos
  const ahorroMensual = pagoMensual * ahorroPorcentaje;
  const gastoConSolar = pagoMensual - ahorroMensual;
  const ahorroAnual = ahorroMensual * 12;

  const panelesNecesarios = Math.ceil((consumoKwh * ahorroPorcentaje) / produccionPorPanel);
  const costoTotal = panelesNecesarios * costoPorPanel;
  const tiempoRetorno = Math.ceil(costoTotal / (ahorroMensual || 1));

  const costoKwh = pagoMensual / consumoKwh;

  // Mostrar resultados
  document.getElementById("costoPorKwh").textContent =
    `💡 Estás pagando aproximadamente $${costoKwh.toFixed(2)} COP por cada kWh.`;

  resultado.classList.remove("hidden");
  ahorroEl.textContent =
    `✅ Estás pagando aproximadamente $${pagoMensual.toLocaleString()} al mes. Con energía solar podrías ahorrar cerca de $${ahorroMensual.toLocaleString()} cada mes ($${ahorroAnual.toLocaleString()} al año).`;
  panelesEl.textContent =
    `🔋 Necesitarías aproximadamente ${panelesNecesarios} panel(es) solares para cubrir el 80% de tu consumo.`;
  costoSolarEl.textContent =
    `💰 Inversión estimada: $${costoTotal.toLocaleString()} COP (incluyendo instalación).`;
  tiempoRetornoEl.textContent =
    `⏳ Recuperarías la inversión en aproximadamente ${tiempoRetorno} meses.`;

  // Gráfico
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const convencional = Array(12).fill(pagoMensual);
  const renovable = Array(12).fill(gastoConSolar);

  if (grafico) grafico.destroy();

  grafico = new Chart(ctx, {
    type: 'line',
    data: {
      labels: meses,
      datasets: [
        {
          label: 'Energía Convencional',
          data: convencional,
          borderColor: '#dc2626',
          backgroundColor: 'rgba(220, 38, 38, 0.2)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Energía Solar',
          data: renovable,
          borderColor: '#16a34a',
          backgroundColor: 'rgba(22, 163, 74, 0.2)',
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: '#333' } }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: '#333' }
        },
        x: {
          ticks: { color: '#333' }
        }
      }
    }
  });
});

// 🔁 Botón de reseteo
document.getElementById("resetBtn").addEventListener("click", function () {
  form.reset();
  resultado.classList.add("hidden");

  document.getElementById("costoPorKwh").textContent = "";
  document.getElementById("valorPromedioKwh").textContent = "";
  ahorroEl.textContent = "";
  costoSolarEl.textContent = "";
  tiempoRetornoEl.textContent = "";
  panelesEl.textContent = "";

  if (grafico) {
    grafico.destroy();
    grafico = null;
  }
});

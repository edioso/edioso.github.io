 const form = document.getElementById("formulario");
    const resultado = document.getElementById("resultado");
    const ahorroEl = document.getElementById("ahorro");
    const costoSolarEl = document.getElementById("costoSolar");
    const tiempoRetornoEl = document.getElementById("tiempoRetorno");
    const panelesEl = document.getElementById("panelesNecesarios");
    const ctx = document.getElementById("grafico").getContext("2d");
    let grafico;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const consumoKwh = parseFloat(document.getElementById("kwh").value);
      const pagoMensual = parseFloat(document.getElementById("pago").value);

      if (isNaN(consumoKwh) || isNaN(pagoMensual) || consumoKwh <= 0 || pagoMensual <= 0) {
        alert("Por favor, ingresa valores válidos.");
        return;
      }

      const produccionPorPanel = 35;
      const ahorroPorcentaje = 0.80;
      const costoPorPanel = 1500000;

      const ahorroMensual = pagoMensual * ahorroPorcentaje;
      const gastoConSolar = pagoMensual - ahorroMensual;
      const ahorroAnual = ahorroMensual * 12;

      const panelesNecesarios = Math.ceil((consumoKwh * ahorroPorcentaje) / produccionPorPanel);
      const costoTotal = panelesNecesarios * costoPorPanel;
      const tiempoRetorno = Math.ceil(costoTotal / (ahorroMensual || 1));

      const costoKwh = pagoMensual / consumoKwh;
      document.getElementById("costoPorKwh").textContent =
        `💡 Estás pagando aproximadamente $${costoKwh.toFixed(2)} COP por cada kWh.`;

      resultado.classList.remove("hidden");
      ahorroEl.textContent = `✅ Estás pagando aproximadamente $${pagoMensual.toLocaleString()} al mes. Con energía solar podrías ahorrar cerca de $${ahorroMensual.toLocaleString()} cada mes ($${ahorroAnual.toLocaleString()} al año).`;
      panelesEl.textContent = `🔋 Necesitarías aproximadamente ${panelesNecesarios} panel(es) solares para cubrir el 80% de tu consumo.`;
      costoSolarEl.textContent = `💰 Inversión estimada: $${costoTotal.toLocaleString()} COP (incluyendo instalación).`;
      tiempoRetornoEl.textContent = `⏳ Recuperarías la inversión en aproximadamente ${tiempoRetorno} meses.`;

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
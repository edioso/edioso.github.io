const ctxLineas = document.getElementById('graficoLineas').getContext('2d');

const graficoLineas = new Chart(ctxLineas, {
    type: 'line',
    data: {
        labels: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"],
        datasets: [
            {
                label: 'Capacidad Eólica (GW)',
                data: [120, 135, 150, 170, 200, 230, 260, 290],
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: false,
                tension: 0.1
            },
            {
                label: 'Capacidad Solar PV (GW)',
                data: [100, 120, 145, 180, 210, 260, 310, 370],
                borderColor: 'rgba(255, 206, 86, 1)',
                fill: false,
                tension: 0.1
            },
            {
                label: 'Capacidad Geotérmica (GW)',
                data: [13, 13.5, 14, 14.2, 14.5, 14.7, 15, 15.3],
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                tension: 0.1
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Tendencia en la Capacidad Instalada de Energías Renovables'
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Capacidad (GW)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Año'
                }
            }
        }
    }
});

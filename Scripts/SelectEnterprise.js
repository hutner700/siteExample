function DistNormal(mu, sigma) {
    let u1 = Math.random();
    let u2 = Math.random();
    let z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    let x = mu + sigma * z1;
    return x;
}

// Gerar valores aleatórios para as métricas financeiras
document.getElementById("liquidez-seca").innerText = DistNormal(0.8,0.5).toFixed(2);
document.getElementById("ebitda").innerText = DistNormal(30,5).toFixed(2);
document.getElementById("giro-ativos").innerText = DistNormal(1.8,1).toFixed(2);
document.getElementById("giro-estoque").innerText = DistNormal(5,2).toFixed(2);
document.getElementById("margem-liquida").innerText = DistNormal(10,10).toFixed(2);

const checkBigger = (ctx, color_a, color_b) => ctx.p0.parsed.y > ctx.p1.parsed.y ? color_a : color_b;

function createChart(id, data, title) {
    const ctx = document.getElementById(id);

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Ano 1", "Ano 2", "Ano 3", "Ano 4", "Ano 5"],
            datasets: [
                {
                    label: 'Faturamento',
                    data: [],
                    backgroundColor: [],
                    borderColor: [],
                    borderWidth: 5,
                    pointRadius: 2,
                    segment: {
                        borderColor: ctx => checkBigger(ctx, "red","green")
                    }
                }
            ]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: title
            },
            scales: {
                y: {
                    min: 0,
                    max: 100
                }
            },
            animation: {
                duration: 1
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const label = context.dataset.label || '';
                            if (label) {
                                return `${label}: ${context.formattedValue}`;
                            }
                            return context.formattedValue;
                        }
                    }
                },
                layout: {
                    padding: {
                        right: 50
                    }
                }
            }
        }
    });
    chart.data.datasets[0].data = data
    chart.resize(400,200)
    chart.update();
    return chart;
}

function multiplicarAnteriorNormal(inicial ,mediaNorm, desvioPadraoNorm) {
    let faturamento = inicial;
    const resultados = [faturamento];
    for (let i = 0; i < 4; i++) {
      const numeroAleatorio = DistNormal(mediaNorm, desvioPadraoNorm);
      const faturamentoNovo = faturamento * numeroAleatorio;
      resultados.push(faturamentoNovo);
      faturamento = faturamentoNovo;
    }
    return resultados;
}

let dataFaturamento = multiplicarAnteriorNormal(50, 1,.2)
let chartA = createChart("chart", dataFaturamento, "Faturamento")



// Detectar quando o usuário clicou no botão "curtir"
document.getElementById("curtir-btn").addEventListener("click", function() {
  // Exibir o dropdown com os motivos para investir
    if (document.getElementById("motivos-dropdown").classList.contains("show")) {
        document.getElementById("motivos-dropdown").classList.remove("show");
    }
    document.getElementById("motivos-dropdown-post").classList.add("show");
});

// Detectar quando o usuário clicou no botão "descurtir"
document.getElementById("descurtir-btn").addEventListener("click", function() {
  // Exibir o dropdown com os motivos genéricos para não investir
    if (document.getElementById("motivos-dropdown-post").classList.contains("show")) {
        document.getElementById("motivos-dropdown-post").classList.remove("show");
    }
    document.getElementById("motivos-dropdown").classList.add("show");
});
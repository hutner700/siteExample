function DistNormal(mu, sigma) {
    let u1 = Math.random();
    let u2 = Math.random();
    let z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    let x = mu + sigma * z1;
    return x;
}

const checkBigger = (ctx, color_a, color_b) => ctx.p0.parsed.y > ctx.p1.parsed.y ? color_a : color_b;

// Função para criar um gráfico
function createChart(id, data, color, title) {
    const ctx = document.getElementById(id);

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Ano 1", "Ano 2", "Ano 3", "Ano 4", "Ano 5"],
            datasets: [
                {
                    label: 'Investment',
                    data: [],
                    backgroundColor: [],
                    borderColor: [],
                    borderWidth: 5,
                    pointRadius: 2,
                    segment: {
                        borderColor: ctx => checkBigger(ctx, "red","green")
                    }
                },
                {
                    label: 'Initial Investment',
                    data: [],
                    backgroundColor: 'rgb(255,255,0)',
                    borderColor: 'rgb(255,255,0)',
                    borderWidth: 2.5,
                    pointRadius: 0
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
    chart.data.datasets[1].data = Array(data.length).fill(50)
    chart.resize(400,200)
    chart.update();
    return chart;
}
  
// Cria os gráficos iniciais
const data = {
    A: [50, 55, 60, 66.5, 73],
    B: [50, 52.5,55,58,60],
    C: [50, 30, 45, 80, 75],
    D: [50, 85, 63, 72, 85]
};  
  
let chartA = createChart('chartA', data.A, "A");
let chartB = createChart('chartB', data.B, "B");
let chartC = createChart('chartC', data.C, "C");
let chartD = createChart('chartD', data.D, "D");

// Função para atualizar os gráficos com novos dados
function seeOptions() {
    const radios = document.getElementsByName('option');

    // Verifica qual o rádio selecionado
    let selectedOption = '';
    radios.forEach(radio => {
        if (radio.checked) {
            selectedOption = radio.value;
        }
    });

    // Retorna o valor selecionado
    return selectedOption;
}

// Adiciona o evento de clique no botão
const btn = document.getElementById('confirm-btn');
btn.addEventListener('click', () => {
    const selectedOption = seeOptions();
    console.log(selectedOption); // Exibe o valor selecionado no console
});
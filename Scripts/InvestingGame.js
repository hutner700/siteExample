function DistNormal(mu, sigma) {
    let u1 = Math.random();
    let u2 = Math.random();
    let z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    let x = mu + sigma * z1;
    return x;
  }

const checkBigger = (ctx, color_a, color_b) => ctx.p0.parsed.y > ctx.p1.parsed.y ? color_a : color_b;


const chart = new Chart(document.getElementById('chart'), {
    type: 'line',
    data: {
        labels: [],
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
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.4)'
                  }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.4)'
                  },
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


document.getElementById('start').addEventListener('click', () => {
    const initialInvestment = Number(document.getElementById('initial-investment').value);
    if (!isNaN(initialInvestment)) {
      chart.options.scales.y.min = 0;
      chart.options.scales.y.max = initialInvestment * 2;
      chart.data.datasets[1].data[0] = initialInvestment;
      chart.update();
      document.getElementById('initial-investment').disabled = true;
    }
    document.getElementById('start').remove()
    document.getElementById('initial-investment').remove()

    let interval = setInterval(() => {
        const data = chart.data.datasets[0].data;
        const lastValue = data.length > 0 ? data[data.length - 1] : initialInvestment;
        let rate = DistNormal(1,0.05)
        let newValue = lastValue * rate
        if (newValue / initialInvestment > 1.75){
            rate = DistNormal(0.95,0.05)
        }
        newValue = lastValue * rate
        chart.data.labels.push('');
        chart.data.datasets[0].data.push(newValue);
        chart.data.datasets[1].data.push(initialInvestment);
        let new_color = rate < 1 ? 'red' : 'green';
        chart.data.datasets[0].backgroundColor.push(new_color);
        chart.data.datasets[0].borderColor.push(new_color);
        chart.update();
        const result = (newValue - initialInvestment) / initialInvestment * 100;
        const resultDisplay = document.getElementById('result');
        if (result > 0) {
            resultDisplay.innerText = `Você ganhou R$${Math.abs(newValue - initialInvestment).toFixed(2)} (${result.toFixed(2)}%)`;
            resultDisplay.classList.remove('result-loss');
            resultDisplay.classList.add('result-gain');
        } else {
            resultDisplay.innerText = `Você perdeu R$${Math.abs(newValue - initialInvestment).toFixed(2)} (${result.toFixed(2)}%)`;
            resultDisplay.classList.remove('result-gain');
            resultDisplay.classList.add('result-loss');
        }
    }, 1000);
    
    document.getElementById('stop').addEventListener('click', () => {
        console.log(chart.data.datasets[0].data)
        clearInterval(interval);
    });
    
  });




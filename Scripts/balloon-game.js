function DistNormal(mu, sigma) {
    let u1 = Math.random();
    let u2 = Math.random();
    let z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    let x = mu + sigma * z1;
    return x;
  }


const MAX_SIZE = DistNormal(800,50) 

const balloon = document.getElementById('balloon');
const pumpBtn = document.getElementById('pump-btn');
const resultDisplay = document.getElementById('result');


let balloonSize = 10;
let pumpCount = 0;
let warningInterval;
let explode = false
let x = 10
let alert = DistNormal(0.7,0.05)
let critical = alert + Math.abs(DistNormal(0.1,0.05))


function pumpBalloon() {
    let pumpAmount = Math.trunc(Math.abs(DistNormal(10,20)));
    var width = balloon.offsetWidth + pumpAmount;  
    var height = balloon.offsetHeight + pumpAmount * 888/920;  
    x += Math.abs(DistNormal(10,20))
    if (explode){
        return ''
    }
    if (width > MAX_SIZE){
        balloon.src = "images/explosion.png"
        explode = true
    }  else if (width / MAX_SIZE > critical ){
        balloon.src = "images/baloonCritical.png"
    }  else if (width / MAX_SIZE > alert ){
        balloon.src = "images/baloonAlert.png"
    }
    
    resultDisplay.innerText = `Você ganhou R$${x.toFixed(2)}`;
    if (explode){
        resultDisplay.innerText = `Você perdeu tudo!`;
    } else {
        balloon.style.width = width + "px";
        balloon.style.height = height + "px";
    }
}

pumpBtn.addEventListener('click', pumpBalloon);
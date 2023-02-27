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
const finalizeBtn = document.getElementById('finalize-btn');
const resultDisplay = document.getElementById('result');


let balloonSize = 10;
let pumpCount = 0;
let pumpCountAlert = 0;
let pumpCountCritical = 0;
let warningInterval;
let explode = false
let finalized = false
let x = 10
let alert = DistNormal(0.5,0.05)
let critical = alert + Math.abs(DistNormal(0.15,0.0025))
let multiplier = 1

function pumpBalloon() {
    if (explode || finalized){
        return ''
    }
    let pumpAmount = Math.trunc(Math.abs(DistNormal(10,20)));
    var width = balloon.offsetWidth + pumpAmount;  
    var height = balloon.offsetHeight + pumpAmount * 888/920;  
    x += Math.abs(DistNormal(10,20)) * multiplier
    if (width > MAX_SIZE){
        balloon.src = "images/explosion.png"
        explode = true
    }  else if (width / MAX_SIZE > critical ){
        balloon.src = "images/baloonCritical.png"
        multiplier = 5
        pumpCountCritical += 1
    }  else if (width / MAX_SIZE > alert ){
        balloon.src = "images/baloonAlert.png"
        multiplier = 3
        pumpCountAlert += 1
    }  else {
        pumpCount += 1
    }
    
    resultDisplay.innerText = `Você ganhou R$${x.toFixed(2)}`;
    if (explode){
        resultDisplay.innerText = `Você perdeu tudo! Clicks Normais: ${pumpCount}, Clicks em alerta: ${pumpCountAlert}, Clicks em criticos: ${pumpCountCritical}`;
    } else {
        balloon.style.width = width + "px";
        balloon.style.height = height + "px";
    }
}

function finalize(){
    if (explode){
        return ''
    } else {
        resultDisplay.innerText = `Você ganhou R$${x.toFixed(2)}, Clicks Normais: ${pumpCount}, Clicks em alerta: ${pumpCountAlert}, Clicks em criticos: ${pumpCountCritical}`;
        finalized = true
    }
}

pumpBtn.addEventListener('click', pumpBalloon);
finalizeBtn.addEventListener('click', finalize);
function DistNormal(mu, sigma) {
    let u1 = Math.random();
    let u2 = Math.random();
    let z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    let x = mu + sigma * z1;
    return x;
}

const character = document.getElementById('character');
const box = document.getElementById('box');
const win = document.getElementById('win');
const pushBtn = document.getElementById('push-btn');

const boxMoveDistance = DistNormal(10,5);; // Quantidade de pixels que a caixa se move ao ser empurrada
const maxBoxPosition = 750; // Posição máxima da caixa antes de alcançar o buraco

let currentCharacterPosition = 0;
let currentBoxPosition = 0;

function moveCharacter() {
  currentCharacterPosition += DistNormal(10,5);
  if (currentCharacterPosition > maxBoxPosition) {
    currentCharacterPosition = maxBoxPosition;
    alert('Perdeu')
  }
  character.style.left = currentCharacterPosition + 'px';
}

function pushBox() {
  currentBoxPosition += boxMoveDistance;
  if (currentBoxPosition > maxBoxPosition) {
    currentBoxPosition = maxBoxPosition;
  }
  box.style.left = currentBoxPosition + 'px';
}

pushBtn.addEventListener('click', moveCharacter);
box.addEventListener('click', pushBox);

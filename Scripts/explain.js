const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const jogo = urlParams.get('jogo');

const controller = {
    1: {
        "Name":"Simulação de Investimento",
        "Texto": `Esse é para simular um investimento, no canto superior esquerdo vai ter um campo "Input", lá coloque o valor do seu investimento e clique em confirmar. 
        Quando se sentir desconfortavel com a perda clique em "Parar". No canto superior mostra os resultados`,
        "URL": "InvestingGame.html"
    },
    2: {
        "Name":"Exemplo Balão",
        "Texto": `Esse é um exemplo para ver o quanto a pessoa está sujeita ao Risco. Nele havera 3 balões, um inicial Vermelho, um alerta Alaranjado (é bem perceptivel a diferença) e um Critico que ficará azulado.
         Apertando o botão "Encher" ele encherá, se explodir perde tudo, quanto maior, maior a recompensa. Clique em "Finalizar" quando ficar desconfortavel.`,
        "URL": "BaloonGame.html"
    },
    3: {
        "Name":"Empurrar o Bloco *Não está funcionando",
        "Texto": `Esse é um exemplo para ver o quanto a pessoa está sujeita ao Risco, nele era para ter uma caixa sendo empurrada, e quanto mais perto do final maior a recompensa mas se caisse perdiria tudo`,
        "URL": "PushTheBox.html"
    },
    4: {
        "Name":"Escolha o Ideal",
        "Texto": `Esse é para a pessoa escolher qual grafico ela fica mais "confortavel" mostrando graficos de livres de risco e ativos com risco. Simplesmente escolha a opção`,
        "URL": "ChooseRisk.html"
    },
    5: {
        "Name":"Aceite ou recuse a empresa",
        "Texto": `Esse irá apresentar uma empresa, com informações aleatorias, caso a pessoa aceite ou recuse a empresa, ele justifica o motivo * Pode usar para avaliar risco de 
        pessoas instruidas`,
        "URL": "SelectEnterprise.html"
    }
}

const game = controller[jogo];

const titleElement = document.querySelector('.title');
titleElement.innerText = game.Name;

const descriptionElement = document.querySelector('.description');
descriptionElement.innerText = game.Texto;

const buttonElement = document.querySelector('.btn');
buttonElement.addEventListener('click', function () {
  window.location.href = game.URL;
});
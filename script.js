// Funções
const obterElemento = (query) => document.querySelector(query);
const gerarNumeroSecreto = () => Math.floor(Math.random() * 100 + 1);
const atualizarTentativas = () => obterElemento("#tentativas").innerText = tentativasRestantes;
const obterPalpite = () => parseInt(obterElemento("#palpite").value);
const atualizarMensagem = (msg) => obterElemento("#mensagem").innerText = msg;

// Variaveis
const tentativasMaximas = 5;
let tentativasRestantes = tentativasMaximas;
let numeroSecreto = gerarNumeroSecreto();
let jogoTerminou = false; // O jogo termina quando o numero secreto é descoberto ou quando as tentativas acabam.

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    // Caso o jogo tenha terminado, não executa a função de chute
    if (jogoTerminou) {
        return;
    }
    chutar();
});

iniciarJogo();

function chutar() {
    let palpite = obterPalpite();
    let mensagem = "";

    if (palpite > 100 || palpite < 1) {
        mensagem = "Palpite inválido! Insira um número entre 1 e 100."
        return;
    }

    if (palpite == numeroSecreto) {
        mensagem = "Você acertou!";
        jogoTerminou = true;
    } else if (palpite > numeroSecreto) {
        mensagem = "O número secreto é menor";
    } else {
        mensagem = "O número secreto é maior";
    }

    tentativasRestantes--;
    atualizarTentativas();

    if (tentativasRestantes <= 0 && palpite != numeroSecreto) {
        mensagem = `Você perdeu! O número secreto era ${numeroSecreto}`;
        jogoTerminou = true;
    }

    atualizarMensagem(mensagem);
};

function iniciarJogo() {
    numeroSecreto = gerarNumeroSecreto();
    tentativasRestantes = tentativasMaximas;
    atualizarTentativas();
}

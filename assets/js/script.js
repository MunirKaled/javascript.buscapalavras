//VARIAVEIS
let palavras = [
    'css',
    'professor',
    'caneta',
    'hotel',
    'fichas',
    'ímpar',
    'atividade',
    'javascript',
    'internet',
    'curso',
    'programação',
    'variável',
    'cigmal',
    'esa',
    'dtic',
    'vereador',
    'funções'
];
let qtdPalvras = palavras.length;
let palavraSorteada = sortearPalavra();
console.log(palavraSorteada);
let quantidadeLetrasPalavrasorteada = palavraSorteada.length;
console.log(quantidadeLetrasPalavrasorteada);
let letrasPalavraSorteada = palavraSorteada.split('');
console.log(letrasPalavraSorteada);

//informar o numero de tentativas que o usuário terá
let quantidadeTentativas = 10;
let quantidadeLetrasAcertadas = 0;
let ganhou = false;
let perdeu = false;
let mensagem = quantidadeTentativas;
//FUNÇÕES
function sortearPalavra() {
    return palavras[Math.floor(Math.random() * palavras.length)].toLocaleUpperCase();
};

function gerarHtmlPalavraSorteada() {
    for (let i = 0; i < letrasPalavraSorteada.length; i++) {
        let letra = document.createElement('div');
        letra.id = 'letra_' + i;
        letra.className = 'letrasOcultas';
        letra.innerHTML = letrasPalavraSorteada[i];
        let letras = document.getElementById('letras');
        letras.appendChild(letra);
    };
};

function gerarHtmlTeclado() {
    let alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWYXZ'.split('');
    console.log(alfabeto);
    for (let i = 0; i < alfabeto.length; i++) {
        let tecla = document.createElement('input');
        let letra = alfabeto[i];
        tecla.type = 'button';
        tecla.id = letra;
        tecla.className = 'teclas';
        tecla.value = letra;
        tecla.onclick = function () { processarTeclaHtmlClicada(tecla) };
        let teclado = document.getElementById('teclado').appendChild(tecla);
    };
};

function processarTeclaHtmlClicada(teclaHtmlClicada) {
    teclaHtmlClicada.disabled = true;
    teclaHtmlClicada.className = 'teclasDesabilitadas';
    console.log(teclaHtmlClicada);

    let letrasAcertadasLoop = 0;
    for (let i = 0; i < letrasPalavraSorteada.length; i++) {
        let letraSemAcento = removerAcentos(letrasPalavraSorteada[i]);
        if (teclaHtmlClicada.value === letraSemAcento) {

            letrasAcertadasLoop++;
            quantidadeLetrasAcertadas++;

            setTimeout(function () {
                tocarSomAcerto();
                document.getElementById('letra_' + i).className = 'letras';
                atualizarSituacao();
            }, letrasAcertadasLoop * 1000);
        };
    };

    if (letrasAcertadasLoop < 1) {

        setTimeout(function () {
            tocarSomErro();
            quantidadeTentativas--;
            atualizarSituacao();
        }, 500);
    };
};

function removerAcentos(letra) {
    letra = letra.replace(/[ÁÀÂÃ]/, 'A');
    letra = letra.replace(/[ÉÈÊ]/, 'E');
    letra = letra.replace(/[ÍÌÎ]/, 'I');
    letra = letra.replace(/[ÓÒÕÔ]/, 'O');
    letra = letra.replace(/[ÚÛ]/, 'U');
    letra = letra.replace(/[Ç]/, 'C');
    return letra;
};

function atualizarSituacao() {
    if (quantidadeTentativas < 1) {
        perdeu = true;
        mensagem = 'Que pena! Você perdeu!';
        document.getElementById('painelsituacao').className = 'painel';
    } else if (quantidadeLetrasAcertadas >= quantidadeLetrasPalavrasorteada) {
        ganhou = true;
        mensagem = 'Parabéns Você Ganhou!';
        document.getElementById('painelsituacao').className = 'painel';
    } else {
        mensagem = quantidadeTentativas;
    }
    document.getElementById('situacao').innerHTML = mensagem;
    console.log(mensagem);
    console.log('Tentativas: ' + quantidadeTentativas);
    console.log('Acertos: ' + quantidadeLetrasAcertadas);
}

function tocarSomAcerto() {
    let somAcerto = new Audio('assets/sounds/campainha_acerto.mp3');
    somAcerto.play();
};

function tocarSomErro() {
    let somErro = new Audio('assets/sounds/campainha_erro.mp3');
    somErro.play();
};

gerarHtmlPalavraSorteada();
gerarHtmlTeclado();
atualizarSituacao();

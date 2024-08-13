var form = document.getElementById('form');
const campos = document.querySelectorAll('.required');
const span = document.querySelectorAll('.escondido');
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const rSenhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/; // Exemplo de regex para senha: 6-12 caracteres, ao menos uma letra maiúscula, uma minúscula e um número.
let errado = 0;

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    errado = 0; // Resetar o contador de erros
    validar();
});

function validar() {
    nomeValidacao();
    emailValidacao();
    senhaValidacao();
    senhaComparacao();

    if (errado === 4) { // Todos os campos foram validados com sucesso
        form.submit();
    } else {
        console.log("Corrija os erros antes de enviar.");
    }
}

function erro(index) {
    span[index].style.display = 'inline-block';
    campos[index].style.border = '1px solid #ff000f';
}

function apagaerro(index) {
    span[index].style.display = 'none';
    campos[index].style.border = '';
}

function nomeValidacao() {
    const nome = campos[0].value;
    if (nome.length < 3 || nome.length > 15) {
        erro(0);
    } else {
        apagaerro(0);
        errado += 1;
    }
}

function emailValidacao() {
    if (!emailRegex.test(campos[1].value)) {
        erro(1);
    } else {
        apagaerro(1);
        errado += 1;
    }
}

function senhaValidacao() {
    var senha = campos[2].value;
    if (senha.length < 6 || senha.length > 12 || !rSenhaRegex.test(senha)) {
        erro(2);
    } else {
        apagaerro(2);
        errado += 1;
    }
}

function senhaComparacao() {
    var senha = campos[3].value;
    if (senha.length < 6 || senha.length > 12 || rSenhaRegex.test(senha)) {
        erro(3);
    }
    else if (campos[2].value === campos[3].value) {
        apagaerro(3);
        errado += 1;
    } else {
        erro(3);
    }
}

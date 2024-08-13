document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('RegisterForm');
    const campos = document.querySelectorAll('.required');
    const span = document.querySelectorAll('.escondido');
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const rSenhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/; // Exemplo de regex para senha: 6-12 caracteres, ao menos uma letra maiúscula, uma minúscula e um número.
    let Certo = 0;
    let Sub;

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        Certo = 0;
        const UserName = document.getElementById('nomeId').value;
        const Email = document.getElementById('emailId').value;
        const Senha = document.getElementById('senhaId').value;

        validar();

        if (Certo === 4) { // Todos os campos foram validados com sucesso
            try {
                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: UserName, email: Email, senha: Senha })
                });

                if (!response.ok) {
                    throw new Error('Erro ao fazer Registro');
                }

                const data = await response.json();

                if (data.User) {
                    document.getElementById('UserR').style.display = 'inline-block';
                } else {
                    document.getElementById('UserR').style.display = 'none';
                }

                if (data.Email) {
                    document.getElementById('EmailR').style.display = 'inline-block';
                } else {
                    document.getElementById('EmailR').style.display = 'none';
                }

                if (!data.User && !data.Email) {
                    if (Sub == true) {
                        window.location.href = '../Views/login.html';
                    }
                }

            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao fazer Registro. Tente novamente mais tarde.');
            }
        }
    });

    function validar() {
        nomeValidacao();
        emailValidacao();
        senhaValidacao();
        senhaComparacao();

        if (Certo === 4) { // Todos os campos foram validados com sucesso
            Sub = true
        } else {
            Sub = false
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
            Certo += 1;
        }
    }

    function emailValidacao() {
        if (!emailRegex.test(campos[1].value)) {
            erro(1);
        } else {
            apagaerro(1);
            Certo += 1;
        }
    }

    function senhaValidacao() {
        const senha = campos[2].value;
        if (senha.length < 6 || senha.length > 12 || !rSenhaRegex.test(senha)) {
            erro(2);
        } else {
            apagaerro(2);
            Certo += 1;
        }
    }

    function senhaComparacao() {
        const senha = campos[3].value;
        if (senha.length < 6 || senha.length > 12 || !rSenhaRegex.test(senha) || campos[2].value !== senha) {
            erro(3);
        } else {
            apagaerro(3);
            Certo += 1;
        }
    }
});

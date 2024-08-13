document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Impede o envio do formulário pelo método padrão

    const avisos = document.querySelectorAll(".escondido");

    const username = document.getElementById('usernameId').value;
    const senha = document.getElementById('senhaId').value;

    try {
        const response = await fetch('http://localhost:3000/login', { // Certifique-se que seu backend está rodando nesta URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, senha })
        });

        if (!response.ok) {
            throw new Error('Erro ao fazer login');
        }

        const data = await response.json();

        if (data.User) {
            avisos[0].style.display = 'none';
            if (data.senha) {
                avisos[1].style.display = 'none';
                // Salva o nome do usuário no localStorage
                localStorage.setItem('username', data.Name);
                window.location.href = '../Views/index.html';
            } else {
                avisos[1].style.display = 'inline-block';
            }
        } else {
            avisos[0].style.display = 'inline-block';
        }

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao fazer login. Tente novamente mais tarde.');
    }
});

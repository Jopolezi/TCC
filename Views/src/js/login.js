document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o envio do formulário pelo método padrão

    const lg = document.getElementById('lg').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('http://localhost:3000/login', { // Certifique-se que seu backend está rodando nesta URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lg, senha })
        });

        if (!response.ok) {
            throw new Error('Erro ao fazer login');
        }

        const data = await response.json();

        if (data.success) {
            alert('Login bem-sucedido!');
            // Redirecionar para outra página
            // window.location.href = '/pagina-protegida.html';
        } else {
            alert('Nome de usuário ou senha incorretos');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao fazer login. Tente novamente mais tarde.');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const userIcon = document.getElementById('user-icon');
    const userDiv = document.querySelector('.user');
    const imgUser = document.querySelector('.ImgUserClass'); // Seleciona a imagem do perfil
    const form = document.getElementById('formIcon');
    const fileInput = document.getElementById('file');

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function () {
            mobileNav.classList.toggle('show');
        });
    }

    if (userIcon) {
        userIcon.addEventListener('click', function () {
            userDiv.classList.toggle('show');
        });
    }

    // Oculta o menu dropdown ao clicar fora dele
    document.addEventListener('click', function (event) {
        if (!userDiv.contains(event.target) && !userIcon.contains(event.target)) {
            userDiv.classList.remove('show');
        }
    });

    const username = localStorage.getItem('username');

    if (username) {
        document.getElementById("BotaoEntrar").style.display = 'none';
        document.getElementById("BotaoLogout").style.display = 'none';
        document.getElementById('UserClass').style.display = 'inline-block';
        imgUser.style.display = 'inline-block'; // Aplica display inline-block à imagem do perfil
        userIcon.style.display = 'inline-block';
        document.getElementById('UserClass').innerText += username;
        IconImagem();
    } else {
        document.getElementById("BotaoEntrar").style.display = 'inline-block';
        document.getElementById("BotaoLogout").style.display = 'none';
        document.getElementById('UserClass').style.display = 'none';
        imgUser.style.display = 'none'; // Esconde a imagem do perfil
        userIcon.style.display = 'none';
    }

    function IconImagem() {
        const timestamp = new Date().getTime(); // Obtém um timestamp único
        const newImageSrc = `../Icons-Users/${username}.jpg?timestamp=${timestamp}`; // Adiciona o timestamp como parâmetro de consulta
        imgUser.src = newImageSrc;
    }

    fileInput.addEventListener('change', async function () {
        const username = localStorage.getItem('username'); // Recupere o nome de usuário novamente

        const formData = new FormData(form);
        formData.append('username', username);

        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData // Send the formData instead of JSON
            });
            if (!response.ok) {
                throw new Error('Erro');
            }

            const data = await response.json();

            if (data && data.message === "Upload realizado com sucesso!") {
                console.log("Upload realizado com sucesso");

                IconImagem();
            }

        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao Subir Imagem');
        }
    });

});

function Logout() {
    localStorage.removeItem('username');
    window.location.reload(); // Atualiza a página após o logout
}


function dowload() {
    
}
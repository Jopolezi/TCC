
// Função para exibir a média das avaliações
function fetchAverageRating() {
    fetch('http://localhost:3000/api/ratings/average')
        .then(response => response.json())
        .then(data => {
            console.log('Dados recebidos da API:', data); // Adiciona este log
            const averageRating = parseFloat(data.averageRating); // Converte para número

            // Verifica se averageRating é um número válido
            if (!isNaN(averageRating)) {
                document.getElementById('averageRatingLabel').innerText = `Média das Avaliações: ${averageRating.toFixed(2)}`;
            } else {
                throw new Error('averageRating não é um número válido');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar média das avaliações:', error);
            document.getElementById('averageRatingLabel').innerText = 'Erro ao buscar média das avaliações';
        });
}// Chama a função quando a página carrega
document.addEventListener('DOMContentLoaded', fetchAverageRating);

let selectedRating = 0;

document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
        selectedRating = parseInt(this.getAttribute('data-value'), 10); // Atualize a seleção de avaliação
        document.querySelectorAll('.star').forEach((s, i) => {
            if (i < selectedRating) {
                s.style.color = 'gold'; // Pinta as estrelas até o valor selecionado
            } else {
                s.style.color = 'lightgray'; // Restaura a cor das estrelas não selecionadas
            }
        });
    });

    star.addEventListener('mouseover', function() {
        const hoverValue = parseInt(this.getAttribute('data-value'), 10);
        document.querySelectorAll('.star').forEach((s, i) => {
            if (i < hoverValue) {
                s.classList.add('hover'); // Adiciona a classe de hover
            } else {
                s.classList.remove('hover'); // Remove a classe de hover
            }
        });
    });

    star.addEventListener('mouseout', function() {
        document.querySelectorAll('.star').forEach(s => s.classList.remove('hover')); // Remove a classe de hover ao sair
    });
});

document.getElementById('submitRating').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    
    

    if (selectedRating > 0) {
        fetch('http://localhost:3000/api/ratings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rating: selectedRating})
        })
        .then(response => response.json())
        .then(data => {
            alert('Avaliação enviada com sucesso!');
            fetchAverageRating(); // Atualiza a média das avaliações após enviar uma nova avaliação
        })
        .catch(error => console.error('Erro:', error));
    } else {
        alert('Por favor, selecione uma nota.');
    }
});

// Função para atualizar a média das avaliações
function fetchAverageRating() {
    fetch('http://localhost:3000/api/average-rating')
        .then(response => response.json())
        .then(data => {
            // Supondo que 'data' tenha uma propriedade 'average' com a média das avaliações
            const averageElement = document.getElementById('averageRating');
            if (averageElement) {
                averageElement.textContent = `Média das Avaliações: ${data.average}`;
            }
        })
        .catch(error => console.error('Erro ao buscar a média das avaliações:', error));
}








document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.overlay');

    hamburgerMenu.addEventListener('click', function() {
        mobileNav.classList.toggle('open');
        overlay.classList.toggle('show');
    });

    overlay.addEventListener('click', function() {
        mobileNav.classList.remove('open');
        overlay.classList.remove('show');
    });
});


let navbar = document.querySelector('#header') // Efeito dinâmico do header

document.addEventListener("scroll", ()=>{
    let scrollTop = window.scrollY

    if(scrollTop > 0){
        navbar.classList.add('rolar')
    } else {
        navbar.classList.remove('rolar')
    }

   
})
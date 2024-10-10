// Função para exibir a média das avaliações
function fetchAverageRating() {
  fetch('http://localhost:3000/api/ratings/average')
      .then(response => response.json())
      .then(data => {
          console.log('Dados recebidos da API:', data);
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
}

// Chama a função quando a página carrega
document.addEventListener('DOMContentLoaded', fetchAverageRating);

let selectedRating = 0;

document.querySelectorAll('.star').forEach((star, index) => {
  star.addEventListener('click', function () {
      selectedRating = index + 1; // Atualiza a seleção de avaliação
      document.querySelectorAll('.star').forEach((s, i) => {
          s.style.color = i < selectedRating ? '#f02eaa' : '#ccc'; // Pinta as estrelas da esquerda para a direita
      });
  });

  star.addEventListener('mouseover', function () {
      const hoverValue = index + 1;
      document.querySelectorAll('.star').forEach((s, i) => {
          s.style.color = i < hoverValue ? '#f02eaa' : '#ccc'; // Pinta as estrelas da esquerda para a direita ao passar o mouse
      });
  });

  star.addEventListener('mouseout', function () {
      document.querySelectorAll('.star').forEach((s, i) => {
          s.style.color = i < selectedRating ? '#f02eaa' : '#ccc'; // Mantém a cor das estrelas selecionadas após o mouse sair
      });
  });
});

document.getElementById('submitRating').addEventListener('click', function (event) {
  event.preventDefault(); // Previne o comportamento padrão do botão

  if (selectedRating > 0) {
      console.log(`Enviando avaliação: ${selectedRating}`); // Log para verificar o valor da avaliação

      fetch('http://localhost:3000/api/ratings', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ rating: selectedRating })
      })
          .then(response => {
              console.log('Resposta da API:', response); // Log para verificar a resposta da API
              return response.json();
          })
          .then(data => {
              console.log('Dados recebidos da API:', data); // Log para verificar os dados recebidos
              alert('Avaliação enviada com sucesso!');
              fetchAverageRating(); // Atualiza a média das avaliações após enviar uma nova avaliação
          })
          .catch(error => {
              console.error('Erro ao enviar avaliação:', error); // Log para verificar erros
              alert('Erro ao enviar avaliação. Verifique o console para mais detalhes.');
          });
  } else {
      alert('Por favor, selecione uma nota.');
  }
});

// Efeito dinâmico do header
document.addEventListener("scroll", () => {
  const navbar = document.querySelector('#header');
  const scrollTop = window.scrollY;

  navbar.classList.toggle('rolar', scrollTop > 0);
});

document.addEventListener('DOMContentLoaded', function () {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.overlay');

  hamburgerMenu.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
      overlay.classList.toggle('show');
  });

  overlay.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      overlay.classList.remove('show');
  });
});

// Função para detectar se o usuário está em um dispositivo móvel
function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
}

document.addEventListener("DOMContentLoaded", function () {
  var downloadLink = document.getElementById('download-link');
  var notAvailableMessage = document.getElementById('not-available-message');

  // Verifica se o dispositivo é móvel
  if (isMobileDevice()) {
      // Esconde o link de download e exibe a mensagem de não disponível
      downloadLink.style.display = 'none';
      notAvailableMessage.style.display = 'block';
  } else {
      // Exibe o link de download e esconde a mensagem de não disponível
      downloadLink.style.display = 'block';
      notAvailableMessage.style.display = 'none';
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Adiciona uma classe ao corpo caso não seja um dispositivo móvel
  if (!isMobileDevice()) {
      document.body.classList.add('desktop');
  }
});

// Scroll Reveal
ScrollReveal({ reset: false });

ScrollReveal().reveal('.conteudo', { 
  duration: 2000,
  origin: 'left',
  distance: '10%'
});

ScrollReveal().reveal('#reveal-1', {
  duration: 2000,
  origin: 'bottom',
  distance: '10%'
});

ScrollReveal().reveal('#reveal-2', {
  duration: 2000,
  origin: 'bottom',
  distance: '10%'
});

ScrollReveal().reveal('#card', {
  duration: 2000,
  origin: 'bottom',
  distance: '10%'
});

ScrollReveal().reveal('#card-feedback', {
  duration: 2000,
  origin: 'bottom',
  distance: '10%'
});
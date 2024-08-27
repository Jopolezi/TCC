// Efeito dinâmico do header
let navbar = document.querySelector('#header') 

document.addEventListener("scroll", ()=>{
    let scrollTop = window.scrollY

    if(scrollTop > 0){
        navbar.classList.add('rolar')
    } else {
        navbar.classList.remove('rolar')
    }
})

 // Função para detectar se o usuário está em um dispositivo móvel
 function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
}

document.addEventListener("DOMContentLoaded", function() {
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

document.addEventListener("DOMContentLoaded", function() {
  // Adiciona uma classe ao corpo caso não seja um dispositivo móvel
  if (!isMobileDevice()) {
      document.body.classList.add('desktop');
  }
});


// Scroll Reveal
ScrollReveal({ reset: true });

ScrollReveal().reveal('.conteudo', { 
  duration: 2000,
  origin: 'left',
  distance: '10%'
});

ScrollReveal().reveal('#reveal-1', {
  duration: 2000,
  origin: 'bottom',
  distance: '10%'
})

ScrollReveal().reveal('#reveal-2', {
  duration: 2000,
  origin: 'bottom',
  distance: '10%'
})

ScrollReveal().reveal('#card', {
  duration: 2000,
  origin: 'bottom',
  distance: '10%'
})

ScrollReveal().reveal('#card-feedback', {
  duration: 2000,
  origin: 'bottom',
  distance: '10%'
})








  // Hamburger
  

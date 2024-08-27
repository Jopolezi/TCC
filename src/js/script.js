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

    if (isMobileDevice()) {
      downloadLink.style.display = 'none';
      notAvailableMessage.style.display = 'block';
    } else {
      downloadLink.style.display = 'block';
      notAvailableMessage.style.display = 'none';
    }
  });

  document.addEventListener("DOMContentLoaded", function() {
    if (!isMobileDevice()) {
      document.body.classList.add('desktop');
    }
  });

  // Hamburger
  

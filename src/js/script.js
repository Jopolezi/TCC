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
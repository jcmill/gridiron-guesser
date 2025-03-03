const btnHamburger = document.querySelector('.js-hamburger');
const menu = document.querySelector('.js-menu');

btnHamburger.addEventListener('click', function(){
  btnHamburger.classList.toggle('nav-active');
  menu.classList.toggle('c-menu--open');
});
const nav = document.querySelector('nav');
const btnHamburger = document.querySelector('.js-hamburger');
const menu = document.querySelector('.js-menu__content');
const menuBlur = document.querySelector('.js-menu--blur');

document.addEventListener('click', function(el){
  if (!btnHamburger.contains(el.target) && el.target === menuBlur) {
    btnHamburger.removeAttribute('active', '')
    menuDisplay('remove');
  } if (btnHamburger.contains(el.target) && !btnHamburger.hasAttribute('active')) {
    btnHamburger.setAttribute('active', '')
    menuDisplay('add');
  } else if (btnHamburger.contains(el.target) && btnHamburger.hasAttribute('active')) {
    btnHamburger.removeAttribute('active', '')
    menuDisplay('remove');
  }  
});

function menuDisplay(action){
  if (action === 'add'){   
    btnHamburger.classList.add('nav-active');
    menu.classList.add('c-menu__content--open');
    menuBlur.classList.add('c-menu--blur');
    menuBlur.classList.remove('hide');
  } else if (action === 'remove') {
    btnHamburger.classList.remove('nav-active');
    menu.classList.remove('c-menu__content--open');
    menuBlur.classList.remove('c-menu--blur');
    menuBlur.classList.add('hide');
  }
};
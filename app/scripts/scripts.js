const bodyContainer = document.querySelector('body');
const nav = document.querySelector('nav');
const btnHamburger = document.querySelector('.js-hamburger');
const menu = document.querySelector('.js-menu__content');
const menuBlur = document.querySelector('.js-menu--blur');

const inputSearch = document.querySelector('.input-search');
const searchResults = document.querySelector('.js-search-options');

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
    menu.classList.remove('hide');
    menuBlur.classList.remove('hide');
    setTimeout(() => {
      bodyContainer.classList.add('fixed');
      btnHamburger.classList.add('nav-active');
      menu.classList.add('c-menu__content--open');
      menuBlur.classList.add('c-menu--blur');
    }, 0);
  } else if (action === 'remove') {
    bodyContainer.classList.remove('fixed');
    btnHamburger.classList.remove('nav-active');
    menu.classList.remove('c-menu__content--open');
    menuBlur.classList.remove('c-menu--blur');
    setTimeout(() => {
      menu.classList.add('hide');
      menuBlur.classList.add('hide');
    }, 500);
  }
};

let availablePlayers = [
  'Jake Miller',
  'Trevor VY',
  'Matthew Quinn',
  'Johanna Miller',
  'Zeke Mill',
  'Noah M',
  'Brandon Kennedy',
  'Max Kennedy'
];

inputSearch.onkeyup = function(){
  let result = [];
  let input = inputSearch.value;
  if(input.length){
    result = availablePlayers.filter((keyword) => {
      return keyword.toLowerCase().includes(input.toLowerCase());
    });
  } else if (input.length === 0) {
    clearResults()
  }
  displaySearchResults(result);
};

function displaySearchResults(result) {
  const content = result.map((list) => {
    return `
    <div class="o-player">
      <h4 class="btn" onclick="selectInput(this)">${list}</h4>
    </div>
    `;
  });
  searchResults.innerHTML = content.join('');
};

function selectInput(list) {
  inputSearch.value = list.innerHTML;
  clearResults()
}

function clearResults() {
  searchResults.innerHTML = '';
}
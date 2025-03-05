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

let players = [
  {
    "longName": "Jake Miller",
    "con": "AE",
    "team": "ARI",
    "pos": "LS",
    "jerseyNum": "59",
    "weight": "234",
    "height": "6'4\"",
    "exp": "2",
    "school": "Notre Dame"
  },
  {
    "longName": "Johanna Miller",
    "con": "NW",
    "team": "KC",
    "pos": "RB",
    "jerseyNum": "11",
    "weight": "120",
    "height": "5'6\"",
    "exp": "3",
    "school": "Fresno State"
    },
];

const mysteryPlayer = {
  "longName": "Noah Miller",
  "con": "AFCW",
  "team": "NC",
  "pos": "LS",
  "jerseyNum": "11",
  "weight": "120",
  "height": "6'4\"",
  "exp": "2",
  "school": "Notre Dame"
};

inputSearch.onkeyup = function(){
  let nameResult = [];
  let input = inputSearch.value;
  if(input.length){
    players.forEach((player) => {
      if (player.longName.toLowerCase().includes(input.toLowerCase())) {
        nameResult.push(player);
      }
    });
  } else if (input.length === 0) {
    clearResults();
  }
  displaySearchResults(nameResult);
};

function SearchDisplayTemplate(player, playerCon, playerTeam, playerPos, playerNum, playerWeight, playerHeight, playerExp, playerSchool) {
  let html = `
    <div class="o-player">
    <h4 class="btn" onclick="selectInput(this)">${player.longName}</h4>
    <ul>
      <li class="${playerCon}">${player.con}</li>
      <li class="${playerTeam}">${player.team}</li>
      <li class="${playerPos}">${player.pos}</li>
      <li class="${playerNum}">${player.jerseyNum}</li>
      <li class="${playerWeight}">${player.weight}</li>
      <li class="${playerHeight}">${player.height}</li>
      <li class="${playerExp}">${player.exp}</li>
      <li class="${playerSchool}">${player.school.toLowerCase().split(' ').map(name => name[0]).join('')}</li>
    </ul>
  </div>`;

  return html;
};

function displaySearchResults(result) {
  const content = result.map(player => {
    const playerCon = player.con === mysteryPlayer.con ? 'match' : 'no-match';
    const playerTeam = player.Team === mysteryPlayer.con ? 'match' : 'no-match';
    const playerPos = player.pos === mysteryPlayer.pos ? 'match' : 'no-match';
    const playerNum = player.jerseyNum === mysteryPlayer.jerseyNum ? 'match' : 'no-match';
    const playerWeight = player.weight === mysteryPlayer.weight ? 'match' : 'no-match';
    const playerHeight = player.height === mysteryPlayer.height ? 'match' : 'no-match';
    const playerExp = player.exp === mysteryPlayer.exp ? 'match' : 'no-match';
    const playerSchool = player.school === mysteryPlayer.school ? 'match' : 'no-match';

    return SearchDisplayTemplate(player, playerCon, playerTeam, playerPos, playerNum, playerWeight, playerHeight, playerExp, playerSchool);
  });
  searchResults.innerHTML = content.join('');
};

function selectInput(playerInfo) {
  inputSearch.value = playerInfo.innerHTML;
  clearResults()
}

function clearResults() {
  searchResults.innerHTML = '';
}

document.addEventListener('click', function(){
  if(inputSearch === document.activeElement) {
    console.log('focused');
  }
})
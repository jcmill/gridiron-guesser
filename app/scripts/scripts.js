const bodyContainer = document.querySelector('body');
const nav = document.querySelector('nav');
const btnHamburger = document.querySelector('.js-hamburger');
const menu = document.querySelector('.js-menu__content');
const menuBlur = document.querySelector('.js-menu--blur');

const inputSearch = document.querySelector('.input-search');
const searchResults = document.querySelector('.js-search-results');
const searchResultsOptions = document.querySelector('.js-search-options');

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

let players = [];

const mysteryPlayer = {
  "longName": "Noah Miller",
  "con": "AFCW",
  "team": "NC",
  "pos": "LS",
  "jerseyNum": "11",
  "weight": "120",
  "height": "6'4\"",
  "exp": "2",
  "age": "41"
};

let currentGuess = [];

fetch('public/scripts/players.json')
  .then(response => response.json())
  .then(data => {
    playersData = data;
    players = playersData.body
  })
  .catch(error => console.error('Error fetching player data:', error));

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

function SearchDisplayTemplate(player, playerIndex, playerCon, playerTeam, playerPos, playerNum, playerWeight, playerHeight, playerExp, playerAge) {
  let html = `
    <div class="o-player btn" onclick="selectInput(${playerIndex})" data="${playerIndex}">
    <h4>${player.longName}</h4>
    <ul>
      <li class="o-player--con ${playerCon}">${player.con}</li>
      <li class="o-player--team ${playerTeam}">${player.team}</li>
      <li class="o-player--pos ${playerPos}">${player.pos}</li>
      <li class="o-player--num ${playerNum}">${player.jerseyNum}</li>
      <li class="o-player--age ${playerAge}">${player.age}</li>
      <li class="o-player--exp ${playerExp}">${player.exp}</li>
      <li class="o-player--height ${playerHeight}">${player.height}</li>
      <li class="o-player--weight ${playerWeight}">${player.weight} lbs</li>
    </ul>
  </div>`;

  return html;
};

function displaySearchResults(result) {
  const content = result.map(player => {

    const teamToConference = {
      BUF: 'AFC E.', MIA: 'AFC E.', NE: 'AFC E.', NYJ: 'AFC E.',
      BAL: 'AFC N.', CIN: 'AFC N.', CLR: 'AFC N.', PIT: 'AFC N.',
      HOU: 'AFC S.', IND: 'AFC S.', JAX: 'AFC S.', TEN: 'AFC S.',
      DEN: 'AFC W.', KC: 'AFC W.', LV: 'AFC W.', LAC: 'AFC W.',
      DAL: 'NFC E.', NYG: 'NFC E.', PHI: 'NFC E.', WSH: 'NFC E.',
      CHI: 'NFC N.', DET: 'NFC N.', GB: 'NFC N.', MIN: 'NFC N.',
      ATL: 'NFC S.', CAR: 'NFC S.', NO: 'NFC S.', TB: 'NFC S.',
      ARI: 'NFC W.', LAR: 'NFC W.', SF: 'NFC W.', SEA: 'NFC W.'
    };
    player.con = teamToConference[player.team] || null;

    // these will all be changed from the mysteryPlayer to the last player guessed and only displaying the greens.
    const playerCon = player.con === mysteryPlayer.con ? 'match' : 'no-match';
    const playerTeam = player.Team === mysteryPlayer.con ? 'match' : 'no-match';
    const playerPos = player.pos === mysteryPlayer.pos ? 'match' : 'no-match';
    const playerNum = player.jerseyNum === mysteryPlayer.jerseyNum ? 'match' : 'no-match';
    const playerWeight = player.weight === mysteryPlayer.weight ? 'match' : 'no-match';
    const playerHeight = player.height === mysteryPlayer.height ? 'match' : 'no-match';
    const playerExp = player.exp === mysteryPlayer.exp ? 'match' : 'no-match';
    const playerAge = player.age === mysteryPlayer.age ? 'match' : 'no-match';

    let playerIndex = players.indexOf(player)

    return SearchDisplayTemplate(player, playerIndex, playerCon, playerTeam, playerPos, playerNum, playerWeight, playerHeight, playerExp, playerAge);
  });
  searchResultsOptions.innerHTML = content.join('');
};

function selectInput(selectedPlayer) {
  currentGuess = players[selectedPlayer];
  inputSearch.value = '';
  clearResults();
  console.log(currentGuess);
}

function clearResults() {
  searchResultsOptions.innerHTML = '';
}

inputSearch.addEventListener('focus', function(){
  if (document.activeElement === inputSearch) {
    searchResults.classList.add('a-search-key--slide');
  }
});

inputSearch.addEventListener('blur', function(){
  if (document.activeElement !== inputSearch && inputSearch.value == 0) {
    searchResults.classList.remove('a-search-key--slide');
  }
});
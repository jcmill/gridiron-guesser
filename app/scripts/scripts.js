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

fetch('public/scripts/players.json')
  .then(response => response.json())
  .then(data => {
    playersData = data;
    players = playersData.body
  })
  .catch(error => console.error('Error fetching player data:', error));


// let players = [
//   {
//     "longName": "Jake Miller",
//     "con": "AE",
//     "team": "ARI",
//     "pos": "LS",
//     "jerseyNum": "59",
//     "weight": "234",
//     "height": "6'4\"",
//     "exp": "2",
//     "school": "Notre Dame"
//   },
//   {
//     "longName": "Johanna Miller",
//     "con": "NW",
//     "team": "KC",
//     "pos": "RB",
//     "jerseyNum": "11",
//     "weight": "120",
//     "height": "5'6\"",
//     "exp": "3",
//     "school": "Fresno State"
//     },
//     {
//       "longName": "Trevor Vernon-Yates",
//       "con": "NE",
//       "team": "DE",
//       "pos": "S",
//       "jerseyNum": "11",
//       "weight": "175",
//       "height": "5'10\"",
//       "exp": "9",
//       "school": "University of Arizona"
//       },
// ];

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

function SearchDisplayTemplate(player, playerCon, playerTeam, playerPos, playerNum, playerWeight, playerHeight, playerExp, playerAge) {
  let html = `
    <div class="o-player">
    <h4 class="btn" onclick="selectInput(this)">${player.longName}</h4>
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

    if (player.team === 'BUF' || player.team === 'MIA' || player.team === 'NE' || player.team === 'NYJ') {
      player.con = 'AFC E.'
    } if (player.team === 'BAL' || player.team === 'CIN' || player.team === 'CLR' || player.team === 'PIT') {
      player.con = 'AFC N.'
    } if (player.team === 'HOU' || player.team === 'IND' || player.team === 'JAX' || player.team === 'TEN') {
      player.con = 'AFC S.'
    } if (player.team === 'DEN' || player.team === 'KC' || player.team === 'LV' || player.team === 'LAC') {
      player.con = 'AFC W.'
    } if (player.team === 'DAL' || player.team === 'NYG' || player.team === 'PHI' || player.team === 'WSH') {
      player.con = 'NFC E.'
    } if (player.team === 'CHI' || player.team === 'DET' || player.team === 'GB' || player.team === 'MIN') {
      player.con = 'NFC N.'
    } if (player.team === 'ATL' || player.team === 'CAR' || player.team === 'NO' || player.team === 'TB') {
      player.con = 'NFC S.'
    } if (player.team === 'ARI' || player.team === 'LAR' || player.team === 'SF' || player.team === 'SEA') {
      player.con = 'NFC W.'
    } else { return };

    // these will all be changed from the mysteryPlayer to the last player guessed and only displaying the greens.
    const playerCon = player.con === mysteryPlayer.con ? 'match' : 'no-match';
    const playerTeam = player.Team === mysteryPlayer.con ? 'match' : 'no-match';
    const playerPos = player.pos === mysteryPlayer.pos ? 'match' : 'no-match';
    const playerNum = player.jerseyNum === mysteryPlayer.jerseyNum ? 'match' : 'no-match';
    const playerWeight = player.weight === mysteryPlayer.weight ? 'match' : 'no-match';
    const playerHeight = player.height === mysteryPlayer.height ? 'match' : 'no-match';
    const playerExp = player.exp === mysteryPlayer.exp ? 'match' : 'no-match';
    const playerAge = player.age === mysteryPlayer.age ? 'match' : 'no-match';

    return SearchDisplayTemplate(player, playerCon, playerTeam, playerPos, playerNum, playerWeight, playerHeight, playerExp, playerAge);
  });
  searchResultsOptions.innerHTML = content.join('');
};

function selectInput(playerInfo) {
  inputSearch.value = playerInfo.innerHTML;
  clearResults()
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
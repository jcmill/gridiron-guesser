const bodyContainer = document.querySelector('body');
const nav = document.querySelector('nav');
const btnHamburger = document.querySelector('.js-hamburger');
const menu = document.querySelector('.js-menu');

const inputSearch = document.querySelector('.input-search');
const searchResults = document.querySelector('.js-search-results');
const searchResultsOptions = document.querySelector('.js-search-options');
const guessDisplay = document.querySelector('.js-players');

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
    setTimeout(() => {
      bodyContainer.classList.add('fixed');
      btnHamburger.classList.add('nav-active');
      menu.classList.add('c-menu--open');
    }, 0);
  } else if (action === 'remove') {
    bodyContainer.classList.remove('fixed');
    btnHamburger.classList.remove('nav-active');
    menu.classList.remove('c-menu--open');
    setTimeout(() => {
      menu.classList.add('hide');
      menuBlur.classList.add('hide');
    }, 500);
  }
};

function randomPlayer(x, y) {
  const num = Math.floor(Math.random() * (y - x) + x);
  mysteryPlayer = cleanPlayers[num];
};


let players = [];
let cleanPlayers = [];
let mysteryPlayer = [];
let currentGuess = [];

fetch('public/scripts/players.json')
  .then(response => response.json())
  .then(data => {
    players = data.body;
    cleanPlayers = players.filter(player => player.isFreeAgent === "False")
    .filter(player => player.jerseyNum !== "")
    .filter(player => player.pos !== "")
    .filter(player => player.weight !== "")
    .filter(player => player.height !== "")
    .filter(player => player.age !== "")
    .filter(player => player.exp !== "")
    .filter(player => player.exp !== "R");
    cleanPlayers.forEach(player => {
      [player.firstName, player.lastName] = player.longName.split(' ');
      const teamToConference = {
        BUF: ['AFC', 'East', 'E.', 'Bills'], MIA: ['AFC', 'East', 'E.', 'Dolphins'], NE: ['AFC', 'East', 'E.', 'Patriots'], NYJ: ['AFC', 'East', 'E.', 'Jets'],
        BAL: ['AFC', 'North', 'N.', 'Ravens'], CIN: ['AFC', 'North', 'N.', 'Bangals'], CLE: ['AFC', 'North', 'N.', 'Browns'], PIT: ['AFC', 'North', 'N.', 'Steelers'],
        HOU: ['AFC', 'South', 'S.', 'Texans'], IND: ['AFC', 'South', 'S.', 'Colts'], JAX: ['AFC', 'South', 'S.', 'Jaguars'], TEN: ['AFC', 'South', 'S.', 'Titans'],
        DEN: ['AFC', 'West', 'W.', 'Broncos'], KC: ['AFC', 'West', 'W.', 'Chiefs'], LV: ['AFC', 'West', 'W.', 'Raiders'], LAC: ['AFC', 'West', 'W.', 'Chargers'],
        DAL: ['NFC', 'East', 'E.', 'Cowboys'], NYG: ['NFC', 'East', 'E.', 'Giants'], PHI: ['NFC', 'East', 'E.', 'Eagles'], WSH: ['NFC', 'East', 'E.', 'Commanders'],
        CHI: ['NFC', 'North', 'N.', 'Bears'], DET: ['NFC', 'North', 'N.', 'Lions'], GB: ['NFC', 'North', 'N.', 'Packers'], MIN: ['NFC', 'North', 'N.', 'Vikings'],
        ATL: ['NFC', 'South', 'S.', 'Falcons'], CAR: ['NFC', 'South', 'S.', 'Panthers'], NO: ['NFC', 'South', 'S.', 'Saints'], TB: ['NFC', 'South', 'S.', 'Buccaneers'],
        ARI: ['NFC', 'West', 'W.', 'Cardinals'], LAR: ['NFC', 'West', 'W.', 'Rams'], SF: ['NFC', 'West', 'W.', '49ers'], SEA: ['NFC', 'West', 'W.', 'Seahawks']
      };
     [player.con, player.div, player.divShort, player.teamFull] = teamToConference[player.team] || [null, null, null, null];
    })
    randomPlayer(1, cleanPlayers.length);
  })
  .catch(error => console.error('Error fetching player data:', error));

// display total of 10 players, check against new array that indicate correct statistical answers (additinal include()s for each state)
inputSearch.onkeyup = function(){
  let nameResult = [];
  let input = inputSearch.value;
  if(input.length){
    cleanPlayers.forEach((player) => {
      if (player.longName.toLowerCase().includes(input.toLowerCase())) {
        nameResult.push(player);
      }
    });
  } else if (input.length === 0) {
    clearResults();
  }
  displaySearchResults(nameResult);
};

function searchDisplayTemplate(player, playerIndex, playerConDiv, playerTeam, playerPos, playerNum, playerWeight, playerHeight, playerExp, playerAge) {
  let html = `
    <div class="o-player btn" onclick="selectInput(${playerIndex})" data="${playerIndex}">
    <h4>${player.longName}</h4>
    <ul>
      <li class="o-player--con ${playerConDiv}">${player.con} ${player.divShort}</li>
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


function getSearchPlayerAttributes(player) {
  playerConDiv = (player.con === currentGuess.con && currentGuess.con === mysteryPlayer.con &&
    player.div === currentGuess.div && currentGuess.div === mysteryPlayer.div) ? 'match' : 'no-match';
  playerTeam = (player.team === currentGuess.team && currentGuess.team === mysteryPlayer.team) ? 'match' : 'no-match';
  playerPos = (player.pos === currentGuess.pos && currentGuess.pos === mysteryPlayer.pos) ? 'match' : 'no-match';
  playerNum = (player.jerseyNum === currentGuess.jerseyNum && currentGuess.jerseyNum === mysteryPlayer.jerseyNum) ? 'match' : 'no-match';
  playerWeight = (player.weight === currentGuess.weight && currentGuess.weight === mysteryPlayer.weight) ? 'match' : 'no-match';
  playerHeight = (player.height === currentGuess.height && currentGuess.height === mysteryPlayer.height) ? 'match' : 'no-match';
  playerExp = (player.exp === currentGuess.exp && currentGuess.exp === mysteryPlayer.exp) ? 'match' : 'no-match';
  playerAge = (player.age === currentGuess.age && currentGuess.age === mysteryPlayer.age) ? 'match' : 'no-match';
};

function displaySearchResults(result) {
  const content = result.map(player => {
    let playerIndex = players.indexOf(player);
    getSearchPlayerAttributes(player);

    console.log(player.exp);

    return searchDisplayTemplate(player, playerIndex, playerConDiv, playerTeam, playerPos, playerNum, playerWeight, playerHeight, playerExp, playerAge);
  });
  searchResultsOptions.innerHTML = content.join('');
};

function guessDisplayTemplate(player, playerConDiv, playerTeam, playerPos, playerNum, playerWeight, playerHeight, playerExp, playerAge) {
  let html = `
    <div class="c-player">
          <div class="c-player__general">
            <div class="c-player__name"> 
              <h3><span class="js-first-name">${player.firstName}</span><span class="js-last-name">${player.lastName}</span></h3>
            </div>
            <div class="c-player--number"><span>${player.jerseyNum}</span></div>
          </div>
          <div class="c-player__details">
            <div class="c-player--logo"> <img src="./public/images/logos/nfl-logos/gridiron-guesser-${player.team.toLowerCase()}.png" alt=""></div>
            <div class="c-player__con c-player__detail c-player__detail--border-upper"> 
              <p class="c-player__detail--title">Con/Div</p>
              <h6 class="c-player__con--detail ${playerConDiv}">${player.con} ${player.div}</h6>
            </div>
            <div class="c-player__pos c-player__detail c-player__detail--border-upper"> 
              <p class="c-player__detail--title">Position</p>
              <h6 class="c-player__pos--detail ${playerPos}">${player.pos}</h6>
            </div>
            <div class="c-player__age c-player__detail c-player__detail--border-upper"> 
              <p class="c-player__detail--title">Age</p>
              <h6 class="c-player__age--detail ${playerAge}">${player.age}</h6>
            </div>
            <div class="c-player__height c-player__detail c-player__detail--border-upper">
              <p class="c-player__detail--title">Height</p>
              <h6 class="c-player__height--detail ${playerHeight}">${player.height}</h6>
            </div>
            <div class="c-player__team c-player__detail c-player__detail--border-lower"> 
              <p class="c-player__detail--title">Team</p>
              <h6 class="c-player__team--detail ${playerTeam}">${player.teamFull}</h6>
            </div>
            <div class="c-player__num c-player__detail c-player__detail--border-lower"> 
              <p class="c-player__detail--title">Jersey</p>
              <h6 class="c-player__num--detail ${playerNum}">${player.jerseyNum}</h6>
            </div>
            <div class="c-player__exp c-player__detail c-player__detail--border-lower">
              <p class="c-player__detail--title">Experience</p>
              <h6 class="c-player__exp--detail ${playerExp}">${player.exp}</h6>
            </div>
            <div class="c-player__weight c-player__detail c-player__detail--border-lower">
              <p class="c-player__detail--title">Weight</p>
              <h6 class="c-player__weight--detail ${playerWeight}"> ${player.weight} lbs</h6>
            </div>
          </div>
        </div>`;

    guessDisplay.insertAdjacentHTML('afterbegin', html);
};

function getGuessPlayerAttributes(player) {
  playerConDiv = (player.con === mysteryPlayer.con && player.div === mysteryPlayer.div) 
    ? 'match' 
      : (player.con === mysteryPlayer.con || player.div === mysteryPlayer.div) 
        ? 'close' 
          : 'no-match';
  playerTeam = player.team === mysteryPlayer.team ? 'match' : 'no-match';
  playerPos = player.pos === mysteryPlayer.pos ? 'match' : 'no-match';
  playerNum = player.jerseyNum === mysteryPlayer.jerseyNum ? 'match' : 'no-match';
  playerWeight = player.weight === mysteryPlayer.weight ? 'match' : 'no-match';
  playerHeight = player.height === mysteryPlayer.height ? 'match' : 'no-match';
  playerExp = player.exp === mysteryPlayer.exp ? 'match' : 'no-match';
  playerAge = player.age === mysteryPlayer.age ? 'match' : 'no-match';
};

function selectInput(selectedPlayer) {
  currentGuess = players[selectedPlayer];
  inputSearch.value = '';
  clearResults();
  searchResults.classList.remove('a-search-key--slide');
  getGuessPlayerAttributes(players[selectedPlayer]);

  guessDisplayTemplate(currentGuess, playerConDiv, playerTeam, playerPos, playerNum, playerWeight, playerHeight, playerExp, playerAge);
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
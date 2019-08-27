var minNumber = 1;
var maxNumber = 100;
var secretNumber = Math.floor((Math.random() * (maxNumber - minNumber + 1)) + minNumber);

var guessCount = 0;
var winner = false;
var winnerName = "";
var nameOne = "";
var nameTwo = "";
var banList = ["#","?","!","@","#","$","%","^","&","*","(",")","-","+","=","<",">",",",".","/","`","~","{","}",";",":","|"]
var startTime = "";
var finishTime = "";
var complete = "";

var minRange = document.getElementById('min-range');
var maxRange = document.getElementById('max-range');
var update = document.getElementById('update')
var resetGame = document.getElementById('reset-game');
var submitGuess = document.getElementById('submit-guess');
var clearGame = document.getElementById('clear-game');
var playerOneCurrentName = document.getElementById('player-one-current-name');
var playerOneName = document.getElementById('player-one-name');
var playerTwoCurrentName = document.getElementById('player-two-current-name');
var playerTwoName = document.getElementById('player-two-name');
var playerOneCurrentGuess = document.getElementById('player-one-current-guess');
var playerOneGuess = document.getElementById('player-one-guess');
var playerTwoCurrentGuess = document.getElementById('player-two-current-guess');
var playerTwoGuess = document.getElementById('player-two-guess');
var playerOneHighLow = document.getElementById('player-one-high-low');
var playerTwoHighLow = document.getElementById('player-two-high-low');
var resultsWinnerName = document.getElementById('results-winner-name');

document.querySelector('.section-right').addEventListener('click', function(event) {
  if (event.target.classList.contains('delete')) {
    event.path[3].classList.add('fade-out');
    setTimeout(function() {
      event.path[3].remove();
    }, 1400)
  }
})

window.addEventListener('load', function() {
  clearInputDisable();
  resetGame.disabled = true;
  update.disabled = true;
  submitGuess.disabled = true;
});

minRange.addEventListener('change', function() {
  checkRangeNumber(minRange.value, document.getElementById('error-one-not-number'),document.getElementById('min-range'));
  checkRanges(document.getElementById('error-one'), document.getElementById('min-range'));
  isEmpty();
})

maxRange.addEventListener('change', function() {
  checkRangeNumber(maxRange.value, document.getElementById('error-two-not-number'),document.getElementById('max-range'));
  checkRanges(document.getElementById('error-two'), document.getElementById('max-range'));
  isEmpty();
})

update.addEventListener('click', function() {
  minNumber = parseInt(minRange.value);
  maxNumber = parseInt(maxRange.value);
  secretNumber = Math.floor((Math.random() * (maxNumber - minNumber + 1)) + minNumber);
  document.getElementById('min-range-current').innerText = minRange.value;
  document.getElementById('max-range-current').innerText = maxRange.value;
})

playerOneName.addEventListener('change', function() {
  checkName(playerOneName, document.getElementById('name-error-one'), document.getElementById('player-one-name'), document.getElementById('player-one-name'));
  alphaNumeric();
  clearInputEnable();
  isEmpty();
})

playerTwoName.addEventListener('change', function() {
  checkName(playerTwoName, document.getElementById('name-error-two'), document.getElementById('player-two-name'),document.getElementById('player-two-name'));
  alphaNumeric();
  clearInputEnable();
  isEmpty();
})

playerOneGuess.addEventListener('change', function() {
  clearInputEnable();
  numberCheck(playerOneGuess, document.getElementById('guess-number-error-one'), document.getElementById('guess-number-error-range-one'));
  checkName(playerOneName, document.getElementById('name-error-one'));
  checkName(playerTwoName, document.getElementById('name-error-two'));
  isEmpty();
})

playerTwoGuess.addEventListener('change', function() {
  clearInputEnable();
  numberCheck(playerTwoGuess, document.getElementById('guess-number-error-two'), document.getElementById('guess-number-error-range-two'));
  checkName(playerOneName, document.getElementById('name-error-one'));
  checkName(playerTwoName, document.getElementById('name-error-two'));
  isEmpty();
})

submitGuess.addEventListener('click', function() {
  gameStart();
  guessCount = guessCount + 1;
  changeNames();
  highLow();
  setNames();
  checkWinner();
  winnerLogic();
  gameInProgress();
})

resetGame.addEventListener('click', function() {
  secretNumber = Math.floor((Math.random() * maxNumber) + minNumber);
  guessCount = 0;
  if (guessCount < 1) {
    resetGame.disabled = true;
  } else if (minNumber != 1) {
    resetGame.disabled = true;
  } else if (maxNumber != 100) {
    resetGame.disabled = true;
  }
})

clearGame.addEventListener('click', function() {
  playerOneName.value = "";
  playerTwoName.value = "";
  playerOneGuess.value = "";
  playerTwoGuess.value = "";
  minRange.value = "";
  maxRange.value = "";
  clearInputDisable();
})



function changeNames() {
  playerOneCurrentName.innerText = playerOneName.value;
  playerTwoCurrentName.innerText = playerTwoName.value;
  playerOneCurrentGuess.innerText = playerOneGuess.value;
  playerTwoCurrentGuess.innerText = playerTwoGuess.value;
}

function highLow() {
    if (playerOneGuess.value > secretNumber) {
      playerOneHighLow.innerText = "that's too high"
    } else if (playerOneGuess.value == secretNumber){
      playerOneHighLow.innerText = "BOOM!"
    } else {
      playerOneHighLow.innerText = "that's too low"
    }

    if (playerTwoGuess.value > secretNumber) {
      playerTwoHighLow.innerText = "that's too high"
    } else if (playerTwoGuess.value == secretNumber){
      playerTwoHighLow.innerText = "BOOM!"
    } else {
      playerTwoHighLow.innerText = "that's too low"
    }
}

function setNames() {
  nameOne = playerOneName.value;
  nameTwo = playerTwoName.value;
}

function timerStart() {
  if (guessCount == 0) {
  startTime = Math.floor(Date.now()/1000);
  }
}

function timerEnd() {
  finishTime = Math.floor(Date.now()/1000);
}

function timerComplete() {
  complete = ((finishTime - startTime)/60).toFixed(2);
}

function tie() {
  resultsWinnerName.innerText = "TIE!";
  document.querySelector('.guess-count').innerText = guessCount;
  document.getElementById('results-player-one-current-name').innerText = playerOneName.value;
  document.getElementById('results-player-two-current-name').innerText = playerTwoName.value;
  document.getElementById('winner-disappear').innerText = "";
  winner = true;
  winnerName = "TIE!"
}

function gameWinner(winningPlayerName, nameNum) {
  resultsWinnerName.innerText = winningPlayerName.value;
  document.querySelector('.guess-count').innerText = guessCount;
  document.getElementById('results-player-one-current-name').innerText = winningPlayerName.value;
  document.getElementById('results-player-two-current-name').innerText = winningPlayerName.value;
  winner = true;
  winnerName = nameNum;
}

function checkWinner() {
  if (playerOneCurrentGuess.innerText == secretNumber && playerTwoCurrentGuess.innerText == secretNumber) {
    tie();
  } else if (playerOneCurrentGuess.innerText == secretNumber) {
    gameWinner(playerOneName, nameOne);
  } else if (playerTwoCurrentGuess.innerText == secretNumber) {
    gameWinner(playerTwoName, nameTwo);
  }
}

function checkName(name, errorMsg) {
  if (name.value == "") {
    submitGuess.disabled = true;
    name.classList.add('pink-border');
    errorMsg.classList.add('show');
    isEmpty();
  } else {
    submitGuess.disabled = false;
    name.classList.remove('pink-border');
    errorMsg.classList.remove('show');
    isEmpty();
  }
}

function alphaNumeric() {
  for (i = 0 ; i < banList.length; i++) {
  if (playerOneName.value.split("").includes(banList[i]) == true) {
    submitGuess.disabled = true;
    document.getElementById('alpha-error-one').classList.add('show');
    playerOneName.classList.add('pink-border');
    return;
  } else if (playerTwoName.value.split("").includes(banList[i]) == true) {
    submitGuess.disabled = true;
    playerTwoName.classList.add('pink-border');
    document.getElementById('alpha-error-two').classList.add('show');
    return;
  } else {
    submitGuess.disabled = false;
    playerOneName.classList.remove('pink-border');
    playerTwoName.classList.remove('pink-border');
    document.getElementById('alpha-error-one').classList.remove('show');
    document.getElementById('alpha-error-two').classList.remove('show');
  }
  }
}

function resetNumAndGuess() {
  secretNumber = Math.floor((Math.random() * maxNumber) + minNumber);
  guessCount = 0;
}

function winUpdateRange() {
  minNumber = minNumber - 10;
  maxNumber = maxNumber + 10;
  document.getElementById('min-range-current').innerText = minNumber;
  document.getElementById('max-range-current').innerText = maxNumber;
}

function gameStart() {
  timerStart();
  checkName(playerOneName, document.getElementById('name-error-one'));
  checkName(playerTwoName, document.getElementById('name-error-two'));
  alphaNumeric();
}


function numberCheck(playerNumGuess, errorOne, errorRangeOne) {
  p1Guess = parseInt(playerNumGuess.value)
  if (Number.isInteger(p1Guess) != true) {
    submitGuess.disabled = true;
    errorRangeOne.classList.remove('show');
    playerNumGuess.classList.add('pink-border');
    errorOne.classList.add('show');
    return;
  } else if (minNumber - 1 < p1Guess != true || p1Guess < maxNumber + 1 != true) {
    submitGuess.disabled = true;
    errorOne.classList.remove('show');
    playerNumGuess.classList.add('pink-border');
    errorRangeOne.classList.add('show');
    return;
  } else {
    submitGuess.disabled = false;
    errorOne.classList.remove('show');
    errorRangeOne.classList.remove('show');
    playerNumGuess.classList.remove('pink-border');
  }
}

function winnerLogic() {
  if (winner == true) {
  timerEnd();
  timerComplete();
  winnerCard();
  resetNumAndGuess();
  winUpdateRange();
  winner = false;
  console.log('win')
  }
}

function gameInProgress() {
  if (guessCount > 0) {
  document.getElementById("reset-game").disabled = false;
  playerOneGuess.value = "";
  playerTwoGuess.value = "";
  }
}

function clearInputDisable() {
  clearGame.disabled = true;
}

function clearInputEnable() {
  clearGame.disabled = false;
}

function isEmpty() {
  if (maxRange.value == "" || minRange.value == ""){
    update.disabled = true;
  }
  if (minRange.classList.contains('pink-border') || minRange.classList.contains('pink-border' )) {
    update.disabled = true;
  }
  if (playerOneName.classList.contains('pink-border') || playerTwoName.classList.contains('pink-border') || playerTwoGuess.classList.contains('pink-border') || playerTwoGuess.classList.contains('pink-border')) {
    submitGuess.disabled = true;
  }
  if (playerOneGuess.value == "" || playerTwoGuess.value == "") {
    submitGuess.disabled = true;
  }
}

function checkRanges(errorMsg, border) {
  if (parseInt(minRange.value)> parseInt(maxRange.value) && maxRange.value != "") {
    errorMsg.classList.add('show');
    border.classList.add('pink-border');
    update.disabled = true;
    return;
  } else if (parseInt(minRange.value) > parseInt(maxRange.value) && maxRange.value != "") {
   errorMsg.classList.add('show');
    border.classList.add('pink-border');
    update.disabled = true;
    return;
  } else {
    errorMsg.classList.remove('show');
    update.disabled = false;
    clearInputEnable();
    return;
  }
    isEmpty();
}

function checkRangeNumber(number, errorMsg, border) {
  number = parseInt(number);
  if (Number.isInteger(number) != true) {
    errorMsg.classList.add('show');
    border.classList.add('pink-border');
    update.disabled = true;
    return;
  } else {
    errorMsg.classList.remove('show');
    border.classList.remove('pink-border');
    update.disabled = false;
    clearInputEnable();
    return;
  }
  isEmpty();
}

function cardUi() {
  var article = document.createElement('span');
  document.querySelector('.section-right').appendChild(article);
  article.innerHTML = `<article id="right-ui" class="right-ui hidden slide-bottom">
    <div class="media-flex flex-space-between">
      <button class="button-100" type="button" name="button" id="clear-card">CLEAR ALL</button>
      <button class="button-100" type="button" name="button" id="highscore">HIGHSCORES</button>
      <button class="button-100" type="button" name="button" id="sort">SORT</button>
  </div>
  </article>`;
}

function winnerCard() {
  cardUi();
  var article = document.createElement('span');
  document.querySelector('.section-right').appendChild(article);
  article.innerHTML = `<article class="text-center fade-in">
          <p class="flex-space-around cvc"><span class="bold" id="results-player-one-current-name" >${nameOne} </span><span class="slim"> VS </span><span class="bold" id="results-player-two-current-name"> ${nameTwo}</span></p>
          <hr>
          <div class="winner scale-up-center">
            <p><span class="bold large" id="results-winner-name">${winnerName} </span></p>
            <h1 class="slim large" id="winner-disappear">WINNER</h1>
          </div>
          <hr>
          <p class="flex-space-between guesses"><span><span class="bold guess-count">${guessCount}</span>GUESSES</span> <span><span class="bold guess-count">${complete}</span>MINUTES</span><button class="delete" type="button" name="button" id="delete"><span class="delete-inner">X</span></button></p>
        </article>`;
  document.querySelector('.section-right').scrollBy({
    top: 357, // could be negative value
    behavior: 'smooth'
})
document.getElementById('right-ui').classList.remove('hidden');
create();
}


// clear all cards
function create() {
if (document.getElementById('clear-card') != null) {
document.getElementById('clear-card').addEventListener('click', function() {
  document.querySelector('.section-right').innerHTML = ""
})
}
}
//enabled clear button


// document.querySelectorAll('input').addEventListener('change', function() {
// for (var i = 0; i < querySelectorAll('input').length; i++) {
//   if ( querySelectorAll('input')[i] != "") {
//  document.getElementById("clear-game").disabled = false;
// }
// }
// })



// Move these uptop after we decide what to do


//var mustBeNumber = document.querySelectorAll('.must-be-number');

// mustBeNumber.forEach(input => {
//
//    input.addEventListener('change', event => {
//      if (typeof mustBeNumberValue === "string") {
//      alert('no');
//    }})
// });


// var mustBeNumberValue = mustBeNumber.value
//     if (typeof mustBeNumberValue === "string") {
  //   alert('no');
// mustBeNumber.addEventListener('change', function() {
//   if (typeof mustBeNumberValue === "string") {
//     alert('no');
//   } else {}
// })

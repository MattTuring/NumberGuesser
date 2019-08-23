// The clear button should be disabled if there is nothing to clear.


//Generate the base random 1-100

var minNumber = 1;
var maxNumber = 100;
var secretNumber = Math.floor((Math.random() * maxNumber) + minNumber);

var guessCount = 0;

var winner = false;
var winnerName = "";
var nameOne = "";
var nameTwo = "";
var banList = ["#","?","!","@","#","$","%","^","&","*","(",")","-","+","=","<",">",",",".","/","`","~","{","}",";",":","|"]

var startTime = "";
var finishTime = "";
var complete = "";
//Sets the updated user number to make the game harder or easier

var minRange = document.getElementById('min-range');
var maxRange = document.getElementById('max-range');
var resetGame = document.getElementById('reset-game');
var submitGuess = document.getElementById('submit-guess');
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


document.getElementById('update').addEventListener('click', function() {
  minNumber = parseInt(minRange.value);
  maxNumber = parseInt(maxRange.value);
  if (Number.isInteger(minNumber) != true) {
    alert("Min Range is not a number!!");
  } else if (Number.isInteger(maxNumber) != true) {
    alert("Max Range is not a number!");
  } else {
    secretNumber = Math.floor((Math.random() * maxNumber) + minNumber)
    document.getElementById('min-range-current').innerText = minRange.value;
    document.getElementById('max-range-current').innerText = maxRange.value;
  }
})

//Resets Random Number

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

function checkWinner() {
  if (playerOneCurrentGuess.innerText == secretNumber && playerTwoCurrentGuess.innerText == secretNumber) {
    resultsWinnerName.innerText = "TIE!";
    document.querySelector('.guess-count').innerText = guessCount;
    document.getElementById('results-player-one-current-name').innerText = playerOneName.value;
    document.getElementById('results-player-two-current-name').innerText = playerTwoName.value;
    document.getElementById('winner-disappear').innerText = "";
    winner = true;
    winnerName = "TIE!"
  } else if (playerOneCurrentGuess.innerText == secretNumber) {
    resultsWinnerName.innerText = playerOneName.value;
    document.querySelector('.guess-count').innerText = guessCount;
    document.getElementById('results-player-one-current-name').innerText = playerOneName.value;
    document.getElementById('results-player-two-current-name').innerText = playerTwoName.value;
    winner = true;
    winnerName = nameOne;
  } else if (playerTwoCurrentGuess.innerText == secretNumber) {
    resultsWinnerName.innerText = playerTwoName.value;
    document.querySelector('.guess-count').innerText = guessCount;
    document.getElementById('results-player-one-current-name').innerText = playerOneName.value;
    document.getElementById('results-player-two-current-name').innerText = playerTwoName.value;
    winner = true;
    winnerName = nameTwo;
  } else {
    console.log('keep going')
  }
}


function checkNameOne() {
  if (playerOneName.value == "") {
    submitGuess.disabled = true;
    document.getElementById('name-error-one').classList.add('show');
  } else {
    submitGuess.disabled = false;
    document.getElementById('name-error-two').classList.remove('show');
  }
}

function checkNameTwo() {
  if (playerTwoName.value == "") {
    submitGuess.disabled = true;
      document.getElementById('name-error-two').classList.add('show');
  } else {
    submitGuess.disabled = false;
    document.getElementById('name-error-two').classList.remove('show');
  }
}

function alphaNumeric() {
  for (i = 0 ; i < banList.length; i++) {
  if (playerOneName.value.split("").includes(banList[i]) == true) {
    submitGuess.disabled = true;
    document.getElementById('alpha-error-one').classList.add('show');
    return;
  } else if (playerTwoName.value.split("").includes(banList[i]) == true) {
    submitGuess.disabled = true;
    document.getElementById('alpha-error-two').classList.add('show');
    return;
  } else {
    submitGuess.disabled = false;
    document.getElementById('alpha-error-one').classList.remove('show');
    document.getElementById('alpha-error-two').classList.remove('show');
  }
}
}

playerOneName.addEventListener('change', function() {
  checkNameOne();
  alphaNumeric();
})

playerTwoName.addEventListener('change', function() {
  checkNameTwo();
  alphaNumeric();
})

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

submitGuess.addEventListener('click', function() {
    timerStart();
    checkNameOne();
    checkNameTwo();
    alphaNumeric();
    p1Guess = parseInt(playerOneGuess.value)
    p2Guess = parseInt(playerTwoGuess.value)
  if (Number.isInteger(p1Guess) != true) {
    alert("Player 1! C'MON! That's not a number!");
  } else if (Number.isInteger(p2Guess) != true) {
    alert("Player 2! C'MON! That's not a number!");
  } else if (minNumber < p1Guess != true || p1Guess < maxNumber != true) {
    alert("Player 1! That's not within range!");
  } else if (minNumber < p2Guess != true || p2Guess < maxNumber != true) {
    alert("Player 2! That's not within range!");
  } else {
    guessCount = guessCount + 1;
    changeNames();
    highLow();
    setNames();
    checkWinner();
    if (winner == true) {
    timerEnd();
    timerComplete();
    winnerCard();
    resetNumAndGuess();
    winUpdateRange();
    winner = false;
    console.log('win')
    }


    if (guessCount > 0) {
    document.getElementById("reset-game").disabled = false;
    playerOneGuess.value = "";
    playerTwoGuess.value = "";
  }}
})


// Clears Input Fields

document.getElementById('clear-game').addEventListener('click', function() {
  playerOneName.value = "";
  playerTwoName.value = "";
  playerOneGuess.value = "";
  playerTwoGuess.value = "";
})

//disables clear button on load

window.addEventListener('load', function() {
  document.getElementById('clear-game').disabled = true;
  document.getElementById('reset-game').disabled = true;
});



//The application should display an error message if the value entered in the Max Range input is less than the value in the Min Range input
//The application should display an error message if the value entered in the Min Range input is greater than the value in the Max Range input

document.getElementById('min-range').addEventListener('change', function() {
  if (document.getElementById('min-range').value > document.getElementById('max-range').value && document.getElementById('max-range').value != "") {
    document.getElementById('error-one').classList.add('show');
    document.getElementById('update').disabled = true;
} else {
    document.getElementById('error-one').classList.remove('show');
    document.getElementById('update').disabled = false;
}
})

document.getElementById('max-range').addEventListener('change', function() {
  if (document.getElementById('min-range').value > document.getElementById('max-range').value && document.getElementById('max-range').value != "") {
    document.getElementById('error-one').classList.add('show');
    document.getElementById('update').disabled = true;
  } else {
    document.getElementById('error-one').classList.remove('show');
    document.getElementById('update').disabled = false;
  }
})




function winnerCard() {
  var article = document.createElement('span');
  document.querySelector('.section-right').appendChild(article);
  article.innerHTML = `<article class="text-center">
          <p class="flex-space-around cvc"><span class="bold" id="results-player-one-current-name" >${nameOne} </span><span class="slim"> VS </span><span class="bold" id="results-player-two-current-name"> ${nameTwo}</span></p>
          <hr>
          <div class="winner">
            <p><span class="bold large fade-in" id="results-winner-name">${winnerName} </span></p>
            <h1 class="slim large" id="winner-disappear">WINNER</h1>
          </div>
          <hr>
          <p class="flex-space-between guesses"><span><span class="bold guess-count">${guessCount}</span>GUESSES</span> <span><span class="bold guess-count">${complete}</span>MINUTES</span><button class="delete" type="button" name="button" id="delete"><span class="delete-inner">X</span></button></p>
        </article>`;
  document.querySelector('.section-right').scrollBy({
    top: 357, // could be negative value
    behavior: 'smooth'
})
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

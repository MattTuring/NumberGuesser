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
    alert("Min Range is not a number!");
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

submitGuess.addEventListener('click', function() {
  if (Number.isInteger(parseInt(playerOneGuess.value)) != true) {
    alert("Player 1! C'MON! That's not a number!");
  } else if (Number.isInteger(parseInt(playerTwoGuess.value)) != true) {
    alert("Player 2! C'MON! That's not a number!");
  } else {
    guessCount = guessCount + 1;
    changeNames();
    highLow();
    checkWinner();
    setNames();
    checkWinner();
    if (winner == true) {
    winnerCard();
    winner = false;
    }
    checkWinner();

  if (guessCount > 0) {
    document.getElementById("reset-game").disabled = false;
    playerOneGuess.value = "";
    playerTwoGuess.value = "";
  }
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
  var article = document.createElement('article');
  document.querySelector('.section-right').appendChild(article);
  article.innerHTML = `<article class="text-center">
          <p class="flex-space-around cvc"><span class="bold" id="results-player-one-current-name" >${nameOne} </span><span class="slim"> VS </span><span class="bold" id="results-player-two-current-name"> ${nameTwo}</span></p>
          <hr>
          <div class="winner">
            <p><span class="bold large" id="results-winner-name">${winnerName} </span></p>
            <h1 class="slim large" id="winner-disappear">WINNER</h1>
          </div>
          <hr>
          <p class="flex-space-between guesses"><span><span class="bold guess-count">${guessCount}</span>GUESSES</span> <span><span class="bold guess-count">1.35</span>MINUTES</span><button class="delete" type="button" name="button" id="delete"><span class="delete-inner">X</span></button></p>
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

// function checkNum() {
//   var mustBeNumber = document.querySelectorAll('.must-be-number');
//   for (var i = 0; i < mustBeNumber.length; i++) {
//     if (Number.NaN(mustBeNumber[i])) {
//       alert('THAT IS NOT A NUMBER');
//     }
//   }
// }

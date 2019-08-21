// The clear button should be disabled if there is nothing to clear.
// The reset button should be disabled if there is nothing to reset.


//Generate the base random 1-100

var minNumber = 1;
var maxNumber = 100;
var secretNumber = Math.floor((Math.random() * maxNumber) + minNumber);

//Sets the updated user number to make the game harder or easier

document.getElementById('update').addEventListener('click', function() {
  minNumber = document.getElementById('min-range').value;
  maxNumber = document.getElementById('max-range').value;
  secretNumber = Math.floor((Math.random() * maxNumber) + minNumber)
  document.getElementById('min-range-current').innerText = document.getElementById('min-range').value;
  document.getElementById('max-range-current').innerText = document.getElementById('max-range').value;
})

//Resets Random Number

document.getElementById('reset-game').addEventListener('click', function() {
  secretNumber = Math.floor((Math.random() * maxNumber) + minNumber)
})

//Updates Player Values

document.getElementById('submit-guess').addEventListener('click', function() {
  document.getElementById('player-one-current-name').innerText = document.getElementById('player-one-name').value;
  document.getElementById('player-two-current-name').innerText = document.getElementById('player-two-name').value;
  document.getElementById('player-one-current-guess').innerText = document.getElementById('player-one-guess').value;
  document.getElementById('player-two-current-guess').innerText = document.getElementById('player-two-guess').value;

 //Determines winner

  if (document.getElementById('player-one-current-guess').innerText == secretNumber) {
    document.getElementById('results-winner-name').innerText = document.getElementById('player-one-name').value;
  } else if (document.getElementById('player-two-current-guess').innerText == secretNumber) {
    document.getElementById('results-winner-name').innerText = document.getElementById('player-two-name').value;
  } else if (document.getElementById('player-two-current-guess').innerText && document.getElementById('player-two-current-name').innerText == secretNumber) {
    document.getElementById('results-winner-name').innerText = "TIE!";
  } else {
    console.log('keep going or error')
  }
})

// Clears Input Fields

document.getElementById('clear-game').addEventListener('click', function() {
  document.getElementById('player-one-name').value = "";
  document.getElementById('player-two-name').value = "";
  document.getElementById('player-one-guess').value = "";
  document.getElementById('player-two-guess').value = "";
})

//disables clear button on load

window.addEventListener('load', function() {
  document.getElementById("clear-game").disabled = true;
});

//enabled clear button

//document.querySelectorAll('input').addEventListener('change', function() {
//    document.getElementById("clear-game").disabled = false;
//})



// Move these uptop after we decide what to do

//
// var mustBeNumber = document.querySelector('.must-be-number');
// var mustBeNumberValue = mustBeNumber.value
//
//
// mustBeNumber.addEventListener('change', function() {
//
//   if (typeof mustBeNumberValue === "string") {
//     alert('no');
//   } else {}
//
// })

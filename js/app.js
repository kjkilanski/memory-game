/*
* Variables
*/

const deck = document.querySelector('.deck');
const card = document.getElementsByClassName('card');
const cards = [...card];
const modal = document.querySelector('.modal');
const resetBtn = document.getElementsByClassName('reset-me');
const allStar = document.getElementsByClassName('fa fa-star');
const allStars = [...allStar];
const modalStar = document.getElementsByClassName('stats fa fa-star');
const modalStars = [...modalStar];
const close = document.querySelector('close');

let cardSelection;
let visibleCard;
let cls; // CSS classes
let numMoves = 0;
let numMatches = 0;
let numClicks = 0;
let numStars = 0;
let openList = []; // Cards that have been clicked and open, maximum is two
let matchedList =[];
let matchedName; // Name of set of cards that match for the matchedList array
let completeList = [];
let startTime;
let endTime;
let seconds;

startGame();

/* The startGame() function starts the game
* The function creates a new deck based on the CSS class 'deck', the ul with the class 'deck';
* Then the functions assigns a new variable that returns the shuffled cards, which correspond to the 'li' with the class 'cards'
* Next a for loop creates a new deck based on the shuffled cards, with each new card being added to the .deck ul.
*/

function startGame() {
  document.querySelector('.moves').innerHTML = '0 Moves';
  const cardShuffle = shuffle(cards);

  for (var i = 0; i < 3; i++) {
    allStars[i].style.display = 'inline-block';
  }

  for (var i = 0; i < cardShuffle.length; i++) {
    deck.appendChild(cardShuffle[i]);
  }
  eventListeners();

}


/* Shuffle function from http://stackoverflow.com/a/2450976 */
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
    return array;

}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


/*
* Event Listeners for when users click cards or the reset button
*/
 function eventListeners() {
   for (let i = 0; i < cards.length; i++) {
      cards[i].addEventListener('click', matchCards, false);
      for (let i =0; i < resetBtn.length; i++) {
        resetBtn[i].addEventListener('click', gameReset, false);
      }
   }
   document.getElementById('close').addEventListener('click', closeModal, false);

}


/*
* Create an array for card selection, flip card, check for match, and track moves and score
*/

function matchCards() {
  clickCount();
  cardSelection = this;
  openList.push(this);

  //prevent flipping on click for third card
  if (openList.length <= 2) {
    flipCard();
  }

  if (openList.length === 2) {
    moveCounter();
    scorePanel();

    if ((visibleCard == true ) && (openList[0].firstElementChild.className == openList[1].firstElementChild.className)) {
      matchedList.push(matchedName);
      match();
      openList = [];
      } else {
        const resetTimer = setTimeout(reset, 1000);
      }
  }
}

// Flip the card and toggle CSS
function flipCard() {
  visibleCard = cardSelection.classList.toggle('open');
  visibleCard = cardSelection.classList.toggle('show');

}


/*
* If cards match, toggle CSS for matching cards
* If the number of matches equals 8, mark all cards as complete, stop timer, and display modal
*/
function match() {
  openList[0].classList.toggle('match');
  openList[1].classList.toggle('match');
  numMatches = matchedList.length;

  if (numMatches == 8) {
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.toggle('complete');
        completeList = [...cards];
    }
    endTimer();
    const showStats = setTimeout(showModal, 700);
  }
  openList = [];

}


// Reset flipped cards if cards don't match
function reset() {
  cls = ['show', 'open'];
  elements = openList;

  for (var i = 0; i < openList.length; i++) {
    openList[i].classList.remove(...cls);
  }
  openList = [];

}

/*
* Time counter for counting the amount of time from the first selection to when all cards match
* This code has been adapted from a solution at https://stackoverflow.com/questions/41632942/how-to-measure-time-elapsed-on-javascript
* Changes to the code include adding a click counter, updating to 'let' rather than 'var', and changing function names to something more consistent with my own style
*/

function startTimer() {
  startTime = new Date();

}

function endTimer() {
  endTime = new Date();
  let timeDiff = endTime - startTime;
  timeDiff /= 1000;
  seconds = Math.round(timeDiff);

  return seconds;

}

/*
* Move & click counters
*/

function moveCounter() {
  numMoves++;
  return numMoves;

}

function clickCount() {
  numClicks++;
  if (numClicks === 1) {
    startTimer();
  }

}

/*
* Star counters and displays
* scorePanel() - Show number of moves in the score panel while playing
* stars() - Calculate number of stars based on number of moves
* todo - It would be nice to have this be a function of both time and Moves
*/

function scorePanel() {
  if (numMoves === 1) {
    document.querySelector('.moves').innerHTML = numMoves + ' Move';
  } else {
    document.querySelector('.moves').innerHTML = numMoves + ' Moves';
  }
  stars();

// Can't have zero stars, so display 'none' only changed on two
  if (numStars == 1) {
    for (var i = 0; i <= numStars; i++) {
      allStars[i].style.display = 'none';
    }
  } else if (numStars == 2) {
    for (var i = 1; i < numStars; i++) {
    allStars[i].style.display = 'none';
    }
  }

}

function stars() {
  if (numMoves <= 11) {
    numStars = 3;
  } else if (numMoves > 11 && numMoves <= 18) {
    numStars = 2;
  } else {
    numStars = 1;
  }
  return numStars;

}

/*
* Modal display functions
* showModal() - Display modal including moves, time, and number of stars
* closeModal() - Close modal without resetting game
*/

function showModal() {

  modal.style.display ='block';

  //get ids for modal heading display
  document.getElementById('modal-moves').innerHTML = numMoves;
  document.getElementById('time').innerHTML = seconds;

  //get classes for modal display
  document.querySelector('.moves-stat').innerHTML = numMoves;
  document.querySelector('.time-stat').innerHTML = seconds + ' seconds';

  for (var i = 0; i < numStars; i++) {
    modalStars[i].style.display = 'inline-block';
  }

}

function closeModal() {
  modal.style.display ='none';
  for (var i = 1; i < modalStars.length; i++) {
    modalStars[i].style.display = 'none';
  }

}

/*
* Game reset
* Reset CSS class values, variables and display
*/
function gameReset() {
  reset();
  startTime = undefined;
  endTime = undefined;
  numMoves = 0;
  numMatches = 0;
  numClicks = 0;
  modal.style.display ='none';
  cls = ['complete', 'open', 'show', 'match'];

// reset array values
  for (var i = 0; i < cards.length; i++) {
    cards[i].classList.remove(...cls);
  }
  for (var i = 0; i < completeList.length; i++) {
    completeList[i].classList.remove(...cls);
  }
  for (var i = 0; i < modalStars.length; i++) {
    modalStars[i].style.display = 'none';
  }
  completeList = [];
  matchedList = [];

  // Restart game
  const restartGame = setTimeout(startGame, 250);

}

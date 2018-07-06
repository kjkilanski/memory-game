/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const deck = document.querySelector('.deck');
const card = document.getElementsByClassName('card');
const cards = [...card];
const modal = document.querySelector('.modal');
const resetBtn = document.getElementsByClassName('reset-me');
const allStar = document.getElementsByClassName('fa-star');
const allStars = [...allStar];
const close = document.querySelector('close');

let cardSelection;
let visibleCard;
let cls;
let numMoves = 0;
let numMatches = 0;
let numClicks = 0;
let numStars = 0;
let openList = [];
let matchedList =[];
let matchedName;
let completeList = [];
let startTime;
let endTime;
let seconds;

/* The startGame() function starts the game
* The function creates a new deck based on the CSS class 'deck', the ul with the class 'deck';
* Then the functions assigns a new variable that returns the shuffled cards, which correspond to the 'li' with the class 'cards'
* Next a for loop creates a new deck based on the shuffled cards, with each new card being added to the .deck ul.
*/

function startGame() {
  stars();
  document.querySelector('.moves').innerHTML = '0 Moves';

  const cardShuffle = shuffle(cards);
  for (var i = 0; i < cardShuffle.length; i++){
        deck.appendChild(cardShuffle[i]);
     }
     eventListeners();
  }

startGame();

// Shuffle function from http://stackoverflow.com/a/2450976
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

 function eventListeners() {
   for (let i = 0; i < cards.length; i++){
      cards[i].addEventListener('click', matchCards, false);
      for (let i =0; i < resetBtn.length; i++) {
        resetBtn[i].addEventListener('click', gameReset, false);
      }

   }
   document.getElementById('close').addEventListener('click', closeModal, false);
   // console.log(close);
   // close[i].addEventListener('click', closeModal, false);
 }

 function flipCard() {
   visibleCard = cardSelection.classList.toggle('open');
   visibleCard = cardSelection.classList.toggle('show');
 }

// Create an array, flip card, check for match, and count clicks
function matchCards() {
  clickCount();
  cardSelection = this;
  openList.push(this);

  //prevent flipping on click for third card
  if (openList.length <= 2) {
    flipCard();
  }

//console.log(openList.length + ' openList');
  if (openList.length === 2) {
    moveCounter();
    if (numMoves === 1) {
      document.querySelector('.moves').innerHTML = numMoves + ' Move';
    } else {
      document.querySelector('.moves').innerHTML = numMoves + ' Moves';
    }
    stars();

    console.log(numMoves + ' moves');
    if ((visibleCard == true ) && (openList[0].firstElementChild.className == openList[1].firstElementChild.className)) {

      matchedList.push(matchedName);
      match();
      openList = [];
    } else {
        const resetTimer = setTimeout(reset, 1000);
    }
  }
}

// Reset the matched cards array
function reset() {
        cls = ['show', 'open'];
        elements = openList;
        for (var i = 0; i < openList.length; i++) {
          openList[i].classList.remove(...cls);
        }
        openList = [];
}

function match() {

  openList[0].classList.toggle('match');
  openList[1].classList.toggle('match');
  numMatches = matchedList.length;
  console.log(numMatches);
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

function moveCounter() {
  numMoves++;
  return numMoves;
}

function clickCount() {
  numClicks++;
  if (numClicks === 1) {
    startTimer();
    console.log(numClicks);
  }
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
  let timeDiff = endTime - startTime; // in ms
  timeDiff /= 1000; // strip the ms

  // get seconds
  seconds = Math.round(timeDiff);
  console.log(seconds + " seconds"); //remove this once completion page is in place

  return seconds;

  // see if you can differentiate between seconds and minutes
}

function stars() {
  if (numMoves <= 10) {
    numStars = 3;
    for (var i = 0; i < numStars; i++) {
      allStars[i].style.display = 'inline-block';
    }
  } else if (numMoves > 10 && numMoves <= 17) {
    numStars = 2;
    console.log(numStars);
    for (var i = 1; i < numStars; i++) {
      console.log(i);
      allStars[i].style.display = 'none';
    }
  } else {
    numStars = 1;
    for (var i = 0; i < numStars; i++) {
      allStars[i].style.display = 'none';
    }
  }
}

function gameReset() {
  // reset variables and display; restart game
  startTime = undefined;
  endTime = undefined;
  numMoves = 0;
  numMatches = 0;
  numClicks = 0;
  modal.style.display ='none';
  cls = ['complete', 'open', 'show', 'match'];

  for (var i = 0; i < cards.length; i++) {
    cards[i].classList.remove(...cls);
  }
  for (var i = 0; i < completeList.length; i++) {
    completeList[i].classList.remove(...cls);
  }
  completeList = [];
  const restartGame = setTimeout(startGame, 250);
}

function showModal() {
  modal.style.display ='block';

  //get ids for modal heading display
  document.getElementById('modal-moves').innerHTML = numMoves;
  document.getElementById('time').innerHTML = seconds;

  //get classes for modal display
  document.querySelector('.moves-stat').innerHTML = numMoves;
  document.querySelector('.time-stat').innerHTML = seconds + ' seconds';
  document.querySelector('.star-stat').innerHTML = numStars;
}

function closeModal() {
  modal.style.display ='none';
  console.log('test');

}

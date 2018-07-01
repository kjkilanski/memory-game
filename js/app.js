/*
 * Create a list that holds all of your cards
 */
// const card = document.getElementsByClassName('card');
// const cards = [...card];
//
// /*
//  * Display the cards on the page
//  *   - shuffle the list of cards using the provided "shuffle" method below
//  *   - loop through each card and create its HTML
//  *   - add each card's HTML to the page
//  */
// const deck = document.querySelector('.deck');
//
const card = document.getElementsByClassName('card');
const cards = [...card];
const modal = document.querySelector('.modal');

let numMoves = 0;
let numMatches = 0;
let numClicks = 0;
let openList = [];
let completeList = [];
let startTime;
let endTime;

/* The startGame() function starts the game
* The function creates a new deck based on the CSS class 'deck', the ul with the class 'deck';
* Then the functions assigns a new variable that returns the shuffled cards, which correspond to the 'li' with the class 'cards'
* Next a for loop creates a new deck based on the shuffled cards, with each new card being added to the .deck ul.
*/
function startGame() {

  const deck = document.querySelector('.deck');
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


 function eventListeners(){
   const clicks = 0;

   for (var i = 0; i < cards.length; i++){
      cards[i].addEventListener('click', clickCount, false);
      cards[i].addEventListener('click', matchCards, false);
   };
 }

 function flipCard() {
   cardSelection.classList.toggle('open');
   cardSelection.classList.toggle('show');

 }

// Create an array and check for match

function matchCards() {
  cardSelection = this;
  openList.push(this);

  //prevent flipping on click for third card
  if (openList.length <= 2) {
    flipCard();
  }

//console.log(openList.length + ' openList');
  if (openList.length === 2) {
    moveCounter();
    console.log(numMoves + ' moves');
    if (openList[0].firstElementChild.className == openList[1].firstElementChild.className) {
      match();
      openList = [];
    } else {
        const resetTimer = setTimeout(reset, 1000);
    }
  }
}

// Reset the matched cards array
function reset() {
        const cls = ['show', 'open'];
        const elements = openList;
        for (var i = 0; i < openList.length; i++) {
          openList[i].classList.remove(...cls);
        }
        openList = [];
}


function match() {
  openList[0].classList.toggle('match');
  openList[1].classList.toggle('match');
  numMatches++;
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


/*
* Time counter for counting the amount of time from the first selection to when all cards match
* This code has been adapted from a solution at https://stackoverflow.com/questions/41632942/how-to-measure-time-elapsed-on-javascript
* Changes to the code include adding a click counter, updating to 'let' rather than 'var', and changing function names to something more consistent with my own style
*/



function clickCount() {
  numClicks++;
  if (numClicks === 1) {
    startTimer();
  }

}

function startTimer() {
  startTime = new Date();
  console.log(startTime);
};

function endTimer() {
  endTime = new Date();
  let timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds
  const seconds = Math.round(timeDiff);
  console.log(seconds + " seconds"); //remove this once completion page is in place
}

function showModal() {
  modal.style.display ='block';
  const resetBtn = document.querySelector('.reset-me');
  console.log(resetBtn);
  resetBtn.addEventListener('click', gameReset, false);
}

function gameReset() {
  startTime = undefined;
  endTime = undefined;
  numMoves = 0;
  console.log('test');
  modal.style.display ='none';

  const cls = ['complete', 'open', 'show', 'match'];
  const elements = completeList;
  for (var i = 0; i < completeList.length; i++) {
    completeList[i].classList.remove(...cls);
  }
  // reset variables
  completeList = [];
  numMatches = 0;
  numClicks = 0;
  const restartGame = setTimeout(startGame, 250);
}
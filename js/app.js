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

function startGame() {

  const deck = document.querySelector('.deck');
  const cardShuffle = shuffle(cards);
  for (var i = 0; i < cardShuffle.length; i++){
        deck.appendChild(cardShuffle[i]);

     }
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

 function flipCard() {
   this.classList.toggle('open');
   this.classList.toggle('show');
   //this.classList.toggle('match');

 }

 let openList =[];

 for (var i = 0; i < cards.length; i++){
    cards[i].addEventListener('click', flipCard, false);
    cards[i].addEventListener('click', matchCards, false);
  //  cards[i].addEventListener('click', test, false);
 };

// Create an array and check for match
function matchCards() {
  openList.push(this);
  console.log(openList);
  if (openList.length === 2) {
    if (openList[0].firstElementChild.className == openList[1].firstElementChild.className) {
      console.log('equal');
      match();
    } else {
        const resetTimer = setTimeout(reset, 3000);
    }

  }
}

// Reset the matched cards array
function reset() {
        const cls = ['show', 'open'];
        const elements = openList;
        //console.log(openList);
        for (var i = 0; i < openList.length; i++) {
          openList[i].classList.remove(...cls);
        }

        openList = [];
}


function match() {
  openList[0].classList.toggle('match');
  openList[1].classList.toggle('match');
  openList = [];
}










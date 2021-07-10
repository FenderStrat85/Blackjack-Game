//I used the references below to provide both inspiration and guidance
//I used the code snippets from the references below to help create the card deck and shuffle functions.
//From there the rest of the code as ideas and inspiration for how I could layout my code.

// Reference: https://www.thatsoftwaredude.com/content/6196/coding-a-card-deck-in-javascript
// Reference: https://embed.plnkr.co/plunk/qjVrV3
// Reference: https://github.com/Kusnierewicz/Blackjack-game-in-JS/blob/master/21game.js
// Reference: https://code-boxx.com/javascript-blackjack/
// Reference: MDN Developer Network
// Reference: Materials provided by codeworks

let suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];


//Create a set of references for the start, hit and stay buttons to avoid
//typing document.get....each time
let startGameButton = document.getElementById('start-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');
let resetButton = document.getElementById('reset-button');
//set deck as an empty array and use a createDeck function to push values into it
//Create list of blank starting points for the game itself when the website loads.

let
playerHand = [];
compHand = [];
playerScore = 0;
compScore = 0;
playerWin = 0;
compWin = 0;
draw = 0;
deck = [];
hitButton.style.display = 'none';
stayButton.style.display = 'none';

//create a set of instructions, that with an event listener on new game/start game button
//will create a deck, shuffle it and deal cards

startGameButton.addEventListener('click', function(){
//Initially had .empty() activated in game reset which meant that as soon as it was activated
//the cards disappeared. Placing it here means the player cans till see their hand.
$("#alert-area").empty();
$("#comp-cards").empty();
$("#player-cards").empty();
createDeck();
// console.log(deck);
//after calling the createDeck function it then needs to be shuffled
shuffle(deck);
dealPlayer();
dealComp();
startGameButton.style.display = 'none';
hitButton.style.display = 'inline';
stayButton.style.display = 'inline';
updateScore();
bjackCheck(playerScore);
// console.log(playerHand);
// console.log(compHand);
// console.log(playerScore);
// console.log(compScore);
})

//This function creates a deck
const createDeck = () => {
  for (let i=0 ; i<values.length; i++){
    for (let j=0; j<suits.length; j++){

//weight adds a numerical value to each card so that we can add up the value of the cards

      let weight = values[i];
      if (values[i]==='Jack'||values[i]==='Queen'||values[i]==='King'){
        weight = 10;
      }
      if (values[i]==='Ace'){
        //initial weight of an ace to be 11
        weight = 11;
      }
      let card = {value: values[i], suit: suits[j], weight:weight}
      deck.push(card);
    }
  }
};

//Need to create a function that will shuffle the createDeck
//this counts up from the beginning of the deck to index 51 and switches the card at
//position [i] with another random position as denoted by x

const shuffle = (deck) => {
  for (let i=0; i<deck.length; i++){
    let x = Math.floor(Math.random() *i);
    let temp = deck[i];
    deck[i] = deck[x];
    deck[x] = temp;
  }
  return deck;
};

//deal function will give 2 cards to both the player and computer(dealer)

const dealPlayer = () => {
while (playerHand.length<2){
  playerHand.push(deck.pop());
}
showPlayerCards(playerHand);
};

const dealComp = () => {
  while (compHand.length<2){
    compHand.push(deck.pop())
}
showCompCards(compHand);
};

const showPlayerCards = (card) => {
  for(let i=0; i<card.length; i++){
    $("#player-cards").append('<img src="images/'+card[i].value+'_of_'+card[i].suit+'.png" height="150"/>')
    //use console.log to check how the browser is viewing the code to ensure quotation marks
    //are in the correct place
    // console.log('<img src="images/'+card[i].value+'_of_'+card[i].suit+'.png" height="150"/>')
  }
}

const showCompCards = (card) => {
  for(let i=0; i<card.length; i++){
    $("#comp-cards").append('<img src="images/'+card[i].value+'_of_'+card[i].suit+'.png" height="150"/>')
  }
}

const bjackCheck = (score) =>{

  if (playerScore===21 && compScore===21){
    $("#alert-area").text("A draw? Better play again to find a winner!")
    draw++
    gameReset();
  }

  if (playerScore===21){
    $("#alert-area").text("Blackjack! You win!")
    playerWin++;
    gameReset();
  }

  if (compScore===21){
    $("#alert-area").text("Unlucky, dealer wins this time!")
    compWin++;
    gameReset();
  }


}
//code for hitButton for player use
hitButton.addEventListener('click', function() {
  playerHand.push(deck.pop())
  $("#player-cards").empty();
  showPlayerCards(playerHand);
  updateScore();
  // console.log(playerHand);
  // console.log(playerScore);

  //This code checks the score in the players hand prior to being passed over to the dealer.
  //Adds functionality and clairty to game
  if (playerScore>21){
    compWin++
   $("#alert-area").text("Unlucky, dealer wins this time!")
    gameReset();
  }

});
//code for automatic hit for the dealer to be activated when stay is clicked
stayButton.addEventListener('click', function() {
  while(compScore<17){
    compHand.push(deck.pop());
    $("#comp-cards").empty();
    showCompCards(compHand);
    updateScore();
  }
  gameStatus();
});

//Function for deciding the winner of the game
const gameStatus = () => {
  //First two statements here relate to 5 card trick rule removing these will not affect
  //functionaity of the game.
  if (playerHand.length>=5 && playerScore <=21){
    $("#alert-area").text("Congratulations, you win this round!")
    playerWin++;
    gameReset();
  }

  else if (compHand.length>=5 && compScore <=21){
    $("#alert-area").text("Unlucky, dealer wins this time!")
    compWin++;
    gameReset();
  }

  else if (playerScore>compScore && playerScore<=21 && compScore<=21){
    $("#alert-area").text("Congratulations, you win this round!")
    playerWin++;
    gameReset();
  }

  else if (compScore>playerScore && playerScore<=21 && compScore<=21){
    $("#alert-area").text("Unlucky, dealer wins this time!")
    compWin++;
    gameReset();
  }

  else if(playerScore === compScore) {
    $("#alert-area").text("A draw? Better play again to find a winner!")
    draw++
    gameReset();
  }

  else if(compScore === 21){
    $("#alert-area").text("Unlucky, dealer wins this time!")
    compWin++;
    gameReset();
  }

  else if (compScore>21){
    $("#alert-area").text("Congratulations, you win this round!")
    playerWin++;
    gameReset();
  }


}

//function for calculating scores.
//First loop creates the score
//Second loop checks changes the ace from 11 to 1 in the event of the score
//bing over 21. The ensures that the the score of an ace responds dynamically
//

const getScore = (cards) => {
  let score = 0
  for (let i=0; i<cards.length; i++){
    score+= cards[i].weight;
  }
  for (let i=0; i<cards.length; i++){
    if(score>21 && cards[i].value==='Ace'){
      score-=10
    }
  }

  return score
}

//function for updating scores with new cards added from a hit
const updateScore = () => {
  playerScore = getScore(playerHand);
  compScore = getScore(compHand);
  $("#player-area").text(`Player Score = ${playerScore}`)
  $("#comp-area").text(`Dealer Score = ${compScore}`)
}

//game reset function
const gameReset = () => {
  deck = [];
  playerHand = [];
  compHand = [];
  playerScore = 0;
  compScore = 0;
  document.getElementById("score-area").innerText = "Player Wins = " + playerWin + "\n\n" +
  "Dealer Wins = " + compWin + "\n\n" +
  "Draws = " + draw
  startGameButton.style.display = 'inline';
  hitButton.style.display = 'none';
  stayButton.style.display = 'none';
}

resetButton.addEventListener('click', function(){
  playerWin = 0;
  compWin = 0;
  draw = 0;
  document.getElementById("score-area").innerText = "Player Wins = " + playerWin + "\n\n" +
  "Dealer Wins = " + compWin + "\n\n" +
  "Draws = " + draw
  $("#alert-area").text("You clicked reset, click start game to play a new game!")
  gameReset();

});

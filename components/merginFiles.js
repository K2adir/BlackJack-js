let playerCards = [];
let dealerCards = [];
let deck = [];

let currentPlayerCards = 0;
let currentComputerCards = 0;

let bank = 100;
let bet = 0;
let betMulti = 0;
const winMulti = 2;
const blackJackMulti = 3;

let gameStarted = false;
let playerTurn = false;
let dealerTurn = false;
let phase = "";

let cardTimeout = 600;
let bigSignTimeout = 600;
let cardDealingTimeout = 150;

document.addEventListener("contextmenu", (e) => e.preventDefault);

const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

document.addEventListener("contextmenu", (event) => event.preventDefault());

//// card Class
class Card {
  constructor(number, suit, value) {
    this._number = number;
    this._suit = suit;
    this._value = value;
  }

  get suit() {
    return this._suit;
  }

  get value() {
    return this._value;
  }

  get number() {
    return this._number;
  }
}

function createDeck() {
  function createSuit(suit) {
    deck.push(new Card("A", suit, 11));

    for (let i = 2; i <= 10; i++) {
      deck.push(new Card(i, suit, i));
    }

    deck.push(new Card("J", suit, 10));
    deck.push(new Card("Q", suit, 10));
    deck.push(new Card("K", suit, 10));
  }

  createSuit("hearts");
  createSuit("diamonds");
  createSuit("spades");
  createSuit("clubs");
}

// create random card improved
function randomCard() {
  const selectedCardIndex = Math.floor(Math.random() * deck.length);
  const dealtCard = deck.splice(selectedCardIndex, 1)[0];
  return dealtCard;
}

function totalValue(player) {
  return player.reduce((total, card) => total + card.value, 0);
}

// .some used instead of for i
function hasAnAce(playerCards) {
  return playerCards.some((card) => card._value === 11);
}

function turnAceToOne(deckWithAce) {
  function findAce(cardToFind) {
    return cardToFind.value > 10;
  }

  let indexOfAce = deckWithAce.findIndex(findAce);
  deckWithAce[indexOfAce]._value = 1;
}

function suitToStrImg(player, card) {
  let cardSuit = player[card - 1].suit;
  switch (cardSuit) {
    case "hearts":
      return '<img src="./assets/hearts.svg">';
    case "diamonds":
      return '<img src="./assets/cardBack.svg">';
    case "clubs":
      return '<img src="./assets/clubs.svg">';
    case "spades":
      return '<img src="./assets/spades.svg" >';
    default:
      return "";
  }
}

function addCardtoPlayer(cardNumber) {
  let card = document.createElement("li");
  card.className = "card undealed_player";
  card.id = "player_card";
  card.innerHTML =
    suitToStrImg(playerCards, cardNumber) +
    "<h3>" +
    cardDom(playerCards, cardNumber) +
    "</h3>";

  document.querySelector("#player_hand").appendChild(card);
  appendCardPlayerAnimation();
}

function addCardtoDealer(cardNumber) {
  let card = document.createElement("li");
  card.className = "card undealed_dealer";
  card.id = "dealer_card";
  card.innerHTML =
    suitToStrImg(dealerCards, cardNumber) +
    "<h3>" +
    cardDom(dealerCards, cardNumber) +
    "</h3>";

  document.querySelector("#dealer_hand").appendChild(card);
  appendCardDealerAnimation();
}

function appendCardPlayerAnimation() {
  let undealedPlayerCards = document.querySelectorAll(".undealed_player");
  undealedPlayerCards.forEach(function (card) {
    card.classList.remove("undealed_player");
  });
}

function appendCardDealerAnimation() {
  let undealedDealerCards = document.querySelectorAll(".undealed_dealer");
  undealedDealerCards.forEach(function (card) {
    card.classList.remove("undealed_dealer");
  });
}

//// BETTING ////////////////
function increaseBet() {
  if (bank > 0) {
    bet += 5;
    bank -= 5;
  }
}

function decreaseBet() {
  if (bet > 5) {
    bet -= 5;
    bank += 5;
  }
}

function regularPrize() {
  bank += bet * winMulti;
  betMulti = bet;
  bet = 0;
}

function noPrize() {
  bank += bet;
  betMulti = bet;
  bet = 0;
}

function blackjackPrize() {
  bank += bet * blackJackMulti;
  betMulti = bet;
  bet = 0;
}

function losePrize() {
  betMulti = bet;
  bet = 0;
}
////////////////////

function cleanUpForNewGame() {
  const playerScore = document.querySelector("#player_score span");
  const dealerScore = document.querySelector("#dealer_score span");
  const cards = document.querySelectorAll(".card");

  const bigEventMessageHolder = document.querySelector(
    "#big_event_message_holder"
  );
  const doubleDown = document.querySelector("#double_down");
  const aceBecomesOnePlayer = document.querySelector("#ace_becomes_one_player");

  playerScore.textContent = "";
  dealerScore.textContent = "";

  cards.forEach((card) => card.remove());

  playerCards = [];
  dealerCards = [];

  bigEventMessageHolder.classList.add("hidden");

  doubleDown.classList.add("hidden");

  aceBecomesOnePlayer.classList.add("hidden");
}

function refreshBetHUD() {
  const elements = [
    { selector: "#set_bank span", value: bank },
    { selector: "#set_bet span", value: bet },
    { selector: "#bet span", value: bet },
    { selector: "#bank span", value: bank },
  ];
  elements.forEach(({ selector, value }) => {
    document.querySelector(selector).textContent = value;
  });
}



document.addEventListener("DOMContentLoaded", function () { 
    
     const bigEventMessageHolder = document.querySelector(
    "#big_event_message_holder"
  );
  bigEventMessageHolder.classList.remove("hidden");

 function gameStart() {
    switch (true) {
      case bank <= 0:
        bankruptcy();
        break;
      default:
        gameStarted = true;
        cleanUpForNewGame();
        createDeck();
        setBet();
        break;
    }
  }
 
  function setBet() {
    let betSetted = false;
    const betWrapper = document.querySelector("#bet_wrapper");
    const betButtons = document.querySelector("#bet_buttons");
    const buttonMoreBet = document.querySelector("#button_more_bet");
    const buttonLessBet = document.querySelector("#button_less_bet");
    const buttonSetBet = document.querySelector("#button_set_bet");

    betWrapper.classList.remove("hidden");
    betButtons.classList.remove("hidden");

    refreshBetHUD();

   
    buttonMoreBet.addEventListener("click", () => {
      if (!betSetted) {
        increaseBet();
        refreshBetHUD();
      }
    });
   

    buttonLessBet.addEventListener("click", () => {
      if (!betSetted) {
        decreaseBet();
        refreshBetHUD();
      }
    });
   

    buttonSetBet.addEventListener("click", () => {
      if (!betSetted) {
        betWrapper.classList.add("hidden");
        betButtons.classList.add("hidden");
        dealFirstCards();
        betSetted = true;
      }
    });
}
  
 function dealFirstCards() {
    // Player is dealt two cards
    playerCards.push(randomCard(), randomCard());
    currentPlayerCards = 2;

    // Dealer is dealt two cards
    dealerCards.push(randomCard(), randomCard());
    currentComputerCards = 2;

    // Show HUD
    showHUD();

    addCardtoPlayer(1);

    setTimeout(() => addCardtoPlayer(2), cardDealingTimeout);

    setTimeout(() => addCardtoDealer(1), cardDealingTimeout * 2);

    const secondCardDealerFlipped = document.createElement("li");

    secondCardDealerFlipped.classList.add("card", "flipped", "undealed_dealer");

    secondCardDealerFlipped.setAttribute("id", "dealer_card");

    secondCardDealerFlipped.innerHTML = "<h3></h3>";

    document.getElementById("dealer_hand").appendChild(secondCardDealerFlipped);

    appendCardDealerAnimation();

    if (totalValue(playerCards) > 21 && hasAnAce(playerCards)) {
      turnAceToOne(playerCards);
      document
        .querySelector("#ace_becomes_one_player")
        .classList.remove("hidden");
    }

    if (totalValue(playerCards) == 21) {
      blackjackCheck();
    } else {
      // Player's turn to hit or stand
      playerTurn = true;
      phase = "doubleDown";
    }
  }


  function showHUD() {
  const selectors = [
    "#stand",
    "#hit",
    "#player_score",
    "#dealer_score",
    "#bank",
    "#bet",
    "#double_down",
  ];
  selectors.forEach((selector) => {
    document.querySelector(selector).classList.remove("hidden");
  });
  document.querySelector("#player_score span").textContent =
    totalValue(playerCards);
  document.querySelector("#dealer_score span").textContent =
    dealerCards[0].value;
}

   function doubleDown() {
    updateBet();
    refreshBetHUD();
    hideDoubleDownAndAceButtons();
    addCardToPlayerHand();
    updatePlayerScore();
    checkForBustOrBlackjack();
  }
  
  function updateBet() {
    if (bet * 2 <= bank) {
      bank -= bet;
      bet *= 2;
      betMulti = bet;
    } else {
      bet += bank;
      bank = 0;
      betMulti = bet;
    }
  }
  
  function hideDoubleDownAndAceButtons() {
  document.querySelector("#double_down").classList.add("hidden");
  document.querySelector("#ace_becomes_one_player").classList.add("hidden");
}
  
function addCardToPlayerHand() {
    playerCards.push(randomCard());
    currentPlayerCards++;
    addCardtoPlayer(currentPlayerCards);
  }
  
   function updatePlayerScore() {
    if (totalValue(playerCards) > 21 && hasAnAce(playerCards)) {
      turnAceToOne(playerCards);
      document
        .querySelector("#ace_becomes_one_player")
        .classList.remove("hidden");
    }
    document.querySelector("#player_score span").textContent =
      totalValue(playerCards);
  }
 function checkForBustOrBlackjack() {
    if (totalValue(playerCards) > 21) {
      playerTurn = false;
      gameStarted = false;
      setTimeout(function () {
        playerBust();
      }, bigSignTimeout);
    } else if (totalValue(playerCards) == 21) {
      blackjackCheck();
    } else {
      setTimeout(function () {
        stand();
      }, bigSignTimeout);
    }
  }
 function hit() {
    document.getElementById("double_down").classList.add("hidden");
    document.getElementById("ace_becomes_one_player").classList.add("hidden");

    playerCards.push(randomCard());
    currentPlayerCards++;

    addCardtoPlayer(currentPlayerCards);

    if (totalValue(playerCards) > 21 && hasAnAce(playerCards)) {
      turnAceToOne(playerCards);
      document
        .getElementById("ace_becomes_one_player")
        .classList.remove("hidden");
    }

    document.querySelector("#player_score span").textContent =
      totalValue(playerCards);

    if (totalValue(playerCards) > 21) {
      playerTurn = false;
      gameStarted = false;
      setTimeout(function () {
        playerBust();
      }, bigSignTimeout);
    } else {
      playerTurn = true;
    }
  }
  function stand() {
    document.getElementById("ace_becomes_one_player").classList.add("hidden");

    const cardsToBeRemoved = document.querySelectorAll(".flipped");
    cardsToBeRemoved.forEach(function (card) {
      card.remove();
    });

    addCardtoDealer(currentComputerCards);

    document.querySelector("#dealer_score span").textContent =
      totalValue(dealerCards);

    dealersDecision();
  }
}
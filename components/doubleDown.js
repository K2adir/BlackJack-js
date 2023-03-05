/////////==============/////
// ====== DECK CLASS //////////

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

////// ===============/////

// CREATE DECK  ---------/////

const createDeck = (suit) => {
  const deck = [];

  const createCard = (number, suit, value) => {
    const card = new Card(number, suit, value);
    deck.push(card);
  };

  for (let i = 2; i <= 10; i++) {
    createCard(i, suit, i);
  }

  createCard("A", suit, 11);
  createCard("J", suit, 10);
  createCard("Q", suit, 10);
  createCard("K", suit, 10);

  return deck;
};

const hearts = createDeck("hearts");
const clubs = createDeck("clubs");
const spades = createDeck("spades");
const diamonds = createDeck("diamonds");

const fullDeck = hearts.concat(clubs, spades, diamonds);
console.log(fullDeck, "f -> createDeck.js");

////// ==========///////

// CARD DEAL /////////--------

const randomCard = () => {
  let selectedCard = Math.round(Math.random() * (fullDeck.length - 1));
  let dealtCard = fullDeck[selectedCard];
  fullDeck.splice(selectedCard, 1);
  return dealtCard;
};

console.log(randomCard(), "cardDeal. f -> randomCard() ");

///

function describeDealtCard(dealtCard) {
  return dealtCard.number + " of " + dealtCard.suit;
}

function totalValue(player) {
  let result = 0;
  for (i = 0; i < player.length; i++) {
    result += player[i].value;
  }
  return result;
}

function tellCurrentValue(playerCards) {
  return "The cards add to " + totalValue(playerCards) + ".";
}
console.log(playerCards);

console.log(tellCurrentValue(playerCards), "x");
//
function currentHand(player) {
  let currentHand = "";
  for (i = 0; i < player.length; i++) {
    if (i == player.length - 2) {
      currentHand += describeDealtCard(player[i]);
      continue;
    }
    if (i == player.length - 1) {
      currentHand += " and ";
      currentHand += describeDealtCard(player[i]);
      currentHand += ".";
      break;
    }
    currentHand += describeDealtCard(player[i]);
    currentHand += ", ";
  }
  return "current hand is: " + currentHand;
}

function describeDealtCard(dealtCard) {
  return dealtCard.number + " of " + dealtCard.suit;
}

function tellCurrentValue(playerCards) {
  return "The cards add to " + totalValue(playerCards) + ".";
}

/////////// ==== == == = = =

///// CHECK ACE //////

const hasAnAce = (playerCards) => {
  let hasAce = false;
  for (i = 0; i < playerCards.length; i++) {
    if (playerCards[i]._value === 11) {
      hasAce = true;
      break;
    }
    return hasAce;
  }
};

console.log(playerCards, "checkAce.js -> checks player Cards");

function turnAceToOne(cardsWhereTheAceIs) {
  const aceIndex = cardsWhereTheAceIs.findIndex((card) => card.value > 10);
  if (aceIndex !== -1) {
    cardsWhereTheAceIs[aceIndex]._value = 1;
    console.log("Ace value changed to 1 to avoid bust.");
  }
}

function turnAceToOne(cardsWhereTheAceIs) {
  function findAce(cardToFind) {
    return cardToFind.value > 10;
  }

  let indexOfAce = cardsWhereTheAceIs.findIndex(findAce);
  cardsWhereTheAceIs[indexOfAce]._value = 1;
  // console.log("Total value over 21. The Ace value becomes 1.");
}

// ======================

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

function cardDom(player, card) {
  let cardNumber = player[card - 1].number;

  // Remove this line after checking
  //   let cardSuit = player[card - 1].suit;

  let output = cardNumber;

  return output;
}

function addCardtoPlayer(cardNumber) {
  let card = $(
    '<li class="card undealed_player" id="player_card">' +
      suitToStrImg(playerCards, cardNumber) +
      "<h3>" +
      cardDom(playerCards, cardNumber) +
      "</h3></li>"
  );

  return $("#player_hand").append(card) + appendCardPlayerAnimation();
}

// use updateUI to display other messages as well, when the project is completed.

function hit() {
  // Hide double down and ace becomes one buttons
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

function dealersDecision() {
  if (totalValue(dealerCards) > 21 && hasAnAce(dealerCards))
    turnAceToOne(dealerCards);

  // Update dealer score
  document.querySelector("#dealer_score span").textContent =
    totalValue(dealerCards);

  if (totalValue(dealerCards) > 21)
    setTimeout(function () {
      dealerBust();
    }, bigSignTimeout);
  else if (totalValue(dealerCards) == 21) decideWinner();
  else if (totalValue(dealerCards) >= 17) decideWinner();
  else dealerTakeACard();
}

function dealerTakeACard() {
  updateDealerScore();
  setTimeout(() => {
    dealerCards.push(randomCard());
    currentComputerCards++;
    addCardtoDealer(currentComputerCards);
    updateDealerScore();
    dealersDecision();
  }, cardTimeout);
}

function updateDealerScore() {
  document.querySelector("#dealer_score span").textContent =
    totalValue(dealerCards);
}

function decideWinner() {
  setTimeout(() => {
    switch (true) {
      case totalValue(playerCards) > totalValue(dealerCards):
        youWin();
        break;
      case totalValue(playerCards) === totalValue(dealerCards):
        push();
        break;
      default:
        youLose();
    }
  }, bigSignTimeout);
}

function blackjackCheck() {
  switch (true) {
    case totalValue(playerCards) > totalValue(dealerCards):
      setTimeout(blackjack, bigSignTimeout);
      break;
    case totalValue(playerCards) === totalValue(dealerCards):
      setTimeout(blackjackPush, bigSignTimeout);
      break;
  }
}

// use updateUI for other messages as well, when the project is completed.
function updateUI(selector, text) {
  document.querySelector(selector).textContent = text;
}

function blackjack() {
  blackjackPrize();
  gameStarted = false;

  const messageHolder = document.querySelector("#big_event_message_holder");
  updateUI("#big_event_message_holder h1", "Blackjack!");
  updateUI("#big_event_message_holder h3", "Double prize!");
  updateUI(
    "#big_event_message_holder h2",
    `You won ${betMulti * blackJackMulti - betMulti}$`
  );

  messageHolder.classList.remove("hidden");
}

function blackjackPush() {
  handleNoPrize();
  gameStarted = false;

  const messageHolder = document.querySelector("#big_event_message_holder");
  updateUI("#big_event_message_holder h1", "Blackjack!");
  updateUI("#big_event_message_holder h3", "The dealer has Blackjack too");
  updateUI("#big_event_message_holder h2", `You recovered your ${betAmount}$`);

  messageHolder.classList.remove("hidden");
}

function playerBust() {
  losePrize();
  gameStarted = false;

  const messageHolder = document.querySelector("#big_event_message_holder");
  updateUI("#big_event_message_holder h1", "Bust! You Lose!");
  updateUI("#big_event_message_holder h3", "Your cards are over 21");
  updateUI("#big_event_message_holder h2", `You lose ${betMulti}$`);
  messageHolder.classList.remove("hidden");
}

function dealerBust() {
  regularPrize();
  gameStarted = false;
  const messageHolder = document.querySelector("#big_event_message_holder");
  updateUI("#big_event_message_holder h1", "You win!");
  updateUI("#big_event_message_holder h3", "Dealer cards are over 21");
  updateUI(
    "#big_event_message_holder h2",
    `You won ${betMulti * winMulti - betMulti}$`
  );

  messageHolder.classList.remove("hidden");
}

function youWin() {
  regularPrize();

  gameStarted = false;
  document.querySelector("#big_event_message_holder h1").textContent =
    "You win!";
  document.querySelector("#big_event_message_holder h3").textContent =
    "Your cards value is higher than dealers'";
  document.querySelector(
    "#big_event_message_holder h2"
  ).textContent = `You won ${betMulti * winMulti - betMulti}$`;

  document
    .querySelector("#big_event_message_holder")
    .classList.remove("hidden");
}

function youLose() {
  losePrize();
  gameStarted = false;
  const messageHolder = document.querySelector("#big_event_message_holder");
  updateUI("#big_event_message_holder h1").textContent = "You lose!";
  document.querySelector("#big_event_message_holder h3").textContent =
    "Dealer cards value is higher than yours";
  document.querySelector(
    "#big_event_message_holder h2"
  ).textContent = `You lose ${betMulti}$`;

  messageHolder.classList.remove("hidden");
}

function bankruptcy() {
  gameStarted = true;
  updateUI("#big_event_message_holder h1").textContent = "Bankruptcy";
  updateUI("#big_event_message_holder h3").textContent =
    "Bring more money next time";
  updateUI("#big_event_message_holder h2").textContent = `Get out of here!`;
  updateUI("#big_event_message_holder").classList.remove("hidden");
}

// buttons

document
  .querySelector("#big_event_message_holder")
  .addEventListener("click", function (e) {
    if (!gameStarted) {
      gameStart();
    }
  });

document.addEventListener("keyup", function (e) {
  if (!gameStarted && e.key != 13) {
    gameStart();
  }
});

document.querySelector("#hit").addEventListener("click", function () {
  if (playerTurn === true && gameStarted) {
    playerTurn = false;
    hit();
  }
});

document.addEventListener("keyup", function (e) {
  if (playerTurn === true && gameStarted && e.key === 39) {
    playerTurn = false;
    hit();
    playerTurn = true;
  }
});

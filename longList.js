// CONSTANTS ===============

let playerCards = [];

let dealerCards = [];
let deck = [];
//
let currentPlayerCards = 0;
let currentComputerCards = 0;

let bank = 100;
let bet = 0;
let betMulti = 0;

const winMulti = 2;
const blackJackMulti = 3;

document.addEventListener("contextmenu", (e) => e.preventDefault);

/////////==============/////

// ====== DECK CLASS //////////

////// ===============/////

// CREATE DECK  ---------/////

////// ==========///////

// CARD DEAL /////////--------

// random card

function describeDealtCard(dealtCard) {
  return dealtCard.number + " of " + dealtCard.suit;
}

// total value

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

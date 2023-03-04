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

// total value

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

function turnAceToOne(cardsWhereTheAceIs) {
  const aceIndex = cardsWhereTheAceIs.findIndex((card) => card.value > 10);
  if (aceIndex !== -1) {
    cardsWhereTheAceIs[aceIndex]._value = 1;
    console.log("Ace value changed to 1 to avoid bust.");
  }
}
// turn ace to one.
// ======================

function cardDom(player, card) {
  let cardNumber = player[card - 1].number;

  // Remove this line after checking
  //   let cardSuit = player[card - 1].suit;

  let output = cardNumber;

  return output;
}

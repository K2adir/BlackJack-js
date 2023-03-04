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

let keyboardTipCount = 0;
let blackjackTipCount = 0;
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

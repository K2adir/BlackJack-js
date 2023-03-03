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

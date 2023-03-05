// file 1
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

const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

document.addEventListener("contextmenu", (event) => event.preventDefault());

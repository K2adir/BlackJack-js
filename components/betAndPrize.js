// file 5

function increaseBet(amount) {
  if (bank > 0 && amount <= bank) {
    bet += amount;
    bank -= amount;
  }
}
function decreaseBet(amount) {
  if (bet >= amount) {
    bet -= amount;
    bank += amount;
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

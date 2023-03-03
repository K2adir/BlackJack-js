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

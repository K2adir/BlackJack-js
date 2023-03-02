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

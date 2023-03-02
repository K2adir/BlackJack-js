function dealFirstCards() {
  // Player and computer got two cards
  playerCards.push(randomCard(), randomCard());
  currentPlayerCards = 2;
  dealerCards.push(randomCard(), randomCard());
  currentComputerCards = 2;

  showHUD();

  //  first cards animation
  addCardtoPlayer(1);

  setTimeout(() => addCardtoPlayer(2), cardDealingTimeout);

  setTimeout(() => addCardtoDealer(1), cardDealingTimeout * 2);

  ////
  // For the flipped card
  const secondCardDealerFlipped = document.createElement("li");

  secondCardDealerFlipped.classList.add("card", "flipped", "undealed_dealer");

  secondCardDealerFlipped.setAttribute("id", "dealer_card");

  secondCardDealerFlipped.innerHTML = "<h3></h3>";

  document.getElementById("dealer_hand").appendChild(secondCardDealerFlipped);

  appendCardDealerAnimation();

  // Check  Ace
  if (totalValue(playerCards) > 21 && hasAnAce(playerCards)) {
    turnAceToOne(playerCards);
    document
      .querySelector("#ace_becomes_one_player")
      .classList.remove("hidden");
  }

  // Check blackjack
  if (totalValue(playerCards) == 21) {
    blackjackCheck();
  } else {
    // Player's turn to hit or stand
    playerTurn = true;
    phase = "doubleDown";
  }
}

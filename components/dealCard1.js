function dealFirstCards() {
  // Player is dealt two cards
  playerCards.push(randomCard(), randomCard());
  currentPlayerCards = 2;

  // Dealer is dealt two cards
  dealerCards.push(randomCard(), randomCard());
  currentComputerCards = 2;

  showHUD();

  // first card animation , FANCY
  addCardtoPlayer(1);

  setTimeout(function () {
    return addCardtoPlayer(2);
  }, cardDealingTimeout);

  setTimeout(function () {
    return addCardtoDealer(1);
  }, cardDealingTimeout * 2);

  // Flipped card
  const secondCardDealerFlipped = document.createElement("li");

  secondCardDealerFlipped.classList.add("card", "flipped", "undealed_dealer");

  secondCardDealerFlipped.setAttribute("id", "dealer_card");

  secondCardDealerFlipped.innerHTML = "<h3></h3>";

  document.getElementById("dealer_hand").appendChild(secondCardDealerFlipped);
}

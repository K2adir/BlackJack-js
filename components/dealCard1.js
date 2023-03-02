function dealFirstCards() {
  // Player is dealt two cards
  playerCards.push(randomCard(), randomCard());
  currentPlayerCards = 2;

  // Dealer is dealt two cards
  dealerCards.push(randomCard(), randomCard());
  currentComputerCards = 2;
}

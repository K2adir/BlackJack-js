// use updateUI to display other messages as well, when the project is completed.

function doubleDown() {
  updateBet();
  refreshBetHUD();
  hideDoubleDownAndAceButtons();
  addCardToPlayerHand();
  updatePlayerScore();
  checkForBustOrBlackjack();
}

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

function checkForBustOrBlackjack() {
  if (totalValue(playerCards) > 21) {
    playerTurn = false;
    gameStarted = false;
    setTimeout(function () {
      playerBust();
    }, bigSignTimeout);
  } else if (totalValue(playerCards) == 21) {
    blackjackCheck();
  } else {
    setTimeout(function () {
      stand();
    }, bigSignTimeout);
  }
}

function hit() {
  // Hide double down and ace becomes one buttons
  document.getElementById("double_down").classList.add("hidden");
  document.getElementById("ace_becomes_one_player").classList.add("hidden");

  playerCards.push(randomCard());
  currentPlayerCards++;

  addCardtoPlayer(currentPlayerCards);

  if (totalValue(playerCards) > 21 && hasAnAce(playerCards)) {
    turnAceToOne(playerCards);
    document
      .getElementById("ace_becomes_one_player")
      .classList.remove("hidden");
  }

  document.querySelector("#player_score span").textContent =
    totalValue(playerCards);

  if (totalValue(playerCards) > 21) {
    playerTurn = false;
    gameStarted = false;
    setTimeout(function () {
      playerBust();
    }, bigSignTimeout);
  } else {
    playerTurn = true;
  }
}

function stand() {
  document.getElementById("ace_becomes_one_player").classList.add("hidden");

  const cardsToBeRemoved = document.querySelectorAll(".flipped");
  cardsToBeRemoved.forEach(function (card) {
    card.remove();
  });

  addCardtoDealer(currentComputerCards);

  document.querySelector("#dealer_score span").textContent =
    totalValue(dealerCards);

  dealersDecision();
}

function dealersDecision() {
  if (totalValue(dealerCards) > 21 && hasAnAce(dealerCards))
    turnAceToOne(dealerCards);

  // Update dealer score
  document.querySelector("#dealer_score span").textContent =
    totalValue(dealerCards);

  if (totalValue(dealerCards) > 21)
    setTimeout(function () {
      dealerBust();
    }, bigSignTimeout);
  else if (totalValue(dealerCards) == 21) decideWinner();
  else if (totalValue(dealerCards) >= 17) decideWinner();
  else dealerTakeACard();
}

function dealerTakeACard() {
  updateDealerScore();
  setTimeout(() => {
    dealerCards.push(randomCard());
    currentComputerCards++;
    addCardtoDealer(currentComputerCards);
    updateDealerScore();
    dealersDecision();
  }, cardTimeout);
}

function updateDealerScore() {
  document.querySelector("#dealer_score span").textContent =
    totalValue(dealerCards);
}

function decideWinner() {
  setTimeout(() => {
    switch (true) {
      case totalValue(playerCards) > totalValue(dealerCards):
        youWin();
        break;
      case totalValue(playerCards) === totalValue(dealerCards):
        push();
        break;
      default:
        youLose();
    }
  }, bigSignTimeout);
}

function blackjackCheck() {
  switch (true) {
    case totalValue(playerCards) > totalValue(dealerCards):
      setTimeout(blackjack, bigSignTimeout);
      break;
    case totalValue(playerCards) === totalValue(dealerCards):
      setTimeout(blackjackPush, bigSignTimeout);
      break;
  }
}

// use updateUI for other messages as well, when the project is completed.
function updateUI(selector, text) {
  document.querySelector(selector).textContent = text;
}

function blackjack() {
  blackjackPrize();
  gameStarted = false;

  const messageHolder = document.querySelector("#big_event_message_holder");
  updateUI("#big_event_message_holder h1", "Blackjack!");
  updateUI("#big_event_message_holder h3", "Double prize!");
  updateUI(
    "#big_event_message_holder h2",
    `You won ${betMulti * blackJackMulti - betMulti}$`
  );

  messageHolder.classList.remove("hidden");
}

function blackjackPush() {
  handleNoPrize();
  gameStarted = false;

  const messageHolder = document.querySelector("#big_event_message_holder");
  updateUI("#big_event_message_holder h1", "Blackjack!");
  updateUI("#big_event_message_holder h3", "The dealer has Blackjack too");
  updateUI("#big_event_message_holder h2", `You recovered your ${betAmount}$`);

  messageHolder.classList.remove("hidden");
}

function playerBust() {
  losePrize();
  gameStarted = false;

  const messageHolder = document.querySelector("#big_event_message_holder");
  updateUI("#big_event_message_holder h1", "Bust! You Lose!");
  updateUI("#big_event_message_holder h3", "Your cards are over 21");
  updateUI("#big_event_message_holder h2", `You lose ${betMulti}$`);
  messageHolder.classList.remove("hidden");
}

function dealerBust() {
  regularPrize();
  gameStarted = false;
  const messageHolder = document.querySelector("#big_event_message_holder");
  updateUI("#big_event_message_holder h1", "You win!");
  updateUI("#big_event_message_holder h3", "Dealer cards are over 21");
  updateUI(
    "#big_event_message_holder h2",
    `You won ${betMulti * winMulti - betMulti}$`
  );

  messageHolder.classList.remove("hidden");
}

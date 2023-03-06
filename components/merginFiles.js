document.addEventListener("contextmenu", (event) => event.preventDefault());

function cleanUpForNewGame() {
  const playerScore = document.querySelector("#player_score span");
  const dealerScore = document.querySelector("#dealer_score span");
  const cards = document.querySelectorAll(".card");
  const bigEventMessageHolder = document.querySelector(
    "#big_event_message_holder"
  );
  const doubleDown = document.querySelector("#double_down");
  const aceBecomesOnePlayer = document.querySelector("#ace_becomes_one_player");

  playerScore.textContent = "";
  dealerScore.textContent = "";

  cards.forEach((card) => card.remove());

  playerCards = [];
  dealerCards = [];

  bigEventMessageHolder.classList.add("hidden");

  doubleDown.classList.add("hidden");

  aceBecomesOnePlayer.classList.add("hidden");
}

function refreshBetHUD() {
  const elements = [
    { selector: "#set_bank span", value: bank },
    { selector: "#set_bet span", value: bet },
    { selector: "#bet span", value: bet },
    { selector: "#bank span", value: bank },
  ];
  elements.forEach(({ selector, value }) => {
    document.querySelector(selector).textContent = value;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const bigEventMessageHolder = document.querySelector(
    "#big_event_message_holder"
  );
  bigEventMessageHolder.classList.remove("hidden");

  function gameStart() {
    switch (true) {
      case bank <= 0:
        bankruptcy();
        break;
      default:
        gameStarted = true;
        cleanUpForNewGame();
        createDeck();
        setBet();
        break;
    }
  }

  function setBet() {
    let betSetted = false;
    const betWrapper = document.querySelector("#bet_wrapper");
    const betButtons = document.querySelector("#bet_buttons");
    //

    const betIncreaseButtons = document.querySelectorAll(
      "#button_more_bet, #button_more_bet10, #button_more_bet25, #button_more_bet50, #button_more_bet100"
    );
    const betDecreaseButtons = document.querySelectorAll(
      "#button_less_bet, #button_less_bet10, #button_less_bet25, #button_less_bet50, #button_less_bet100"
    );

    //
    const buttonSetBet = document.querySelector("#button_set_bet");

    betWrapper.classList.remove("hidden");
    betButtons.classList.remove("hidden");

    refreshBetHUD();

    betIncreaseButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (!betSetted) {
          increaseBet(parseInt(button.dataset.amount));
          refreshBetHUD();
        }
      });
    });
    betDecreaseButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (!betSetted) {
          decreaseBet(parseInt(button.dataset.amount));
          refreshBetHUD();
        }
      });
    });

    buttonSetBet.addEventListener("click", () => {
      if (!betSetted) {
        betWrapper.classList.add("hidden");
        betButtons.classList.add("hidden");
        dealFirstCards();
        betSetted = true;
      }
    });
  }

  function dealFirstCards() {
    playerCards.push(randomCard(), randomCard());
    currentPlayerCards = 2;

    dealerCards.push(randomCard(), randomCard());
    currentComputerCards = 2;

    showHUD();

    addCardtoPlayer(1);

    setTimeout(() => addCardtoPlayer(2), cardDealingTimeout);

    setTimeout(() => addCardtoDealer(1), cardDealingTimeout * 2);

    const secondCardDealerFlipped = document.createElement("li");

    secondCardDealerFlipped.classList.add("card", "flipped", "undealed_dealer");

    secondCardDealerFlipped.setAttribute("id", "dealer_card");

    secondCardDealerFlipped.innerHTML = "<h3></h3>";

    document.getElementById("dealer_hand").appendChild(secondCardDealerFlipped);

    appendCardDealerAnimation();

    if (totalValue(playerCards) > 21 && hasAnAce(playerCards)) {
      turnAceToOne(playerCards);
      document
        .querySelector("#ace_becomes_one_player")
        .classList.remove("hidden");
    }

    if (totalValue(playerCards) == 21) {
      blackjackCheck();
    } else {
      // Player's turn to hit or stand
      playerTurn = true;
      phase = "doubleDown";
    }
  }

  function showHUD() {
    const selectors = [
      "#stand",
      "#hit",
      "#player_score",
      "#dealer_score",
      "#bank",
      "#bet",
      "#double_down",
    ];
    selectors.forEach((selector) => {
      document.querySelector(selector).classList.remove("hidden");
    });
    document.querySelector("#player_score span").textContent =
      totalValue(playerCards);
    document.querySelector("#dealer_score span").textContent =
      dealerCards[0].value;
  }

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

    document.querySelector("#dealer_score span").textContent =
      totalValue(dealerCards);

    switch (true) {
      case totalValue(dealerCards) > 21:
        setTimeout(function () {
          dealerBust();
        }, bigSignTimeout);
        break;
      case totalValue(dealerCards) == 21:
      case totalValue(dealerCards) >= 17:
        decideWinner();
        break;
      default:
        dealerTakeACard();
        break;
    }
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
    updateUI(
      "#big_event_message_holder h2",
      `You recovered your ${betAmount}$`
    );

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

  function push() {
    noPrize();
    gameStarted = false;
    const messageHolder = document.querySelector("#big_event_message_holder");
    updateUI("#big_event_message_holder h1", "Push!");
    updateUI(
      "#big_event_message_holder h3",
      "Player and dealer have the same score"
    );
    updateUI("#big_event_message_holder h2", `You recover your ${betMulti}$`);
    messageHolder.classList.remove("hidden");
  }

  function youWin() {
    regularPrize();

    gameStarted = false;
    const messageHolder = document.querySelector("#big_event_message_holder");
    updateUI("#big_event_message_holder h1", "You win!");
    updateUI(
      "#big_event_message_holder h3",
      "Your cards value is higher than dealers'"
    );
    updateUI(
      "#big_event_message_holder h2",
      `You won ${betMulti * winMulti - betMulti}$`
    );

    messageHolder.classList.remove("hidden");
  }
  function youLose() {
    losePrize();
    gameStarted = false;
    updateUI("#big_event_message_holder h1", "You lose!");
    updateUI(
      "#big_event_message_holder h3",
      "Dealer cards value is higher than yours"
    );
    updateUI("#big_event_message_holder h2", `You lose ${betMulti}$`);
    document
      .querySelector("#big_event_message_holder")
      .classList.remove("hidden");
  }

  const bankruptcy = () => {
    gameStarted = true;
    updateUI("#big_event_message_holder h1", "Bankruptcy");
    updateUI("#big_event_message_holder h3", "You Lost");
    updateUI("#big_event_message_holder h2", "Game will restart");
    const messageHolder = document.querySelector("#big_event_message_holder");
    messageHolder.classList.remove("hidden");

    setTimeout(() => {
      location.reload();
    }, 2000);
  };

  document
    .querySelector("#big_event_message_holder")
    .addEventListener("click", function (e) {
      if (!gameStarted) {
        gameStart();
      }
    });

  document.querySelector("#hit").addEventListener("click", function () {
    if (playerTurn === true && gameStarted) {
      playerTurn = false;
      hit();
    }
  });

  document.querySelector("#double_down").addEventListener("click", function () {
    if (playerTurn === true && gameStarted && phase === "doubleDown") {
      playerTurn = false;
      doubleDown();
      phase = "";
    }
  });

  document.querySelector("#stand").addEventListener("click", function () {
    if (playerTurn === true && gameStarted) {
      playerTurn = false;
      stand();
    }
  });
});

// file 4

function addCardtoPlayer(cardNumber) {
  let card = document.createElement("li");
  card.className = "card undealed_player";
  card.id = "player_card";
  card.innerHTML =
    suitToStrImg(playerCards, cardNumber) +
    "<h3>" +
    cardDom(playerCards, cardNumber) +
    "</h3>";

  document.querySelector("#player_hand").appendChild(card);
  appendCardPlayerAnimation();
}

function addCardtoDealer(cardNumber) {
  let card = document.createElement("li");
  card.className = "card undealed_dealer";
  card.id = "dealer_card";
  card.innerHTML =
    suitToStrImg(dealerCards, cardNumber) +
    "<h3>" +
    cardDom(dealerCards, cardNumber) +
    "</h3>";

  document.querySelector("#dealer_hand").appendChild(card);
  appendCardDealerAnimation();
}

function appendCardPlayerAnimation() {
  let undealedPlayerCards = document.querySelectorAll(".undealed_player");
  undealedPlayerCards.forEach(function (card) {
    card.classList.remove("undealed_player");
  });
}

function appendCardDealerAnimation() {
  let undealedDealerCards = document.querySelectorAll(".undealed_dealer");
  undealedDealerCards.forEach(function (card) {
    card.classList.remove("undealed_dealer");
  });
}

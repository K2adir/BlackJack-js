const randomCard = () => {
  let selectedCard = Math.round(Math.random() * (fullDeck.length - 1));
  let dealtCard = fullDeck[selectedCard];
  fullDeck.splice(selectedCard, 1);
  return dealtCard;
};

console.log(randomCard(), "cardDeal. f -> randomCard() ");

///

function describeDealtCard(dealtCard) {
  return dealtCard.number + " of " + dealtCard.suit;
}

function totalValue(player) {
  let result = 0;
  for (i = 0; i < player.length; i++) {
    result += player[i].value;
  }
  return result;
}

function tellCurrentValue(playerHand) {
  return "The cards add to " + totalValue(playerHand) + ".";
}
console.log(playerHand);
console.log(tellCurrentValue(playerHand), "x");

//
function currentHand(player) {
  let currentHand = "";
  for (i = 0; i < player.length; i++) {
    if (i == player.length - 2) {
      currentHand += describeDealtCard(player[i]);
      continue;
    }
    if (i == player.length - 1) {
      currentHand += " and ";
      currentHand += describeDealtCard(player[i]);
      currentHand += ".";
      break;
    }
    currentHand += describeDealtCard(player[i]);
    currentHand += ", ";
  }
  return "current hand is: " + currentHand;
}

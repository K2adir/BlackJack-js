const hasAnAce = (playerHand) => {
  let hasAce = false;
  for (i = 0; i < playerHand.length; i++) {
    if (playerCards[i]._value === 11) {
      hasAce = true;
      break;
    }
    return hasAce;
  }
};

console.log(playerHand, "checkAce.js -> checks player Cards");

function turnAceToOne(cardsWhereTheAceIs) {
  const aceIndex = cardsWhereTheAceIs.findIndex((card) => card.value > 10);
  if (aceIndex !== -1) {
    cardsWhereTheAceIs[aceIndex]._value = 1;
    console.log("Ace value changed to 1 to avoid bust.");
  }
}

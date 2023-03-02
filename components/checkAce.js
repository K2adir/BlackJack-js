const hasAnAce = (playerHand) => {
  let hasAce = false;
  for (i = 0; i < playerHand.length; i++) {
    if (playerHand[i]._value === 11) {
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

function turnAceToOne(cardsWhereTheAceIs) {
  function findAce(cardToFind) {
    return cardToFind.value > 10;
  }

  let indexOfAce = cardsWhereTheAceIs.findIndex(findAce);
  cardsWhereTheAceIs[indexOfAce]._value = 1;
  // console.log("Total value over 21. The Ace value becomes 1.");
}

const hasAnAce = (playerCards) => {
  let hasAce = false;
  for (i = 0; i < playerCards.length; i++) {
    if (playerCards[i]._value === 11) {
      hasAce = true;
      break;
    }
    return hasAce;
  }
};

console.log(playerCards, "checkAce.js -> checks player Cards");

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

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

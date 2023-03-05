// file 3

function totalValue(player) {
  return player.reduce((total, card) => total + card.value, 0);
}

function hasAnAce(playerCards) {
  return playerCards.some((card) => card._value === 11);
}

function turnAceToOne(deckWithAce) {
  function findAce(cardToFind) {
    return cardToFind.value > 10;
  }

  let indexOfAce = deckWithAce.findIndex(findAce);
  deckWithAce[indexOfAce]._value = 1;
}

// creates card graphics
function cardDom(player, card) {
  let cardNumber = player[card - 1].number;
  let cardSuit = player[card - 1].suit;

  let output = cardNumber;
  return output;
}

function suitToStrImg(player, card) {
  let cardSuit = player[card - 1].suit;
  switch (cardSuit) {
    case "hearts":
      return '<img src="../assets/hearts.svg">';
    case "diamonds":
      return '<img src="../assets/diamonds.svg">';
    case "clubs":
      return '<img src="../assets/clubs.svg">';
    case "spades":
      return '<img src="../assets/spades.svg" >';
    default:
      return "";
  }
}

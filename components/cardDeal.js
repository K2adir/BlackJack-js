const randomCard = () => {
  let selectedCard = Math.round(Math.random() * (fullDeck.length - 1));
  let dealtCard = fullDeck[selectedCard];
  fullDeck.splice(selectedCard, 1);
  return dealtCard;
};

console.log(randomCard(), "cardDeal. f -> randomCard() ");

///

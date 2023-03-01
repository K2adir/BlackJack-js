const createDeck = (suit) => {
  deck = [];

  function createAce(suit) {
    let cardWord = "card";
    let cardNumber = 1;
    let card = cardNumber + cardWord;
    card = new Card("A", suit, 11);
    deck.push(card);
  }
};

deck.push("a");
console.log(deck);

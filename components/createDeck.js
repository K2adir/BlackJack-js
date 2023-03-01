const createDeck = (suit) => {
  deck = [];

  function createAce(suit) {
    let cardWord = "card";
    let cardNumber = 1;
    let card = cardWord + cardNumber;
    // THIS NEEDS IF STATEMENT, IT CAN EQUAL TO 1 OR 11;
    card = new Card("A", suit, 11);
    deck.push(card);
  }

  function crateFace(suit) {
    // Card(LETTER, SUIT, VALUE)
    // J
    let card = "card" + 11;
    card = new Card("J", suit, 10);
    deck.push(card);
    // Q
    card = "card" + 12;
    card = new Card("Q", suit, 10);
    // K
    card = "card" + 13;
    card = new Card("K", suit, 10);
  }

  function createNormalCards(suit) {
    for (let i = 2; i <= 10; i++) {
      let cardWord = "card";
      let cardNumber = i;
      let card = cardWord + cardNumber;

      card = new Card(i, suit, i);
      deck.push(card);
    }
  }
  createDeck("hearts");
  createDeck("clubs");
  createDeck("spades");
  createDeck("clubs");
  console.log(deck);
};

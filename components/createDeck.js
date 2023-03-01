const createDeck = (suit) => {
  const deck = [];

  function createAce(suit) {
    let value = 11;
    if (suit === "spades" || suit === "clubs") {
      value = 1;
    }
    let card = new Card("A", suit, value);
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

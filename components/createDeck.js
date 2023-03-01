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
    // Name , suit,  value
    // J
    let card = new Card("J", suit, 10);
    deck.push(card);
    // Q
    card = new Card("Q", suit, 10);
    deck.push(card);
    // K
    card = new Card("K", suit, 10);
    deck.push(card);
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
  createAce(suit);
  crateFace(suit);
  createNormalCards(suit);

  return deck;
};

const hearts = createDeck("hearts");
const clubs = createDeck("clubs");
const spades = createDeck("spades");
const diamonds = createDeck("diamonds");

const fullDeck = hearts.concat(clubs, spades, diamonds);
console.log(fullDeck);

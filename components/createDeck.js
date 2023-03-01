const createDeck = (suit) => {
  const deck = [];

  const createCard = (number, suit, value) => {
    const card = new Card(number, suit, value);
    deck.push(card);
  };

  for (let i = 2; i <= 10; i++) {
    createCard(i, suit, i);
  }

  createCard("A", suit, 11);
  createCard("J", suit, 10);
  createCard("Q", suit, 10);
  createCard("K", suit, 10);

  return deck;
};

const hearts = createDeck("hearts");
const clubs = createDeck("clubs");
const spades = createDeck("spades");
const diamonds = createDeck("diamonds");

const fullDeck = hearts.concat(clubs, spades, diamonds);
console.log(fullDeck, "f -> createDeck.js");

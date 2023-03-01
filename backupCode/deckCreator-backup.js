const createDeck = () => {
  const suits = ["hearts", "diamonds", "spades", "clubs"];
  const deck = [];

  function createAce(suit, total) {
    let value = total + 11 > 21 ? 1 : 11;
    let card = new Card("A", suit, value);
    return { card, value };
  }

  function createFace(suit) {
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
      let card = new Card(i, suit, i);
      deck.push(card);
    }
  }

  suits.forEach((suit) => {
    createAce(suit, 0); // Add an Ace of each suit to the deck
    crateFace(suit);
    createNormalCards(suit);
  });

  return deck;
};

const hearts = createDeck("hearts");
const clubs = createDeck("clubs");
const spades = createDeck("spades");
const diamonds = createDeck("diamonds");

const fullDeck = hearts.concat(clubs, spades, diamonds);
console.log(fullDeck);

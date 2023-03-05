// file 2

class Card {
  constructor(number, suit, value) {
    this._number = number;
    this._suit = suit;
    this._value = value;
  }

  get number() {
    return this._number;
  }

  get suit() {
    return this._suit;
  }

  get value() {
    return this._value;
  }
}

function createDeck() {
  function createSuit(suit) {
    deck.push(new Card("A", suit, 11));

    for (let i = 2; i <= 10; i++) {
      deck.push(new Card(i, suit, i));
    }

    deck.push(new Card("J", suit, 10));
    deck.push(new Card("Q", suit, 10));
    deck.push(new Card("K", suit, 10));
  }

  createSuit("hearts");
  createSuit("diamonds");
  createSuit("spades");
  createSuit("clubs");
}

function randomCard() {
  const selectedCardIndex = Math.floor(Math.random() * deck.length);
  const dealtCard = deck.splice(selectedCardIndex, 1)[0];
  return dealtCard;
}

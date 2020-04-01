export function getRoundComparator(round) {
  switch (round) {
    case 0:
      return redOrBlack;
    case 1:
      return higherOrLower;
    case 2:
      return inBetweenOrOutside;
    case 3:
      return cardHasSuit;
    default:
      return;
  }
}

export const cardValues = [
  "Sa", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "Sj", "Sq", "Sk",
  "Ha", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "Hj", "Hq", "Hk",
  "Da", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "Dj", "Dq", "Dk",
  "Ca", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "Cj", "Cq", "Ck",
];

// Checks if player guess of red or black is correct
export function redOrBlack(isRed, dealerCard) {
  if (isRed) {
    return dealerCard[0] === "H" || dealerCard[0] === "D";
  } return dealerCard[0] === "C" || dealerCard[0] === "S";
}

// isHigher - if true, player guessed higher, if false player guessed lower
// Returns 1 if player is correct, 0 if player is wrong, -1 if cards are equal
export function higherOrLower(isHigher, playerCards, dealerCard, aceValue) {
  if (getCardValue(playerCards[0], aceValue) === getCardValue(dealerCard), aceValue) {
    return -1;
  }
  if (isHigher) {
    if (getCardValue(playerCards[0], aceValue) < getCardValue(dealerCard), aceValue) {
      return 1;
    } return 0;
  } else {
    if (getCardValue(playerCards[0], aceValue) > getCardValue(dealerCard), aceValue) {
      return 1;
    } return 0;
  }
}

// Returns 1 if in between/outside, 0 if not, and -1 if equal to a card
export function inBetweenOrOutside(isInBetween, playerCards, dealerCard, aceValue) {
  let bounds = orderCards(playerCards, aceValue);
  for (let i = 0; i < bounds.length; i++) {
    if (
      dealerCard !== bounds[i]
        &&
      getCardValue(dealerCard, aceValue) === getCardValue(bounds[i], aceValue)
    ) {
      return -1;
    }
  }
  if (isInBetween) {
    if (dealerCard === bounds[1]) {
      return 1;
    } return 0;
  } else {
    if (dealerCard !== bounds[1]) {
      return 1;
    } return 0;
  }
}

// Checks if player suit guess is correct
export function cardHasSuit(suit, dealerCard) {
  return suit === dealerCard[0];
}

// Creates bounds for inBetweenOrOutside()
function orderCards(playerCards, aceValue) {
  return playerCards.sort((card1, card2) => {
    if (getCardValue(card1, aceValue) > getCardValue(card2, aceValue)) {
      return 1;
    } else if (getCardValue(card1, aceValue) < getCardValue(card2, aceValue)) {
      return -1;
    } return 0;
  });
}

// Gets number value of a card
export function getCardValue(card, aceValue) {
  if (card[1] === "a") {
    return aceValue;
  } else if (card[1] === "k") {
    return 13;
  } else if (card[1] === "q") {
    return 12;
  } else if (card[1] === "j") {
    return 11;
  } else if (card[1] === "1") {
    return 10;
  } else {
    return parseInt(card[1]);
  }
}

export function getCardImage(card) {
  return require(`./images/${card}.png`);
}

export function dealFinalRound(deck) {
  let newDeck = deck;
  let cards = [];
  for (let i = 0; i < 10; i++) {
    cards.push(newDeck.pop());
  }
  return { newDeck, finalCards: cards};
}

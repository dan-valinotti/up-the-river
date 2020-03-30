import {cardHasSuit, higherOrLower, inBetweenOrOutside} from "../util";

it("Test inOrOut - inbetween, correct", () => {
  // Player - C2, H4, guess in between
  const playerCards = ["C2", "D3", "H4"];
  // Card dealt - D3
  const dealerCard = "D3";
  expect(inBetweenOrOutside(true, playerCards, dealerCard)).toEqual(1);
});
it("Test inOrOut - inbetween, incorrect", () => {
  // Player - C2, D3, guess in between
  const playerCards = ["C2", "D3", "H4"];
  // Card dealt - H4
  const dealerCard = "H4";
  expect(inBetweenOrOutside(true, playerCards, dealerCard)).toEqual(0);
});
it("Test inOrOut - inbetween, double incorrect", () => {
  const playerCards = ["C2", "S4", "H4"];
  const dealerCard = "S4";
  expect(inBetweenOrOutside(true, playerCards, dealerCard)).toEqual(-1);
});
it("Test inOrOut - outside, correct", () => {
  const playerCards = ["C2", "D3", "H4"];
  const dealerCard = "H4";
  expect(inBetweenOrOutside(false, playerCards, dealerCard)).toEqual(1);
});
it("Test inOrOut - outside, incorrect", () => {
  const playerCards = ["C2", "D3", "H4"];
  const dealerCard = "D3";
  expect(inBetweenOrOutside(false, playerCards, dealerCard)).toEqual(0);
});
it("Test inOrOut - outside, incorrect", () => {
  const playerCards = ["C2", "D2", "H4"];
  const dealerCard = "D2";
  expect(inBetweenOrOutside(false, playerCards, dealerCard)).toEqual(-1);
});
it("Test guessTheSuit - hearts, correct", () => {
  const dealerCard = "H2";
  const suit = "H";
  expect(cardHasSuit(suit, dealerCard)).toEqual(true);
});
it("Test guessTheSuit - hearts, incorrect", () => {
  const dealerCard = "D2";
  const suit = "H";
  expect(cardHasSuit(suit, dealerCard)).toEqual(false);
});

import {
  cardValues,
  redOrBlack,
  higherOrLower, inBetweenOrOutside, cardHasSuit, dealFinalRound,
} from "../../util";

function removePlayer(players, name) {
  return players.filter((player) => player.name !== name);
}

function shuffleDeck(array) {
  return array.sort(() => Math.random() - 0.5);
}

function dealPlayerCard(player, deck) {
  let hand = player.hand;
  let newDeck = deck;
  hand.push(newDeck.pop());
  player.hand = hand;
  return {
    player,
    deck: newDeck,
  };
}

// REDUCERS
const gameReducer = (initState = {
  players: [],
  deck: [],
  shuffled: false,
  turn: 0,
  round: 0,
  currentResult: null,
  dealerCard: "",
  finalRoundCards: [],
  finalRoundTurn: 0,
  notifiedPlayers: [],
  drinkCount: 2,
}, action) => {
  switch (action.type) {
    case 'CREATE_GAME':
      return {
        ...initState,
        deck: cardValues,
      };
    case 'END_GAME':
      return {
        players: [],
        deck: [],
      };
    case 'ADD_PLAYER':
      initState.players.push(action.payload);
      return {
        ...initState,
      };
    case 'REMOVE_PLAYER':
      return {
        ...initState,
        players: removePlayer(initState.players, action.payload.name),
      };
    case 'INCREMENT_TURN':
      // If the player is the last in the list, go to next round
      if (initState.turn === initState.players.length - 1 && initState.round !== 4) {
        return {
          ...initState,
          turn: 0,
          round: initState.round + 1,
          currentResult: null,
          dealerCard: "",
        }
      }
      return {
        ...initState,
        turn: initState.turn + 1,
        currentResult: null,
        dealerCard: "",
      };
    case 'SHUFFLE_DECK':
      return {
        ...initState,
        deck: shuffleDeck(initState.deck),
        shuffled: true,
      };
    case 'DEAL_CARD':
      let { player, deck } = dealPlayerCard(initState.players[initState.turn], initState.deck);
      let newPlayers = initState.players;
      newPlayers[initState.turn] = player;
      return {
        ...initState,
        players: newPlayers,
        deck,
        dealerCard: player.hand[player.hand.length - 1],
      };
    case 'GUESS_ROB':
      const result = redOrBlack(
        (action.payload.color === "red"),
        initState.dealerCard,
      );
      return {
        ...initState,
        currentResult: result,
      };
    case 'GUESS_HOL':
      const resultHol = higherOrLower(
        action.payload.isHigher,
        action.payload.playerCards,
        initState.dealerCard,
      );
      return {
        ...initState,
        currentResult: resultHol,
      };
    case 'GUESS_IN_OR_OUT':
      const resultInOrOut = inBetweenOrOutside(
        action.payload.inBetween,
        action.payload.playerCards,
        initState.dealerCard,
      );
      return {
        ...initState,
        currentResult: resultInOrOut,
      };
    case 'GUESS_SUIT':
      const resultSuit = cardHasSuit(
        action.payload.suit,
        initState.dealerCard,
      );
      return {
        ...initState,
        currentResult: resultSuit,
      };
    case 'DEAL_FINAL_ROUND':
      const { newDeck, finalCards } = dealFinalRound(
        initState.deck,
      );
      return {
        ...initState,
        deck: newDeck,
        finalRoundCards: finalCards,
      };
    case 'NEXT_TURN_FINAL_ROUND':
      return {
        ...initState,
        finalRoundTurn: initState.finalRoundTurn + 1,
        drinkCount: Math.ceil((initState.finalRoundTurn - 0.5) * 2)
      };
    case 'NOTIFY_PLAYERS':
      return {
        ...initState,
        notifiedPlayers: action.payload,
      };
    default:
      return initState;
  }
};

export default gameReducer;

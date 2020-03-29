import {
  cardValues,
  redOrBlack,
  higherOrLower, inBetweenOrOutside,
} from "../../util";

function removePlayer(players, name) {
  let index = -1;
  for (let i=0; i < players.length; i++) {
    if (players[i].name === name) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    return players.splice(index, 1);
  } return players;
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
      if (initState.turn === initState.players.length - 1) {
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
    default:
      return initState;
  }
};

export default gameReducer;

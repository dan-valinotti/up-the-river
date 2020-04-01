export const createGame = () => ({
  type: 'CREATE_GAME',
});
export const endGame = () => ({
  type: 'END_GAME',
});
export const addPlayer = (payload) => ({
  type: 'ADD_PLAYER',
  payload,
});
export const removePlayer = (payload) => ({
  type: 'REMOVE_PLAYER',
  payload,
});
export const incrementTurn = () => ({
  type: 'INCREMENT_TURN',
});
export const shuffleDeck = () => ({
  type: 'SHUFFLE_DECK',
});
export const incrementRound = () => ({
  type: 'INCREMENT_ROUND',
});
export const dealCard = (payload) => ({
  type: 'DEAL_CARD',
  payload,
});
export const guessRoB = (payload) => ({
  type: 'GUESS_ROB',
  payload,
});
export const guessHoL = (payload) => ({
  type: 'GUESS_HOL',
  payload,
});
export const guessInOrOut = (payload) => ({
  type: 'GUESS_IN_OR_OUT',
  payload,
});
export const guessTheSuit = (payload) => ({
  type: 'GUESS_SUIT',
  payload,
});
export const dealFinalRound = () => ({
  type: 'DEAL_FINAL_ROUND',
});
export const nextTurnFinalRound = () => ({
  type: 'NEXT_TURN_FINAL_ROUND',
});
export const notifyPlayers = (payload) => ({
  type: 'NOTIFY_PLAYERS',
  payload,
});
export const setAceValue = (payload) => ({
  type: 'SET_ACE_VALUE',
  payload,
});

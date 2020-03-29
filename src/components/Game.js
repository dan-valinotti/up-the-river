import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Game = () => {
  const gameState = useSelector((state) => state.gameReducer);
  const dispatch = useDispatch();

  return (
    <div id="game">
      <p>Game status: { gameState.deck.length > 0 ? 'STARTED' : 'ENDED' }</p>
      <button onClick={() => dispatch({ type: 'CREATE_GAME' })}>Create</button>
      <button onClick={() => dispatch({ type: 'END_GAME' })}>End</button>
    </div>
  )
};

export default Game;

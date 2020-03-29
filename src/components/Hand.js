import React from 'react';
import { useSelector } from 'react-redux';
import Card from "./Card";

const Hand = () => {
  const gameState = useSelector((state) => state.gameReducer);

  return (
    <div id="player-hand">
      {gameState.players[gameState.turn].hand.map((card, key) => (
        <Card key={key} cardValue={card} width={100} height={140} raised={false} />
      ))}
    </div>
  )
};

export default Hand;

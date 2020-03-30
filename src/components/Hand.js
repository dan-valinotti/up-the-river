import React from 'react';
import Card from "./Card";

const Hand = (props) => {
  return (
    <div id="player-hand">
      {props.player.hand.map((card, key) => (
        <Card key={key} cardValue={card} width={100} height={140} raised={false} />
      ))}
    </div>
  )
};

export default Hand;

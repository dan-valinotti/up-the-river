import React from 'react';
import Card from "./Card";

const FinalCardRows = ({ cards }) => {
  return (
    <div id="final-cards">
      <div className="cards-left">
        <Card flippable raised={false} cardValue={cards[0]} height={140} width={100}/>
      </div>
      <div className="cards-center">
        {cards.slice(1, cards.length - 1).map((card, key) => (
          <Card
            flippable
            raised={false}
            cardValue={card}
            height={140}
            width={100}
            key={key}
          />
        ))}
      </div>
      <div className="cards-right">
        <Card flippable raised={false} cardValue={cards[cards.length - 1]} height={140} width={100}/>
      </div>
    </div>
  );
};

export default FinalCardRows;

import React from 'react';
import { Card as MaterialCard } from "@material-ui/core";
import {getCardImage} from "../util";

const Card = (props) => {
  return (
    <MaterialCard
      className="card-display"
      raised={props.raised}
      style={{width: props.width, height: props.height}}
    >
      <div className="card-container">
        <img src={
          props.cardValue ? getCardImage(props.cardValue) : ""} alt={props.cardValue} />
      </div>
    </MaterialCard>
  )
};

export default Card;

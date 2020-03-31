import React, {useState} from 'react';
import { Card as MaterialCard } from "@material-ui/core";
import {getCardImage, getCardValue} from "../util";
import * as GameActions from "../redux/actions/gameActions";
import Link from "@material-ui/core/Link";
import {connect} from "react-redux";

const Card = ({
  width,
  height,
  cardValue,
  raised,
  flippable,
  players,
  notifyPlayers,
  nextFinalTurn,
  round,
}) => {
  const [flipped, setFlipped] = useState(false);
  const [flipping, setFlipping] = useState(false);

  const flipCard = () => {
    setFlipped(!flipped);
  };

  const handleClick = () => {
    if (flippable && !flipped) {
      setFlipping(true);
      let notifiedPlayers = [];

      for (let i = 0; i < players.length; i++) {
        for (let j = 0; j < players[i].hand.length; j++) {
          if (players[i].hand[j] && getCardValue(players[i].hand[j]) === getCardValue(cardValue)) {
            if (notifiedPlayers.indexOf(players[i]) === -1) {
              notifiedPlayers.push(players[i]);
            } else {
              let exists = notifiedPlayers.indexOf(players[i]);
              notifiedPlayers[exists].multiplier += 1;
            }
          }
        }
      }

      setTimeout(() => {
        notifyPlayers(notifiedPlayers);
        nextFinalTurn();
        flipCard();
        setFlipping(false);
      }, 250)
    }
  };

  return (
    <MaterialCard
      className={`${round === 4 && 'final-round-card'} card-display ${flipping && 'flipping-card'}`}
      raised={raised}
      style={{width: width, height: height}}
    >
      <Link component="a" onClick={() => handleClick()}>
        <div className="card-container">
          <img
            src={
              ((!flippable && cardValue) || (flippable && flipped))
                ? getCardImage(cardValue)
                : require('../images/back.png')
            }
            alt={cardValue}
          />
        </div>
      </Link>
    </MaterialCard>
  )
};

const mapStateToProps = state => ({
  players: state.gameReducer.players,
  round: state.gameReducer.round,
});

const mapDispatchToProps = (dispatch) => ({
  nextFinalTurn: () => dispatch(GameActions.nextTurnFinalRound()),
  notifyPlayers: (payload) => dispatch(GameActions.notifyPlayers(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);

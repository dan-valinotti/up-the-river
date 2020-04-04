import React from 'react';
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "./Card";
import * as GameActions from "../redux/actions/gameActions";

const HigherOrLower = (props) => {
  const { dealCard, guessTheSuit, nextTurn } = props;

  const guess = (suit) => {
    dealCard({ player: props.players[props.turn] });
    guessTheSuit({
      suit,
      dealerCard: props.dealerCard,
    });
  };

  return (
    <div id={"hol"}>
      <div style={{
        display: props.currentResult === null ? 'block' : 'none'
      }}>
        <Typography variant="h5" className="prompt-text">
          Guess the suit...
        </Typography>
        <div className={"rob-btn-container"}>
          <Button
            onClick={() => guess("H")}
            id={"red-btn"}
            variant={"contained"}
            color={"primary"}
          >
            Hearts
          </Button>
          <Button
            onClick={() => guess("D")}
            id={"red-btn"}
            variant={"contained"}
            color={"primary"}
          >
            Diamonds
          </Button>
          <Button
            onClick={() => guess("C")}
            id={"black-btn"}
            variant={"contained"}
            color={"primary"}
          >
            Clubs
          </Button>
          <Button
            onClick={() => guess("S")}
            id={"black-btn"}
            variant={"contained"}
            color={"primary"}
          >
            Spades
          </Button>
        </div>
      </div>
      <div className="result-display" style={{
        display: props.currentResult === null ? 'none' : 'flex'
      }}>
        <Card cardValue={props.dealerCard} width={200} height={280} raised={true}/>
        <Typography variant={"h6"} className="result-text">
          {props.currentResult
            ? "Correct! Give 8"
            : `Incorrect! Take 8`
          }
        </Typography>
      </div>
      {props.currentResult !== null && (
        <Button className={"next-turn-btn"} onClick={() => nextTurn()} variant="contained" color="primary">
          Next turn
        </Button>
      )}
    </div>
  )
};

const mapStateToProps = state => ({
  players: state.gameReducer.players,
  turn: state.gameReducer.turn,
  currentResult: state.gameReducer.currentResult,
  dealerCard: state.gameReducer.dealerCard,
});

const mapDispatchToProps = (dispatch) => ({
  dealCard: (payload) => dispatch(GameActions.dealCard(payload)),
  guessTheSuit: (payload) => dispatch(GameActions.guessTheSuit(payload)),
  nextTurn: () => dispatch(GameActions.incrementTurn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HigherOrLower);

import React from 'react';
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "./Card";
import * as GameActions from "../redux/actions/gameActions";

const HigherOrLower = (props) => {
  const { dealCard, guessHigherOrLower, nextTurn } = props;

  const guess = (isHigher) => {
    dealCard({ player: props.players[props.turn] });
    guessHigherOrLower({
      isHigher,
      playerCards: props.players[props.turn].hand,
    });
  };

  return (
    <div id={"hol"}>
      <div style={{
        display: props.currentResult === null ? 'block' : 'none'
      }}>
        <Typography variant="h5" className="prompt-text">
          Higher or Lower?
        </Typography>
        <div className={"rob-btn-container"}>
          <Button
            onClick={() => guess(true)}
            id={"green-btn"}
            variant={"contained"}
            color={"primary"}
          >
            Higher
          </Button>
          <Button
            onClick={() => guess(false)}
            id={"red-btn"}
            variant={"contained"}
            color={"primary"}
          >
            Lower
          </Button>
        </div>
      </div>
      <div className="result-display" style={{
        display: props.currentResult === null ? 'none' : 'flex'
      }}>
        <Card cardValue={props.dealerCard} width={200} height={280} raised={true}/>
        <Typography variant={"h6"} className="result-text">
          {props.currentResult === 1
            ? "Correct! Give 4"
            : `Incorrect! Take ${Math.abs(4 * (props.currentResult - 1))}`
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
  dealerCard: state.gameReducer.dealerCard
});

const mapDispatchToProps = (dispatch) => ({
  dealCard: (payload) => dispatch(GameActions.dealCard(payload)),
  guessHigherOrLower: (payload) => dispatch(GameActions.guessHoL(payload)),
  nextTurn: () => dispatch(GameActions.incrementTurn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HigherOrLower);

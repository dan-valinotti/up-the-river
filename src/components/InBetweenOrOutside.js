import React from 'react';
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "./Card";
import * as GameActions from "../redux/actions/gameActions";

const InBetweenOrOutside = (props) => {
  const { dealCard, guessInOrOut, nextTurn } = props;

  const guess = (inBetween) => {
    dealCard({ player: props.players[props.turn] });
    guessInOrOut({
      inBetween,
      playerCards: props.players[props.turn].hand,
    });
  };

  return (
    <div id={"in-or-out"}>
      <div style={{
        display: props.currentResult === null ? 'block' : 'none'
      }}>
        <Typography variant="h5">
          In-between or Outside?
        </Typography>
        <div className={"rob-btn-container"}>
          <Button
            onClick={() => guess(true)}
            id={"green-btn"}
            variant={"contained"}
            color={"primary"}
          >
            In-between
          </Button>
          <Button
            onClick={() => guess(false)}
            id={"red-btn"}
            variant={"contained"}
            color={"primary"}
          >
            Outside
          </Button>
        </div>
      </div>
      <div className="result-display" style={{
        display: props.currentResult === null ? 'none' : 'flex'
      }}>
        <Card cardValue={props.dealerCard} width={200} height={280} raised={true}/>
        <Typography variant={"h6"} className="result-text">
          {props.currentResult === 1
            ? "Correct! Give 6"
            : `Incorrect! Take ${Math.abs(6 * (props.currentResult - 1))}`
          }
        </Typography>
      </div>
      {props.currentResult !== null && (
        <Button className={"next-turn-btn"} onClick={() => nextTurn()} variant="contained" color="primary">
          Next turn
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  players: state.gameReducer.players,
  turn: state.gameReducer.turn,
  currentResult: state.gameReducer.currentResult,
  dealerCard: state.gameReducer.dealerCard
});

const mapDispatchToProps = (dispatch) => ({
  dealCard: (payload) => dispatch(GameActions.dealCard(payload)),
  guessInOrOut: (payload) => dispatch(GameActions.guessInOrOut(payload)),
  nextTurn: () => dispatch(GameActions.incrementTurn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InBetweenOrOutside);

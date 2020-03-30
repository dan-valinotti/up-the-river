import React from 'react';
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "./Card";
import * as GameActions from '../redux/actions/gameActions';

const RedOrBlack = (props) => {
  const { dealCard, guessRedOrBlack, nextTurn } = props;

  const guess = (color) => {
    dealCard({ player: props.players[props.turn] });
    guessRedOrBlack({ color });
  };

  return (
    <div id={"rob"}>
      <div style={{
        display: props.currentResult === null ? 'block' : 'none'
      }}>
        <Typography variant="h6" className="prompt-text">
          Red or Black?
        </Typography>
        <div className={"rob-btn-container"}>
          <Button onClick={() => guess("red")} id={"red-btn"} variant={"contained"} color={"primary"}>
            Red
          </Button>
          <Button onClick={() => guess("black")} id={"black-btn"} variant={"contained"} color={"primary"}>
            Black
          </Button>
        </div>
      </div>
      <div className="result-display" style={{
        display: props.currentResult === null ? 'none' : 'flex'
      }}>
        <Card cardValue={props.dealerCard} width={200} height={280} raised={true}/>
        <Typography variant={"h6"} className="result-text">
          {props.currentResult ? "Correct! Give 2" : "Incorrect! Take 2"}
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
  guessRedOrBlack: (payload) => dispatch(GameActions.guessRoB(payload)),
  nextTurn: () => dispatch(GameActions.incrementTurn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RedOrBlack);

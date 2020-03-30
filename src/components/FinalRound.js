import React from 'react';
import * as GameActions from "../redux/actions/gameActions";
import {connect} from "react-redux";
import FinalCardRows from "./FinalCardRows";
import Typography from "@material-ui/core/Typography";
import PlayerHandsDisplay from "./PlayerHandsDisplay";

const FinalRound = (props) => {
  const { notifiedPlayers, finalRoundTurn } = props;

  return (
    <div id="final-round">
      <div className="notified-players">
        {finalRoundTurn !== 0
          ? (
            <>
              {notifiedPlayers.length > 0 ? (
                <Typography variant={"h6"}>
                  {notifiedPlayers.map(
                    (player) => `${player.name}, `
                  )} {finalRoundTurn % 2 === 0 ? 'take ' : 'give '}
                  {Math.ceil((finalRoundTurn - 0.5) / 2) * 2}!
                </Typography>
              ) : (
                <Typography variant={"h6"}>
                  Nobody drinks.
                </Typography>
              )}
            </>
          ) : (
            <Typography variant={"h6"}>
              Let's see who drinks...
            </Typography>
          )
        }
      </div>
      <FinalCardRows cards={props.finalRoundCards} />
      <PlayerHandsDisplay/>
    </div>
  );
};

const mapStateToProps = state => ({
  players: state.gameReducer.players,
  turn: state.gameReducer.turn,
  currentResult: state.gameReducer.currentResult,
  dealerCard: state.gameReducer.dealerCard,
  finalRoundCards: state.gameReducer.finalRoundCards,
  finalRoundTurn: state.gameReducer.finalRoundTurn,
  notifiedPlayers: state.gameReducer.notifiedPlayers,
});

const mapDispatchToProps = (dispatch) => ({
  dealFinalRound: (payload) => dispatch(GameActions.dealFinalRound()),
  nextTurn: () => dispatch(GameActions.incrementTurn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FinalRound);

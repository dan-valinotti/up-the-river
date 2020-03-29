import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreateGameForm from "./CreateGameForm";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import RedOrBlack from "./RedOrBlack";
import Hand from "./Hand";
import HigherOrLower from "./HigherOrLower";

const GameController = () => {
  const gameState = useSelector(state => state.gameReducer);
  const dispatch = useDispatch();

  const nextTurn = () => {
    dispatch({
      type: 'INCREMENT_TURN',
    });
  };

  useEffect(() => {
    if (gameState.deck.length > 0 && !gameState.shuffled) {
      dispatch({
        type: 'SHUFFLE_DECK',
      });
    }
  });

  return (
    <>
      {gameState.deck.length === 0 ? (
        <CreateGameForm/>
      ) : (
        <Paper>
          <div id="game-container">
            <Typography className="game-title" variant="h5">
              Up the River, Down the River
            </Typography>
            <div className="player-display">
              <Typography variant="body1" style={{fontWeight: 700}}>
                Current player:
                <span style={{ paddingLeft: '0.5rem', fontWeight: 300 }}>
                  {gameState.players[gameState.turn].name}
                </span>
              </Typography>
              <Typography variant="body1" style={{fontWeight: 700}}>
                Round:
                <span style={{ paddingLeft: '0.5rem', fontWeight: 300 }}>
                  {gameState.round + 1}
                </span>
              </Typography>
              {gameState.round > 0 && (
                <div className="hand-container">
                  <Typography variant="body1">Current hand:</Typography>
                  <Hand />
                </div>
              )}
            </div>
            {gameState.round === 0 && (
              <RedOrBlack/>
            )}
            {gameState.round === 1 && (
              <HigherOrLower/>
            )}
            <Button onClick={() => nextTurn()} variant="contained" color="primary">
              Next turn
            </Button>
          </div>
        </Paper>
      )}
    </>
  );
};

export default GameController;

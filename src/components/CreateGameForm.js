import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {TextField, Typography, Button, List, ListItem} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {AccountCircle} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "@material-ui/icons";

const CreateGameForm = (props) => {
  const [playerName, setPlayerName] = useState("");

  const gameState = useSelector(state => state.gameReducer);
  const dispatch = useDispatch();

  const onChangeName = (event) => {
    setPlayerName(event.target.value);
  };

  const addPlayer = () => {
    dispatch({
      type: 'ADD_PLAYER',
      payload: {
        name: playerName,
        hand: [],
      }
    });
    setPlayerName("");
  };

  const removePlayer = (player) => {
    dispatch({
      type: 'REMOVE_PLAYER',
      payload: {
        name: player.name
      },
    });
  };

  const startGame = () => {
    dispatch({
      type: 'CREATE_GAME',
    });
  };

  return (
    <Card className="form-card">
      <Typography className="game-title" variant="h5">
        Up the River, Down the River
      </Typography>
      <div className="form-container">
        <div className="form-left">
          <Typography variant="h6" className="form-section-title">
            Add a player
          </Typography>
          <div id="form">
            <TextField
              id="player-name"
              label="Name"
              onChange={event => onChangeName(event)}
              value={playerName}
            />
            <Button variant="contained" color="primary" onClick={() => addPlayer()}>
              Add
            </Button>
          </div>
        </div>
        <div className="form-right">
          <Typography variant="h6">
            Players
          </Typography>
          <List>
            {gameState.players.map((player, key) => (
              <div key={key}>
                <ListItem>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary={player.name} />
                  <IconButton onClick={() => removePlayer(player)} color='secondary'>
                    <Delete />
                  </IconButton>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </div>
      </div>
      <div className="submit">
        <Button variant="contained" color="primary" onClick={() => startGame()}>
          Start Game
        </Button>
      </div>
    </Card>
  );
};

export default CreateGameForm;

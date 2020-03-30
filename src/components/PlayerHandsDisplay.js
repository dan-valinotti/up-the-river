import React, {useState} from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {connect} from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Hand from "./Hand";
import Divider from "@material-ui/core/Divider";

const PlayerHandsDisplay = ({ players }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div id="player-hands-container">
      <ExpansionPanel expanded={open} onChange={() => handleOpen()} style={{ paddingTop: 0 }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className="expand-title">All player hands</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List style={{ width: "100%", paddingTop: 0}}>
            {players.map((player, key) => (
              <>
                <ListItem key={key}>
                  <div className="player-hand-display">
                    <Typography style={{margin: "auto", color: "rgba(0,0,0,0.8)"}}>
                      {player.name}
                    </Typography>
                    <Hand player={player}/>
                  </div>
                </ListItem>
                {key !== players.length - 1 && (
                  <Divider />
                )}
              </>
            ))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
};

const mapStateToProps = state => ({
  players: state.gameReducer.players,
});

export default connect(mapStateToProps)(PlayerHandsDisplay);

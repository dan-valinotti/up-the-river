import React, {useState} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import PropTypes from 'prop-types';
import {bindActionCreators, compose} from "redux";
import * as GameActions from '../redux/actions/gameActions';
import {dealCard} from "../redux/actions/gameActions";

const withRoundLogic = (WrappedComponent) => (props) => {
  const gameState = useSelector((state) => state.gameReducer);
  const dispatch = useDispatch();
  const [guessed, setGuessed] = useState(false);

  const guess = () => {
    // Deal card to current player
    dispatch({
      type: 'DEAL_CARD',
      payload: {
        player: gameState.players[gameState.turn]
      },
    });
    // Dispatch action of particular round component
    dispatch(props.action);
    setGuessed(true);
  };

  return (
    <div>
      <WrappedComponent {...props} guess={guess}>
        {props.children}
      </WrappedComponent>
    </div>
  )
};

withRoundLogic.propTypes = {
  action: PropTypes.shape({
    type: PropTypes.string,
    payload: PropTypes.object,
  }),
};

const mapStateToProps = state => ({
  gameState: state.gameReducer,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dealCard: GameActions.dealCard,
});

const composedWrapper = compose(
  connect(mapStateToProps, null),
  withRoundLogic,
);

export default connect(mapStateToProps)(withRoundLogic);

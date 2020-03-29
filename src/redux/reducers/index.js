import { combineReducers } from "redux";
import gameReducer from './gameReducer';

// REDUCERS
const counterReducer = (initState = {
  value: 0
}, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        value: initState.value + 1,
      };
    case 'DECREMENT':
      return {
        value: initState.value - 1,
      };
    default:
      return initState;
  }
};

const loggedReducer = (initState = {
  value: false
}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        value: true,
      };
    case 'LOGOUT':
      return {
        value: false,
      };
    default:
      return initState;
  }
}

export default combineReducers({
  counterReducer,
  loggedReducer,
  gameReducer,
});

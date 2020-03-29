import { createStore } from 'redux';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

// STORE
let store = createStore(rootReducer, composeWithDevTools());
// store.subscribe(() => console.log(store.getState()));
export default store;

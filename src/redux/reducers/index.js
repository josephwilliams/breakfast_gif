import { combineReducers } from 'redux';

import giphyReducer, { STORE_KEY as GIPHY_STORE_KEY } from 'redux/reducers/giphy.js';


const reducersToCombine = {
  [GIPHY_STORE_KEY]: giphyReducer,
};

const combinedReducer = combineReducers(reducersToCombine);

function rootReducer(state = {}, action) {
  let nextState = state;

  // Transform the state with all the reducers combined into a single function.
  nextState = combinedReducer(nextState, action);

  return nextState;
}

export default rootReducer;

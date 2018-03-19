
import {
  all,
  fork,
} from 'redux-saga/effects';

import giphySagas from 'redux/sagas/giphy.js';


function* rootSaga(...args) {
  yield all([
    fork(giphySagas, ...args),
  ]);
}

export default rootSaga;

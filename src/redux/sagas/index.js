
import {
  fork,
} from 'redux-saga/effects';

import giphySagas from 'redux/sagas/giphy.js';


function* rootSaga(...args) {
  yield [
    fork(giphySagas, ...args),
  ];
}

export default rootSaga;

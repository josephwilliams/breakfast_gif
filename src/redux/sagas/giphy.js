import {
  call,
  put,
  fork,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import {
  ACTION_LOAD_TRENDING_GIPHY_LIST_REQUESTED,
  ACTION_LOAD_TRENDING_GIPHY_LIST_STARTED,
  ACTION_LOAD_TRENDING_GIPHY_LIST_SUCCESS,
  ACTION_LOAD_TRENDING_GIPHY_LIST_ERROR,
} from 'redux/actions/giphy.js';

import makeAction from 'redux/utils.js';


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* handleLoadTrendingGiphyListRequested(action) {
  yield put(makeAction(ACTION_LOAD_TRENDING_GIPHY_LIST_STARTED));
  try {
    // const data = yield call(fetch(url));
    yield put(makeAction(ACTION_LOAD_TRENDING_GIPHY_LIST_SUCCESS));
  } catch (error) {
    yield put(makeAction(ACTION_LOAD_TRENDING_GIPHY_LIST_ERROR, {
      error: error,
    }));
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
// function* mySaga() {
//   yield takeEvery(
//     ACTION_LOAD_TRENDING_GIPHY_LIST_REQUESTED,
//     handleLoadTrendingGiphyListRequested
//   );
// }

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* watchLoadTrendingGiphyListRequested() {
  yield takeLatest(
    ACTION_LOAD_TRENDING_GIPHY_LIST_REQUESTED,
    handleLoadTrendingGiphyListRequested
  );
}

function* giphySaga(...args) {
  yield [
    fork(watchLoadTrendingGiphyListRequested, ...args),
  ];
}

export default giphySaga;

import {
  all,
  call,
  put,
  fork,
  // takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import {
  ACTION_LOAD_TRENDING_GIPHY_LIST_REQUESTED,
  ACTION_LOAD_TRENDING_GIPHY_LIST_STARTED,
  ACTION_LOAD_TRENDING_GIPHY_LIST_SUCCESS,
  ACTION_LOAD_TRENDING_GIPHY_LIST_ERROR,
} from 'redux/actions/giphy.js';

import makeAction from 'redux/utils.js';


// NOTE: passing giphyApiUrl to be able to use different base urls for trending vs. search.
async function fetchGiphyList(giphyApiUrl, queryString = '') {
  const giphyApiKey = process.env.REACT_APP_GIPHY_API_KEY;
  const apiUrlWithQueryString = giphyApiUrl + '/?' + queryString;

  console.log('>>> giphyApiKey', process.env);
  return await fetch(apiUrlWithQueryString, {
    method: 'GET',
    api_key: giphyApiKey,
  });
}

function* handleLoadTrendingGiphyListRequested(action) {
  yield put(makeAction(ACTION_LOAD_TRENDING_GIPHY_LIST_STARTED));
  try {
    // const data = yield call(fetch(url));

    const giphyApiUrl = process.env.REACT_APP_GIPHY_API_URL;

    const list = fetchGiphyList(giphyApiUrl, 'limit=10');

    console.log('>>> list', list);

    yield put(makeAction(ACTION_LOAD_TRENDING_GIPHY_LIST_SUCCESS, {
      list: list,
    }));
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
  yield all([
    fork(watchLoadTrendingGiphyListRequested, ...args),
  ]);
}

export default giphySaga;

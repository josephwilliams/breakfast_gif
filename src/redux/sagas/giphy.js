import {
  all,
  put,
  fork,
  // takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import superagent from 'superagent';

import {
  ACTION_LOAD_TRENDING_GIPHY_LIST_REQUESTED,
  ACTION_LOAD_TRENDING_GIPHY_LIST_STARTED,
  ACTION_LOAD_TRENDING_GIPHY_LIST_SUCCESS,
  ACTION_LOAD_TRENDING_GIPHY_LIST_ERROR,
} from 'redux/actions/giphy.js';

import makeAction from 'redux/utils.js';


// NOTE: passing giphyApiUrl to be able to use different base urls for trending vs. search.
async function fetchGiphyList(giphyApiUrl, queryString = '') {
  // TODO: This is sloppy. Clean this up. Pass query strings as options object with key/value pairs and then join them perhaps.
  const apiKeyQueryString = 'api_key=' + process.env.REACT_APP_GIPHY_API_KEY;
  const apiUrlWithQueryString = giphyApiUrl + '?' + apiKeyQueryString + '&limit=20';

  const res = await superagent.get(apiUrlWithQueryString);

  if (res.body && res.body.data) {
    return res.body.data;
  }
  else {
    throw new Error('Bad request; no data was received from giphy :(');
  }
}

function* handleLoadTrendingGiphyListRequested(action) {
  yield put(makeAction(ACTION_LOAD_TRENDING_GIPHY_LIST_STARTED));
  try {
    const giphyApiUrl = process.env.REACT_APP_GIPHY_API_URL;

    const list = yield fetchGiphyList(giphyApiUrl, 'limit=10');

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
  takeEvery allows concurrent fetches.

  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of data. If "ACTION_LOAD_TRENDING_GIPHY_LIST_REQUESTED" gets
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

import {
  all,
  put,
  fork,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import lodashGet from 'lodash/get';

import superagent from 'superagent';

import {
  ACTION_LOAD_GIPHY_LIST_REQUESTED,
  ACTION_LOAD_GIPHY_LIST_STARTED,
  ACTION_LOAD_GIPHY_LIST_SUCCESS,
  ACTION_LOAD_GIPHY_LIST_ERROR,

  ACTION_LOAD_GIPHY_SEARCH_RESULTS_LIST_REQUESTED,

  ACTION_ADD_GIF_TO_FAVORITES_REQUESTED,
  ACTION_ADD_GIF_TO_FAVORITES_STARTED,
  ACTION_ADD_GIF_TO_FAVORITES_SUCCESS,
  ACTION_ADD_GIF_TO_FAVORITES_ERROR,
} from 'redux/actions/giphy.js';

import makeAction from 'redux/utils.js';


async function fetchGiphyList({ searchInput, extraQueryStrings }) {
  // TODO: This is sloppy. Clean this up. Pass query strings as options object with key/value pairs and then join them perhaps.
  const queryType = !!searchInput ? 'search' : 'trending';
  const apiKeyQueryString = 'api_key=' + process.env.REACT_APP_GIPHY_API_KEY;

  let giphyApiUrl = process.env.REACT_APP_GIPHY_API_URL;

  // add query type (search or trending)
  giphyApiUrl += queryType;
  giphyApiUrl += '?';

  // add api_key
  giphyApiUrl += apiKeyQueryString;

  // add search input if is search
  if (searchInput) {
    giphyApiUrl += `&q=${searchInput}`;
  }

  // hard-coded 32 response limit
  giphyApiUrl += '&limit=32';

  // add any extra query strings
  if (extraQueryStrings) {
    giphyApiUrl += extraQueryStrings;
  }

  console.log('>>> giphyApiUrl', giphyApiUrl);

  const res = await superagent.get(giphyApiUrl);

  if (res.body && res.body.data) {
    return res.body.data;
  }
  else {
    throw new Error('Bad request; no data was received from giphy :(');
  }
}

function* handleLoadTrendingGiphyListRequested(action) {
  yield put(makeAction(ACTION_LOAD_GIPHY_LIST_STARTED));
  try {
    const searchInput = lodashGet(action, 'payload.searchInput');

    const list = yield fetchGiphyList({ searchInput });

    yield put(makeAction(ACTION_LOAD_GIPHY_LIST_SUCCESS, {
      list: list,
    }));
  } catch (error) {
    yield put(makeAction(ACTION_LOAD_GIPHY_LIST_ERROR, {
      error: error,
    }));
  }
}

function* handleAddGifToFavoritesRequested(action) {
  // NOTE: the _STARTED action could be used to prevent subsequent actions (i.e. clicks) that use same giphy ID, or to prevent the same id from being added to favorites list.
  // TODO: add checks for the above conditions, prevent continuation of saga if so.

  const gifId = action.payload.gifId;

  yield put(makeAction(ACTION_ADD_GIF_TO_FAVORITES_STARTED, {
    gifId: gifId,
  }));
  try {
    yield put(makeAction(ACTION_ADD_GIF_TO_FAVORITES_SUCCESS, {
      gifId: gifId,
    }));
  } catch (error) {
    yield put(makeAction(ACTION_ADD_GIF_TO_FAVORITES_ERROR, {
      error: error,
    }));
  }
}

/*
  from redux-saga docs:

  takeEvery allows concurrent fetches.

  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of data. If "ACTION_LOAD_GIPHY_LIST_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* watchLoadTrendingGiphyListRequested() {
  yield takeLatest(
    ACTION_LOAD_GIPHY_LIST_REQUESTED,
    handleLoadTrendingGiphyListRequested
  );
}

function* watchLoadGiphySearchResultsListRequested() {
  yield takeLatest(
    ACTION_LOAD_GIPHY_SEARCH_RESULTS_LIST_REQUESTED,
    handleLoadTrendingGiphyListRequested,
  );
}

function* watchAddGifToFavoritesRequested() {
  yield takeEvery(
    ACTION_ADD_GIF_TO_FAVORITES_REQUESTED,
    handleAddGifToFavoritesRequested
  );
}

function* giphySaga(...args) {
  yield all([
    fork(watchLoadTrendingGiphyListRequested, ...args),
    fork(watchAddGifToFavoritesRequested, ...args),
    fork(watchLoadGiphySearchResultsListRequested, ...args),
  ]);
}

export default giphySaga;

import {
  all,
  put,
  fork,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import lodashGet from 'lodash/get';

import Cookies from 'js-cookie';

import superagent from 'superagent';

import {
  ACTION_LOAD_GIPHY_LIST_REQUESTED,
  ACTION_LOAD_GIPHY_LIST_STARTED,
  ACTION_LOAD_GIPHY_LIST_SUCCESS,
  ACTION_LOAD_GIPHY_LIST_ERROR,

  ACTION_LOAD_GIPHY_SEARCH_RESULTS_LIST_REQUESTED,

  ACTION_ADD_GIF_TO_FAVORITES_REQUESTED,
  ACTION_LOAD_GIPHY_FAVORITES_LIST_REQUESTED,
} from 'redux/actions/giphy.js';

import makeAction from 'redux/utils.js';


async function fetchGiphyList({ searchInput, favoriteGifIds, extraQueryStrings }) {
  // TODO: This is sloppy. Clean this up. Pass query strings as options object with key/value pairs and then join them perhaps.

  let giphyApiUrl = process.env.REACT_APP_GIPHY_API_URL;

  // add query type (search, trending, or left blank for multi-gif query by ids)
  const queryType = !!searchInput ? '/search' : !!favoriteGifIds ? '' : '/trending';
  giphyApiUrl += queryType;

  // beginning of query strings
  giphyApiUrl += '?';

  // add api_key
  const apiKeyQueryString = 'api_key=' + process.env.REACT_APP_GIPHY_API_KEY;
  giphyApiUrl += apiKeyQueryString;

  // add favorite gif ids if on favorites page
  if (favoriteGifIds) {
    const favoriteGifIdsStr = favoriteGifIds.join(',');
    giphyApiUrl += `&ids=${favoriteGifIdsStr}`;
  }

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

  const res = await superagent.get(giphyApiUrl);

  if (res.body && res.body.data) {
    return res.body.data;
  }
  else {
    throw new Error('Bad request; no data was received from giphy :(');
  }
}

function* handleLoadGiphyListRequested(action) {
  yield put(makeAction(ACTION_LOAD_GIPHY_LIST_STARTED));
  try {
    const searchInput = lodashGet(action, 'payload.searchInput');
    const favoriteGifIds = lodashGet(action, 'payload.favoriteGifIds');

    const list = yield fetchGiphyList({ searchInput, favoriteGifIds });

    yield put(makeAction(ACTION_LOAD_GIPHY_LIST_SUCCESS, {
      list: list,
    }));
  } catch (error) {
    yield put(makeAction(ACTION_LOAD_GIPHY_LIST_ERROR, {
      error: error,
    }));
  }
}

function handleAddGifToFavoritesRequested(action) {
  const gifId = action.payload.gifId;

  const previousFavoriteGifIds = Cookies.get('favoriteGifIds');

  // TODO: consider setting try/catch block here and throwing error in case of following conditionals.

  // if no previous 'previousFavoriteGifIds' cookie set, create one.
  if (!previousFavoriteGifIds) {
    console.log('>> NO previousFavoriteGifIds');
    Cookies.set('favoriteGifIds', [gifId]);
  }

  // if gif id isn't already set, add it to cookie
  if (!Cookies.get('favoriteGifIds').includes(gifId)) {
    const updatedFavoriteGifIds = JSON.parse(previousFavoriteGifIds);
    updatedFavoriteGifIds.push(gifId);
    Cookies.set('favoriteGifIds', updatedFavoriteGifIds);
  }
}

function* handleLoadGiphyFavoritesListRequested() {
  const previousFavoriteGifIds = Cookies.get('favoriteGifIds');
  const previousFavoriteGifIdsParsed = JSON.parse(previousFavoriteGifIds);
  yield put(makeAction(ACTION_LOAD_GIPHY_LIST_REQUESTED, {
    favoriteGifIds: previousFavoriteGifIdsParsed,
  }));
}

function* watchLoadTrendingGiphyListRequested() {
  yield takeLatest(
    ACTION_LOAD_GIPHY_LIST_REQUESTED,
    handleLoadGiphyListRequested
  );
}

function* watchLoadGiphySearchResultsListRequested() {
  yield takeLatest(
    ACTION_LOAD_GIPHY_SEARCH_RESULTS_LIST_REQUESTED,
    handleLoadGiphyListRequested
  );
}

function* watchAddGifToFavoritesRequested() {
  yield takeEvery(
    ACTION_ADD_GIF_TO_FAVORITES_REQUESTED,
    handleAddGifToFavoritesRequested
  );
}

function* watchLoadGiphyFavoritesListRequested() {
  yield takeLatest(
    ACTION_LOAD_GIPHY_FAVORITES_LIST_REQUESTED,
    handleLoadGiphyFavoritesListRequested
  );
}

function* giphySaga(...args) {
  yield all([
    fork(watchLoadTrendingGiphyListRequested, ...args),
    fork(watchAddGifToFavoritesRequested, ...args),
    fork(watchLoadGiphySearchResultsListRequested, ...args),
    fork(watchLoadGiphyFavoritesListRequested, ...args),
  ]);
}

export default giphySaga;

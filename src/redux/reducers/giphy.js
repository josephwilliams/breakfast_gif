import {
  ACTION_LOAD_TRENDING_GIPHY_LIST_STARTED,
  ACTION_LOAD_TRENDING_GIPHY_LIST_SUCCESS,
  ACTION_LOAD_TRENDING_GIPHY_LIST_ERROR,

  ACTION_ADD_GIF_TO_FAVORITES_SUCCESS,
  ACTION_ADD_GIF_TO_FAVORITES_ERROR,
} from 'redux/actions/giphy.js';


// store key
export const STORE_KEY = 'giphy';

// initial state
const initialState = {
  list: [],
  isLoadingList: false,
  isLoadedList: false,
  listLoadError: null,

  favoriteGiphyGifsList: [],
  addToFavoritesError: null,
};

// state selectors
export function extractGiphyState(globalState) {
  return (globalState[STORE_KEY] || initialState);
}

export function extractGiphyStateIsLoadingList(globalState) {
  return extractGiphyState(globalState).isLoadingList;
}

export function extractGiphyStateListLoadError(globalState) {
  return extractGiphyState(globalState).isLoadingList;
}

export function extractGiphyStateList(globalState) {
  return extractGiphyState(globalState).list;
}

export function extractFavoriteGiphyGifsList(globalState) {
  return extractGiphyState(globalState).favoriteGiphyGifsList;
}

// reducer
function giphyReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_LOAD_TRENDING_GIPHY_LIST_STARTED:
      return {
        ...state,
        isLoadingList: true,
        isLoadedList: false,
        listLoadError: null,
      };

    case ACTION_LOAD_TRENDING_GIPHY_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload.list,
        isLoadingList: false,
        isLoadedList: true,
      };

    case ACTION_LOAD_TRENDING_GIPHY_LIST_ERROR:
      return {
        ...state,
        isLoadingList: false,
        isLoadedList: false,
        listLoadError: action.payload.error,
      };

    case ACTION_ADD_GIF_TO_FAVORITES_SUCCESS:
      return {
        ...state,
        favoriteGiphyGifsList: [
          ...state.favoriteGiphyGifsList,
          action.payload.giphyId,
        ],
        addToFavoritesError: null,
      }

    case ACTION_ADD_GIF_TO_FAVORITES_ERROR:
      return {
        ...state,
        addToFavoritesError: action.payload.error,
      }

    default:
      return state;
  }
}
 
export default giphyReducer;

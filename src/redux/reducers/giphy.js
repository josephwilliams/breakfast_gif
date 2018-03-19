import {
  ACTION_LOAD_TRENDING_GIPHY_LIST_STARTED,
  ACTION_LOAD_TRENDING_GIPHY_LIST_SUCCESS,
  ACTION_LOAD_TRENDING_GIPHY_LIST_ERROR,
} from 'redux/actions/giphy.js';


// store key
const STORE_KEY = 'GIPHY_STORE_KEY';

// initial state
const initialState = {
  list: [],
  isLoadingList: false,
  isLoadedList: false,
  listLoadError: null,
};

// state selectors
export function extractGiphyState(globalState) {
  return (globalState[STORE_KEY] || initialState);
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

    default:
      return state;
  }
}
 
export default giphyReducer;

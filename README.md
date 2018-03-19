# Breakfast Gif
### a simple frontend-only Giphy clone bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

> To start the app, please run `npm i && npm run start`.

## Features
### Home Page
The home page features a loading UI and instantiates a GET request to Giphy's API to return trending gifs.

### Search
The search input allows users to do a text-based search of Giphy gifs, returning those whose title includes the searched-for word.

### Favorites
After clicking on a gif from the grid/mosaic, users can add the selected gif to their favorites from within the displayed modal. The user's favorite gifs are saved in their browser cookies and can be viewed from the Favorites page.

## Mechanics
### Redux
I used redux to manage global state and to allow me to implement a sort of state flow that provides a few key features:
1. clear chronological delineation of action events (in development environment, logged via `redux-logger`)
2. connect global state to react components via `connect`, allowing implementation of loading and error UI (see `Grid` component)
3. easy setup with `redux-saga` to synchronize and observe asynchronous actions
```javascript
// the giphy reducer's actions, each of which updates the global state, which is propagated down to connected React components for conditional rendering (of data, loading UI, error UI, etc.)
function giphyReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_LOAD_GIPHY_LIST_STARTED:
      return {
        ...state,
        isLoadingList: true,
        isLoadedList: false,
        listLoadError: null,
      };

    case ACTION_LOAD_GIPHY_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload.list,
        isLoadingList: false,
        isLoadedList: true,
      };

    case ACTION_LOAD_GIPHY_LIST_ERROR:
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
```

### Redux-Sagas
Sagas are, like `thunks`, a way to turn redux actions into functions. Using generator functions with `yield` and `redux-sagas`'s provided actions provide a relatively straightforward way to instantiate event "sagas" or chains while setting certain permissions from the get-go, such as whether concurrent calls are allowed.

```javascript
// an example generator function that loads giphy data, calling redux actions along the way in a seemingly synchronous manner
function* handleLoadGiphyListRequested(action) {
  // start generator function
  // this could be used to set up loading UI, or to prevent subsequent similar calls from taking place, based on an isLoading/isStarted field
  yield put(makeAction(ACTION_LOAD_GIPHY_LIST_STARTED));
  try {
    const list = yield fetchGiphyList();

    // end function via SUCCESS or ERROR action
    yield put(makeAction(ACTION_LOAD_GIPHY_LIST_SUCCESS, {
      list: list,
    }));
  } catch (error) {
    yield put(makeAction(ACTION_LOAD_GIPHY_LIST_ERROR, {
      error: error,
    }));
  }
}
```

> Setting up `redux` with `redux-saga` would now allow me to easily build more features into the app. Although the setup was somewhat time-consuming, it's ultimately worth the effort for the ease of use moving forward.

### JS-Cookie
I used `JS-Cookie` to as a means to store selected favorite gif ids in the user's browser cookies:
```javascript
  Cookies.get('favoriteGifIds');
  Cookies.set('favoriteGifIds', [gifId]);
```
The `set` method above essentially sets a cookie key/value pair, turning the second argument into stringified JSON. Assuming a stringified array has been `set`, using the `get` method requires parsing the return value before utilizing it in the Giphy search API query.
```javascript
async function fetchGiphyList({ favoriteGifIds }) {
  // add favorite gif ids if on favorites page
  if (favoriteGifIds) {
    const favoriteGifIdsStr = favoriteGifIds.join(',');
    giphyApiUrl += `&ids=${favoriteGifIdsStr}`;
  }

  // make giphy api call with updated search query string
}
```


## TODO
* add pagination/infinite scroll on Home and Search pages! This could be done relatively easily with redux and a slightly improved `fetchGiphyList` function (see `redux/sagas/giphy`)
* add unit tests for various Giphy API functions, including different GETS (trending, search), and for pagination (utilizing `offset` and `limit` query strings)
* add a sort mechanism that allows user to sort by gif's upload time (ascending or descending)
* add a mechanism that allows user to search based on giphy rating (g, pg, r, etc.)
* improve the mosaic grid system!! The forced squares is an inelegant solution :( Giphy's site, however, is not mobile responsive

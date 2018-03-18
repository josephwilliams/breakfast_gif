import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// pages
import HomePage from 'pages/HomePage';
import FavoritesPage from 'pages/FavoritesPage';
import {
  ROUTE_HOME_PAGE,
  ROUTE_FAVORITES_PAGE,
} from 'pages/routes';

// redux router
import { Router, Route, browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'redux-simple-router';

// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducers from './redux/reducers';

// TODO: move this to yet unmade 'rootReducer' file in 'redux/reducers' as default export;
const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}));

// NOTE: See https://www.npmjs.com/package/redux-simple-router for basic setup of redux-simple-router
// NOTE: using react-router@3 for 'browserHistory'; see https://github.com/ReactTraining/react-router/issues/5263
// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore);

const store = createStoreWithMiddleware(reducer);

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store);

// TODO: add these pages; uncomment these routes.
const App = (
  <Provider store={store}>
    <Router history={browserHistory}>
      {/* <Route path={ROUTE_HOME_PAGE} component={HomePage}>
        <Route path={ROUTE_FAVORITES_PAGE} component={FavoritesPage} />
        */}
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(
  App,
  document.getElementById('root')
);

registerServiceWorker();

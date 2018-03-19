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

// react-router-dom
import { BrowserRouter as Router, Route } from 'react-router-dom';

// redux-saga
import createSagaMiddleware from 'redux-saga';

// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from 'redux/reducers';
import rootSaga from 'redux/sagas';

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

// then run the saga
sagaMiddleware.run(rootSaga);

const App = (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path={ROUTE_HOME_PAGE} component={HomePage} />
        <Route path={ROUTE_FAVORITES_PAGE} component={FavoritesPage} />
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(
  App,
  document.getElementById('root')
);

registerServiceWorker();

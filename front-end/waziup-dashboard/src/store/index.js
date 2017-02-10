import {compose, createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';


import createHistory from 'history/lib/createBrowserHistory';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createAppStore = composeEnhancers(
        applyMiddleware(thunkMiddleware),
      )(createStore);

export default function configureStore(initialState){
      const store = createAppStore(rootReducer, initialState);
      return store;
};


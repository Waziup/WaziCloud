import {compose, createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';


import createHistory from 'history/lib/createBrowserHistory';

const createAppStore = compose(
        applyMiddleware(thunkMiddleware),
      )(createStore);

export default function configureStore(initialState){
      const store = createAppStore(rootReducer, initialState);
      return store;
};


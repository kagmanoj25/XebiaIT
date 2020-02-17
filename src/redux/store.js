import {createStore, compose, applyMiddleware} from 'redux';
import reducer from './reducer';
import * as reduxLoop from 'redux-loop-symbol-ponyfill';
import middleware from './middleware/middleware';

const enhancers = [
  applyMiddleware(...middleware),
  reduxLoop.install(),
];

const composeEnhancers =
  (__DEV__ &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const enhancer = composeEnhancers(...enhancers);

const store = createStore(reducer, null, enhancer);
export default store;

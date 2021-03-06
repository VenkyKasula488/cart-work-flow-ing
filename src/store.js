import {
  createStore,
  applyMiddleware,
  compose as origCompose,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';
import app from './reducers/app.js';
import cart from './reducers/cart.js';

const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || origCompose;

/**
 * Store configuration
 */
export const store = createStore(
  (state, action) => state,
  compose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk)),
);

store.addReducers({
  app,
  cart,
});

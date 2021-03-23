import { UPDATE_LOCATION, RECEIVE_LAZY_RESOURCES } from '../actions/app.js';
import { createSelector } from 'reselect';

/**
 * App reducer - recieves the actions and updates the store
 * @param {Object} state
 * @param {Object} action
 * @returns
 */
const app = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return {
        ...state,
        page: action.page,
      };
    case RECEIVE_LAZY_RESOURCES:
      return {
        ...state,
        lazyResourcesLoaded: true,
      };

    default:
      return state;
  }
};

export default app;

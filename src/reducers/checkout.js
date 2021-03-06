import {
  UPDATE_CHECKOUT_STATE,
  SET_USER_ADDRESS,
} from '../actions/checkout.js';
import { UPDATE_LOCATION } from '../actions/app.js';

/**
 * Checkout reducer - recieves the actions and updates the store
 * @param {Object} state
 * @param {Object} action
 * @returns Updated stated
 */
const checkout = (state = {}, action) => {
  switch (action.type) {
    // Any navigation should reset the checkout form.
    case UPDATE_LOCATION:
      return {
        ...state,
        state: 'init',
      };
    case UPDATE_CHECKOUT_STATE:
      return {
        ...state,
        state: action.state,
      };
    case SET_USER_ADDRESS:
      return {
        ...state,
        address: action.address,
      };
    default:
      return state;
  }
};

export default checkout;

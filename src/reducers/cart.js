import { SET_CART, REMOVE_FROM_CART } from '../actions/cart.js';
import { createSelector } from 'reselect';

/**
 * Cart reducer - recieves the actions and updates the store
 * @param {Object} state
 * @param {Object} action
 * @returns Updated stated
 */
const cart = (state = {}, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        ...action.cart,
      };
    case REMOVE_FROM_CART:
      const result = { ...state };
      const basketData = result.basket;
      const filteredItems = basketData.filter((item) => {
        return action.skuId !== item.skuId;
      });
      const finalItems = { ...state, ...{ basket: filteredItems } };
      return finalItems;
    default:
      return state;
  }
};

export default cart;

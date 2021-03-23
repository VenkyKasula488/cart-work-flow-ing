import { SET_CART, REMOVE_FROM_CART } from '../actions/cart.js';
import { createSelector } from 'reselect';

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
      console.log('RR : ', basketData, action.skuId);
      const finalResult = basketData.filter((item) => {
        return action.skuId !== item.skuId;
      });
      const hh = { ...state, ...{ basket: finalResult } };
      console.log('finalResult :', hh);
      return hh;
    default:
      return state;
  }
};

export default cart;

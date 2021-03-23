export const SET_CART = 'SET_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
/**
 * Action for setting the cart
 * @param {Object} cart
 * @returns SET_CART action
 */
export const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

/**
 * Fetch list of tems to be displayed
 * @returns
 */
export const fetchCategoriesIfNeeded = () => (dispatch, getState) => {
  // This can be dispatched async if needed (e.g. after a fetch() request).
  return new Promise((resolve) => {
    return fetch(`data/list_of_items.json`)
      .then((res) => res.json())
      .then((items) => {
        dispatch(setCart(items));
        resolve();
      })
      .catch(() => console.log('Got Error'));
  });
};
/**
 * Remove "item from the cart" action
 * @param {Object} param0
 * @returns REMOVE_FROM_CART action
 */
export const removeFromCart = ({ skuId }) => (dispatch) => {
  console.log('entry ', skuId);
  dispatch({
    type: REMOVE_FROM_CART,
    skuId,
  });
};

export const UPDATE_CHECKOUT_STATE = 'UPDATE_CHECKOUT_STATE';
export const SET_USER_ADDRESS = 'SET_USER_ADDRESS';

/**
/**
 * Update "check out state" action
 * @param {Object} state
 * @returns
 */
export const updateCheckoutState = (state) => {
  return {
    type: UPDATE_CHECKOUT_STATE,
    state,
  };
};

/**
 * Action for setting the cart
 * @param {Object} cart
 * @returns SET_CART action
 */
export const setUserAddress = (address) => {
  return {
    type: SET_USER_ADDRESS,
    address,
  };
};

/**
 * Fetch user address
 * @returns
 */
export const fetchUserAddress = () => (dispatch, getState) => {
  // This can be dispatched async if needed (e.g. after a fetch() request).
  return new Promise((resolve) => {
    return fetch(`data/user_address.json`)
      .then((res) => res.json())
      .then((addressData) => {
        dispatch(setUserAddress(addressData));
        resolve();
      })
      .catch(() => console.log('Got Error'));
  });
};

export const UPDATE_CHECKOUT_STATE = 'UPDATE_CHECKOUT_STATE';
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

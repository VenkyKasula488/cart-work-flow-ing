import { setCart } from './actions/cart.js';

const CART_LOCAL_STORAGE_KEY = 'shop-cart-data';

function getLocalCartData() {
  const localCartData = localStorage.getItem(CART_LOCAL_STORAGE_KEY);
  try {
    return JSON.parse(localCartData) || {};
  } catch (e) {
    return {};
  }
}

export function installCart(store) {
  function handleStorageEvent(event) {
    if (event == null || document.hidden) {
      store.dispatch(setCart(getLocalCartData()));
    }
  }
  window.addEventListener('storage', handleStorageEvent);
  handleStorageEvent();

  store.subscribe(() => {
    const state = store.getState();
    // Setting localStorage does not cause another storage event on same window.
    localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(state.cart));
  });
}

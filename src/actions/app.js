import { fetchCategoriesIfNeeded } from './cart.js';

export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const RECEIVE_LAZY_RESOURCES = 'RECEIVE_LAZY_RESOURCES';

/**
 * Show 404 for invalid page
 */

export const reloadCategory = () => async (dispatch, getState) => {
  let state = getState();
  const page = state.app.page;
  if (['cart', 'checkout', 'payment', 'confirmation'].indexOf(page) >= 0) {
    return;
  }
  dispatch({
    type: UPDATE_LOCATION,
    page: '404',
  });
};

/**
 * Route the pages per the location recieved
 * @param {String} location - Page location/url
 * @returns
 */
export const updateLocation = (location) => async (dispatch, getState) => {
  const path = window.decodeURIComponent(location.pathname);
  const splitPath = (path || '').slice(1).split('/');
  let page = splitPath[0];
  await dispatch(fetchCategoriesIfNeeded());
  switch (page) {
    case '':
    case 'cart':
      page = 'cart';
      await import('../components/shop-cart.js');
      break;
    case 'checkout':
      await import('../components/shop-checkout.js');
      break;
    case 'payment':
      await import('../components/shop-payment.js');
      break;
    case 'confirmation':
      await import('../components/shop-confirmation.js');
      break;
    default:
      page = '404';
  }

  dispatch({
    type: UPDATE_LOCATION,
    page,
  });

  await dispatch(reloadCategory());

  const lazyLoadComplete = getState().app.lazyResourcesLoaded;
  // Load lazy resources after render and set `lazyLoadComplete` when done.
  if (!lazyLoadComplete) {
    requestAnimationFrame(async () => {
      await import('../components/lazy-resources.js');
      dispatch({
        type: RECEIVE_LAZY_RESOURCES,
      });
    });
  }
};

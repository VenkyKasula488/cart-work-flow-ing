// shop-app
import '@polymer/app-layout/app-drawer/app-drawer.js';

// shop-list
// shop-detail
import './shop-404.js';

// shop-cart
import './shop-cart-item.js';

import './progress-step.js';
import './cart-button-controls.js';
import './checkout-button-controls.js';
import './payment-button-controls.js';

import { store } from '../store.js';
import { installCart } from '../cart.js';
import cart from '../reducers/cart.js';

store.addReducers({
  cart,
});
installCart(store);

import { PageViewElement } from './page-view-element.js';
import { html } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';
import { shopButtonStyle } from './shop-button-style.js';
import { shopCheckboxStyle } from './shop-checkbox-style.js';
import { shopCommonStyle } from './shop-common-style.js';
import { shopFormStyle } from './shop-form-style.js';
import { shopInputStyle } from './shop-input-style.js';
import { shopSelectStyle } from './shop-select-style.js';
import { store } from '../store.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { updateCheckoutState } from '../actions/checkout.js';
import checkout from '../reducers/checkout.js';
import '@lion/form/lion-form.js';
import '@lion/input/lion-input.js';
import '@lion/select/lion-select.js';

store.addReducers({
  checkout,
});

class ShopPayment extends connect(store)(PageViewElement) {
  render() {
    const cartList = this._cart || [];
    const basketSummary = this._basketSummary;
    const stepListItems = [
      { name: 'Basket', progress: 'done' },
      { name: 'Delivery', progress: 'done' },
      { name: 'Payment', progress: 'active' },
      { name: 'Confirmation', progress: '' },
    ];
    return html` ${shopButtonStyle} ${shopCheckboxStyle} ${shopCommonStyle}
      ${shopFormStyle} ${shopInputStyle} ${shopSelectStyle}
      <style>
        .main-frame {
          transition: opacity 0.5s;
        }
        h2 {
        }

        shop-input,
        shop-select {
          font-size: 16px;
        }

        shop-select {
          margin-bottom: 20px;
        }

        .billing-address-picker {
          margin: 28px 0;
          height: 20px;
          display: flex;
        }

        .billing-address-picker > label {
          margin-left: 12px;
        }

        .grid {
          margin-top: 40px;
          display: flex;
        }

        .grid > section {
          flex: 1;
        }

        .grid > section:not(:first-child) {
          margin-left: 80px;
        }

        .row {
          display: flex;
          align-items: flex-end;
        }

        .column {
          display: flex;
          flex-direction: column;
        }

        .row > .flex,
        .input-row > * {
          flex: 1;
        }

        .input-row > *:not(:first-child) {
          margin-left: 8px;
        }

        .shop-select-label {
          line-height: 20px;
        }
        .total-summary {
          font-weight: bold;
          margin-top: 10px;
        }
        .product-name,
        .product-price {
          margin-top: 5px;
        }
        @media (max-width: 767px) {
          .grid {
            display: block;
            margin-top: 0;
          }

          .grid > section:not(:first-child) {
            margin-left: 0;
          }
        }
      </style>

      <div class="main-frame">
        ${this._state === 'init'
          ? html`
              <div state="init">
                <lion-form>
                  <form id="checkoutForm">
                    ${cartList.length === 0
                      ? html` <div class="subsection">
                          <p class="empty-cart">
                            Your <iron-icon icon="shopping-cart"></iron-icon> is
                            empty.
                          </p>
                        </div>`
                      : html`
                          <progress-step .stepListItems="${stepListItems}">
                          </progress-step>
                          <header class="subsection">
                            <h1>Payment Section</h1>
                          </header>

                          <div class="subsection grid">
                            <section>
                              <h2>Payment Method</h2>
                              <div class="row input-row">
                                <lion-input
                                  type="text"
                                  id="ccName"
                                  name="ccName"
                                  pattern=".{3,}"
                                  label="Cardholder Name"
                                ></lion-input>
                              </div>
                              <div class="row input-row">
                                <lion-input
                                  type="tel"
                                  id="ccNumber"
                                  name="ccNumber"
                                  pattern="[\\d\\s]{15,}"
                                  label="Card Number"
                                  required
                                  autocomplete="cc-number"
                                ></lion-input>
                              </div>
                              <div class="row input-row">
                                <div class="column">
                                  <label for="ccExpMonth">Expiry</label>
                                  <lion-select name="ccExpMonth">
                                    <select
                                      slot="input"
                                      id="ccExpMonth"
                                      name="ccExpMonth"
                                      required
                                      autocomplete="cc-exp-month"
                                      aria-label="Expiry month"
                                    >
                                      <option value="01" selected>Jan</option>
                                      <option value="02">Feb</option>
                                      <option value="03">Mar</option>
                                      <option value="04">Apr</option>
                                      <option value="05">May</option>
                                      <option value="06">Jun</option>
                                      <option value="07">Jul</option>
                                      <option value="08">Aug</option>
                                      <option value="09">Sep</option>
                                      <option value="10">Oct</option>
                                      <option value="11">Nov</option>
                                      <option value="12">Dec</option>
                                    </select>
                                  </lion-select>
                                </div>
                                <lion-select name="ccExpYear">
                                  <select
                                    slot="input"
                                    id="ccExpYear"
                                    name="ccExpYear"
                                    required
                                    autocomplete="cc-exp-year"
                                    aria-label="Expiry year"
                                  >
                                    <option value="2016" selected>2016</option>
                                    <option value="2017">2017</option>
                                    <option value="2018">2018</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                  </select>
                                </lion-select>
                                <lion-input
                                  type="tel"
                                  id="ccCVV"
                                  name="ccCVV"
                                  pattern="\\d{3,4}"
                                  placeholder="CVV"
                                  required
                                  autocomplete="cc-csc"
                                ></lion-input>
                              </div>
                              <h2>Order Summary</h2>
                              ${repeat(
                                cartList,
                                (entry) => html`
                                  <div class="row order-summary-row">
                                    <div class="flex product-name">
                                      ${entry.title}
                                    </div>
                                    <div class="product-price">
                                      $${(entry.quantity * entry.price).toFixed(
                                        2,
                                      )}
                                    </div>
                                  </div>
                                `,
                              )}
                              <div class="row total-row">
                                <div class="flex total-summary">Total</div>
                                <div class="total-summary">
                                  $${basketSummary.price.toFixed(2)}
                                </div>
                              </div>

                              <payment-button-controls>
                              </payment-button-controls>
                            </section>
                          </div>
                        `}
                  </form>
                </lion-form>
              </div>
            `
          : this._state === 'success'
          ? html` <!-- Success message UI -->
              <header state="success">
                <h1>Thank you</h1>
                <p>${this._response.successMessage}</p>
                <shop-button responsive>
                  <a href="/">Finish</a>
                </shop-button>
              </header>`
          : html`
              <!-- Error message UI -->
              <header state="error">
                <h1>We couldn't process your order</h1>
                <p id="errorMessage">${this._response.errorMessage}</p>
                <shop-button responsive>
                  <input
                    type="button"
                    @click="${this._resetCheckoutForm}"
                    value="Try Again"
                  />
                </shop-button>
              </header>
            `}
      </div>`;
  }

  static get properties() {
    return {
      /**
       * The total price of the contents in the user's cart.
       */
      _total: { type: Number },

      /**
       * The state of the form. Valid values are:
       * `init`, `success` and `error`.
       */
      _state: { type: String },

      /**
       * The cart contents.
       */
      _cart: { type: Object },
    };
  }

  stateChanged(state) {
    this._cart = state.cart.basket;
    this._state = state.checkout.state;
    this._basketSummary = state.cart.basketSummary;
  }

  /**
   * Validates the form's inputs and adds the `aria-invalid` attribute to the inputs
   * that don't match the pattern specified in the markup.
   */
  _validateForm(form) {
    let firstInvalid = false;

    for (
      let el, i = 0;
      (el = form.elements[i]), i < form.elements.length;
      i++
    ) {
      if (el.checkValidity()) {
        el.removeAttribute('aria-invalid');
      } else {
        if (!firstInvalid) {
          // announce error message
          if (el.nextElementSibling) {
            console.log('error-message');
          }
          if (el.scrollIntoViewIfNeeded) {
            // safari, chrome
            el.scrollIntoViewIfNeeded();
          } else {
            // firefox, edge, ie
            el.scrollIntoView(false);
          }
          el.focus();
          firstInvalid = true;
        }
        el.setAttribute('aria-invalid', 'true');
      }
    }
    return !firstInvalid;
  }

  _resetCheckoutForm() {
    store.dispatch(updateCheckoutState('init'));
  }
}

customElements.define('shop-payment', ShopPayment);

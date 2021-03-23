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

class ShopCheckout extends connect(store)(PageViewElement) {
  render() {
    const cartList = this._cart || [];
    const stepListItems = [
      { name: 'Basket', progress: 'done' },
      { name: 'Delivery', progress: 'active' },
      { name: 'Payment', progress: '' },
      { name: 'Confirmation', progress: '' },
    ];
    return html` ${shopButtonStyle} ${shopCheckboxStyle} ${shopCommonStyle}
      ${shopFormStyle} ${shopInputStyle} ${shopSelectStyle}
      <style>
        .main-frame {
          transition: opacity 0.5s;
        }

        lion-input,
        lion-select,
        .shop-select-label {
          font-size: 16px;
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
        .input-row,
        .input-column {
          padding-top: 10px;
        }

        .input-row > *:not(:first-child) {
          margin-left: 8px;
        }

        .shop-select-label {
          line-height: 20px;
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
              <progress-step
                  .stepListItems="${stepListItems}">
              </progress-step>

              <header class="subsection">
                <h1>Delivery Address </h1>
              </header>

              <div class="subsection grid">
                <section>
                  <h2 id="accountInfoHeading">Account Information</h2>
                  <div class="row input-row">
                    <lion-input name="firstName" label="First Name"></lion-input>
                  </div>
                  <div class="row input-row">
                    <lion-input type="tel" id="accountPhone" name="accountPhone"
                    pattern="\\d{10,}" label="Phone Number">
                    </lion-input>
                  </div>
                  <h2 id="shipAddressHeading">Shipping Address</h2>
                  <div class="row input-row">
                    <lion-input type="text" id="shipAddress" name="shipAddress"
                    pattern=".{5,}" label="Address">
                    </lion-input>
                  </div>
                  <div class="row input-row">
                    <lion-input type="text" id="shipCity" name="shipCity" pattern=".{2,}" label="City">
                    </lion-input>
                  </div>
                  <div class="row input-row">
                    <lion-input type="text" id="shipState" name="shipState" pattern=".{2,}" label="State/Province">
                    </lion-input>
                    <lion-input type="text" id="shipZip" name="shipZip" pattern=".{4,}" label="Zip/Postal Code">
                    </lion-input>
                  </div>
                  <div class="column input-column">
                    <label id="shipCountryLabel" class="shop-select-label">Country</label>
                    <lion-select name="shipCountry">
                      <select slot="input" id="shipCountry" name="shipCountry" required
                          aria-labelledby="shipCountryLabel shipAddressHeading">
                        <option value="US" selected>United States</option>
                        <option value="CA">Canada</option>
                      </select>
                    </lion-select>
                  </div>
                  <h2 id="billAddressHeading">Billing Address</h2>
                  <div class="billing-address-picker">
                    <shop-checkbox>
                      <input type="checkbox" id="setBilling" name="setBilling"
                          .checked="${this._hasBillingAddress}"
                          @change="${this._toggleBillingAddress}">
                      <shop-md-decorator></shop-md-decorator aria-hidden="true">
                    </shop-checkbox>
                    <label for="setBilling">Use different billing address</label>
                  </div>
                  ${
                    this._hasBillingAddress
                      ? html`
                          <div class="row input-row">
                            <lion-input
                              type="text"
                              id="billAddress"
                              name="billAddress"
                              pattern=".{5,}"
                              label="Address"
                            >
                            </lion-input>
                          </div>
                          <div class="row input-row">
                            <lion-input
                              type="text"
                              id="billCity"
                              name="billCity"
                              pattern=".{2,}"
                              label="City"
                            >
                            </lion-input>
                          </div>
                          <div class="row input-row">
                            <lion-input
                              type="text"
                              id="billState"
                              name="billState"
                              pattern=".{2,}"
                              label="State/Province"
                            >
                            </lion-input>

                            <lion-input
                              type="text"
                              id="billZip"
                              name="billZip"
                              pattern=".{4,}"
                              label="Zip/Postal Code"
                            >
                            </lion-input>
                          </div>
                          <div class="column input-column">
                            <label
                              id="billCountryLabel"
                              class="shop-select-label"
                              >Country</label
                            >
                            <lion-select name="billCountry">
                              <select
                                slot="input"
                                id="billCountry"
                                name="billCountry"
                                required="${this._hasBillingAddress}"
                                autocomplete="billing country"
                                aria-labelledby="billCountryLabel billAddressHeading"
                              >
                                <option value="US" selected>
                                  United States
                                </option>
                                <option value="CA">Canada</option>
                              </select>
                              <shop-md-decorator aria-hidden="true">
                                <shop-underline></shop-underline>
                              </shop-md-decorator>
                            </lion-select>
                          </div>
                        `
                      : null
                  }
                  <checkout-button-controls> </checkout-button-controls>
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

      /**
       * If true, the user must enter a billing address.
       */
      _hasBillingAddress: { type: Boolean },
    };
  }

  stateChanged(state) {
    this._cart = state.cart.basket;
    this._state = state.checkout.state;
  }

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
            store.dispatch(
              announceLabel(
                el.nextElementSibling.getAttribute('error-message'),
              ),
            );
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

  _toggleBillingAddress(e) {
    this._hasBillingAddress = e.target.checked;

    if (this._hasBillingAddress) {
      this.updateComplete.then(() => {
        this.shadowRoot.querySelector('#billAddress').focus();
      });
    }
  }

  _resetCheckoutForm() {
    store.dispatch(updateCheckoutState('init'));
  }
}

customElements.define('shop-checkout', ShopCheckout);

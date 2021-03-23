import { LitElement, html } from 'lit-element';
import './shop-image.js';
import { store } from '../store.js';
import '@polymer/paper-icon-button';
import '@lion/input-stepper/lion-input-stepper.js';
import '@lion/icon/lion-icon.js';
import './shop-icons.js';
import { removeFromCart } from '../actions/cart.js';

class ShopCartItem extends LitElement {
  render() {
    const entry = this.entry;
    return html` <style>
        :host {
          display: flex;
          position: relative;
          margin-bottom: 24px;
        }

        shop-image {
          width: 72px;
          height: 72px;
        }

        .quantity > shop-select > select {
          font-size: 16px;
          padding-left: 40px;
        }

        .quantity > shop-select > shop-md-decorator {
          font-size: 12px;
          border: none;
        }

        .name {
          flex: auto;
          line-height: 20px;
          font-weight: 500;
          float: left;
          min-width: 250px;
          margin-top: 26px;
          margin-right: 10px;
        }
        .flex .name {
          min-width: 250px;
        }

        .name a {
          display: inline-block;
          max-width: 100%;
          text-decoration: none;
          color: var(--app-primary-color);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .price,
        .size {
          display: inline-block;
          white-space: nowrap;
          color: var(--app-secondary-color);
        }

        .size {
          min-width: 70px;
          width: 144px;
        }

        .size > span {
          margin-left: 10px;
        }

        .price {
          min-width: 70px;
          width: 100px;
          padding-left: 10px;
          padding-top: 20px;
          display: flex;
        }

        /*.quantity {
          min-width: 80px;
          width: 160px;
        }*/

        .flex {
          display: flex;
          flex: auto;
          margin-left: 10px;
        }
        lion-input-stepper input {
          width: 30px;
        }
        .detail {
          display: flex;
          align-items: center;
          margin-top: 26px;
          margin-right: 30px;
          height: 20px;
        }

        @media (max-width: 767px) {
          .flex {
            flex-direction: column;
            margin-left: 10px;
          }

          .name {
            margin-top: 16px;
            margin-right: 0;
            width: calc(100% - 40px);
          }

          .detail {
            align-self: flex-end;
            margin: 10px 10px 0 0;
          }

          .quantity,
          .size,
          .price {
            text-align: right;
            width: auto;
          }

          .delete-button {
            top: 8px;
          }
        }

        @media (max-width: 360px) {
          .name {
            margin-top: 0;
          }

          .detail {
            flex-direction: column;
            align-items: flex-start;
            align-self: flex-start;
            height: auto;
            margin-top: 0;
          }

          .quantity,
          .size,
          .price {
            text-align: left;
            width: auto;
          }
        }
      </style>

      ${entry
        ? html`
            <a
              href="/detail/${entry.fulfillmentType}/${entry.title}"
              title="${entry.title}"
            >
              <shop-image
                src="${entry.mediaUrl}"
                alt="${entry.title}"
              ></shop-image>
            </a>
            <div class="name">
              <a href="/detail/${entry.fulfillmentType}/${entry.title}"
                >${entry.title}</a
              >
            </div>
            <div class="flex">
              <div class="name">
                <a href="/detail/${entry.fulfillmentType}/${entry.title}"
                  >${entry.deliveryTime}</a
                >
              </div>
              <div class="detail">
                <div class="quantity">
                  <lion-input-stepper
                    max="${entry.availableStock}"
                    min="0"
                    name="count"
                    .modelValue=${entry.quantity}
                  >
                    <label slot="label">Qty:</label>
                  </lion-input-stepper>
                </div>
                <div class="price">$${entry.price.toFixed(2)}</div>
                <paper-icon-button
                  class="delete-button"
                  icon="close"
                  aria-label="Delete item ${entry.title}"
                  @click="${this._removeItem}"
                ></paper-icon-button>
              </div>
            </div>
          `
        : null}`;
  }

  static get properties() {
    return {
      entry: { type: Object },
    };
  }

  _removeItem() {
    store.dispatch(
      removeFromCart({
        skuId: this.entry.skuId,
      }),
    );
  }
}

customElements.define('shop-cart-item', ShopCartItem);

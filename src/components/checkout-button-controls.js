import { LitElement, html } from 'lit-element';
import { shopButtonStyle } from './shop-button-style.js';

class CheckoutButtonControls extends LitElement {
  render() {
    return html` ${shopButtonStyle}
      <style>
        :host {
          display: block;
          text-align: right;
          padding-top: 20px;
          color: var(--app-secondary-color);
        }
        lion-button {
          min-width: 100px;
          display: inline-flex;
          box-sizing: border-box;
          justify-content: center;
          vertical-align: middle;
        }
      </style>
      <div class="button-controllers">
        <lion-button @click=${(ev) => (window.location = '/cart')}>
          Previous
        </lion-button>
        <lion-button @click=${(ev) => (window.location = '/payment')}>
          Next
        </lion-button>
      </div>`;
  }
}

customElements.define('checkout-button-controls', CheckoutButtonControls);

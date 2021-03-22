import { LitElement, html } from 'lit-element';
import { shopButtonStyle } from './shop-button-style.js';

class PaymentButtonControls extends LitElement {
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
        .button-controllers {
          padding-top: 30px;
        }
      </style>
      <div class="button-controllers">
        <lion-button @click=${(ev) => (window.location = '/checkout')}>
          Previous
        </lion-button>
        <lion-button @click=${(ev) => (window.location = '/confirmation')}>
          Next
        </lion-button>
      </div>`;
  }
}

customElements.define('payment-button-controls', PaymentButtonControls);

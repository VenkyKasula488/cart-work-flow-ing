import { LitElement, html } from 'lit-element';
import { shopButtonStyle } from './shop-button-style.js';
import '@lion/button/lion-button.js';

class CartButtonControls extends LitElement {
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
          Next
        </lion-button>
      </div>`;
  }
}

customElements.define('cart-button-controls', CartButtonControls);

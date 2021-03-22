import { LitElement, html } from 'lit-element';
import { shopButtonStyle } from './shop-button-style.js';
import { shopFormStyle } from './shop-form-style.js';

class ShopConfirmation extends LitElement {
  render() {
    const stepListItems = [
      { name: 'Basket', progress: 'done' },
      { name: 'Delivery', progress: 'done' },
      { name: 'Payment', progress: 'done' },
      { name: 'Confirmation', progress: 'active' },
    ];
    return html` ${shopButtonStyle} ${shopFormStyle}
      <style>
        :host {
          display: block;
          text-align: center;
          color: var(--app-secondary-color);
        }

        h1 {
          margin: 50px 0 50px 0;
          font-weight: 300;
        }
      </style>
      <div class="main-frame">
        <progress-step .stepListItems="${stepListItems}"> </progress-step>
        <div>
          <h1>Thanks for the order</h1>
        </div>

        <lion-button @click=${(ev) => (window.location = '/')}>
          Go to the home page
        </lion-button>
      </div>`;
  }
}

customElements.define('shop-confirmation', ShopConfirmation);

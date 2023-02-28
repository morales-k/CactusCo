import React, { useState} from 'react'
import { useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import Address from './Address';
import Confirmation from './Confirmation';

function Checkout() {
  const [sameAdd, toggleSameAdd] = useState(true);
  const [confirmation, toggleConfirmation] = useState(false);
  const state = useSelector(state => state);

  // Verifies form inputs before submission.
  function verifyInput(inputId, el) {
    const spacePattern = new RegExp(/\s/);
    const emailPattern = new RegExp(/^\w+([\.\-\+]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    const inputValue = el.value.trim();
    el.className = '';

    switch (inputId) {
      case 'shipName':
      case 'billName':
      case 'cardName':
      case 'shipStreet':
      case 'billStreet':
        if (!spacePattern.test(inputValue)) {
          el.className = 'error';
        }
        break;
      case 'shipCity':
      case 'billCity':
        if (inputValue.length < 2) {
          el.className = 'error';
        }
        break;
      case 'shipState':
      case 'billState':
        if (inputValue === "") {
          el.className = 'error';
        }
        break;
      case 'shipZip':
      case 'billZip':
        if (inputValue.length !== 5) {
          el.className = 'error';
        }
        break;
      case 'shipPhone':
      case 'billPhone':
        const rawPhone = inputValue.replace(/_/g, "");
        if (rawPhone.length < 14) {
          el.className = 'error';
        }
        break;
      case 'shipEmail':
      case 'billEmail':
        if (!emailPattern.test(inputValue)) {
          el.className = 'error';
        }
        break;
      case 'cardNumber':
        if (inputValue.length < 19) {
          el.className = 'error';
        }
        break;
      case 'cvc':
        if (inputValue.length < 3) {
          el.className = 'error';
        }
        break;
      case 'expiration':
        if (inputValue.length < 5) {
          el.className = 'error';
        }
        break;
      default:
        break;
    }
  }

  // Passes form elements to verifyInput.
  function placeOrder() {
    const form = document.getElementById('checkoutForm');
    const elements = form.elements;
    let verified = true;

    Object.keys(elements).map(el => {
      let inputId = elements[el].id;

      if (elements[el].type !== "fieldset" && 
          elements[el].type !== "button" && 
          elements[el].type !== "checkbox") {
          verifyInput(inputId, elements[el]);
      }
    });

    // Submit form if no inputs contain errors after verification.
    Object.keys(elements).map(el => {
      if (elements[el].className.includes('error')) {
        verified = false;
      }
    });

    if (verified) {
      toggleConfirmation(true);
    }
  }

  return (
    <div className={state.display.displayCheckout ? 'checkout' : 'hidden'}>
      <h1>Checkout</h1>
      <form id="checkoutForm" name="checkout" action="">
        <fieldset>
          <legend>Shipping Address</legend>
          <Address type="ship" />
        </fieldset>
        <fieldset>
          <legend>Billing Address</legend>
          <div className="form-row sm-width">
            <label htmlFor="bill">Same as shipping</label>
            <input id="bill" type="checkbox" checked={sameAdd} onChange={() => toggleSameAdd(!sameAdd)} required></input>
          </div>
          {
            sameAdd ? null : 
            <Address type="bill" />
          }
        </fieldset>
        <fieldset>
          <legend>Payment Information</legend>
          <label htmlFor="cardName">Name on Card</label>
          <input id="cardName" type="text" min="1" max="100" placeholder="Jane C. Doe" required />
          <label htmlFor="cardNumber">Card Number</label>
          <NumberFormat id="cardNumber" format="####-####-####-####" placeholder="1234-1234-1234-1234" required />
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="cvc">CVC</label>
              <NumberFormat id="cvc" format="###" placeholder="123" required />
            </div>
            <div className="form-col">
              <label htmlFor="expiration">Expires</label>
              <NumberFormat id="expiration" format="##/##" placeholder="MM/YY" required />
            </div>
          </div>
        </fieldset>
        <button type="button" className="color-btn" onClick={() => placeOrder()}>Place Order</button>
      </form>
      <Confirmation confirmation={confirmation} />
    </div>
  )
}

export default Checkout
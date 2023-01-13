import React from 'react';
import { useAppDispatch } from '../../store';
import { gameActions } from '../../store/reducer/cartGamesReducer';
import './purchaseFormModule.scss';
import mastercard from './../../static/mastercard.png';
import visa from './../../static/visa.png';
import discover from './../../static/discover-card.png';
import gold from './../../static/pile-of-gold.png';
import toggleElementDisplay from '../../helperFunctions/displayToggler';
import * as valFns from '../../helperFunctions/formValidator';
import * as types from './../../staticData/baseTypes';

function PurchaseFormModule({ setCounter }: types.setCounter) {
  const dispatch = useAppDispatch();
  const clearCart = (): void => {
    dispatch(gameActions.clearCart());
  };

  return (
    <div className="pchs-module hidden dissolved">
      <img className="pchs-module__gold" src={gold} />
      <button
        type="button"
        className="pchs-module__close-btn"
        onClick={() => {
          toggleElementDisplay('.pchs-module');
          toggleElementDisplay('.pchs-module-overlay');
          document.body.style.overflow = 'visible';
        }}
      ></button>
      <p className="pchs-module__header">Checkout</p>
      <p className="pchs-module__message">
        Please, enter your details and choose payment method
      </p>
      <form className="pchs-form">
        <div className="pchs-form__field">
          <label htmlFor="customer-name">Full name</label>
          <input
            className="form-field"
            type="text"
            name="customer-name"
            maxLength={40}
            id="customer-name"
            onChange={(e) => valFns.nameInitialValidator(e)}
          />
          <span className="form-error-msg error-msg__name hidden">
            Enter your name correctly
          </span>
        </div>
        <div className="pchs-form__field">
          <label htmlFor="customer-number">Phone Number</label>
          <input
            className="form-field"
            type="text"
            name="customer-number"
            maxLength={30}
            id="customer-number"
          />
          <span className="form-error-msg error-msg__number hidden">
            Enter phone number correctly
          </span>
        </div>
        <div className="pchs-form__field">
          <label htmlFor="customer-address">Shipping Address</label>
          <input
            className="form-field"
            type="text"
            name="customer-address"
            maxLength={100}
            id="customer-address"
          />
          <span className="form-error-msg error-msg__address hidden">
            Enter address correctly
          </span>
        </div>
        <div className="pchs-form__field">
          <label htmlFor="customer-email">E-mail</label>
          <input
            className="form-field"
            type="text"
            name="customer-email"
            maxLength={40}
            id="customer-email"
          />
          <span className="form-error-msg error-msg__email hidden">
            Enter email correctly
          </span>
        </div>
        <p className="pchs-form__payment-header">Payment Method</p>
        <div className="pchs-form__field">
          <label htmlFor="customer-card">Bank card number</label>
          <input
            className="form-field"
            type="text"
            name="customer-card"
            id="customer-card"
            maxLength={19}
            onChange={(e) => valFns.cardNumberInitialValidator(e)}
          />
          <span className="form-error-msg error-msg__card hidden">
            Use the cards that start with 4, 5 or 6
          </span>
        </div>
        <div className="bank-system">
          <p className="bank-system__label">Chosen system</p>
          <img
            className="bank-system__sys-img system-visa"
            src={visa}
            alt="visa logo"
            data-num={4}
          />
          <img
            className="bank-system__sys-img system-mastercard"
            src={mastercard}
            alt="mastercard logo"
            data-num={5}
          />
          <img
            className="bank-system__sys-img system-discover"
            src={discover}
            alt="discover logo"
            data-num={6}
          />
        </div>
        <div className="card-dtls">
          <div className="card-dtls__expiry">
            <label htmlFor="expiry-date">Expiry Date</label>
            <input
              className="card-dtls__field"
              type="text"
              name="expiry-date"
              id="expiry-date"
              maxLength={7}
              onChange={(e) => valFns.dateInitialValidator(e)}
            />
            <span className="card-dtls-error-msg error-msg__date hidden">
              Enter expiry date correctly
            </span>
          </div>
          <div className="card-dtls__cvv">
            <label htmlFor="card-cvv">CVV</label>
            <input
              className="card-dtls__field"
              type="text"
              name="card-cvv"
              id="card-cvv"
              maxLength={3}
              onChange={(e) => valFns.cvvInitialValidator(e)}
            />
            <span className="card-dtls-error-msg error-msg__cvv hidden">
              Enter CVV correctly
            </span>
          </div>
        </div>
        <button
          type="button"
          className="pchs-form__btn submit-purchase"
          onClick={(e) => {
            e.preventDefault();
            const isValid = valFns.validateForm();
            if (isValid) {
              toggleElementDisplay('.pchs-module');
              toggleElementDisplay('.countdown-block');
              setCounter(4);
              clearCart();
            }
          }}
        >
          Confirm and Submit
        </button>
      </form>
    </div>
  );
}

export default PurchaseFormModule;

import React from 'react';
import { useAppSelector } from '../../store';
import { useNavigate, useMatch } from 'react-router-dom';
import './HeaderCart.scss';
import cartIcon from './../../static/cart-icon.png';
import toggleElementDisplay from '../../helperFunctions/displayToggler';
import HeaderCardsContainer from '../headerCardsContainer/HeaderCardsContainer';

function HeaderCart() {
  const match = useMatch('/cart');
  const navigate = useNavigate();

  const { totalPrice, discountTotal, totalQuantity } = useAppSelector(
    (state) => state.cartGameReducer
  );

  return (
    <div className="hd-cart">
      <div className="hd-btn">
        <img
          className="hd-btn__img"
          src={cartIcon}
          alt="cart button"
          onClick={() => toggleElementDisplay('.cart-content')}
        />
      </div>
      <div className="cart-basic-info">
        <p className="cart-content__ttl-num">Total quantity: {totalQuantity}</p>
        <p
          className={
            'cart-content__ttl-disc ' + (discountTotal === 0 ? 'hidden' : '')
          }
        >
          Total discount: {discountTotal} %
        </p>
        <p className="cart-content__ttl-price">
          Total price:{' '}
          <span
            className={
              'cart-old-price ' + (totalQuantity === 0 ? 'hidden' : '')
            }
          >
            {discountTotal > 0 ? Math.round(totalPrice * 100) / 100 : ''}
          </span>{' '}
          {discountTotal < 100
            ? Math.round(
                (totalPrice - (totalPrice * discountTotal) / 100) * 100
              ) / 100
            : 0}{' '}
          $
        </p>
      </div>
      <div className="cart-content dissolved hidden">
        <p className="cart-content__ttl-num">Total quantity: {totalQuantity}</p>
        <p
          className={
            'cart-content__ttl-disc ' + (discountTotal === 0 ? 'hidden' : '')
          }
        >
          Total discount: {discountTotal} %
        </p>
        <p className="cart-content__ttl-price">
          Total price:{' '}
          <span
            className={
              'cart-old-price ' + (totalQuantity === 0 ? 'hidden' : '')
            }
          >
            {discountTotal > 0 ? Math.round(totalPrice * 100) / 100 : ''}
          </span>{' '}
          {discountTotal < 100
            ? Math.round(
                (totalPrice - (totalPrice * discountTotal) / 100) * 100
              ) / 100
            : 0}{' '}
          $
        </p>
        <HeaderCardsContainer />
        <button
          type="button"
          className="cart-content__btn"
          onClick={() => {
            if (!match) navigate('/cart');
            toggleElementDisplay('.cart-content');
          }}
        >
          Open my cart
        </button>
      </div>
    </div>
  );
}

export default HeaderCart;

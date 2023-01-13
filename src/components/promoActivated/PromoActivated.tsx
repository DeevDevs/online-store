import React from 'react';
import { useAppDispatch } from '../../store';
import { gameActions } from '../../store/reducer/cartGamesReducer';
import './promoActivated.scss';
import crossIcon from './../../static/cross-icon.png';
import * as types from './../../staticData/baseTypes';

function PromoActivated({ promo, index }: types.TPromoCode) {
  const dispatch = useAppDispatch();
  const removePromo = (index: number): void => {
    dispatch(gameActions.removePromo(index));
  };

  return (
    <div className="promo-code">
      <p className="promo-code__name">{promo.code}</p>
      <p className="promo-code__value">{promo.discount} %</p>
      <button
        type="button"
        className="promo-code__deactivate"
        onClick={() => removePromo(index)}
      >
        <img src={crossIcon} alt="" />
      </button>
    </div>
  );
}

export default PromoActivated;

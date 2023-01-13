import React from 'react';
import { useAppSelector } from '../../store';
import './promoContainer.scss';
import PromoActivated from '../promoActivated/PromoActivated';

function PromoContainer() {
  const { promoCodes } = useAppSelector((state) => state.cartGameReducer);
  return (
    <div className="promo-container">
      {promoCodes.map((promo, index) => (
        <PromoActivated promo={promo} index={index} key={promo + `${index}`} />
      ))}
    </div>
  );
}

export default PromoContainer;

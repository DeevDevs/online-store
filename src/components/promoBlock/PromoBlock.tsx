import React, { useState } from 'react';
import PromoContainer from '../promoContainer/PromoContainer';
import './promoBlock.scss';
import { gameActions } from '../../store/reducer/cartGamesReducer';
import { useAppDispatch } from '../../store';

function PromoBlock() {
  const [promos, setPromos] = useState(false);
  const [isValid, setValidationState] = useState('');
  const [isFocused, setFocusState] = useState('out-of-focus');
  const [typedPromo, setTypedPromo] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();
  const addPromo = (promo: string) => {
    dispatch(gameActions.addPromo(promo));
  };

  return (
    <div className="promo">
      <p className="promo__offer">Enter promocode:</p>
      <input
        className={'promo__input ' + isFocused + ' ' + isValid}
        type="text"
        maxLength={8}
        value={inputValue}
        onFocus={() => setFocusState('focused')}
        onBlur={() => setFocusState('out-of-focus')}
        onChange={(e) => {
          setInputValue(e.target.value.toUpperCase());
          setTypedPromo(e.target.value.toUpperCase());
          checkValidity(e, setValidationState, setButtonState);
        }}
      />
      <button
        className={'promo__activate ' + (buttonState ? '' : 'inactive-btn')}
        onClick={() => {
          if (buttonState) {
            addPromo(typedPromo);
            setInputValue('');
            setValidationState('');
            setFocusState('out-of-focus');
            setButtonState(false);
          }
        }}
      >
        Activate
      </button>
      <div className="promo-codes">
        <div
          className="promo-codes__displayer"
          onMouseLeave={() => (promos ? setPromos(!promos) : setPromos(promos))}
        >
          <p
            className="promo-display__activated"
            onClick={() => setPromos(!promos)}
          >
            Activated Promo
          </p>
          <div className={'activated-promos ' + (promos ? '' : 'hidden')}>
            <PromoContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

const validPromos = ['ZEUS', 'SLAANESH', 'ENTROPY', 'MAFIA'];

function checkInput(value: string) {
  if (!validPromos.includes(value)) return 'is-invalid';
  if (validPromos.includes(value)) {
    return 'is-valid';
  }
  return '';
}

function checkValidity(
  event: React.ChangeEvent<HTMLInputElement>,
  setValidationState: React.Dispatch<React.SetStateAction<string>>,
  setButtonState: React.Dispatch<React.SetStateAction<boolean>>
) {
  event.target.value = event.target.value.toUpperCase();
  if (event.target.value.length === 0) {
    setValidationState('');
    return;
  }
  const isValid = checkInput(event.target.value);
  isValid === 'is-valid' ? setButtonState(true) : setButtonState(false);
  setValidationState(isValid);
}

export default PromoBlock;

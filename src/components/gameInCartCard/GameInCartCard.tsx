import React from 'react';
import { useAppDispatch } from '../../store';
import { gameActions } from '../../store/reducer/cartGamesReducer';
import { Link } from 'react-router-dom';
import './GameInCartCard.scss';
import * as types from './../../staticData/baseTypes';

function GameInCartCard({ game, quantity }: types.ICartGame) {
  const dispatch = useAppDispatch();
  const id = game.id;
  const incQuantity = (id: number): void => {
    dispatch(gameActions.incQuantity({ id }));
  };
  const decQuantity = (id: number): void => {
    dispatch(gameActions.decQuantity({ id }));
  };
  const linkString = `/product?prodBy=${game.produced
    .split(' ')
    .join('-')}&id=${game.id}`;

  return (
    <div className="hd-game-card">
      <Link to={linkString} target="_blank">
        <div
          className="hd-game-card__img"
          style={{ backgroundImage: `url(${game.previewImg})` }}
        ></div>
      </Link>
      <div className="hd-game-card-dtls">
        <Link to={linkString} target="_blank">
          <p className="hd-game-card-dtls__name">{game.name}</p>
        </Link>
        <p className="hd-game-card-dtls__price">
          Price: {Math.round(game.price * quantity * 100) / 100} $
        </p>
        <div className="hd-game-quantity">
          <span className="hd-game-quantity__line">Quantity:</span>
          <div className="hd-game-quantity-panel">
            <button
              type="button"
              className="hd-game-quantity-panel__btn hd-quantity-btn-less"
              onClick={() => decQuantity(id)}
            >
              -
            </button>
            <span className="hd-game-quantity-panel__num">{quantity}</span>
            <button
              type="button"
              className="hd-game-quantity-panel__btn hd-quantity-btn-more"
              onClick={() => incQuantity(id)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameInCartCard;

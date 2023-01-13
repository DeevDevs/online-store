import React, { useEffect, useState } from 'react';
import { gameActions } from '../../store/reducer/cartGamesReducer';
import { useAppDispatch, useAppSelector } from '../../store';
import { Link } from 'react-router-dom';
import './ListGameCard.scss';
import * as types from './../../staticData/baseTypes';
import RatingDisplay from '../ratingDisplay/RatingDisplay';
import CategoriesDisplay from '../categoriesDisplay/CategoriesDisplay';

function ListGameCard({ game }: types.TGameCardProps) {
  const [mouseOverBtnContent, setMouseOverBtnContent] = useState('Game Added');
  const [gameAdded, setGameAdded] = useState(false);
  const dispatch = useAppDispatch();
  const { cartGames } = useAppSelector((state) => state.cartGameReducer);
  const addGameToCart = (newGame: types.TGame): void => {
    dispatch(gameActions.addGameToCart(newGame));
  };
  const removeGame = (id: types.curGameID): void => {
    dispatch(gameActions.removeGame(id));
  };
  const isGameInCart = (id: number): boolean => {
    return cartGames.some((game) => game.game.id === id);
  };

  useEffect(() => {
    setGameAdded(isGameInCart(game.id));
  }, [cartGames]);

  const linkString = `/product?prodBy=${game.produced
    .split(' ')
    .join('-')}&id=${game.id}`;

  return (
    <div className="lg-card">
      <div className="lg-card__col">
        <Link to={linkString} target="_blank">
          <div
            className="lg-card__image"
            style={{ backgroundImage: `url(${game.previewImg})` }}
          ></div>
        </Link>
      </div>
      <div className="lg-card__col">
        <div className="lg-card__label">
          <Link to={linkString} target="_blank">
            <p className="lg-card__name">{game.name}</p>
          </Link>
          <RatingDisplay rating={game.rating} />
        </div>
        <div className="lg-card__description">{game.description}</div>
        <div className="lg-card__category">
          <CategoriesDisplay categories={game.categories} />
        </div>
      </div>
      <div className="lg-card__col">
        <div className="lg-card__price">{game.price}</div>
        <div className="lg-card__stock">In stock: {game.inStock}</div>
        <button
          type="button"
          className={
            `lg-card__add-btn ` +
            (isGameInCart(game.id) ? 'btn-alrd-added' : '')
          }
          onClick={() => {
            if (gameAdded) {
              removeGame({ id: game.id });
              setGameAdded(false);
            } else {
              addGameToCart(game);
              setGameAdded(true);
            }
          }}
          onMouseOver={() => {
            if (gameAdded) {
              setMouseOverBtnContent('Remove it');
            }
          }}
          onMouseLeave={() => {
            if (gameAdded) {
              setMouseOverBtnContent('Game Added');
            }
          }}
        >
          {gameAdded ? mouseOverBtnContent : 'Add to cart'}
        </button>
      </div>
    </div>
  );
}

export default ListGameCard;

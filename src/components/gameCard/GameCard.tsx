import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { gameActions } from '../../store/reducer/cartGamesReducer';
import { Link } from 'react-router-dom';
import './GameCard.scss';
import tick from './../../static/tick.png';
import cross from './../../static/cross.png';
import RatingDisplay from '../ratingDisplay/RatingDisplay';
import CategoriesDisplay from '../categoriesDisplay/CategoriesDisplay';
import * as types from './../../staticData/baseTypes';

function GameCard({ game, prodParent }: types.TGameCardProps) {
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
    <div className="game-card">
      <Link to={linkString} target={prodParent ? '_self' : '_blank'}>
        <div
          className="game-card__img"
          style={{ backgroundImage: `url(${game.previewImg})` }}
        ></div>
      </Link>
      <Link to={linkString} target={prodParent ? '_self' : '_blank'}>
        <p className="game-card__name">{game.name}</p>
      </Link>
      <div className="game-dtls">
        <div className="game-dtls__rc">
          <RatingDisplay rating={game.rating} />
          <CategoriesDisplay categories={game.categories} />
        </div>
        <div className="game-dtls__psb">
          <div className="price-stock">
            <p className="price-stock__price">Price: {game.price.toString()}</p>
            <p className="price-stock__stock">
              In stock:{' '}
              <img
                className="game-dtls__instock-img"
                src={game.inStock > 0 ? tick : cross}
              />
            </p>
          </div>
          <button
            type="button"
            className={
              `game-dtls__add-btn ` + (gameAdded ? 'btn-alrd-added' : '')
            }
            onClick={() => {
              if (gameAdded) {
                removeGame({ id: game.id });
                setGameAdded(false);
              } else {
                addGameToCart(game);
                setGameAdded(true);
                setMouseOverBtnContent('Remove it');
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
    </div>
  );
}

export default GameCard;

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { gameActions } from '../../store/reducer/cartGamesReducer';
import { Link } from 'react-router-dom';
import './aboutGameInfoBlock.scss';
import booksIcon from './../../static/books-pile.png';
import zoomIcon from './../../static/zoom-icon.png';
import * as types from './../../staticData/baseTypes';
import toggleElementDisplay from '../../helperFunctions/displayToggler';
import {
  displayImg,
  setBlockVerticalPosition,
} from '../../helperFunctions/aboutPageFunctions';
import CategoriesProdPage from '../../components/categoriesProdPage/CategoriesProdPage';
import RatingDisplay from '../../components/ratingDisplay/RatingDisplay';

function AboutGameInfoBlock(thisGame: types.TGame) {
  const [mouseOverBtnContent, setMouseOverBtnContent] = useState('Game Added');
  const [gameAdded, setGameAdded] = useState(false);
  const { cartGames } = useAppSelector((state) => state.cartGameReducer);
  const dispatch = useAppDispatch();
  const addGameToCart = (newGame: types.TGame): void => {
    dispatch(gameActions.addGameToCart(newGame));
  };
  const removeGame = (id: types.curGameID): void => {
    dispatch(gameActions.removeGame(id));
  };
  const isGameInCart = (id: number): boolean => {
    return cartGames.some((game: types.ICartGame) => game.game.id === id);
  };
  useEffect(() => {
    setGameAdded(isGameInCart(thisGame.id));
  }, [cartGames]);

  return (
    <div className="pp-game">
      <h2 className="pp-game__name">{thisGame.name}</h2>
      <div className="pp-game__details">
        <div className="pp-img-box">
          <div
            className="pp-zoom-btn"
            onClick={() => {
              setBlockVerticalPosition();
              toggleElementDisplay('.pp-magnified-img');
              document.body.style.overflow = 'hidden';
            }}
          >
            <img
              className="pp-zoom-btn__img"
              src={zoomIcon}
              alt="zoom button"
            />
          </div>
          <div
            className="pp-img-box__img"
            style={{ backgroundImage: `url(${thisGame.images[0]})` }}
            data-url={thisGame.images[0]}
          ></div>
        </div>
        <div className="pp-dtls-box">
          <p className="pp-dtls-box__price">By: {thisGame.produced}</p>
          <p className="pp-dtls-box__price">Price: {thisGame.price}$</p>
          <p className="pp-dtls-box__stock">In stock: {thisGame.inStock}</p>
          <div className="pp-dtls-box__rating">
            <span className="pp-rating-name">Rating:</span>
            <span className="pp-rating-box">
              <RatingDisplay rating={thisGame.rating} />
            </span>
          </div>
          <CategoriesProdPage
            {...{
              categories: thisGame.categories,
            }}
          />
        </div>
      </div>
      <div className="pp-controls">
        <div className="pp-img-panel" onClick={(e) => displayImg(e)}>
          <img className="pp-img-panel__img" src={thisGame.images[0]} />
          <img className="pp-img-panel__img" src={thisGame.images[1]} />
          <img className="pp-img-panel__img" src={thisGame.images[2]} />
          <img className="pp-img-panel__img" src={thisGame.images[3]} />
        </div>
        <button
          className={
            `pp-controls__btn btn-send-to-cart ` +
            (isGameInCart(thisGame.id) ? 'btn-alrd-added' : '')
          }
          onClick={() => {
            if (gameAdded) {
              removeGame({ id: thisGame.id });
              setGameAdded(false);
            } else {
              addGameToCart(thisGame);
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
          {gameAdded ? mouseOverBtnContent : 'Send to cart'}
        </button>
        <Link to={`/cart`}>
          <button
            className="pp-controls__btn btn-buy-now"
            onClick={() => {
              addGameToCart(thisGame);
              setTimeout(() => {
                toggleElementDisplay('.pchs-module');
                toggleElementDisplay('.pchs-module-overlay');
                document.body.style.overflow = 'hidden';
              }, 100);
            }}
          >
            Buy now
          </button>
        </Link>
      </div>
      <div className="pp-game__split-line">
        <img
          className="pp-game__decor"
          src={booksIcon}
          alt="pile of books image"
        />
      </div>
      <h3 className="pp-game__descr-head">Description:</h3>
      <p className="pp-game__description">{thisGame.description}</p>
    </div>
  );
}

export default AboutGameInfoBlock;

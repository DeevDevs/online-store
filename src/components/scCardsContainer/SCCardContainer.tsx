import React from 'react';
import { useAppSelector } from '../../store';
import './scCardContainer.scss';
import emptyChest from './../../static/empty-chest.png';
import helmetIcon from './../../static/helmet.png';
import ShopCartCard from '../shopCartCard/ShopCartCard';

function ScCardContainer() {
  const { cartGames, firstIndex, lastIndex } = useAppSelector(
    (state) => state.cartGameReducer
  );
  let blockContent: JSX.Element[] | JSX.Element;

  if (cartGames.length > 0) {
    blockContent = cartGames
      .filter((_, index) => index >= firstIndex && index <= lastIndex)
      .map((game) => (
        <ShopCartCard
          key={game.game.id}
          game={game.game}
          quantity={game.quantity}
          position={game.position}
        />
      ));
  } else {
    blockContent = (
      <div className="sc-empty">
        <p className="sc-empty__message">
          You chest is empty, warrior. Travel to the mysterious dungeon and pick
          some rare treasure first.
        </p>
        <img
          className="sc-empty__chest"
          src={emptyChest}
          alt="empty chest image"
        />
        <img
          className="sc-empty__helmet"
          src={helmetIcon}
          alt="empty chest image"
        />
      </div>
    );
  }

  return <div className="sc-content">{blockContent}</div>;
}

export default ScCardContainer;

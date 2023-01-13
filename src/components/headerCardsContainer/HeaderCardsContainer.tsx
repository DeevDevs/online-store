import React from 'react';
import { useAppSelector } from '../../store';
import './headerCardsContainer.scss';
import GameInCartCard from '../gameInCartCard/GameInCartCard';

function HeaderCardsContainer() {
  const { cartGames } = useAppSelector((state) => state.cartGameReducer);
  let blockContent: JSX.Element[] | JSX.Element;

  if (cartGames.length > 0) {
    blockContent = cartGames.map((game) => (
      <GameInCartCard
        key={game.game.id}
        game={game.game}
        quantity={game.quantity}
        position={game.position}
      />
    ));
  } else {
    blockContent = (
      <div className="empty-header-cart">
        You have not picked any treasure yet.
      </div>
    );
  }

  return <div className="cart-games">{blockContent}</div>;
}

export default HeaderCardsContainer;

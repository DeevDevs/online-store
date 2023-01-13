import React from 'react';
import './emptyGameBlock.scss';
import friendlyOrc from './../../static/friendly-orc.jpg';

function EmptyGameBlock() {
  return (
    <div className="empty-block">
      <p className="empty-block__message">
        There is no such treasure in our lands. Please, choose from the
        displayed ones.
      </p>
      <img className="empty-block__img" src={friendlyOrc} alt="" />
    </div>
  );
}

export default EmptyGameBlock;

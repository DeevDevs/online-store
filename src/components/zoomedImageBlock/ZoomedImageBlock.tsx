import React from 'react';
import './zoomedImageBlock.scss';
import crossIcon from './../../static/white-cross.png';
import toggleElementDisplay from '../../helperFunctions/displayToggler';
import * as types from './../../staticData/baseTypes';

function ZoomedImageBlock(thisGame: types.TGame) {
  return (
    <div className="pp-magnified-img dissolved hidden">
      <img
        className="pp-magnified-img__img"
        src={thisGame.images[0]}
        alt="game image"
      />
      <button
        type="button"
        className="pp-magnified-img__close"
        onClick={() => {
          toggleElementDisplay('.pp-magnified-img');
          document.body.style.overflow = 'visible';
        }}
      >
        <img src={crossIcon} alt="" />
      </button>
    </div>
  );
}

export default ZoomedImageBlock;

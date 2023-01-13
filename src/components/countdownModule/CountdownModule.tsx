import React from 'react';
import './countdownModule.scss';
import * as types from './../../staticData/baseTypes';

function CountdownModule({ seconds }: types.useStateState) {
  return (
    <div className="countdown-block hidden dissolved">
      <p className="countdown-block__msg">
        Congratulations! You have become the owner of our most valuable
        treasures! Thank you for visiting us!
      </p>
      <p className="countdown-block__ctdwn-msg">
        You will be teleported back to our shop in
      </p>
      <p className="countdown-block__ctdwn-number">{seconds}</p>
    </div>
  );
}

export default CountdownModule;

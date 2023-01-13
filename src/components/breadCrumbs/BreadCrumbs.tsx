import React from 'react';
import { Link } from 'react-router-dom';
import './breadCrumbs.scss';
import arrowRight from './../../static/arrow-right-crumbs.png';
import * as types from './../../staticData/baseTypes';

function BreadCrumbs({ params }: types.crumbsParams) {
  const nameOfTheProducer: string = params.producer;
  const linkToProducerGameSet: string =
    `/product?` + `prodBy=${nameOfTheProducer.split(' ').join('-')}`;
  return (
    <div className="crumbs">
      <Link className="crumbs__link" to={`/`}>
        <p className="crumbs__line">Store</p>
      </Link>
      <img className="crumbs__arrow" src={arrowRight} alt="" />
      <Link className="crumbs__link" to={linkToProducerGameSet}>
        <p className="crumbs__line">{nameOfTheProducer}</p>
      </Link>
      <img
        className={'crumbs__arrow' + (params.game ? '' : ' hidden')}
        src={arrowRight}
      />
      <p className="crumbs__line">{params.game ? params.game.name : ''}</p>
    </div>
  );
}

export default BreadCrumbs;

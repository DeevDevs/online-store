import React from 'react';
import './CategoriesDisplay.scss';
import catCards from './../../static/cat-cards.png';
import catEconomy from './../../static/cat-economy.png';
import catKids from './../../static/cat-kids.png';
import catQuiz from './../../static/cat-quiz.png';
import catStrategy from './../../static/cat-strategy.png';
import rolePlay from './../../static/role-play-icon.png';
import * as types from './../../staticData/baseTypes';
import * as baseV from './../../staticData/baseValues';

function CategoriesDisplay(props: types.TPropsCategoriesDisplay) {
  const indexesOfExistingCategories: number[] = [];

  baseV.ARR_OF_CATEGORIES.forEach((category: string, index: number): void => {
    if (props.categories.includes(category))
      indexesOfExistingCategories.push(index);
  });

  const totalCategories: JSX.Element[] = [
    <img className="rc-categories__img" src={catStrategy} key={'strategy'} />,
    <img className="rc-categories__img" src={catCards} key={'cards'} />,
    <img className="rc-categories__img" src={catQuiz} key={'quiz'} />,
    <img className="rc-categories__img" src={catEconomy} key={'economy'} />,
    <img className="rc-categories__img" src={catKids} key={'kids'} />,
    <img className="rc-categories__img" src={rolePlay} key={'role'} />,
  ];

  const displayedCategories: JSX.Element[] = totalCategories.filter(
    (_, index) => indexesOfExistingCategories.includes(index)
  );

  return <div className="rc-categories">{displayedCategories}</div>;
}

export default CategoriesDisplay;

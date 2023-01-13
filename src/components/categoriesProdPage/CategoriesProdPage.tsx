import React from 'react';
import './CategoriesProdPage.scss';
import catCards from './../../static/cat-cards.png';
import catEconomy from './../../static/cat-economy.png';
import catKids from './../../static/cat-kids.png';
import catQuiz from './../../static/cat-quiz.png';
import catStrategy from './../../static/cat-strategy.png';
import catRolePlay from './../../static/role-play-icon.png';
import * as baseV from '../../staticData/baseValues';
//prettier-ignore
const arrOfImages: string[] = [ catStrategy, catCards, catQuiz, catEconomy, catKids, catRolePlay ];

function CategoriesProdPage(props: { categories: string[] }) {
  const arrOfElements: JSX.Element[] = props.categories.map(
    (category: string, index: number) => {
      const indexOfCategory: number = baseV.ARR_OF_CATEGORIES.indexOf(category);
      return (
        <div className="pp-category" key={baseV.ARR_OF_CATEGORIES[index]}>
          <img
            className="pp-category__img"
            src={arrOfImages[indexOfCategory]}
          />
          <span className="pp-category__name">
            {baseV.ARR_OF_CATEGORY_NAMES[indexOfCategory]
              .charAt(0)
              .toUpperCase() +
              baseV.ARR_OF_CATEGORY_NAMES[indexOfCategory].slice(1)}
          </span>
        </div>
      );
    }
  );
  return (
    <div className="pp-categories">
      <p className="pp-categories__name">Game category:</p>
      {arrOfElements}
    </div>
  );
}

export default CategoriesProdPage;

import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import { gameActions } from '../../store/reducer/gamesReducer';
import { useSearchParams } from 'react-router-dom';
import './CatSearchBlock.scss';
import catCards from './../../static/cat-cards.png';
import catEconomy from './../../static/cat-economy.png';
import catKids from './../../static/cat-kids.png';
import catQuiz from './../../static/cat-quiz.png';
import catStrategy from './../../static/cat-strategy.png';
import catRole from './../../static/role-play-icon.png';
import * as types from './../../staticData/baseTypes';

function CategorySearchBlock() {
  const { categories } = useAppSelector((state) => state.gameReducer);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);

  const callbackToggleCategory = (cat: types.ECategory): void => {
    dispatch(gameActions.toggleCategory(cat));
  };

  useEffect((): void => {
    const strCategories: string = searchParams.get('category') || '';
    const arrayCategories: string[] = strCategories
      .split('-')
      .filter((cat) => cat in types.ECategory);

    if (arrayCategories.length) {
      dispatch(gameActions.setCategories(arrayCategories as types.ECategory[]));
    }
  }, []);

  useEffect((): void => {
    if (!isFirstRender.current) {
      const str = categories.join('-');
      searchParams.set('category', str);
      setSearchParams(searchParams);
    }
    isFirstRender.current = false;
  }, [categories]);

  const DivCategory = ({ category, srcImg, label }: types.propsDivCategory) => (
    <div
      className={
        categories.includes(category)
          ? 'div-category div-category_active'
          : 'div-category'
      }
      onClick={() => callbackToggleCategory(category)}
    >
      <img src={srcImg} className="div-category__img" />
      <p className="div-category__name">{label}</p>
    </div>
  );

  return (
    <div className="categories-search-block">
      <p className="categories-search-block__title">Categories of Games</p>
      <DivCategory
        category={types.ECategory.cards}
        srcImg={catCards}
        label="Card Games"
      />
      <DivCategory
        category={types.ECategory.economy}
        srcImg={catEconomy}
        label="Economy Games"
      />
      <DivCategory
        category={types.ECategory.kids}
        srcImg={catKids}
        label="For children"
      />
      <DivCategory
        category={types.ECategory.quiz}
        srcImg={catQuiz}
        label="Quizzes and Mind Games"
      />
      <DivCategory
        category={types.ECategory.strategy}
        srcImg={catStrategy}
        label="Strategy games"
      />
      <DivCategory
        category={types.ECategory.role}
        srcImg={catRole}
        label="Role-play games"
      />
    </div>
  );
}

export default CategorySearchBlock;

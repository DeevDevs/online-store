import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import { gameActions } from '../../store/reducer/gamesReducer';
import { useSearchParams } from 'react-router-dom';
import './SearchViewParams.scss';
import * as types from './../../staticData/baseTypes';

function SearchViewParams() {
  const dispatch = useDispatch();
  const { games, layout } = useAppSelector((state) => state.gameReducer);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isBeingCopied, setIsBeingCopied] = useState(false);
  const [filtersReset, setFiltersReset] = useState(false);

  const callbackSetLayout = (layout: types.ELayout): void => {
    dispatch(gameActions.setLayout(layout));
    searchParams.set('layout', layout);
    setSearchParams(searchParams);
  };

  const copyLink = async (): Promise<void> => {
    if (isBeingCopied) return;
    setIsBeingCopied(true);
    window.navigator.clipboard
      .writeText(window.location.href)
      .catch((e) => console.error(e));
    setTimeout(() => setIsBeingCopied(false), 1500);
  };

  const reset = (): void => {
    if (filtersReset) return;
    setFiltersReset(true);
    dispatch(gameActions.reset());
    setTimeout(() => setFiltersReset(false), 1000);
  };

  return (
    <div className="search-view-params-block">
      <p className="search-view-params-block__games-found">
        Games found: <span id="found-games-num">{games.length}</span>
      </p>
      <div className="search-view-btns">
        <p className="search-view-btns__word">View:</p>
        <button
          type="button"
          className={
            layout === types.ELayout.cards
              ? 'search-view-btns__btn search-view-btns__btn_active'
              : 'search-view-btns__btn'
          }
          onClick={() => callbackSetLayout(types.ELayout.cards)}
        >
          Cards
        </button>
        <button
          type="button"
          className={
            layout === types.ELayout.list
              ? 'search-view-btns__btn search-view-btns__btn_active'
              : 'search-view-btns__btn'
          }
          onClick={() => callbackSetLayout(types.ELayout.list)}
        >
          List
        </button>
      </div>
      <button
        type="button"
        className={
          'search-view-params-block__btn link-btn ' +
          (isBeingCopied ? 'btn-activated' : '')
        }
        onClick={copyLink}
      >
        {isBeingCopied ? 'Copied' : 'Copy Current Search Link'}
      </button>
      <button
        type="button"
        className={
          'search-view-params-block__btn reset-btn ' +
          (filtersReset ? 'btn-activated' : '')
        }
        onClick={reset}
      >
        {filtersReset ? 'Filters reset' : 'Reset All Filters'}
      </button>
    </div>
  );
}

export default SearchViewParams;

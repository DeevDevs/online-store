import React, { useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { gameActions } from '../../store/reducer/cartGamesReducer';
import './store.scss';
import CardContainer from '../../components/gameCardContainer/CardContainer';
import CatSearchBlock from '../../components/catSearchBlock/CatSearchBlock';
import Search from '../../components/search/Search';
import SearchViewParams from '../../components/searchViewParams/SearchViewParams';
import SortBlock from '../../components/sortBlock/SortBlock';
import SortViewBlock from '../../components/sortViewBlock/SortViewBlock';
import FilterProd from '../../components/filterProd/FilterProd';

function Store() {
  const dispatch = useAppDispatch();
  useEffect((): void => {
    dispatch(gameActions.initialData());
  }, []);

  useEffect((): void => {
    document.title = 'Tabletop Geek: Store';
  }, []);

  return (
    <div className="store">
      <Search />
      <div className="store-main">
        <div className="store__left">
          <CardContainer />
        </div>
        <div className="store__right">
          <SearchViewParams />
          <SortBlock />
          <SortViewBlock />
          <CatSearchBlock />
          <FilterProd />
        </div>
      </div>
    </div>
  );
}

export default Store;

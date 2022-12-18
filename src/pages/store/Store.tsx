import React from 'react';
import CategorySearchBlock from '../../components/CategorySearchBlock/CategorySearchBlock';
import SearchField from '../../components/seachField/SearchField';
import SearchParams from '../../components/searchParams/SearchParams';
import SearchViewParams from '../../components/searchViewParams/SearchViewParams';
import SortViewBlock from '../../components/sortViewBlock/SortViewBlock';
import './store.scss';

function Store() {
  return (
    <>
      <SearchParams />
      <SearchField />
      <SearchViewParams />
      <SortViewBlock />
      <CategorySearchBlock />
    </>
  );
}

export default Store;

import React, { useEffect, useRef } from 'react';
import { useAppDispatch } from '../../store';
import { gameActions } from '../../store/reducer/gamesReducer';
import { useSearchParams } from 'react-router-dom';
import './Search.scss';

function Search() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  function changeText(e: React.ChangeEvent<HTMLInputElement>) {
    const text: string = e.target.value.trim();
    dispatch(gameActions.setTextFilter(text));
    searchParams.set('input', text);
    setSearchParams(searchParams);
  }

  useEffect((): void => {
    const oldText: string | null = searchParams.get('input');
    if (oldText) {
      dispatch(gameActions.setTextFilter(oldText));
      if (inputRef.current) {
        inputRef.current.value = oldText;
      }
    }
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      className="search"
      placeholder="Search"
      onChange={(e) => changeText(e)}
    />
  );
}

export default Search;

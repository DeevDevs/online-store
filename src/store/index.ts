import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { gameReducer } from './reducer/gamesReducer';
import { cartGameReducer } from './reducer/cartGamesReducer';
import * as types from './../staticData/baseTypes';

export const appReducer = combineReducers({
  gameReducer,
  cartGameReducer,
});

export const appStore = () => {
  return configureStore({
    reducer: appReducer,
  });
};

export const useAppDispatch = () => useDispatch<types.TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<types.TAppReducer> =
  useSelector;

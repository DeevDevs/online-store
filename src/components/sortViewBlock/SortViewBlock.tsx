import React, { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { gameActions } from '../../store/reducer/gamesReducer';
import { useSearchParams } from 'react-router-dom';
import './SortViewBlock.scss';
import inStockImg from './../../static/in-stock-param.png';
import numOfPlayersImg from './../../static/num-of-players-param.png';
import priceImg from './../../static/price-param.png';
import * as types from './../../staticData/baseTypes';
import DoubleRange from '../doubleRange/DoubleRange';

function SortViewBlock() {
  const isFirstRenderRef: React.MutableRefObject<boolean> = useRef(true);
  const dispatch = useAppDispatch();
  const { filterCountInStock, filterPlayers, filterPrice } = useAppSelector(
    (state) => state.gameReducer
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const callbackSetNumOfPlayers = useCallback(
    (min: number, max: number): void => {
      dispatch(gameActions.setNumOfPlayers({ min, max }));
    },
    []
  );

  const callbackSetCountInStock = useCallback(
    (min: number, max: number): void => {
      dispatch(gameActions.setCountInStock({ min, max }));
    },
    []
  );

  const callbackSetPrice = useCallback((min: number, max: number): void => {
    dispatch(gameActions.setPrice({ min, max }));
  }, []);

  useEffect((): void => {
    const minPrice: string | null = searchParams.get(
      types.ESearchParams.minPrice
    );
    const maxPrice: string | null = searchParams.get(
      types.ESearchParams.maxPrice
    );
    const minInStock: string | null = searchParams.get(
      types.ESearchParams.minInStock
    );
    const maxInStock: string | null = searchParams.get(
      types.ESearchParams.maxInStock
    );
    const minPlayers: string | null = searchParams.get(
      types.ESearchParams.minPlayers
    );
    const maxPlayers: string | null = searchParams.get(
      types.ESearchParams.maxPlayers
    );

    if (minPrice && maxPrice) {
      const min = +minPrice;
      const max = +maxPrice;
      dispatch(gameActions.setPrice({ min, max }));
    }

    if (minInStock && maxInStock) {
      const min = +minInStock;
      const max = +maxInStock;
      dispatch(gameActions.setCountInStock({ min, max }));
    }

    if (minPlayers && maxPlayers) {
      const min = +minPlayers;
      const max = +maxPlayers;
      dispatch(gameActions.setNumOfPlayers({ min, max }));
    }
  }, []);

  useEffect((): void => {
    if (!isFirstRenderRef.current) {
      searchParams.set(
        types.ESearchParams.minPrice,
        filterPrice.min.toString()
      );
      searchParams.set(
        types.ESearchParams.maxPrice,
        filterPrice.max.toString()
      );
      searchParams.set(
        types.ESearchParams.minInStock,
        filterCountInStock.min.toString()
      ); // eslint-disable-line
      searchParams.set(
        types.ESearchParams.maxInStock,
        filterCountInStock.max.toString()
      ); // eslint-disable-line
      searchParams.set(
        types.ESearchParams.minPlayers,
        filterPlayers.min.toString()
      );
      searchParams.set(
        types.ESearchParams.maxPlayers,
        filterPlayers.max.toString()
      );
      setSearchParams(searchParams);
    }
    isFirstRenderRef.current = false;
  }, [filterCountInStock, filterPlayers, filterPrice]);

  return (
    <>
      <div className="sort-view-block">
        <div className="sort-view-block__inputs">
          <div className="sort-view-block__inputs__input-block">
            <div className="sort-view-block__inputs__input-block__info">
              <img
                className="sort-view-block__inputs__input-block__info__img"
                src={numOfPlayersImg}
                alt="Number of Players Image"
              />
              <p className="sort-view-block__inputs__input-block__info__name">
                Number of Players
              </p>
            </div>
            <DoubleRange
              min={2}
              max={8}
              left={filterPlayers.min}
              right={filterPlayers.max}
              onChange={callbackSetNumOfPlayers}
            />
          </div>
          <div className="sort-view-block__inputs__input-block">
            <div className="sort-view-block__inputs__input-block__info">
              <img
                className="sort-view-block__inputs__input-block__info__img"
                src={inStockImg}
                alt="Number of Players Image"
              />
              <p className="sort-view-block__inputs__input-block__info__name">
                Available in Stock
              </p>
            </div>
            <DoubleRange
              min={1}
              max={201}
              left={filterCountInStock.min}
              right={filterCountInStock.max}
              onChange={callbackSetCountInStock}
            />
          </div>
          <div className="sort-view-block__inputs__input-block">
            <div className="sort-view-block__inputs__input-block__info">
              <img
                className="sort-view-block__inputs__input-block__info__img"
                src={priceImg}
                alt="Number of Players Image"
              />
              <p className="sort-view-block__inputs__input-block__info__name">
                Price
              </p>
            </div>
            <DoubleRange
              min={8}
              max={350}
              left={filterPrice.min}
              right={filterPrice.max}
              onChange={callbackSetPrice}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SortViewBlock;

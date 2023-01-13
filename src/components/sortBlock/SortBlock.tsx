import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { gameActions } from '../../store/reducer/gamesReducer';
import { useSearchParams } from 'react-router-dom';
import './SortBlock.scss';
import * as types from './../../staticData/baseTypes';

function SortBlock() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { param, trend } = useAppSelector((state) => state.gameReducer.sort);

  useEffect(() => {
    const oldParam: string = searchParams.get('param') || '';
    const oldTrend: string = searchParams.get('trend') || '';

    if (oldParam in types.ESortParam && oldTrend in types.ESortTrend) {
      dispatch(
        gameActions.sort({
          param: oldParam as types.ESortParam,
          trend: oldTrend as types.ESortTrend,
        })
      );
    }
  }, []);

  const setSort = ({ param, trend }: types.TSort) => {
    searchParams.set('param', param);
    searchParams.set('trend', trend);
    setSearchParams(searchParams);
    dispatch(
      gameActions.sort({
        param: param,
        trend: trend,
      })
    );
  };

  const getClassParam = (btnParam: types.ESortParam) => {
    if (param === btnParam) {
      return 'sort__param sort__param_active';
    }
    return 'sort__param';
  };

  const getClassTrend = (btnTrend: types.ESortTrend) => {
    if (trend === btnTrend) {
      return `sort__img sort__img_${btnTrend} sort__img_active`;
    }
    return `sort__img sort__img_${btnTrend}`;
  };

  return (
    <div className="sort">
      <div className="sort__block">
        <button
          type="button"
          className={getClassParam(types.ESortParam.rating)}
          onClick={() => setSort({ param: types.ESortParam.rating, trend })}
        >
          Sort By Rating
        </button>
        <button
          type="button"
          className={getClassParam(types.ESortParam.price)}
          onClick={() => setSort({ param: types.ESortParam.price, trend })}
        >
          Sort By Price
        </button>
      </div>
      <div className="sort__block">
        <div>
          <button
            type="button"
            className={getClassTrend(types.ESortTrend.ascending)}
            onClick={() =>
              setSort({ trend: types.ESortTrend.ascending, param })
            }
          />
          <button
            type="button"
            className={getClassTrend(types.ESortTrend.descending)}
            onClick={() =>
              setSort({ trend: types.ESortTrend.descending, param })
            }
          />
        </div>
        <p className="sort__label">{trend.toUpperCase()}</p>
      </div>
    </div>
  );
}

export default SortBlock;

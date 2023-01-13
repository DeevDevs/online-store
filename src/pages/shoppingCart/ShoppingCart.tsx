import React, { useRef, useEffect } from 'react';
import { useAppSelector } from '../../store';
import { useAppDispatch } from '../../store';
import { gameActions } from '../../store/reducer/cartGamesReducer';
import { useSearchParams } from 'react-router-dom';
import './shoppingCart.scss';
import SCCardContainer from '../../components/scCardsContainer/SCCardContainer';
import * as types from './../../staticData/baseTypes';
import toggleElementDisplay from '../../helperFunctions/displayToggler';
import PrchsModuleContainer from '../../components/prchsModuleContainer/PrchsModuleContainer';
import PromoBlock from '../../components/promoBlock/PromoBlock';

function ShoppingCart() {
  const { cartGames } = useAppSelector((state) => state.cartGameReducer);
  const isFirstRenderRef: React.MutableRefObject<boolean> = useRef(true);
  const dispatch = useAppDispatch();
  const {
    totalPrice,
    currentPage,
    itemsPerPage,
    discountTotal,
    totalQuantity,
  } = useAppSelector((state) => state.cartGameReducer);

  const [searchParams, setSearchParams] = useSearchParams();
  const setItemsPerPage = (limit: number) =>
    dispatch(gameActions.setItemsPerPage(limit));
  const goToNextPage = () => dispatch(gameActions.goToNextPage());
  const goToPrevPage = () => dispatch(gameActions.goToPrevPage());
  const goToPage = (curPage: number) => dispatch(gameActions.goToPage(curPage));

  useEffect((): void => {
    document.title = 'Tabletop Geek: Your Cart';
  }, []);

  useEffect((): void => {
    const itemsPerPage: string | null = searchParams.get(
      types.ECartViewParams.itemsPerPage
    );
    const currentPage: string | null = searchParams.get(
      types.ECartViewParams.currentPage
    );

    if (itemsPerPage) {
      const limit: number = +itemsPerPage;
      setItemsPerPage(limit);
    }

    if (currentPage) {
      const curPage: number = +currentPage;
      goToPage(curPage);
    }
  }, []);

  useEffect((): void => {
    if (!isFirstRenderRef.current) {
      setSearchParams({
        [types.ECartViewParams.itemsPerPage]: itemsPerPage.toString(),
        [types.ECartViewParams.currentPage]: currentPage.toString(),
      });
    }
    isFirstRenderRef.current = false;
  }, [itemsPerPage, currentPage]);

  useEffect((): void => {
    dispatch(gameActions.initialData());
  }, []);

  return (
    <div className="sc-box">
      <div className="sc-control-panel">
        <h2 className="sc-control-panel__name">Your Cart</h2>
        <PromoBlock />
        <div
          className={
            'pagination-panel ' + (cartGames.length > 0 ? '' : 'hidden')
          }
        >
          <div className="pages-slider">
            <button
              type="button"
              className="pages-slider__btn btn-prev"
              onClick={() => goToPrevPage()}
            ></button>
            <p className="pages-slider__page">{currentPage}</p>
            <button
              type="button"
              className="pages-slider__btn btn-next"
              onClick={() => goToNextPage()}
            ></button>
          </div>
          <div className="pagination-panel__options">
            <label className="page-number__label" htmlFor="items">
              Games per page:
            </label>
            <select
              className="page-number__number"
              name="items"
              id="sc-items-page"
              value={itemsPerPage}
              onChange={(val) => setItemsPerPage(+val.target.value)}
            >
              <option className="page-number__option" value="1">
                1
              </option>
              <option className="page-number__option" value="2">
                2
              </option>
              <option className="page-number__option" value="3">
                3
              </option>
              <option className="page-number__option" value="4">
                4
              </option>
              <option className="page-number_option" value="5">
                5
              </option>
              <option className="page-number_option" value="6">
                6
              </option>
              <option className="page-number__option" value="7">
                7
              </option>
              <option className="page-number_option" value="8">
                8
              </option>
            </select>
          </div>
        </div>
      </div>
      <SCCardContainer />
      <div className="sc-totals">
        <button
          type="button"
          className={
            'sc-totals__checkout ' + (cartGames.length > 0 ? '' : 'hidden')
          }
          onClick={() => {
            toggleElementDisplay('.pchs-module');
            toggleElementDisplay('.pchs-module-overlay');
            document.body.style.overflow = 'hidden';
          }}
        >
          Proceed to checkout
        </button>
        <div className="sc-totals__data">
          <p className="sc-totals__quantity">Total quantity: {totalQuantity}</p>
          <p
            className={
              'sc-totals__discount ' + (discountTotal === 0 ? 'hidden' : '')
            }
          >
            Total discount: {discountTotal} %
          </p>
          <p className="sc-totals__price">
            Total price:{' '}
            <span
              className={
                'sc-old-price ' + (totalQuantity === 0 ? 'hidden' : '')
              }
            >
              {discountTotal > 0 ? Math.round(totalPrice * 100) / 100 : ''}
            </span>{' '}
            {discountTotal < 100
              ? Math.round(
                  (totalPrice - (totalPrice * discountTotal) / 100) * 100
                ) / 100
              : 0}{' '}
            $
          </p>
        </div>
      </div>
      <PrchsModuleContainer />
    </div>
  );
}

export default ShoppingCart;

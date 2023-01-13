import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as types from './../../staticData/baseTypes';
import * as baseV from './../../staticData/baseValues';

const initialState: types.TCartPageState = {
  cartGames: retrieveLocalStorage(),
  totalPrice: 0,
  itemsPerPage: 8,
  totalPages: 0,
  currentPage: 1,
  firstIndex: 0,
  lastIndex: 7,
  promoCodes: [],
  discountTotal: 0,
  totalQuantity: 0,
};

const gameSlice = createSlice({
  name: 'cartGames',
  initialState,
  reducers: {
    incQuantity(state, action: PayloadAction<types.curGameID>) {
      state.cartGames = state.cartGames.map((game) => {
        const thisGame = { ...game };
        if (thisGame.quantity === thisGame.game.inStock) return thisGame;
        if (thisGame.game.id !== action.payload.id) return thisGame;
        thisGame.quantity += 1;
        return thisGame;
      });
      state.totalPrice = countTotalPrice(state.cartGames);
      state.firstIndex = updateFirstIndex(state);
      state.lastIndex = updateLastIndex(state);
      state.totalQuantity = updateTotalQuantity(state);
      updateLocalStorage(state);
    },
    decQuantity(state, action: PayloadAction<types.curGameID>): void {
      let isZero = false;
      state.cartGames = state.cartGames.map((game) => {
        const thisGame = { ...game };
        if (thisGame.game.id !== action.payload.id) return thisGame;
        thisGame.quantity -= 1;
        if (thisGame.quantity === 0) isZero = true;
        return thisGame;
      });
      if (isZero) {
        state.cartGames = removeGameFromCart(state, action);
        state.cartGames = updatePosition(state);
        state.totalPages = countTotalPages(
          state.cartGames.length,
          state.itemsPerPage
        );
        state.currentPage = updateCurrentPage(state);
        state.firstIndex = updateFirstIndex(state);
        state.lastIndex = updateLastIndex(state);
      }
      state.totalPrice = countTotalPrice(state.cartGames);
      state.totalQuantity = updateTotalQuantity(state);
      updateLocalStorage(state);
    },
    setItemsPerPage(state, action: PayloadAction<number>): void {
      state.itemsPerPage = action.payload;
      state.totalPages = countTotalPages(
        state.cartGames.length,
        state.itemsPerPage
      );
      state.currentPage = updateCurrentPage(state);
      state.firstIndex = updateFirstIndex(state);
      state.lastIndex = updateLastIndex(state);
    },
    goToNextPage(state): void {
      state.currentPage =
        state.currentPage < state.totalPages
          ? state.currentPage + 1
          : state.currentPage;
      state.firstIndex = updateFirstIndex(state);
      state.lastIndex = updateLastIndex(state);
    },
    goToPrevPage(state): void {
      state.currentPage = state.currentPage > 1 ? state.currentPage - 1 : 1;
      state.firstIndex = updateFirstIndex(state);
      state.lastIndex = updateLastIndex(state);
    },
    goToPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
      state.firstIndex = updateFirstIndex(state);
      state.lastIndex = updateLastIndex(state);
    },
    initialData(state): void {
      state.totalPrice = countTotalPrice(state.cartGames);
      state.cartGames = updatePosition(state);
      state.totalPages = countTotalPages(
        state.cartGames.length,
        state.itemsPerPage
      );
      state.currentPage = updateCurrentPage(state);
      state.totalQuantity = updateTotalQuantity(state);
    },
    addPromo(state, action: PayloadAction<string>): void {
      if (
        state.promoCodes
          .map((promoCode) => promoCode.code)
          .includes(action.payload)
      ) {
        state.promoCodes = state.promoCodes;
        return;
      }
      state.promoCodes = udpatePromoCodes(state, action.payload);
      state.discountTotal = updateDiscountTotal(state.promoCodes);
    },
    removePromo(state, action: PayloadAction<number>): void {
      state.promoCodes.splice(action.payload, 1);
      state.discountTotal = updateDiscountTotal(state.promoCodes);
    },
    addGameToCart(state, action: PayloadAction<types.TGame>): void {
      if (state.cartGames.some((game) => game.game.id === action.payload.id))
        return;
      const newGame: types.ICartGame = {
        game: action.payload,
        quantity: 1,
        position: 0,
      };
      state.cartGames.push(newGame);
      state.totalPrice = countTotalPrice(state.cartGames);
      state.totalQuantity = updateTotalQuantity(state);
      updateLocalStorage(state);
    },
    clearCart(state): void {
      state.cartGames = [];
      state.totalPrice = countTotalPrice(state.cartGames);
      state.firstIndex = updateFirstIndex(state);
      state.lastIndex = updateLastIndex(state);
      state.totalQuantity = updateTotalQuantity(state);
      state.promoCodes = [];
      updateLocalStorage(state);
    },
    removeGame(state, action: PayloadAction<types.curGameID>): void {
      state.cartGames = removeGameFromCart(state, action);
      state.totalPrice = countTotalPrice(state.cartGames);
      state.totalQuantity = updateTotalQuantity(state);
      updateLocalStorage(state);
    },
  },
});

////////////////helperFunctions
function udpatePromoCodes(
  state: types.TCartPageState,
  promoCode: string
): types.discountObj[] {
  const newPromo: types.promoObject = {
    code: promoCode,
    discount: baseV.ALL_DISCOUNTS[baseV.ALL_PROMOCODES.indexOf(promoCode)],
  };
  return [newPromo, ...state.promoCodes];
}

function updateDiscountTotal(allPromoCodes: types.discountObj[]): number {
  return allPromoCodes
    .map((promoCode) => promoCode.discount)
    .reduce((ttl: number, val: number) => (ttl += val), 0);
}

function updateTotalQuantity(state: types.TCartPageState): number {
  return state.cartGames.reduce(
    (ttl: number, game: types.ICartGame) => (ttl += game.quantity),
    0
  );
}

function updatePosition(state: types.TCartPageState): types.ICartGame[] {
  return state.cartGames.map((game, index) => {
    const thisGame: types.ICartGame = { ...game };
    thisGame.position = index + 1;
    return thisGame;
  });
}

function countTotalPrice(games: types.ICartGame[]): number {
  return games.reduce(
    (total: number, game: types.ICartGame) =>
      (total += game.game.price * game.quantity),
    0
  );
}

function removeGameFromCart(
  state: types.TCartPageState,
  action: PayloadAction<types.curGameID>
): types.ICartGame[] {
  return state.cartGames.filter(
    (game: types.ICartGame) => game.game.id !== action.payload.id
  );
}

function countTotalPages(totalItems: number, itemsPerPage: number): number {
  return totalItems % itemsPerPage === 0
    ? totalItems / itemsPerPage
    : Math.floor(totalItems / itemsPerPage) + 1;
}

function updateCurrentPage(state: types.TCartPageState): number {
  if (state.totalPages < state.currentPage && state.totalPages > 0)
    return state.totalPages;
  if (state.totalPages === 0) return 1;
  return state.currentPage;
}

function updateFirstIndex(state: types.TCartPageState): number {
  return state.itemsPerPage * state.currentPage - state.itemsPerPage;
}

function updateLastIndex(state: types.TCartPageState): number {
  return state.firstIndex + state.itemsPerPage - 1;
}

function retrieveLocalStorage(): types.ICartGame[] {
  const localData: string | null = localStorage.getItem('onlstr-LDDV');
  const data: types.ICartGame[] = localData ? JSON.parse(localData) : [];
  return data;
}

function updateLocalStorage(state: types.TCartPageState): void {
  const dataJSON: string = JSON.stringify(state.cartGames);
  localStorage.setItem('onlstr-LDDV', dataJSON);
}

export const cartGameReducer = gameSlice.reducer;
export const gameActions = gameSlice.actions;
